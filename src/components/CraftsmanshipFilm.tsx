import Reveal from "./Reveal";

export default function CraftsmanshipFilm() {
  return (
    <section className="py-[120px] max-md:py-[78px]">
      <div className="w-[min(1320px,calc(100%-56px))] mx-auto flex max-md:flex-col justify-between md:items-end gap-6 mb-7">
        <div>
          <Reveal>
            <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">Craftsmanship Film</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif text-[clamp(38px,4vw,64px)] leading-[0.96] tracking-[-0.045em] mt-3 m-0">
              Technology creates accuracy.<br />
              <em className="font-serif-italic text-ira-gold">Craftsmanship creates character.</em>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <p className="text-ira-muted m-0">From CAD development to controlled inspection.</p>
        </Reveal>
      </div>

      <Reveal delay={300}>
        <div className="relative h-[min(72vw,760px)] max-md:h-[68vh] max-md:min-h-[540px] overflow-hidden bg-[#222]">
          {/* 
            Note: The <video> and <source> elements have been intentionally omitted as requested 
            until a real video file exists. Rendering a static poster instead.
          */}
          <img 
            src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=2070&auto=format&fit=crop" 
            alt="Craftsmanship preview" 
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="absolute left-[6%] max-md:left-5 max-md:right-5 bottom-[8%] z-10 text-white pointer-events-none">
            <h2 className="font-serif text-[clamp(40px,5vw,80px)] leading-[0.96] tracking-[-0.045em] m-0">
              A Precise Hand.<br />
              <em className="font-serif-italic text-ira-gold">A Powerful Brand.</em>
            </h2>
          </div>
          
          <button 
            className="absolute right-[30px] bottom-[30px] z-10 w-12 h-12 border border-white/30 text-white/50 bg-black/20 rounded-full flex items-center justify-center cursor-not-allowed opacity-50"
            aria-label="Video not available yet"
            disabled
          >
            ▶
          </button>
        </div>
      </Reveal>
    </section>
  );
}
