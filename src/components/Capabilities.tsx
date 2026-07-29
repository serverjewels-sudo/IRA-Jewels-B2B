import Reveal from "./Reveal";
import Link from "next/link";

const capabilities = [
  {
    num: "01",
    title: "Design Consultation",
    desc: "Translate a brand direction into a clear, manufacturable development brief.",
  },
  {
    num: "02",
    title: "CAD Development",
    desc: "Create accurate digital models, construction logic and approval-ready technical views.",
  },
  {
    num: "03",
    title: "Prototyping & Sampling",
    desc: "Test proportion, wearability, finish and construction before production approval.",
  },
  {
    num: "04",
    title: "Material & Stone Planning",
    desc: "Coordinate metal, stones, technical feasibility and production specifications.",
  },
  {
    num: "05",
    title: "Casting & Manufacturing",
    desc: "Execute approved designs through controlled production and skilled craftsmanship.",
  },
  {
    num: "06",
    title: "Stone Setting",
    desc: "Place and secure stones with close attention to alignment, finish and durability.",
  },
  {
    num: "07",
    title: "Finishing & Polishing",
    desc: "Refine every surface, edge and detail for a clean, consistent final appearance.",
  },
  {
    num: "08",
    title: "Quality Assurance",
    desc: "Inspect dimensions, setting, finish and overall production consistency at key stages.",
  },
  {
    num: "09",
    title: "Packaging & Delivery",
    desc: "Complete final approval, secure packaging and coordinated dispatch support.",
  },
];

export default function Capabilities() {
  return (
    <section className="py-[120px] max-md:py-[78px] bg-ira-teal text-white" id="capabilities">
      <div className="w-[min(1320px,calc(100%-56px))] mx-auto grid grid-cols-1 lg:grid-cols-[38%_1fr] gap-[55px] lg:gap-[90px] items-start">
        <aside className="lg:sticky lg:top-[120px]">
          <Reveal>
            <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">End-to-End Jewellery Manufacturing</p>
            <h2 className="font-serif text-[clamp(48px,5vw,64px)] leading-[0.96] tracking-[-0.045em] my-6">
              Connected capabilities. One dependable process.
            </h2>
            <p className="text-[#aaa69f] max-w-[440px] mb-8">
              Each stage is coordinated to protect design intent, technical requirements, quality consistency and delivery commitments.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-6 bg-transparent text-white text-[12px] tracking-[0.08em] uppercase border border-white/55 transition-all duration-250 hover:-translate-y-0.5 hover:bg-white hover:text-ira-teal"
            >
              Discuss Your Requirement
            </Link>
          </Reveal>
        </aside>

        <div className="grid">
          {capabilities.map((cap, index) => (
            <Reveal key={cap.num} delay={index * 50}>
              <article className="grid grid-cols-[48px_1fr] lg:grid-cols-[88px_1fr] border-t border-[#33332f] py-[30px] gap-6 lg:gap-[26px] items-start last:border-b">
                <span className="font-serif text-[26px] text-ira-gold">{cap.num}</span>
                <div>
                  <h3 className="font-serif font-normal text-[30px] lg:text-[40px] leading-none m-0 mb-3">{cap.title}</h3>
                  <p className="text-[#aaa69f] m-0 max-w-[620px]">{cap.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
