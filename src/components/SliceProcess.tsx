import Link from "next/link";

export default function SliceProcess() {
  return (
    <section className="relative h-full max-md:bg-ira-teal flex flex-col items-center justify-center text-center px-6 md:px-12 md:items-end md:text-right">
      <img 
        src="https://upfqnvazerkervvxeugo.supabase.co/storage/v1/object/public/product-images/Image%201.jpeg" 
        alt="Process Background" 
        className="hidden md:block absolute inset-0 w-full h-full object-cover z-0" 
      />
      <div className="relative z-10 max-w-4xl mx-auto md:mx-0 space-y-6 md:space-y-8">
        <span className="block text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">
          Process
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-[72px] text-white leading-tight">
          Every Piece Begins With a Promise of Precision
        </h2>
        <p className="text-white font-normal text-lg md:text-xl max-w-2xl mx-auto md:mx-0 md:ml-auto leading-relaxed">
          From the first sketch to final quality check, every step is handled in-house — 
          precise, consistent, and built to scale with your brand.
        </p>
        <Link href="/manufacturing" className="inline-flex items-center gap-2.5 mt-2 px-8 min-h-[52px] border border-white text-white text-[12px] tracking-[0.08em] uppercase transition-all duration-250 hover:bg-white hover:text-ira-teal">Explore Our Process</Link>
      </div>
    </section>
  );
}
