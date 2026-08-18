export default function SlicePartnership() {
  return (
    <section className="relative h-full max-md:bg-ira-gold-beige flex flex-col items-center justify-center text-center px-6 md:px-12 md:items-start md:text-left">
      <img 
        src="https://upfqnvazerkervvxeugo.supabase.co/storage/v1/object/public/product-images/Final%20Image%202.jpeg" 
        alt="Partnership Background" 
        className="hidden md:block absolute inset-0 w-full h-full object-cover z-0" 
      />
      <div className="relative z-10 max-w-4xl mx-auto md:mx-0 space-y-6 md:space-y-8">
        <span className="block text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">
          Partnership
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-[72px] text-ira-teal leading-tight">
          A Manufacturing Partner You Can Build a Brand On
        </h2>
        <p className="text-black text-lg md:text-xl max-w-2xl mx-auto md:mx-0 md:mr-auto leading-relaxed">
          Confidential by default, dependable by design — the kind of partner serious jewellery brands build on for the long term.
        </p>
      </div>
    </section>
  );
}
