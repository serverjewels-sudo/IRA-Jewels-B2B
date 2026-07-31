'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { approveApplication, rejectApplication } from './actions'

interface Props {
  application: {
    id: string
    status: string
    email: string
    trading_name: string
    legal_business_name: string
  }
}

export default function ApplicationActions({ application }: Props) {
  const router = useRouter()
  
  const [isApproveOpen, setIsApproveOpen] = useState(false)
  const [isRejectOpen, setIsRejectOpen] = useState(false)
  
  const [priceTier, setPriceTier] = useState('')
  const [rejectNote, setRejectNote] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [credentials, setCredentials] = useState<{email: string, password: string, buyerId: string} | null>(null)
  const [copied, setCopied] = useState(false)

  if (application.status !== 'Application Received' && !credentials) {
    return null
  }

  const handleApprove = async () => {
    if (!priceTier) {
      setError('Please select a price tier')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    const result = await approveApplication({
      applicationId: application.id,
      email: application.email,
      tradingName: application.trading_name,
      legalBusinessName: application.legal_business_name,
      priceTier
    })
    
    setIsLoading(false)
    
    if (result.success && result.credentials) {
      setCredentials(result.credentials)
      setIsApproveOpen(false)
      router.refresh()
    } else {
      setError(result.error || 'Failed to approve application')
    }
  }

  const handleReject = async () => {
    setIsLoading(true)
    setError('')
    
    const result = await rejectApplication({
      applicationId: application.id,
      note: rejectNote
    })
    
    setIsLoading(false)
    
    if (result.success) {
      setIsRejectOpen(false)
      router.refresh()
    } else {
      setError(result.error || 'Failed to reject application')
    }
  }

  const copyCredentials = () => {
    if (credentials) {
      const text = `IRA Jewels B2B Login Details:\nURL: https://b2b.irajewels.com\nEmail: ${credentials.email}\nPassword: ${credentials.password}\nBuyer ID: ${credentials.buyerId}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  return (
    <div className="mt-12 pt-8 border-t border-ira-border flex gap-4">
      {application.status === 'Application Received' && !credentials && (
        <>
          <button 
            onClick={() => setIsApproveOpen(true)}
            className="px-8 py-3 bg-ira-teal text-white text-[11px] uppercase tracking-[0.08em] hover:bg-ira-teal/90 transition-colors font-medium"
          >
            Approve Account
          </button>
          
          <button 
            onClick={() => setIsRejectOpen(true)}
            className="px-8 py-3 bg-white border border-ira-border text-ira-teal text-[11px] uppercase tracking-[0.08em] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors font-medium"
          >
            Reject
          </button>
        </>
      )}

      {/* APPROVE MODAL */}
      {isApproveOpen && (
        <div className="fixed inset-0 bg-ira-teal/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-8 shadow-xl">
            <h3 className="font-serif text-2xl text-ira-teal mb-2">Approve Application</h3>
            <p className="text-sm text-ira-muted mb-6">Assign a price tier to generate credentials.</p>
            
            {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}
            
            <div className="mb-8">
              <label className="block text-[11px] uppercase tracking-[0.08em] text-ira-teal mb-3">Price Tier *</label>
              <select
                value={priceTier}
                onChange={(e) => {
                  setPriceTier(e.target.value)
                  setError('')
                }}
                className="w-full bg-ira-ivory/50 border border-ira-border px-4 py-3 text-[14px] text-ira-teal focus:outline-none focus:border-ira-teal"
              >
                <option value="">Select Tier...</option>
                <option value="Tier1">Tier 1</option>
                <option value="Tier2">Tier 2</option>
                <option value="Tier3">Tier 3</option>
              </select>
            </div>
            
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setIsApproveOpen(false)}
                disabled={isLoading}
                className="px-6 py-2.5 text-[11px] uppercase tracking-[0.08em] text-ira-muted hover:text-ira-teal transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleApprove}
                disabled={isLoading}
                className="px-6 py-2.5 bg-ira-teal text-white text-[11px] uppercase tracking-[0.08em] hover:bg-ira-teal/90 transition-colors disabled:bg-ira-muted"
              >
                {isLoading ? 'Processing...' : 'Confirm Approval'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {isRejectOpen && (
        <div className="fixed inset-0 bg-ira-teal/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-8 shadow-xl">
            <h3 className="font-serif text-2xl text-red-600 mb-2">Reject Application</h3>
            <p className="text-sm text-ira-muted mb-6">This action cannot be undone.</p>
            
            {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}
            
            <div className="mb-8">
              <label className="block text-[11px] uppercase tracking-[0.08em] text-ira-teal mb-3">Internal Note (Optional)</label>
              <textarea
                value={rejectNote}
                onChange={(e) => setRejectNote(e.target.value)}
                placeholder="Reason for rejection..."
                className="w-full h-32 bg-ira-ivory/50 border border-ira-border px-4 py-3 text-[14px] text-ira-teal focus:outline-none focus:border-ira-teal resize-none"
              />
            </div>
            
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setIsRejectOpen(false)}
                disabled={isLoading}
                className="px-6 py-2.5 text-[11px] uppercase tracking-[0.08em] text-ira-muted hover:text-ira-teal transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleReject}
                disabled={isLoading}
                className="px-6 py-2.5 bg-red-600 text-white text-[11px] uppercase tracking-[0.08em] hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS CREDENTIALS MODAL */}
      {credentials && (
        <div className="fixed inset-0 bg-ira-teal/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-8 shadow-xl border-t-4 border-ira-gold">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-8 h-8 text-ira-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-serif text-2xl text-ira-teal">Account Created</h3>
            </div>
            
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 text-xs leading-relaxed">
              <strong>Copy this now — it will not be shown again.</strong> Share these credentials with the buyer directly (WhatsApp or phone), since automatic email isn&apos;t available until a domain is verified.
            </div>
            
            <div className="bg-ira-ivory/50 border border-ira-border p-4 mb-6 space-y-3 font-mono text-sm text-ira-teal">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-ira-muted block mb-1 font-sans">Buyer ID</span>
                {credentials.buyerId}
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-ira-muted block mb-1 font-sans">Email</span>
                {credentials.email}
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-ira-muted block mb-1 font-sans">Password</span>
                {credentials.password}
              </div>
            </div>
            
            <button 
              onClick={copyCredentials}
              className={`w-full py-3 text-[11px] uppercase tracking-[0.08em] transition-colors font-medium border ${
                copied 
                  ? 'bg-ira-gold border-ira-gold text-white' 
                  : 'bg-white border-ira-teal text-ira-teal hover:bg-ira-teal hover:text-white'
              }`}
            >
              {copied ? 'Copied to Clipboard!' : 'Copy Credentials'}
            </button>
            
            <button 
              onClick={() => setCredentials(null)}
              className="w-full mt-3 py-3 text-[11px] uppercase tracking-[0.08em] text-ira-muted hover:text-ira-teal transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
