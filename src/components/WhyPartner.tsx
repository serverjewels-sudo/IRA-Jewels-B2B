import Reveal from "./Reveal";

const partners = [
  {
    num: "01",
    title: "Design-Led Thinking",
    desc: "We understand both aesthetics and manufacturability.",
  },
  {
    num: "02",
    title: "Flexible Development",
    desc: "Support for sampling, new collections and evolving production needs.",
  },
  {
    num: "03",
    title: "Consistent Execution",
    desc: "Defined processes designed to maintain quality across production.",
  },
  {
    num: "04",
    title: "Responsive Communication",
    desc: "Clear updates, approvals and coordination throughout the project.",
  },
  {
    num: "05",
    title: "Backed by Divine Star",
    desc: "Additional industry strength and credibility behind every partnership.",
  },
];

export default function WhyPartner() {
  return (
    <section className="py-[120px] max-md:py-[78px]">
      <div className="w-[calc(100%-56px)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.3fr] gap-7 lg:gap-[70px] items-start mb-[70px]">
          <Reveal>
            <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">Why Partner With Ira</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif text-[clamp(48px,5.7vw,86px)] leading-[0.96] tracking-[-0.045em] m-0">
              Built Around the Needs of Growing Jewellery Brands.
            </h2>
          </Reveal>
        </div>

        <div className="border-t border-ira-border">
          {partners.map((partner, index) => (
            <Reveal key={partner.num} delay={index * 50}>
              <article className="grid grid-cols-[45px_1fr_24px] lg:grid-cols-[70px_1fr_1.1fr_34px] gap-6 py-[30px] border-b border-ira-border items-center">
                <span className="font-serif text-[24px] text-ira-gold">{partner.num}</span>
                <h3 className="font-serif text-[29px] lg:text-[36px] font-normal m-0 col-span-2 lg:col-span-1">{partner.title}</h3>
                <p className="text-ira-muted m-0 col-span-3 lg:col-span-1">{partner.desc}</p>
                <i className="not-italic text-[22px] justify-self-end text-ira-teal">↗</i>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
