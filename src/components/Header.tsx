"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919023454014";
  
  // A helper for determining the visual state of the header
  const isSolid = true;

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-[110] transition-transform duration-300 ease-in-out antialiased will-change-transform ${
        isHome && (isScrolled || isMenuOpen) ? "-translate-y-[30px]" : "translate-y-0"
      }`}>
      {/* Top Strip - Only visible on Home */}
      {isHome && (
        <div className="h-[30px] bg-ira-teal text-ira-pale-teal text-[10px] max-[390px]:text-[8px] tracking-[0.08em] uppercase flex items-center">
          <div className="w-[calc(100%-56px)] mx-auto flex justify-between items-center">
            <span className="hidden lg:inline">Precision in Every Detail. Partnership at Every Step.</span>
            <div className="flex items-center gap-6 justify-end w-full lg:w-auto">
              <span>Jewellery Manufacturing • Surat, India</span>
              <div className="flex items-center gap-4">
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a href="tel:+919023454014" className="flex items-center gap-1 hover:text-white transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Sales
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header
        className={`border-b transition-colors duration-300 ease-in-out ${
          isSolid
            ? "h-[76px] bg-white border-ira-border text-ira-teal"
            : "h-[88px] bg-transparent border-white/15 text-white"
        }`}
      >
        <div className="w-[calc(100%-56px)] mx-auto h-full grid grid-cols-[1fr_auto] lg:grid-cols-[240px_1fr_auto] items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={isSolid 
                ? "https://upfqnvazerkervvxeugo.supabase.co/storage/v1/object/public/product-images/Final%20Logo.png" 
                : "https://upfqnvazerkervvxeugo.supabase.co/storage/v1/object/public/product-images/Final%20White%20Log.png"
              }
              alt="IRA Jewels"
              width={isSolid ? 135 : 180}
              height={isSolid ? 24 : 32}
              className="object-contain transition-all duration-300"
            />
            <span className={`text-[9px] tracking-[0.11em] uppercase leading-tight pl-3 border-l ${isSolid ? 'text-ira-muted border-ira-border' : 'text-white/70 border-white/25'}`}>
              backed by<br />Divine Star
            </span>
          </Link>

          <nav className="hidden lg:flex justify-center gap-6 text-[11px] uppercase tracking-[0.08em]">
            {[
              { name: "About", href: "/about" },
              { name: "Manufacturing", href: "/manufacturing" },
              { name: "Products", href: "/products" },
              { name: "Insights", href: "/insights" },
              { name: "Contact", href: "/contact" }
            ].map((item) => (
              <Link key={item.name} href={item.href} className="relative group py-2">
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-px bg-ira-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className={`hidden lg:flex items-center justify-center gap-2 h-10 px-4 border text-[11px] uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 ${
              isSolid 
                ? "border-ira-teal/30 text-ira-teal hover:border-ira-teal bg-transparent" 
                : "border-white/30 text-white hover:border-white bg-transparent"
            }`}>
              Buyer Login
            </Link>
            <Link href="/apply" className={`hidden lg:flex items-center justify-center gap-2 h-10 px-4 border text-[11px] uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 ${
              isSolid 
                ? "border-ira-teal bg-transparent hover:bg-ira-teal hover:text-white" 
                : "border-white/50 text-white hover:bg-white hover:text-ira-teal"
            }`}>
              Apply for Trade Account
            </Link>
            <Link href="/contact" className={`hidden lg:flex items-center justify-center gap-2 h-10 px-4 border text-[11px] uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 ${
              isSolid 
                ? "bg-ira-teal text-white border-ira-teal hover:bg-ira-teal/90" 
                : "bg-white text-ira-teal border-white hover:bg-white/90"
            }`}>
              Start a Project
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden w-12 h-12 border relative transition-colors ${
                isSolid ? "border-ira-border" : "border-white/40"
              }`}
              aria-label="Toggle menu"
            >
              <span className={`absolute left-3 right-3 h-px transition-all duration-300 ${isSolid ? "bg-ira-teal" : "bg-white"} ${isMenuOpen ? "top-5 translate-y-[4px] rotate-45" : "top-[19px]"}`}></span>
              <span className={`absolute left-3 right-3 h-px transition-all duration-300 ${isSolid ? "bg-ira-teal" : "bg-white"} ${isMenuOpen ? "top-[27px] -translate-y-[4px] -rotate-45" : "top-[27px]"}`}></span>
            </button>
          </div>
        </div>
      </header>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[99] lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-ira-ivory z-[100] pt-[130px] px-7 pb-10 flex flex-col justify-between transition-transform duration-500 ease-in-out lg:hidden ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <nav className="grid gap-4">
          {[
              { name: "About", href: "/about" },
              { name: "Manufacturing", href: "/manufacturing" },
              { name: "Products", href: "/products" },
              { name: "Insights", href: "/insights" },
              { name: "Contact", href: "/contact" }
          ].map((item) => (
            <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="font-serif text-2xl leading-none text-ira-teal">
              {item.name}
            </Link>
          ))}
          <Link href="/apply" onClick={() => setIsMenuOpen(false)} className="font-serif text-xl leading-none text-ira-gold mt-4">
            Apply for Trade Account
          </Link>
          <Link href="/login" onClick={() => setIsMenuOpen(false)} className="font-serif text-lg leading-none text-ira-teal/70 mt-2">
            Buyer Login
          </Link>
        </nav>
        <div className="border-t border-ira-border pt-4 flex justify-between text-ira-muted text-[11px] uppercase tracking-[0.1em]">
          <span>Surat, India</span>
          <span>Backed by Divine Star</span>
        </div>
      </div>
    </>
  );
}
