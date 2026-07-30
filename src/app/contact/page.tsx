import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-ira-ivory flex flex-col">
      <Header />
      
      <main className="flex-grow pt-[140px] pb-[120px] max-md:pt-[120px] max-md:pb-[78px]">
        {/* Page Header */}
        <section className="w-[min(1320px,calc(100%-56px))] mx-auto mb-16">
          <Reveal>
            <p className="text-[13px] text-ira-muted tracking-[0.08em] uppercase mb-4">
              <Link href="/" className="hover:text-ira-teal transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-ira-text font-medium">Contact</span>
            </p>
            <h1 className="font-serif text-[clamp(40px,5vw,60px)] text-ira-teal leading-[1] tracking-[-0.04em]">
              Contact Us
            </h1>
          </Reveal>
        </section>

        {/* 2-Column Layout */}
        <section className="w-[min(1320px,calc(100%-56px))] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-start">
            
            {/* Left: Form */}
            <div>
              <ContactForm />
            </div>
            
            {/* Right: Contact Details Card */}
            <div className="lg:sticky lg:top-[120px]">
              <Reveal delay={100}>
                <div className="bg-[#E8F0F2] p-8 lg:p-12 border border-ira-border flex flex-col gap-8">
                  <div>
                    <h2 className="font-serif text-[28px] text-ira-teal mb-2">Get in Touch</h2>
                    <p className="text-[14px] text-ira-muted">
                      Whether you are looking to start a new collection, request sampling, or transition to dependable production, our team is ready to support your business.
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-6 text-[15px] text-ira-text">
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.1em] text-ira-muted block mb-1">Email</span>
                      <a href="mailto:Irajewels849@gmail.com" className="font-medium hover:text-ira-gold transition-colors">
                        Irajewels849@gmail.com
                      </a>
                    </div>
                    
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.1em] text-ira-muted block mb-1">WhatsApp</span>
                      <a href="https://wa.me/919023454014" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-ira-gold transition-colors inline-flex items-center gap-2">
                        +91 9023454014
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-ira-gold">
                          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    </div>
                    
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.1em] text-ira-muted block mb-1">Office Address</span>
                      <address className="not-italic font-medium leading-relaxed">
                        Sumantra Complex, 3rd Floor<br />
                        P 2557, 301-303<br />
                        Opp Ram Mandir<br />
                        Bhavnagar, Gujarat 364002
                      </address>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
            
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
