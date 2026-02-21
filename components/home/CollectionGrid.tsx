import Image from "next/image";
import Link from "next/link";

export type CollectionGridProduct = {
  handle: string;
  title: string;
  image: string;
  price: string;
  meta?: string;
};

export default function CollectionGrid({ products }: { products: CollectionGridProduct[] }) {
  if (!products.length) return null;

  return (
    <section className="bg-[#041E15]" aria-labelledby="collection-heading">
      <div className="mx-auto max-w-[1240px] px-6 py-18 md:py-24">
        <div className="mb-10 md:mb-14">
          <h2 id="collection-heading" className="text-[#F7F3EA] text-[28px] md:text-[44px] tracking-[0.10em] font-serif">
            FROM THE COLLECTION
          </h2>
          <p className="mt-3 text-[#F7F3EA]/70 text-[13px] md:text-[14px] tracking-[0.10em] max-w-[760px]">
            A selection of origin-certified pieces. Each stone is traced; each setting is signed.
          </p>
          <div className="mt-8 h-px w-[60%] bg-[#C5A059]/25" aria-hidden />
        </div>

        <div
          className="grid gap-7 md:gap-10"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
          }}
        >
          {products.map((p) => (
            <Link
              key={p.handle}
              href={`/product/${p.handle}`}
              className="group block overflow-hidden rounded-[14px] border border-[#C5A059]/20 bg-[rgba(247,243,234,0.04)] transition hover:border-[#C5A059]/45 duration-300 w-full"
            >
              {/* Image box hard-capped so the image can NEVER be larger than 380px */}
              <div
                className="relative overflow-hidden bg-[rgba(4,30,21,0.6)]"
                style={{ width: 380, maxWidth: "100%", aspectRatio: "4/5", margin: "0 auto" }}
              >
                {p.image ? (
                  <>
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="380px"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,30,21,0.00),rgba(4,30,21,0.35),rgba(4,30,21,0.70))] opacity-90" aria-hidden />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[#F7F3EA]/50 text-[11px] tracking-[0.2em] uppercase">
                    Image forthcoming
                  </div>
                )}
              </div>

              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[#F7F3EA] text-[14px] md:text-[16px] tracking-[0.08em] leading-[1.2] font-serif">
                    {p.title}
                  </h3>
                  <div className="text-[#F7F3EA]/85 text-[12px] md:text-[13px] tracking-[0.12em] whitespace-nowrap">
                    {p.price}
                  </div>
                </div>

                <p className="mt-3 text-[#F7F3EA]/65 text-[11px] md:text-[12px] tracking-[0.14em] uppercase">
                  {p.meta ?? "Origin-certified · Atelier-signed · Insured delivery"}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <div className="h-px w-[64px] bg-[#C5A059]/25 group-hover:bg-[#C5A059]/45 transition-colors duration-300" aria-hidden />
                  <span className="text-[#F7F3EA]/75 text-[11px] md:text-[12px] tracking-[0.22em] uppercase opacity-0 translate-y-[2px] transition duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    View piece
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 md:mt-18 flex justify-center">
          <Link
            href="/collections"
            className="inline-flex items-center justify-center rounded-[10px] border border-[#C5A059]/55 px-6 py-3 text-[12px] tracking-[0.20em] uppercase text-[#F7F3EA] hover:border-[#C5A059] transition-colors"
          >
            Explore all pieces
          </Link>
        </div>
      </div>
    </section>
  );
}
