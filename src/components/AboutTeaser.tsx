import Reveal from "./Reveal";
import Link from "next/link";

export default function AboutTeaser() {
  return (
    <section className="py-[120px] max-md:py-[78px] bg-white">
      <div className="w-[min(1320px,calc(100%-56px))] mx-auto">
        <Reveal>
          <div className="max-w-[900px] mx-auto text-center">
            <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold mb-8">Who We Are</p>
            
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.2] text-ira-teal mb-8">
              Ira Jewels brings design thinking, manufacturing discipline and skilled craftsmanship together under one dependable process. Established in 2023 and backed by Divine Star, we support retailers, designers, wholesalers and international brands with a clear, confidential and production-focused approach.
            </h2>
            
            <Link 
              href="/about" 
              className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-8 bg-ira-teal text-white text-[12px] tracking-[0.08em] uppercase transition-all duration-250 hover:-translate-y-0.5 hover:bg-ira-teal/90 rounded-[5px]"
            >
              Learn More About Us
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
