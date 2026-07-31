import Reveal from "./Reveal";
import { getPlaceholderImage } from "@/lib/placeholders";
import Link from "next/link";

export default function Responsibility() {
  return (
    <section className="py-[120px] max-md:py-[78px] bg-[#e5e0d7]" id="responsibility">
      <div className="w-[min(1320px,calc(100%-56px))] mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-[55px] lg:gap-[90px] items-center">
        <Reveal>
          <div className="h-[460px] lg:h-[680px] overflow-hidden bg-[#d8d3ca]">
            <img 
              src={getPlaceholderImage("mens-jewellery", 1200)} 
              alt="Organised jewellery tools and responsible material handling" 
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">Responsible Progress</p>
          <h2 className="font-serif text-[clamp(48px,5vw,72px)] leading-[0.96] tracking-[-0.045em] my-[22px]">
            Better Manufacturing Starts With Better Decisions.
          </h2>
          <p className="text-ira-muted m-0">
            Ira Jewels should communicate only verified practices and measurable commitments—without unsupported environmental claims.
          </p>
          
          <div className="flex flex-wrap gap-2 my-7">
            {[
              "Responsible sourcing",
              "Material traceability",
              "Resource efficiency",
              "Waste reduction",
              "Workplace responsibility"
            ].map((tag) => (
              <span key={tag} className="border border-[#171715]/20 px-3 py-[9px] text-[11px] uppercase tracking-[0.08em] text-ira-teal">
                {tag}
              </span>
            ))}
          </div>
          
          <Link href="#contact" className="inline-flex items-center gap-2.5 border-b border-ira-gold pb-1.5 text-[13px] uppercase tracking-[0.08em] hover:text-ira-gold transition-colors after:content-['↗'] after:text-ira-gold">
            Discuss Responsible Production
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
