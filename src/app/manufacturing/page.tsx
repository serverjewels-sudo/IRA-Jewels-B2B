"use client";

import { useRef, MouseEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { getPlaceholderImage } from "@/lib/placeholders";
import Link from "next/link";

const processSteps = [
  { num: "01", title: "Discover" },
  { num: "02", title: "Design" },
  { num: "03", title: "Prototype" },
  { num: "04", title: "Manufacture" },
  { num: "05", title: "Assure" },
  { num: "06", title: "Deliver" },
];

const capabilities = [
  { num: "01", title: "Design Consultation", desc: "Translate a brand direction into a clear, manufacturable development brief." },
  { num: "02", title: "CAD Development", desc: "Create accurate digital models, construction logic and approval-ready technical views." },
  { num: "03", title: "Prototyping & Sampling", desc: "Test proportion, wearability, finish and construction before production approval." },
  { num: "04", title: "Material & Stone Planning", desc: "Coordinate metal, stones, technical feasibility and production specifications." },
  { num: "05", title: "Casting & Manufacturing", desc: "Execute approved designs through controlled production and skilled craftsmanship." },
  { num: "06", title: "Stone Setting", desc: "Place and secure stones with close attention to alignment, finish and durability." },
  { num: "07", title: "Finishing & Polishing", desc: "Refine every surface, edge and detail for a clean, consistent final appearance." },
  { num: "08", title: "Quality Assurance", desc: "Inspect dimensions, setting, finish and overall production consistency at key stages." },
  { num: "09", title: "Packaging & Delivery", desc: "Complete final approval, secure packaging and coordinated dispatch support." },
];

export default function ManufacturingPage() {
  const qualityImgRef = useRef<HTMLImageElement>(null);

  const handleQualityMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!qualityImgRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    qualityImgRef.current.style.transformOrigin = `${x}% ${y}%`;
    qualityImgRef.current.style.transform = "scale(1.65)";
  };

  const handleQualityMouseLeave = () => {
    if (!qualityImgRef.current) return;
    qualityImgRef.current.style.transform = "scale(1.02)";
    qualityImgRef.current.style.transformOrigin = "50% 50%";
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Page Header & Process Strip (Warm Ivory) */}
        <section className="bg-ira-ivory pt-[140px] pb-[80px] max-md:pt-[120px] max-md:pb-[60px]">
          <div className="w-[min(1320px,calc(100%-56px))] mx-auto">
            <Reveal>
              <p className="text-[13px] text-ira-muted tracking-[0.08em] uppercase mb-4">
                <Link href="/" className="hover:text-ira-teal transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-ira-text font-medium">Manufacturing</span>
              </p>
              <h1 className="font-serif text-[clamp(40px,5vw,60px)] text-ira-teal leading-[1] tracking-[-0.04em] mb-12">
                Manufacturing
              </h1>
            </Reveal>

            <Reveal delay={100}>
              <div className="border-t border-ira-border pt-8 mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
                {processSteps.map((step) => (
                  <div key={step.num} className="text-left lg:text-center border-l lg:border-l-0 lg:border-t-0 border-ira-border pl-4 lg:pl-0">
                    <span className="block font-serif text-[22px] text-ira-gold mb-1">{step.num}</span>
                    <h4 className="font-serif text-[20px] lg:text-[22px] font-normal text-ira-text m-0">{step.title}</h4>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Capabilities (Original Dark Teal Styling) */}
        <section className="py-[120px] max-md:py-[78px] bg-ira-teal text-white">
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

        {/* Craftsmanship Film (Pale Teal) */}
        <section className="py-[120px] max-md:py-[78px] bg-ira-pale-teal">
          <div className="w-[min(1320px,calc(100%-56px))] mx-auto flex max-md:flex-col justify-between md:items-end gap-6 mb-7">
            <div>
              <Reveal>
                <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">Craftsmanship Film</p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="font-serif text-[clamp(38px,4vw,64px)] text-ira-text leading-[0.96] tracking-[-0.045em] mt-3 m-0">
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
            <div className="w-[min(1320px,calc(100%-56px))] mx-auto relative h-[min(72vw,760px)] max-md:h-[68vh] max-md:min-h-[540px] overflow-hidden bg-[#222]">
              <img 
                src={getPlaceholderImage("necklaces", 2070)} 
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
                className="absolute right-[30px] bottom-[30px] z-10 w-16 h-16 border border-white/30 text-white/50 bg-black/30 rounded-full flex items-center justify-center cursor-not-allowed opacity-50"
                aria-label="Video not available yet"
                disabled
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          </Reveal>
        </section>

        {/* Facility (Original Styling bg-[#ddd8cf]) */}
        <section className="py-[120px] max-md:py-[78px] bg-[#ddd8cf]">
          <div className="w-[min(1320px,calc(100%-56px))] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-[55px] lg:gap-[90px]">
            <div className="lg:sticky lg:top-[110px] self-start">
              <Reveal>
                <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">Facility & Infrastructure</p>
                <h2 className="font-serif text-[clamp(48px,5vw,70px)] text-ira-text leading-[0.96] tracking-[-0.045em] my-[22px]">
                  Designed for Precision. Built for Dependable Production.
                </h2>
                
                {/* Omitted the leaked placeholder paragraph */}
                
                <div className="grid grid-cols-2 gap-3 mt-[36px]">
                  {[
                    { label: "Production capacity", val: "TBD" },
                    { label: "Team size", val: "TBD" },
                    { label: "Facility area", val: "TBD" },
                    { label: "Markets served", val: "TBD" },
                  ].map((stat, i) => (
                    <div key={i} className="border border-[#171715]/15 p-[18px]">
                      <strong className="block font-serif text-[28px] font-normal text-ira-text">{stat.val}</strong>
                      <span className="text-[10px] uppercase tracking-[0.1em] text-ira-muted block mt-1">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="grid gap-[18px]">
              {[
                { num: "01", title: "Design & Development Workspace", img: getPlaceholderImage("mangalsutras", 1000) },
                { num: "02", title: "Controlled Production Departments", img: getPlaceholderImage("bangles", 1000) },
                { num: "03", title: "Skilled People & Quality Discipline", img: getPlaceholderImage("mens-jewellery", 1000) },
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

        {/* Quality (Warm Ivory) */}
        <section className="py-[120px] max-md:py-[78px] bg-ira-ivory overflow-hidden">
          <div className="w-[min(1320px,calc(100%-56px))] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[35px] lg:gap-[90px] items-center">
            <div className="order-2 lg:order-1">
              <Reveal>
                <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">Quality at Every Stage</p>
                <h2 className="font-serif text-[clamp(48px,5vw,72px)] text-ira-text leading-[0.96] tracking-[-0.045em] my-5 lg:mb-7">
                  Consistency Is Designed Into the Process.
                </h2>
                <p className="text-ira-muted m-0">
                  Quality control is not treated as a final checkpoint. It is integrated throughout design development, sampling, manufacturing, finishing and dispatch.
                </p>
                
                <div className="grid mt-9 border-t border-ira-border">
                  {[
                    "Technical Accuracy",
                    "Secure Stone Setting",
                    "Surface & Finish Inspection",
                    "Final Production Validation"
                  ].map((point, i) => (
                    <div key={i} className="grid grid-cols-[52px_1fr] py-[18px] border-b border-ira-border items-center">
                      <span className="font-serif text-ira-gold text-lg">0{i + 1}</span>
                      <h3 className="font-medium m-0 text-lg text-ira-text">{point}</h3>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={100} className="order-1 lg:order-2">
              <div 
                className="h-[460px] lg:h-[720px] overflow-hidden cursor-zoom-in relative bg-[#d8d3ca]"
                onMouseMove={handleQualityMouseMove}
                onMouseLeave={handleQualityMouseLeave}
              >
                <img 
                  ref={qualityImgRef}
                  src={getPlaceholderImage("bangles", 1200)} 
                  alt="Macro jewellery polishing and finish inspection" 
                  className="w-full h-full object-cover transition-transform duration-250 scale-[1.02] origin-center"
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
