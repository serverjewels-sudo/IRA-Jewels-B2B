import Reveal from "./Reveal";
import Link from "next/link";

const categories = [
  { num: "01", title: "Rings", wide: true },
  { num: "02", title: "Earrings", wide: false },
  { num: "03", title: "Pendants", wide: false },
  { num: "04", title: "Necklaces", wide: true },
  { num: "05", title: "Bracelets", wide: false },
  { num: "06", title: "Bangles", wide: false },
  { num: "07", title: "Men’s Jewellery", wide: false },
  { num: "08", title: "Custom Brand Collections", wide: true },
];

export default function Categories() {
  return (
    <section className="pt-10 pb-[120px] max-md:pb-[78px]" id="categories">
      <div className="w-[calc(100%-56px)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.3fr] gap-7 lg:gap-[70px] items-start mb-[70px]">
          <Reveal>
            <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">Manufacturing Expertise</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif text-[clamp(48px,5.7vw,86px)] leading-[0.96] tracking-[-0.045em] m-0">
              Crafted Across Categories.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-[18px]">
          {categories.map((cat, index) => (
            <Reveal
              key={cat.num}
              delay={(index % 4) * 100}
              className={`col-span-12 md:col-span-6 ${cat.wide ? "lg:col-span-8" : "lg:col-span-4"}`}
            >
              <Link 
                href={`/products/${cat.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                className="group relative block h-[430px] lg:h-[520px] overflow-hidden bg-[#d8d3ca]"
              >
                <img 
                  src={`https://images.unsplash.com/photo-1599643478524-fb5244098795?q=80&w=${cat.wide ? '1200' : '800'}&auto=format&fit=crop`} 
                  alt={`${cat.title} manufacturing`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
                
                <div className="absolute left-[26px] right-[26px] bottom-[24px] z-10 text-white">
                  <span className="text-[10px] tracking-[0.15em] text-[#d4b98c]">{cat.num}</span>
                  <h3 className="font-serif font-normal text-[40px] m-0 mt-1 leading-[1.1]">{cat.title}</h3>
                  <p className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 m-0 text-[#ddd] group-hover:max-h-[70px] group-hover:opacity-100 group-hover:mt-2.5">
                    Design development and production support tailored to your brand direction.
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
