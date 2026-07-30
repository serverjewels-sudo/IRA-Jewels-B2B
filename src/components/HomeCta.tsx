import Reveal from "./Reveal";
import Link from "next/link";

export default function HomeCta() {
  return (
    <section className="bg-ira-teal text-white py-[100px] max-md:py-[78px] relative overflow-hidden">
      {/* Decorative gradient overlay matching the Products closing CTA style */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_150%,rgba(178,158,103,0.15),transparent_60%)] pointer-events-none"></div>
      
      <div className="w-[min(1320px,calc(100%-56px))] mx-auto relative z-10 text-center">
        <Reveal>
          <h2 className="font-serif text-[clamp(40px,5vw,60px)] leading-[1.1] mb-10 max-w-[800px] mx-auto">
            Looking for a Dependable Jewellery Manufacturing Partner?
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/apply" 
              className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-8 bg-ira-gold text-white text-[12px] tracking-[0.08em] uppercase transition-all duration-300 hover:bg-white hover:text-ira-teal rounded-[5px] w-full sm:w-auto font-medium"
            >
              Apply for Trade Account
            </Link>
            
            <Link 
              href="/products" 
              className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-8 bg-transparent border border-white/30 text-white text-[12px] tracking-[0.08em] uppercase transition-all duration-300 hover:bg-white/10 rounded-[5px] w-full sm:w-auto"
            >
              View Products
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
