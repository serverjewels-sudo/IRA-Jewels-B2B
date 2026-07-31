'use client'

import { useState } from 'react'
import { submitQuoteRequest } from '@/app/portal/catalogue/[slug]/actions'

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productSku: string;
  productId: string;
  onSubmitSuccess: () => void;
}

export default function RequestQuoteModal({ 
  isOpen, 
  onClose, 
  productName, 
  productSku, 
  productId,
  onSubmitSuccess 
}: RequestQuoteModalProps) {
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await submitQuoteRequest(productId, productSku, productName, notes);

    if (result.success) {
      setIsSuccess(true);
      onSubmitSuccess();
    } else {
      setError(result.error || 'An unexpected error occurred.');
    }
    
    setIsSubmitting(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="bg-ira-ivory w-full max-w-md p-6 lg:p-8 shadow-xl border border-ira-border relative">
        
        {/* Close Button (X) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-ira-muted hover:text-ira-teal transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-ira-teal/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-ira-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-ira-teal mb-3">Quote Requested</h2>
            <p className="text-ira-muted text-sm mb-8 leading-relaxed">
              Quote request received. Our team will follow up with you shortly.
            </p>
            <button 
              onClick={onClose}
              className="bg-ira-teal text-white w-full h-[48px] px-8 rounded-[5px] text-[13px] uppercase tracking-[0.08em] hover:bg-[#01354a] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <h2 className="font-serif text-[28px] text-ira-teal mb-2 leading-tight">Request Quote</h2>
            <div className="mb-6 pb-4 border-b border-ira-border/50">
              <p className="text-ira-text font-medium mb-1">{productName}</p>
              <p className="text-[12px] text-ira-muted uppercase tracking-wider">SKU: {productSku}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="notes" className="text-[13px] uppercase tracking-[0.08em] text-ira-teal font-medium">
                  Additional Requirements (Optional)
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any specific requirements..."
                  className="w-full bg-white border border-ira-border focus:border-ira-teal outline-none p-4 text-[14px] text-ira-text resize-none h-[120px] transition-colors"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-2 bg-ira-teal text-white w-full h-[48px] px-8 rounded-[5px] text-[13px] uppercase tracking-[0.08em] hover:bg-[#01354a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
