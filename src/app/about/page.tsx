import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { getPlaceholderImage } from "@/lib/placeholders";
import Link from "next/link";

const partners = [
  {
    num: "01",
    title: "Design-Led Thinking",
    desc: "We understand both aesthetics and manufacturability.",
  },
  {
    num: "02",
    title: "Flexible Development",
    desc: "Support for sampling, new collections and evolving production needs.",
  },
  {
    num: "03",
    title: "Consistent Execution",
    desc: "Defined processes designed to maintain quality across production.",
  },
  {
    num: "04",
    title: "Responsive Communication",
    desc: "Clear updates, approvals and coordination throughout the project.",
  },
  {
    num: "05",
    title: "Backed by Divine Star",
    desc: "Additional industry strength and credibility behind every partnership.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Page Header & Who We Are (Warm Ivory) */}
        <section className="bg-ira-ivory pt-[140px] pb-[120px] max-md:pt-[120px] max-md:pb-[78px]">
          {/* Breadcrumbs & Title */}
          <div className="w-[min(1320px,calc(100%-56px))] mx-auto mb-16">
            <Reveal>
              <p className="text-[13px] text-ira-muted tracking-[0.08em] uppercase mb-4">
                <Link href="/" className="hover:text-ira-teal transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-ira-text font-medium">About</span>
              </p>
              <h1 className="font-serif text-[clamp(40px,5vw,60px)] text-ira-teal leading-[1] tracking-[-0.04em]">
                About Ira Jewels
              </h1>
            </Reveal>
          </div>

          {/* Who We Are Content */}
          <div className="w-[min(1320px,calc(100%-56px))] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-7 lg:gap-[70px]">
            <Reveal>
              <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">Who We Are</p>
            </Reveal>
            
            <div>
              <Reveal delay={100}>
                <h2 className="font-serif text-[clamp(45px,5vw,76px)] max-md:text-[48px] leading-[0.96] tracking-[-0.045em] m-0 text-ira-text">
                  Craftsmanship is only the beginning. We build manufacturing partnerships designed to help jewellery brands grow.
                </h2>
              </Reveal>
              
              <div className="w-full h-px bg-gradient-to-r from-ira-gold to-transparent my-[42px]"></div>
              
              <Reveal delay={200}>
                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-7 lg:gap-[60px] items-start">
                  <p className="text-[18px] text-ira-muted max-w-[700px] m-0">
                    Ira Jewels brings design thinking, manufacturing discipline and skilled craftsmanship together under one dependable process. Established in 2023 and backed by Divine Star, we support retailers, designers, wholesalers and international brands with a clear, confidential and production-focused approach.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Why Partner With Ira Jewels (Pale Teal) */}
        <section className="bg-ira-pale-teal py-[120px] max-md:py-[78px]">
          <div className="w-[min(1320px,calc(100%-56px))] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.3fr] gap-7 lg:gap-[70px] items-start mb-[70px]">
              <Reveal>
                <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">Why Partner With Ira</p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="font-serif text-[clamp(48px,5.7vw,86px)] leading-[0.96] tracking-[-0.045em] m-0 text-ira-text">
                  Built Around the Needs of Growing Jewellery Brands.
                </h2>
              </Reveal>
            </div>

            <div className="border-t border-ira-border">
              {partners.map((partner, index) => (
                <Reveal key={partner.num} delay={index * 50}>
                  <article className="grid grid-cols-[45px_1fr_24px] lg:grid-cols-[70px_1fr_1.1fr_34px] gap-6 py-[30px] border-b border-ira-border items-center">
                    <span className="font-serif text-[24px] text-ira-gold">{partner.num}</span>
                    <h3 className="font-serif text-[29px] lg:text-[36px] font-normal m-0 col-span-2 lg:col-span-1 text-ira-text">{partner.title}</h3>
                    <p className="text-ira-muted m-0 col-span-3 lg:col-span-1">{partner.desc}</p>
                    <i className="not-italic text-[22px] justify-self-end text-ira-teal">↗</i>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Confidentiality (Deep Teal) */}
        <section className="bg-ira-teal text-white py-[120px] max-md:py-[78px]">
          <div className="w-[min(1320px,calc(100%-56px))] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[55px] lg:gap-[90px] items-center">
            <Reveal>
              <div 
                className="h-[430px] lg:h-[600px] border border-[#34342f] relative overflow-hidden flex items-center justify-center"
                style={{
                  background: 'repeating-linear-gradient(0deg,transparent,transparent 39px,#1e1e1b 40px), repeating-linear-gradient(90deg,transparent,transparent 39px,#1e1e1b 40px)'
                }}
                aria-hidden="true"
              >
                <div className="absolute w-[320px] h-[320px] max-md:w-[240px] max-md:h-[240px] border border-ira-gold rounded-full"></div>
                <div className="absolute w-[180px] h-[180px] max-md:w-[130px] max-md:h-[130px] border border-ira-gold rounded-full"></div>
                <b className="font-serif text-[66px] max-md:text-[48px] font-normal text-ira-gold">IRA</b>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">Confidentiality & Partnership</p>
              <h2 className="font-serif text-[clamp(48px,5vw,70px)] leading-[0.96] tracking-[-0.045em] my-[22px]">
                Your Designs. Your Identity. Our Responsibility.
              </h2>
              <p className="text-[#aaa69f] m-0">
                Client concepts and collections are handled through controlled access, clear approval stages and private project communication.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 my-[30px]">
                {[
                  "Confidential design handling",
                  "Controlled project access",
                  "Clear approval stages",
                  "No public display without permission"
                ].map((check, i) => (
                  <span key={i} className="border-t border-[#33332f] pt-[14px] text-[#c4c0b8] text-[13px] before:content-['—'] before:text-ira-gold before:mr-2">
                    {check}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Responsibility (Warm Ivory) */}
        <section className="bg-ira-ivory py-[120px] max-md:py-[78px]">
          <div className="w-[min(1320px,calc(100%-56px))] mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-[55px] lg:gap-[90px] items-center">
            <Reveal>
              <div className="h-[460px] lg:h-[680px] overflow-hidden bg-[#d8d3ca]">
                <img 
                  src={getPlaceholderImage("mens-jewellery", 1200)} 
                  alt="Organised jewellery tools and responsible material handling" 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">Responsible Progress</p>
              <h2 className="font-serif text-[clamp(48px,5vw,72px)] leading-[0.96] tracking-[-0.045em] my-[22px] text-ira-text">
                Better Manufacturing Starts With Better Decisions.
              </h2>
              {/* Omitted the placeholder text paragraph here */}
              
              <div className="flex flex-wrap gap-2 my-7">
                {[
                  "Responsible sourcing",
                  "Material traceability",
                  "Resource efficiency",
                  "Waste reduction",
                  "Workplace responsibility"
                ].map((tag) => (
                  <span key={tag} className="border border-ira-border px-3 py-[9px] text-[11px] uppercase tracking-[0.08em] text-ira-teal">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
