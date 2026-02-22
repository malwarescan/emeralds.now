import Link from "next/link";
import GalleryMount from "@/components/product/GalleryMount";

const DYNASTY_IMAGE = "/images/editorial/muzem-dynasty.webp";

function ProofPillar({ title, text }: { title: string; text: string }) {
  return (
    <article className="muzem-proof-pill">
      <p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[var(--cream)]/72">
        {title}
      </p>
      <p className="mt-2 text-[0.76rem] leading-relaxed text-[var(--cream)]/86">{text}</p>
    </article>
  );
}

export default function MuzemDynastySection() {
  return (
    <section className="bg-[var(--abyssal)] py-9 sm:py-11" data-concierge-safe="1">
      <div className="rail">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start lg:gap-10">
          <div className="max-w-[28rem]">
            <GalleryMount
              src={DYNASTY_IMAGE}
              alt="Emerald with butterfly motif representing protected origin and maison identity."
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="gallery-mount-editorial"
              matClassName="gallery-mount-editorial-mat"
              frameClassName="gallery-mount-editorial-frame"
            />
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[var(--cream)]/72">
                THE MUZEM DYNASTY
              </p>
              <h2 className="font-serif text-[1.45rem] font-normal leading-tight text-[var(--cream)] sm:text-[1.9rem]">
                A house built on origin.
              </h2>
              <p className="max-w-[50ch] text-[0.82rem] leading-relaxed text-[var(--cream)]/84">
                Fourth-generation artisans, stewarding Colombian emerald provenance.
              </p>
            </div>

            <div className="space-y-3">
              <p className="max-w-[56ch] text-[0.82rem] leading-relaxed text-[var(--cream)]/88">
                Fourth-generation artisans guide each selection through a family atelier process rooted in
                Colombian emerald provenance.
              </p>
              <p className="max-w-[56ch] text-[0.82rem] leading-relaxed text-[var(--cream)]/88">
                Our sourcing context follows the historic emerald corridors of Muzo and Chivor, with
                certification notes and treatment disclosures preserved from intake to setting.
              </p>
              <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--cream)]/66">
                Official online store for Muzem Emeralds
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <ProofPillar
                title="Provenance"
                text="Origin traced, documentation preserved, and stone-by-stone review."
              />
              <ProofPillar
                title="Craft"
                text="Setting signed, finishing inspected, and care standards enforced."
              />
              <ProofPillar
                title="Delivery"
                text="Insured shipping, secure packaging, and concierge support."
              />
            </div>

            <div className="muzem-timeline pt-1">
              <p className="muzem-timeline-item">Origins in Colombia</p>
              <p className="muzem-timeline-item">Mines: Muzo &amp; Chivor</p>
              <p className="muzem-timeline-item">The online atelier: emeralds.now</p>
            </div>

            <div className="pt-1">
              <Link
                href="/atelier"
                className="muzem-dynasty-cta tap-scale inline-flex items-center border border-[rgba(201,162,39,0.46)] px-5 py-2.5 text-[0.67rem] font-medium uppercase tracking-[0.2em] text-[#f5f0e8]"
              >
                Enter the Atelier
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
