import Reveal from "./Reveal";
import Link from "next/link";

export default function About() {
  return (
    <section className="py-[120px] max-md:py-[78px]" id="about">
      <div className="w-[calc(100%-56px)] mx-auto grid grid-cols-1 gap-7">
        <Reveal>
          <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">Who We Are</p>
        </Reveal>
        
        <div>
          <Reveal delay={100}>
            <h2 className="font-serif text-[clamp(45px,5vw,76px)] max-md:text-[48px] leading-[0.96] tracking-[-0.045em] m-0">
              Craftsmanship is only the beginning. We build manufacturing partnerships designed to help jewellery brands grow.
            </h2>
          </Reveal>
          
          <div className="w-full h-px bg-gradient-to-r from-ira-gold to-transparent my-[42px]"></div>
          
          <Reveal delay={200}>
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-7 lg:gap-[60px] items-start">
              <p className="text-[18px] text-ira-muted max-w-[700px] m-0">
                Ira Jewels brings design thinking, manufacturing discipline and skilled craftsmanship together under one dependable process. Established in 2023 and backed by Divine Star, we support retailers, designers, wholesalers and international brands with a clear, confidential and production-focused approach.
              </p>
              <div>
                <Link href="#facility" className="inline-flex items-center gap-2.5 border-b border-ira-gold pb-1.5 text-[13px] uppercase tracking-[0.08em] hover:text-ira-gold transition-colors after:content-['↗'] after:text-ira-gold">
                  Discover Ira Jewels
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
