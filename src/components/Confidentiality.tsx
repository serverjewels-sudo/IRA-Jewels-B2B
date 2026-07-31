import Reveal from "./Reveal";
import Link from "next/link";

export default function Confidentiality() {
  return (
    <section className="py-[120px] max-md:py-[78px] bg-ira-teal text-white">
      <div className="w-[calc(100%-56px)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[55px] lg:gap-[90px] items-center">
        <Reveal>
          <div 
            className="h-[430px] lg:h-[600px] border border-[#34342f] relative overflow-hidden flex items-center justify-center"
            style={{
              background: 'repeating-linear-gradient(0deg,transparent,transparent 39px,#1e1e1b 40px), repeating-linear-gradient(90deg,transparent,transparent 39px,#1e1e1b 40px)'
            }}
            aria-hidden="true"
          >
            <div className="absolute w-[320px] h-[320px] max-md:w-[240px] max-md:h-[240px] border border-ira-gold rounded-full"></div>
            <div className="absolute w-[180px] h-[180px] max-md:w-[130px] max-md:h-[130px] border border-ira-gold rounded-full"></div>
            <b className="font-serif text-[66px] max-md:text-[48px] font-normal text-ira-gold">IRA</b>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">Confidentiality & Partnership</p>
          <h2 className="font-serif text-[clamp(48px,5vw,70px)] leading-[0.96] tracking-[-0.045em] my-[22px]">
            Your Designs. Your Identity. Our Responsibility.
          </h2>
          <p className="text-[#aaa69f] m-0">
            Client concepts and collections are handled through controlled access, clear approval stages and private project communication.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 my-[30px]">
            {[
              "Confidential design handling",
              "Controlled project access",
              "Clear approval stages",
              "No public display without permission"
            ].map((check, i) => (
              <span key={i} className="border-t border-[#33332f] pt-[14px] text-[#c4c0b8] text-[13px] before:content-['—'] before:text-ira-gold before:mr-2">
                {check}
              </span>
            ))}
          </div>
          
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-6 bg-transparent text-white text-[12px] tracking-[0.08em] uppercase border border-white/55 transition-all duration-250 hover:-translate-y-0.5 hover:bg-white hover:text-ira-teal"
          >
            Discuss a Confidential Project
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
