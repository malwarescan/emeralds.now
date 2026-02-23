import Link from "next/link";
import GalleryMount from "@/components/product/GalleryMount";

const SUPPORT_IMAGE = "/images/editorial/muzem-dynasty.webp";

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[rgba(201,162,39,0.2)] pt-6 sm:pt-7">
      <h2 className="font-serif text-[1.15rem] font-normal text-[var(--cream)] sm:text-[1.35rem]">{title}</h2>
      <div className="mt-3 max-w-[72ch] space-y-3 text-[0.86rem] leading-relaxed text-[var(--cream)]/86">
        {children}
      </div>
    </section>
  );
}

export const metadata = {
  title: "Atelier | Muzem Emeralds",
  description:
    "The Muzem dynasty: origin context, Colombian emerald provenance, certification discipline, craft standards, and insured delivery.",
  alternates: { canonical: "/atelier" },
  openGraph: { url: "/atelier" },
};

export default function AtelierPage() {
  return (
    <main className="min-h-full w-full bg-[var(--abyssal)] py-7 sm:py-10">
      <div className="rail">
        <Link
          href="/"
          className="mb-6 inline-block text-[0.7rem] uppercase tracking-[0.2em] text-[var(--cream)]/72 hover:text-[var(--cream)]"
        >
          ← Home
        </Link>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-11">
          <div className="max-w-[30rem]">
            <GalleryMount
              src={SUPPORT_IMAGE}
              alt="Muzem emerald with butterfly guardian motif."
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="gallery-mount-editorial"
              matClassName="gallery-mount-editorial-mat"
              frameClassName="gallery-mount-editorial-frame"
            />
          </div>

          <div className="space-y-6">
            <header className="space-y-2">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[var(--cream)]/72">
                THE MUZEM DYNASTY
              </p>
              <h1 className="font-serif text-[1.62rem] font-normal leading-tight text-[var(--cream)] sm:text-[2.15rem]">
                The Atelier
              </h1>
              <p className="max-w-[58ch] text-[0.9rem] leading-relaxed text-[var(--cream)]/85">
                Fourth-generation artisans working within a family atelier focused on Colombian emerald
                provenance, careful disclosure, and long-term care discipline.
              </p>
            </header>

            <SectionBlock title="The House">
              <p>
                Muzem Emeralds is stewarded by fourth-generation artisans. The house approach centers on
                continuity of craft, responsible sourcing context, and clear client documentation.
              </p>
              <p className="text-[0.74rem] uppercase tracking-[0.16em] text-[var(--cream)]/64">
                Official online store for Muzem Emeralds
              </p>
            </SectionBlock>

            <SectionBlock title="The Mines (Muzo &amp; Chivor)">
              <p>
                Muzo and Chivor are key references in Colombian emerald history. Origin context helps frame a
                stone&apos;s identity, handling path, and expected natural character.
              </p>
              <p>
                Our atelier language uses mine context to educate clients on provenance, not to overstate
                rarity claims.
              </p>
            </SectionBlock>

            <SectionBlock title="Certification &amp; Treatments">
              <p>
                Emeralds commonly receive clarity enhancement, often oil-based. Our discipline is disclosure:
                treatment context is communicated with certification notes whenever available.
              </p>
              <p>
                We separate what is verified from what is interpretive, so clients can compare stones on clear
                terms.
              </p>
            </SectionBlock>

            <SectionBlock title="Craft Standards">
              <p>
                Metal selection, setting security, finishing consistency, and final inspection are treated as
                separate control steps before release.
              </p>
              <p>
                Each stage is reviewed for durability in everyday wear while preserving the visual quiet
                expected in high-jewelry presentation.
              </p>
            </SectionBlock>

            <SectionBlock title="Insured Delivery &amp; Care">
              <p>
                Orders are prepared for insured transport with secure packaging and documented handoff. Care
                guidance is provided to support long-term stability of setting and stone.
              </p>
            </SectionBlock>

            <SectionBlock title="Concierge">
              <p>
                The concierge channel is available for sourcing context, certification review, fit questions,
                and post-purchase care coordination.
              </p>
              <div className="pt-1">
                <Link
                  href="/concierge"
                  className="tap-scale inline-flex items-center border border-[rgba(201,162,39,0.4)] px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[var(--cream)]"
                  data-cta-id="atelier_speak_concierge"
                  data-cta-label="Speak with Concierge"
                >
                  Speak with Concierge
                </Link>
              </div>
            </SectionBlock>
          </div>
        </div>
      </div>
    </main>
  );
}
