"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import Reveal from "./Reveal";

export default function Contact() {
  const [fileName, setFileName] = useState("Images, brief or CAD reference");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("Images, brief or CAD reference");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Scroll to success message
      setTimeout(() => {
        if (successRef.current) {
          successRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }, 800);
  };

  return (
    <section className="py-[120px] max-md:py-[78px] bg-ira-teal text-white relative overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(178,158,103,0.18),transparent_32%)] pointer-events-none"></div>
      
      <div className="w-[calc(100%-56px)] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[0.9fr_1.2fr] gap-[55px] lg:gap-[90px]">
        <div className="lg:sticky lg:top-[110px] self-start">
          <Reveal>
            <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold">Start a Partnership</p>
            <h2 className="font-serif text-[clamp(48px,5vw,78px)] leading-[0.96] tracking-[-0.045em] my-[22px]">
              Let’s Build Your Next Collection.
            </h2>
            <p className="text-[#aaa69f] text-[17px] m-0">
              Share your concept, reference, technical requirement or production brief with the Ira Jewels team.
            </p>
            
            <div className="mt-[30px] text-[#d6d1c8] text-[13px] leading-[1.9]">
              <strong className="font-semibold text-white">IRA JEWELS</strong><br />
              Backed by Divine Star<br />
              Surat, India<br />
              <span className="text-ira-muted">Replace with verified email, phone and office address before publishing.</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <form onSubmit={handleSubmit} className="bg-ira-ivory text-ira-teal p-6 lg:p-9 shadow-lg">
            <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold mb-6">Project Inquiry</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
              <div className="grid gap-[7px]">
                <label htmlFor="name" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Name *</label>
                <input id="name" required placeholder="Your full name" className="w-full border-0 border-b border-ira-border bg-transparent py-[11px] outline-none focus:border-ira-gold transition-colors" />
              </div>
              <div className="grid gap-[7px]">
                <label htmlFor="company" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Company *</label>
                <input id="company" required placeholder="Company or brand name" className="w-full border-0 border-b border-ira-border bg-transparent py-[11px] outline-none focus:border-ira-gold transition-colors" />
              </div>
              <div className="grid gap-[7px]">
                <label htmlFor="email" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Business email *</label>
                <input id="email" type="email" required placeholder="name@company.com" className="w-full border-0 border-b border-ira-border bg-transparent py-[11px] outline-none focus:border-ira-gold transition-colors" />
              </div>
              <div className="grid gap-[7px]">
                <label htmlFor="phone" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Phone number *</label>
                <input id="phone" type="tel" required placeholder="+91" className="w-full border-0 border-b border-ira-border bg-transparent py-[11px] outline-none focus:border-ira-gold transition-colors" />
              </div>
              <div className="grid gap-[7px]">
                <label htmlFor="country" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Country *</label>
                <input id="country" required placeholder="Country" className="w-full border-0 border-b border-ira-border bg-transparent py-[11px] outline-none focus:border-ira-gold transition-colors" />
              </div>
              <div className="grid gap-[7px]">
                <label htmlFor="requirement" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Requirement</label>
                <select id="requirement" className="w-full border-0 border-b border-ira-border bg-transparent py-[11px] outline-none focus:border-ira-gold transition-colors text-ira-teal">
                  <option>New collection development</option>
                  <option>Sampling</option>
                  <option>Production</option>
                  <option>Private-label manufacturing</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="grid gap-[7px]">
                <label htmlFor="quantity" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Expected quantity</label>
                <input id="quantity" placeholder="Approximate quantity" className="w-full border-0 border-b border-ira-border bg-transparent py-[11px] outline-none focus:border-ira-gold transition-colors" />
              </div>
              <div className="grid gap-[7px]">
                <label htmlFor="timeline" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Target timeline</label>
                <input id="timeline" placeholder="Expected timeline" className="w-full border-0 border-b border-ira-border bg-transparent py-[11px] outline-none focus:border-ira-gold transition-colors" />
              </div>
              <div className="grid gap-[7px] lg:col-span-2">
                <label htmlFor="message" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Project message *</label>
                <textarea id="message" required rows={5} placeholder="Tell us about the concept, category, material, quantity and expected support." className="w-full border-0 border-b border-ira-border bg-transparent py-[11px] outline-none focus:border-ira-gold transition-colors resize-y"></textarea>
              </div>
              <div className="grid gap-[7px] lg:col-span-2 border border-dashed border-[#b7b0a4] p-[18px] relative">
                <label htmlFor="file" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Reference file</label>
                <input id="file" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.zip,.3dm,.stl,.step,.stp" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <small className="text-ira-muted">{fileName}</small>
              </div>
            </div>

            <div className="grid gap-2.5 my-[22px] text-ira-muted text-[12px]">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-1" />
                <span>This is a confidential project and should be handled privately.</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" required className="mt-1" />
                <span>I consent to being contacted about this business inquiry.</span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || isSuccess}
              className={`inline-flex items-center justify-center gap-2.5 min-h-[52px] px-6 text-[12px] tracking-[0.08em] uppercase transition-all duration-250 w-full lg:w-auto ${
                isSuccess 
                  ? 'bg-[#7c986f] text-white border border-[#7c986f] cursor-default' 
                  : 'bg-ira-teal text-white border border-ira-teal hover:-translate-y-0.5 hover:bg-ira-teal/90'
              }`}
            >
              {isSubmitting ? 'Submitting...' : isSuccess ? 'Submitted ✓' : 'Submit Project Brief →'}
            </button>

            {isSuccess && (
              <div ref={successRef} className="mt-[18px] border border-[#7c986f] bg-[#edf4e9] p-4 text-[#36512c] animate-in fade-in slide-in-from-bottom-2 duration-500">
                <strong>Project brief received in this working preview.</strong><br/>
                The production version can connect this form to your email, CRM and secure file storage.
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
