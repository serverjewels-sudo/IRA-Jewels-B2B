import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden" id="home">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://upfqnvazerkervvxeugo.supabase.co/storage/v1/object/public/product-images/Final%20Hero.jpeg"
          alt="Jewellery artisan crafting a precision piece at a workbench"
          className="hidden md:block w-full h-full object-cover object-[80%_10%] max-md:object-[50%_25%] animate-[heroScale_2s_ease_forwards] scale-[1.05] max-md:scale-100"
        />
        <img
          src="https://upfqnvazerkervvxeugo.supabase.co/storage/v1/object/public/product-images/Try%202.png"
          alt="Jewellery artisan crafting a precision piece at a workbench"
          className="block md:hidden absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>
      {/* Content */}
      <div className="relative z-10 w-[calc(100%-56px)] mx-auto pb-[72px] max-md:pb-6 min-[1920px]:pl-12 min-[1920px]:pb-24">
        <p className="text-[#d4b98c] text-[11px] max-md:text-[10px] tracking-[0.18em] uppercase font-bold mb-6 max-md:mb-4">
          B2B Jewellery Manufacturing Partner
        </p>
        
        <h1 className="font-serif text-[clamp(40px,6vw,88px)] max-md:text-[clamp(36px,10vw,52px)] min-[1920px]:text-[100px] leading-[0.96] tracking-[-0.045em] max-w-[930px]">
          <span className="block text-ira-teal">We Craft</span>
          <span className="block text-ira-teal">Jewellery Brands</span>
          <span className="block font-serif-italic text-ira-gold">With Precision.</span>
        </h1>
        
        <p className="max-w-[600px] my-[30px] max-md:my-5 text-ira-text text-[15px] max-md:text-[14px] leading-relaxed">
          From first sketch to final shipment, Ira Jewels delivers design development, precision manufacturing and dependable production support for jewellery brands.
        </p>
        
        <div className="flex flex-wrap gap-3">
          <Link
            href="#capabilities"
            className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-6 bg-ira-ivory text-ira-teal text-[12px] tracking-[0.08em] uppercase border border-ira-teal transition-all duration-250 hover:-translate-y-0.5 hover:bg-ira-gold hover:border-ira-gold hover:text-white max-md:w-full"
          >
            Explore Our Capabilities
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-6 bg-transparent text-ira-text text-[12px] tracking-[0.08em] uppercase border-2 border-ira-teal transition-all duration-250 hover:-translate-y-0.5 hover:bg-ira-teal hover:text-white max-md:w-full"
          >
            Start a Project
          </Link>
        </div>
      </div>
      {/* Scroll Cue */}
      <a
        href="#about"
        className="absolute right-[34px] bottom-[34px] z-10 text-[10px] text-ira-teal/60 tracking-[0.18em] uppercase [writing-mode:vertical-rl] flex flex-col items-center hover:text-ira-gold transition-colors max-md:hidden"
      >
        Scroll
        <span className="block w-px h-[58px] bg-ira-teal/45 mt-3.5"></span>
      </a>
    </section>
  );
}
