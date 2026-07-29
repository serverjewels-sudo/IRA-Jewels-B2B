import Reveal from "./Reveal";

export default function Facility() {
  return (
    <section className="py-[120px] max-md:py-[78px] bg-[#ddd8cf]" id="facility">
      <div className="w-[min(1320px,calc(100%-56px))] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-[55px] lg:gap-[90px]">
        <div className="lg:sticky lg:top-[110px] self-start">
          <Reveal>
            <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">Facility & Infrastructure</p>
            <h2 className="font-serif text-[clamp(48px,5vw,70px)] leading-[0.96] tracking-[-0.045em] my-[22px]">
              Designed for Precision. Built for Dependable Production.
            </h2>
            <p className="text-ira-muted m-0">
              The production website should use genuine Ira Jewels facility and team photography. Unconfirmed information remains clearly editable rather than being presented as fact.
            </p>
            
            <div className="grid grid-cols-2 gap-3 mt-[36px]">
              {[
                { label: "Production capacity", val: "TBD" },
                { label: "Team size", val: "TBD" },
                { label: "Facility area", val: "TBD" },
                { label: "Markets served", val: "TBD" },
              ].map((stat, i) => (
                <div key={i} className="border border-[#171715]/15 p-[18px]">
                  <strong className="block font-serif text-[28px] font-normal">{stat.val}</strong>
                  <span className="text-[10px] uppercase tracking-[0.1em] text-ira-muted block mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid gap-[18px]">
          {[
            { num: "01", title: "Design & Development Workspace", img: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1000&auto=format&fit=crop" },
            { num: "02", title: "Controlled Production Departments", img: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1000&auto=format&fit=crop" },
            { num: "03", title: "Skilled People & Quality Discipline", img: "https://images.unsplash.com/photo-1573408301145-b98c46544eb8?q=80&w=1000&auto=format&fit=crop" },
          ].map((card, i) => (
            <Reveal key={card.num} delay={i * 100}>
              <article className="h-[400px] lg:h-[460px] relative overflow-hidden bg-[#d8d3ca]">
                <img 
                  src={card.img} 
                  alt={card.title} 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute left-[24px] right-[24px] bottom-[22px] text-white z-10 pointer-events-none">
                  <span className="text-[11px] tracking-[0.18em] uppercase font-bold text-[#d4b98c]">{card.num}</span>
                  <h3 className="font-serif text-[38px] font-normal my-1 leading-[1.05]">{card.title}</h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
