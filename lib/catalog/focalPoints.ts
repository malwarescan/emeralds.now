/**
 * Focal points for display-time auto-centering (Option A).
 * Keyed by seo_filename; used for object-position in GalleryMount.
 */
import { readFileSync } from "fs";
import path from "path";
import type { FocalPoint } from "./types";

export type { FocalPoint };

const FOCAL_POINTS_PATH = path.join(process.cwd(), "ecommerce", "focal_points.json");
const FOCAL_POINTS_REPORT_PATH = path.join(process.cwd(), "ecommerce", "focal_points_report.json");

const DEFAULT: FocalPoint = { focusX: 0.5, focusY: 0.45 };
const DEFAULT_SCALE = 1;

let _map: Record<string, FocalPoint> | null = null;
let _tinySubjectScaleMap: Map<string, number> | null = null;
let _tinySubjectRatioMap: Map<string, number> | null = null;

function loadFocalPoints(): Record<string, FocalPoint> {
  if (_map) return _map;
  try {
    const raw = readFileSync(FOCAL_POINTS_PATH, "utf-8");
    _map = JSON.parse(raw) as Record<string, FocalPoint>;
    return _map ?? {};
  } catch {
    _map = {};
    return _map;
  }
}

type TinySubjectReportEntry = {
  seo_filename?: string;
  subject_ratio?: number;
};

function loadTinySubjectMap(): Map<string, number> {
  if (_tinySubjectScaleMap) return _tinySubjectScaleMap;
  _tinySubjectScaleMap = new Map<string, number>();
  _tinySubjectRatioMap = new Map<string, number>();
  try {
    const raw = readFileSync(FOCAL_POINTS_REPORT_PATH, "utf-8");
    const parsed = JSON.parse(raw) as { tiny_subject?: Array<TinySubjectReportEntry> };
    if (Array.isArray(parsed?.tiny_subject)) {
      for (const row of parsed.tiny_subject) {
        if (!row?.seo_filename) continue;
        const subjectRatio = typeof row.subject_ratio === "number" ? row.subject_ratio : row.tiny_ratio;
        const ratio =
          typeof subjectRatio === "number" && Number.isFinite(subjectRatio) ? subjectRatio : 0.025;
        _tinySubjectRatioMap.set(row.seo_filename, ratio);
        if (ratio <= 0.015) _tinySubjectScaleMap.set(row.seo_filename, 1.18);
        else if (ratio <= 0.022) _tinySubjectScaleMap.set(row.seo_filename, 1.14);
        else if (ratio <= 0.03) _tinySubjectScaleMap.set(row.seo_filename, 1.1);
        else if (ratio <= 0.04) _tinySubjectScaleMap.set(row.seo_filename, 1.08);
      }
    }
  } catch {
    _tinySubjectScaleMap = new Map();
    _tinySubjectRatioMap = new Map();
  }
  return _tinySubjectScaleMap;
}

/**
 * Returns focal point for a product image by seo_filename (e.g. "muzem-ring-yellow-gold-natural-muzem_001.jpg").
 * Returns default { focusX: 0.5, focusY: 0.45 } if not found or file missing.
 */
export function getFocalPoint(seoFilename: string): FocalPoint {
  const points = loadFocalPoints();
  const fp = points[seoFilename];
  if (fp && typeof fp.focusX === "number" && typeof fp.focusY === "number") {
    return {
      focusX: Math.max(0, Math.min(1, fp.focusX)),
      focusY: Math.max(0, Math.min(1, fp.focusY)),
    };
  }
  return DEFAULT;
}

export function getFocalScale(seoFilename: string): number {
  const tiny = loadTinySubjectMap();
  return tiny.get(seoFilename) ?? DEFAULT_SCALE;
}

export function getFocalSubjectRatio(seoFilename: string): number | undefined {
  loadTinySubjectMap();
  return _tinySubjectRatioMap?.get(seoFilename);
}

/** Format for CSS object-position: e.g. "52% 47%" */
export function formatObjectPosition(fp: FocalPoint): string {
  return `${Math.round(fp.focusX * 100)}% ${Math.round(fp.focusY * 100)}%`;
}
