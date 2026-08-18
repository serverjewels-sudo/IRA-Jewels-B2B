import Link from "next/link";

export default function SlicePartnership() {
  return (
    <section className="relative h-full flex flex-col items-center max-md:justify-between md:justify-center max-md:py-16 text-center px-6 md:px-12 md:items-start md:text-left">
      <img 
        src="https://upfqnvazerkervvxeugo.supabase.co/storage/v1/object/public/product-images/Final%20Image%202.jpeg" 
        alt="Partnership Background" 
        className="hidden md:block absolute inset-0 w-full h-full object-cover z-0" 
      />
      <img 
        src="https://upfqnvazerkervvxeugo.supabase.co/storage/v1/object/public/product-images/New%20image%202%20mobile%20(1).jpeg" 
        alt="Partnership Background Mobile" 
        className="block md:hidden absolute inset-0 w-full h-full object-cover z-0" 
      />
      <div className="block md:hidden absolute inset-0 bg-white/50 z-[5]"></div>
      <div className="relative z-10 max-w-4xl mx-auto md:mx-0 space-y-6 md:space-y-8">
        <span className="block text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">
          Partnership
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-[72px] text-ira-teal leading-tight">
          A Manufacturing Partner You Can Build a Brand On
        </h2>
        <p className="text-black text-base md:text-xl max-w-2xl mx-auto md:mx-0 md:mr-auto leading-relaxed max-md:!mt-3">
          Confidential by default, dependable by design — the kind of partner serious jewellery brands build on for the long term.
        </p>
      </div>
      <Link href="/about" className="relative z-10 inline-flex items-center gap-2.5 md:mt-8 px-8 min-h-[52px] border border-ira-teal text-ira-teal text-[12px] tracking-[0.08em] uppercase transition-all duration-250 hover:bg-ira-teal hover:text-white">Our Partnership Approach</Link>
    </section>
  );
}
