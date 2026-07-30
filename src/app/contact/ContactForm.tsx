'use client';

import { useState, useRef, FormEvent } from "react";
import Reveal from "@/components/Reveal";
import { submitContactInquiry } from "./actions";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Validation state
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    consent: false
  });
  
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    
    if (!formRef.current) return;
    
    const formData = new FormData(formRef.current);
    
    // Validate required fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const consent = formData.get('consent') === 'on';
    
    const newErrors = {
      name: !name || name.trim() === "",
      email: !email || email.trim() === "",
      consent: !consent
    };
    
    setErrors(newErrors);
    
    if (newErrors.name || newErrors.email || newErrors.consent) {
      return; // Stop submission if invalid
    }

    setIsSubmitting(true);
    
    const result = await submitContactInquiry(formData);
    
    setIsSubmitting(false);
    
    if (result.success) {
      setIsSuccess(true);
      formRef.current.reset();
      
      // Scroll to success message
      setTimeout(() => {
        if (successRef.current) {
          successRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    } else {
      setErrorMsg(result.error || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Reveal>
      <form ref={formRef} onSubmit={handleSubmit} className="bg-white border border-ira-border text-ira-teal p-6 lg:p-9 shadow-sm" noValidate>
        <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-ira-gold mb-6">Project Inquiry</p>
        
        {errorMsg && (
          <div className="mb-6 p-4 border border-red-200 bg-red-50 text-red-600 text-[13px]">
            {errorMsg}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
          {/* Name */}
          <div className="grid gap-[7px]">
            <label htmlFor="name" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Name *</label>
            <input 
              id="name" 
              name="name"
              placeholder="Your full name" 
              className={`w-full border-0 border-b bg-transparent py-[11px] outline-none transition-colors ${
                errors.name ? 'border-red-400' : 'border-ira-border focus:border-ira-gold'
              }`} 
            />
            {errors.name && <span className="text-red-500 text-[11px]">Name is required.</span>}
          </div>
          
          {/* Company */}
          <div className="grid gap-[7px]">
            <label htmlFor="company" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Company</label>
            <input 
              id="company" 
              name="company"
              placeholder="Company or brand name" 
              className="w-full border-0 border-b border-ira-border bg-transparent py-[11px] outline-none focus:border-ira-gold transition-colors" 
            />
          </div>
          
          {/* Email */}
          <div className="grid gap-[7px]">
            <label htmlFor="email" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Business email *</label>
            <input 
              id="email" 
              name="email"
              type="email" 
              placeholder="name@company.com" 
              className={`w-full border-0 border-b bg-transparent py-[11px] outline-none transition-colors ${
                errors.email ? 'border-red-400' : 'border-ira-border focus:border-ira-gold'
              }`} 
            />
            {errors.email && <span className="text-red-500 text-[11px]">Valid email is required.</span>}
          </div>
          
          {/* Phone */}
          <div className="grid gap-[7px]">
            <label htmlFor="phone" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Phone number</label>
            <input 
              id="phone" 
              name="phone"
              type="tel" 
              placeholder="+91" 
              className="w-full border-0 border-b border-ira-border bg-transparent py-[11px] outline-none focus:border-ira-gold transition-colors" 
            />
          </div>
          
          {/* Country */}
          <div className="grid gap-[7px]">
            <label htmlFor="country" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Country</label>
            <input 
              id="country" 
              name="country"
              placeholder="Country" 
              className="w-full border-0 border-b border-ira-border bg-transparent py-[11px] outline-none focus:border-ira-gold transition-colors" 
            />
          </div>
          
          {/* Requirement */}
          <div className="grid gap-[7px]">
            <label htmlFor="requirement" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Requirement</label>
            <select 
              id="requirement" 
              name="requirement"
              className="w-full border-0 border-b border-ira-border bg-transparent py-[11px] outline-none focus:border-ira-gold transition-colors text-ira-teal"
            >
              <option>New collection development</option>
              <option>Sampling</option>
              <option>Production</option>
              <option>Private-label manufacturing</option>
              <option>Other</option>
            </select>
          </div>
          
          {/* Quantity */}
          <div className="grid gap-[7px]">
            <label htmlFor="quantity" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Expected quantity</label>
            <input 
              id="quantity" 
              name="quantity"
              placeholder="Approximate quantity" 
              className="w-full border-0 border-b border-ira-border bg-transparent py-[11px] outline-none focus:border-ira-gold transition-colors" 
            />
          </div>
          
          {/* Timeline */}
          <div className="grid gap-[7px]">
            <label htmlFor="timeline" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Target timeline</label>
            <input 
              id="timeline" 
              name="timeline"
              placeholder="Expected timeline" 
              className="w-full border-0 border-b border-ira-border bg-transparent py-[11px] outline-none focus:border-ira-gold transition-colors" 
            />
          </div>
          
          {/* Message */}
          <div className="grid gap-[7px] lg:col-span-2">
            <label htmlFor="message" className="text-[10px] uppercase tracking-[0.1em] text-ira-muted">Project message</label>
            <textarea 
              id="message" 
              name="message"
              rows={5} 
              placeholder="Tell us about the concept, category, material, quantity and expected support." 
              className="w-full border-0 border-b border-ira-border bg-transparent py-[11px] outline-none focus:border-ira-gold transition-colors resize-y"
            ></textarea>
          </div>
        </div>

        <div className="grid gap-2.5 my-[22px] text-ira-muted text-[12px]">
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" name="isConfidential" className="mt-1" />
            <span>This is a confidential project and should be handled privately.</span>
          </label>
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" name="consent" className="mt-1" />
            <div className="flex flex-col gap-1">
              <span>I consent to being contacted about this business inquiry. *</span>
              {errors.consent && <span className="text-red-500 text-[11px]">Consent is required to submit.</span>}
            </div>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting || isSuccess}
          className={`inline-flex items-center justify-center gap-2.5 min-h-[52px] px-6 text-[12px] tracking-[0.08em] uppercase transition-all duration-250 w-full lg:w-auto rounded-[5px] ${
            isSuccess 
              ? 'bg-[#7c986f] text-white border border-[#7c986f] cursor-default' 
              : 'bg-ira-teal text-white border border-ira-teal hover:-translate-y-0.5 hover:bg-ira-teal/90'
          }`}
        >
          {isSubmitting ? 'Submitting...' : isSuccess ? 'Submitted ✓' : 'Send Message'}
        </button>

        {isSuccess && (
          <div ref={successRef} className="mt-[18px] border border-[#7c986f] bg-[#edf4e9] p-4 text-[#36512c] animate-in fade-in slide-in-from-bottom-2 duration-500">
            <strong>Thank you — we&apos;ll be in touch shortly.</strong>
          </div>
        )}
      </form>
    </Reveal>
  );
}
