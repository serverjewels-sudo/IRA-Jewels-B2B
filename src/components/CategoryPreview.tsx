import Reveal from "./Reveal";
import Link from "next/link";

const categories = [
  { name: "Rings", slug: "rings", img: "https://images.unsplash.com/photo-1605100804763-247f66156e55?q=80&w=800&auto=format&fit=crop" },
  { name: "Earrings", slug: "earrings", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop" },
  { name: "Necklaces", slug: "necklaces", img: "https://images.unsplash.com/photo-1599643478514-4a884f1807bd?q=80&w=800&auto=format&fit=crop" },
  { name: "Bracelets", slug: "bracelets", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop" }
];

export default function CategoryPreview() {
  return (
    <section className="py-[100px] max-md:py-[78px] bg-ira-ivory" id="categories-preview">
      <div className="w-[min(1320px,calc(100%-56px))] mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold mb-4">Our Catalogue</p>
              <h2 className="font-serif text-[clamp(40px,5vw,56px)] leading-[1] text-ira-teal m-0">
                Explore the Range.
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 100}>
              <Link href={`/products/${cat.slug}`} className="group block relative overflow-hidden bg-[#e5e0d7] aspect-[4/5]">
                <img 
                  src={cat.img} 
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#01435D]/70 via-transparent to-transparent flex flex-col justify-end p-6 lg:p-8">
                  <h3 className="font-serif text-[clamp(24px,2.5vw,32px)] text-white m-0 group-hover:-translate-y-1 transition-transform duration-300">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-16 text-center">
            <Link 
              href="/products" 
              className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-8 bg-ira-teal text-white text-[12px] tracking-[0.08em] uppercase transition-all duration-250 hover:bg-ira-teal/90 rounded-[5px]"
            >
              Explore Full Range
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
