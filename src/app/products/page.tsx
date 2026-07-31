import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { getPlaceholderImage } from "@/lib/placeholders";

const categories = [
  { name: "Rings", slug: "rings", image: getPlaceholderImage("rings", 600) },
  { name: "Earrings", slug: "earrings", image: getPlaceholderImage("earrings", 600) },
  { name: "Pendants", slug: "pendants", image: getPlaceholderImage("pendants", 600) },
  { name: "Necklaces", slug: "necklaces", image: getPlaceholderImage("necklaces", 600) },
  { name: "Bracelets", slug: "bracelets", image: getPlaceholderImage("bracelets", 600) },
  { name: "Bangles", slug: "bangles", image: getPlaceholderImage("bangles", 600) },
  { name: "Mangalsutras", slug: "mangalsutras", image: getPlaceholderImage("mangalsutras", 600) },
  { name: "Men's Jewellery", slug: "mens-jewellery", image: getPlaceholderImage("mens-jewellery", 600) },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-ira-ivory">
      <Header />
      
      <main className="pt-[140px] pb-[120px] max-md:pt-[120px] max-md:pb-[78px]">
        {/* Page Header */}
        <section className="w-[min(1320px,calc(100%-56px))] mx-auto mb-16">
          <Reveal>
            <p className="text-[13px] text-ira-muted tracking-[0.08em] uppercase mb-4">
              <Link href="/" className="hover:text-ira-teal transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-ira-text font-medium">Products</span>
            </p>
            <h1 className="font-serif text-[clamp(40px,5vw,60px)] text-ira-teal leading-[1] tracking-[-0.04em] mb-4">
              Our Manufacturing Range
            </h1>
            <p className="text-ira-muted text-[16px] max-w-[600px]">
              This showcases a selection of our manufacturing capabilities and design categories. 
              Our full, extensive private collection is available exclusively to approved trade buyers.
            </p>
          </Reveal>
        </section>

        {/* Category Grid */}
        <section className="w-[min(1320px,calc(100%-56px))] mx-auto mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((cat, index) => (
              <Reveal key={cat.slug} delay={index * 50}>
                <Link 
                  href={`/products/${cat.slug}`} 
                  className="block group border border-ira-border hover:border-ira-gold transition-all duration-300 hover:-translate-y-1 bg-white"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[#e5e0d7]">
                    <img 
                      src={cat.image} 
                      alt={`${cat.name} category`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h2 className="font-serif text-[24px] lg:text-[28px] text-ira-teal m-0">
                      {cat.name}
                    </h2>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA Strip */}
        <section className="w-[min(1320px,calc(100%-56px))] mx-auto">
          <Reveal>
            <div className="bg-ira-pale-teal border border-ira-border p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-serif text-[32px] text-ira-text m-0 mb-2">
                  Looking for something specific?
                </h3>
                <p className="text-ira-muted m-0">
                  Apply for a trade account to view our full private collection and discuss custom requirements.
                </p>
              </div>
              <Link 
                href="/apply"
                className="bg-ira-teal text-white h-[48px] px-8 rounded-[5px] flex items-center justify-center text-[14px] uppercase tracking-[0.08em] hover:-translate-y-0.5 transition-transform shrink-0"
              >
                Apply for Trade Account
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
