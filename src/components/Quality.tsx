"use client";

import { useRef, MouseEvent } from "react";
import Reveal from "./Reveal";
import { getPlaceholderImage } from "@/lib/placeholders";

export default function Quality() {
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    imgRef.current.style.transformOrigin = `${x}% ${y}%`;
    imgRef.current.style.transform = "scale(1.65)";
  };

  const handleMouseLeave = () => {
    if (!imgRef.current) return;
    imgRef.current.style.transform = "scale(1.02)";
    imgRef.current.style.transformOrigin = "50% 50%";
  };

  return (
    <section className="py-[120px] max-md:py-[78px]" id="quality">
      <div className="w-[min(1320px,calc(100%-56px))] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[35px] lg:gap-[90px] items-center">
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">Quality at Every Stage</p>
            <h2 className="font-serif text-[clamp(48px,5vw,72px)] leading-[0.96] tracking-[-0.045em] my-5 lg:mb-7">
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
                  <h3 className="font-medium m-0 text-lg">{point}</h3>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="order-1 lg:order-2">
          <div 
            className="h-[460px] lg:h-[720px] overflow-hidden cursor-zoom-in relative bg-[#d8d3ca]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img 
              ref={imgRef}
              src={getPlaceholderImage("bangles", 1200)} 
              alt="Macro jewellery polishing and finish inspection" 
              className="w-full h-full object-cover transition-transform duration-250 scale-[1.02] origin-center"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
