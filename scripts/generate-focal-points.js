#!/usr/bin/env node
/**
 * Generate focal points for product images (Option A: display-time auto-centering).
 * Input: public/images/products/ + ecommerce/image_mapping.csv
 * Output: ecommerce/focal_points.json, ecommerce/focal_points_report.json
 * Detection: brightness threshold → subject pixels → bounding box + centroid → normalized focusX, focusY (0–1).
 * Default on failure: { focusX: 0.5, focusY: 0.45 }
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const IMAGE_MAPPING_CSV = path.join(ROOT, "ecommerce", "image_mapping.csv");
const PRODUCTS_DIR = path.join(ROOT, "public", "images", "products");
const FOCAL_POINTS_PATH = path.join(ROOT, "ecommerce", "focal_points.json");
const REPORT_PATH = path.join(ROOT, "ecommerce", "focal_points_report.json");

const BRIGHTNESS_THRESHOLD = 240; // Pixels darker than this = subject (white bg ~255)
const MIN_SUBJECT_RATIO = 0.025; // Subject area < 2.5% of image → flag as tiny
const DEFAULT_FOCUS = { focusX: 0.5, focusY: 0.45 };

function parseCSVLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') inQuotes = !inQuotes;
    else if (inQuotes) cur += c;
    else if (c === ",") {
      out.push(cur);
      cur = "";
    } else cur += c;
  }
  out.push(cur);
  return out;
}

function readImageMapping() {
  const raw = fs.readFileSync(IMAGE_MAPPING_CSV, "utf-8");
  const lines = raw.split("\n").filter(Boolean);
  const header = lines[0].split(",").map((h) => h.trim());
  const seoIdx = header.indexOf("seo_filename");
  if (seoIdx === -1) {
    console.error("image_mapping.csv missing seo_filename column");
    process.exit(1);
  }
  const filenames = [];
  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i]);
    const seoFilename = row[seoIdx]?.trim();
    if (seoFilename) filenames.push(seoFilename);
  }
  return [...new Set(filenames)];
}

function luminance(r, g, b) {
  return (r + g + b) / 3;
}

async function computeFocalPoint(filePath) {
  const meta = await sharp(filePath).metadata();
  const width = meta.width || 1;
  const height = meta.height || 1;
  const channels = meta.channels || 3;
  const { data } = await sharp(filePath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const subject = [];
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (luminance(r, g, b) < BRIGHTNESS_THRESHOLD) {
      const px = (i / channels) % width;
      const py = Math.floor(i / channels / width);
      subject.push([px, py]);
    }
  }

  const totalPixels = (width * height);
  const ratio = subject.length / totalPixels;

  if (subject.length === 0) {
    return { focal: null, tiny: false, failed: true, ratio };
  }

  let minX = width, maxX = 0, minY = height, maxY = 0;
  let sumX = 0, sumY = 0;
  for (const [px, py] of subject) {
    minX = Math.min(minX, px);
    maxX = Math.max(maxX, px);
    minY = Math.min(minY, py);
    maxY = Math.max(maxY, py);
    sumX += px;
    sumY += py;
  }
  const count = subject.length;
  const centroidX = sumX / count;
  const centroidY = sumY / count;
  const focusX = Math.max(0.05, Math.min(0.95, centroidX / width));
  const focusY = Math.max(0.05, Math.min(0.95, centroidY / height));

  return {
    focal: { focusX, focusY },
    tiny: ratio < MIN_SUBJECT_RATIO,
    failed: false,
    ratio,
  };
}

async function main() {
  console.log("generate-focal-points: computing focal points from product images\n");
  const filenames = readImageMapping();
  const focalPoints = {};
  const report = { tiny_subject: [], detection_failed: [] };

  for (const seoFilename of filenames) {
    const filePath = path.join(PRODUCTS_DIR, seoFilename);
    if (!fs.existsSync(filePath)) {
      focalPoints[seoFilename] = DEFAULT_FOCUS;
      report.detection_failed.push({ seo_filename: seoFilename, reason: "file_missing" });
      continue;
    }

    try {
      const { focal, tiny, failed, ratio: subjectRatio } = await computeFocalPoint(filePath);
      if (failed || !focal) {
        focalPoints[seoFilename] = DEFAULT_FOCUS;
        report.detection_failed.push({
          seo_filename: seoFilename,
          reason: failed ? "no_subject_pixels" : "unknown",
        });
      } else {
        focalPoints[seoFilename] = focal;
        if (tiny) {
          report.tiny_subject.push({
            seo_filename: seoFilename,
            focusX: focal.focusX,
            focusY: focal.focusY,
            subject_ratio: subjectRatio,
          });
        }
      }
    } catch (err) {
      focalPoints[seoFilename] = DEFAULT_FOCUS;
      report.detection_failed.push({
        seo_filename: seoFilename,
        reason: "error",
        error: err.message,
      });
    }
  }

  fs.writeFileSync(FOCAL_POINTS_PATH, JSON.stringify(focalPoints, null, 2), "utf-8");
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), "utf-8");

  console.log("--- Summary ---");
  console.log("Focal points written:", Object.keys(focalPoints).length);
  console.log("Detection failed (default used):", report.detection_failed.length);
  console.log("Tiny subject (flag for manual):", report.tiny_subject.length);
  console.log("\nOutput:", path.relative(ROOT, FOCAL_POINTS_PATH));
  console.log("Report:", path.relative(ROOT, REPORT_PATH));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
