"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { getPlaceholderImage } from "@/lib/placeholders";

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "Understand the brand, customer, design direction and manufacturing requirements",
    image: getPlaceholderImage("mens-jewellery", 1200),
  },
  {
    num: "02",
    title: "Design",
    desc: "Develop concepts, technical drawings, CAD models and production specifications",
    image: getPlaceholderImage("general", 1200),
  },
  {
    num: "03",
    title: "Prototype",
    desc: "Create samples and refine proportions, finish, wearability and construction",
    image: getPlaceholderImage("bangles", 1200),
  },
  {
    num: "04",
    title: "Manufacture",
    desc: "Execute approved designs through controlled production and skilled craftsmanship",
    image: getPlaceholderImage("mangalsutras", 1200),
  },
  {
    num: "05",
    title: "Assure",
    desc: "Inspect dimensions, setting, finish, polish and overall production quality",
    image: getPlaceholderImage("general_alt", 1200),
  },
  {
    num: "06",
    title: "Deliver",
    desc: "Complete final approval, secure packaging and coordinated delivery",
    image: getPlaceholderImage("pendants", 1200),
  },
];

export default function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [imageScale, setImageScale] = useState(1);
  const [currentImage, setCurrentImage] = useState(steps[0].image);

  const handleStepClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setImageOpacity(0.15);
    setImageScale(1.03);
    
    setTimeout(() => {
      setCurrentImage(steps[index].image);
      // Wait for image to "load" conceptually, then fade in
      setTimeout(() => {
        setImageOpacity(1);
        setImageScale(1);
      }, 50);
    }, 180);
  };

  return (
    <section className="py-[120px] max-md:py-[78px]" id="process">
      <div className="w-[calc(100%-56px)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.3fr] gap-7 lg:gap-[70px] items-start mb-[70px]">
          <Reveal>
            <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">Our Process</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif text-[clamp(48px,5.7vw,86px)] leading-[0.96] tracking-[-0.045em] m-0">
              A Seamless Journey From Concept to Creation.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-[55px] lg:gap-[80px]">
          <Reveal className="order-2 lg:order-1">
            <div className="border-t border-ira-border">
              {steps.map((step, index) => {
                const isActive = activeIndex === index;
                return (
                  <article 
                    key={step.num}
                    onClick={() => handleStepClick(index)}
                    className={`grid grid-cols-[46px_1fr] lg:grid-cols-[64px_1fr] py-[27px] border-b border-ira-border cursor-pointer transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-45 hover:opacity-100"
                    }`}
                  >
                    <span className="font-serif text-[24px] text-ira-gold">{step.num}</span>
                    <div>
                      <h3 className="font-serif text-[28px] lg:text-[34px] font-normal m-0 leading-none">{step.title}</h3>
                      <p className="text-ira-muted mt-2 mb-0">{step.desc}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={100} className="order-1 lg:order-2">
            <div className="h-[420px] lg:h-[680px] relative lg:sticky lg:top-[110px] overflow-hidden bg-[#d8d3ca]">
              <img 
                src={currentImage} 
                alt={steps[activeIndex].title}
                className="w-full h-full object-cover transition-all"
                style={{
                  opacity: imageOpacity,
                  transform: `scale(${imageScale})`,
                  transitionDuration: '350ms, 650ms',
                  transitionProperty: 'opacity, transform'
                }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
