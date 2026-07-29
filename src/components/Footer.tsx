import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#090908] text-[#d8d3ca] pt-[70px] pb-[28px]">
      <div className="w-[min(1320px,calc(100%-56px))] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-[35px] lg:gap-[60px]">
          <div className="md:col-span-2 lg:col-span-1">
            <div className="w-[145px] text-white mb-6">
              <span className="font-serif text-3xl font-semibold tracking-wide whitespace-nowrap">IRA JEWELS</span>
            </div>
            <p className="max-w-[420px] text-[#8f8b84] m-0">
              A design-conscious B2B jewellery manufacturing partner supporting brands from first concept to dependable production.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.12em] uppercase text-ira-gold mb-4">Company</h4>
            <nav className="grid gap-[10px] text-[13px]">
              <Link href="#about" className="hover:text-white transition-colors">About Ira</Link>
              <Link href="#facility" className="hover:text-white transition-colors">Facility</Link>
              <Link href="#quality" className="hover:text-white transition-colors">Quality</Link>
              <Link href="#responsibility" className="hover:text-white transition-colors">Responsibility</Link>
            </nav>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.12em] uppercase text-ira-gold mb-4">Expertise</h4>
            <nav className="grid gap-[10px] text-[13px]">
              <Link href="#capabilities" className="hover:text-white transition-colors">Capabilities</Link>
              <Link href="#process" className="hover:text-white transition-colors">Our Process</Link>
              <Link href="#categories" className="hover:text-white transition-colors">Categories</Link>
              <Link href="#contact" className="hover:text-white transition-colors">Start a Project</Link>
            </nav>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.12em] uppercase text-ira-gold mb-4">Connect</h4>
            <nav className="grid gap-[10px] text-[13px]">
              <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="#insights" className="hover:text-white transition-colors">Insights</Link>
              <Link href="#home" className="hover:text-white transition-colors">Back to Top</Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-[#262623] mt-[50px] pt-[20px] flex flex-col md:flex-row justify-between gap-2 text-[#6f6b65] text-[11px]">
          <span>© 2026 Ira Jewels. Established 2023.</span>
          <span>Backed by Divine Star • Surat, India</span>
        </div>
      </div>
    </footer>
  );
}
