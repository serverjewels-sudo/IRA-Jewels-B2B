'use client'

import { useState } from 'react'

interface Inquiry {
  id: string
  name: string
  company: string | null
  email: string
  phone: string | null
  country: string | null
  requirement: string | null
  expected_quantity: string | null
  target_timeline: string | null
  message: string | null
  confidentiality_requested: boolean
  consent_given: boolean
  created_at: string
}

export default function ExpandableRow({ inquiry }: { inquiry: Inquiry }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const dateObj = new Date(inquiry.created_at)
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <>
      <tr 
        onClick={() => setIsExpanded(!isExpanded)} 
        className={`hover:bg-ira-ivory/30 transition-colors cursor-pointer ${isExpanded ? 'bg-ira-ivory/30' : ''}`}
      >
        <td className="px-6 py-4 text-ira-teal font-medium whitespace-nowrap">{inquiry.name}</td>
        <td className="px-6 py-4 text-ira-muted whitespace-nowrap">{inquiry.company || '-'}</td>
        <td className="px-6 py-4 text-ira-muted whitespace-nowrap">{inquiry.email}</td>
        <td className="px-6 py-4 text-ira-muted whitespace-nowrap">{inquiry.phone || '-'}</td>
        <td className="px-6 py-4 text-ira-muted whitespace-nowrap truncate max-w-[150px]">{inquiry.requirement || '-'}</td>
        <td className="px-6 py-4 text-ira-muted whitespace-nowrap">{formattedDate}</td>
        <td className="px-6 py-4 text-right whitespace-nowrap text-ira-gold">
          <svg 
            className={`w-5 h-5 inline-block transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </td>
      </tr>
      
      {isExpanded && (
        <tr className="bg-ira-ivory/10 border-b border-ira-border/30">
          <td colSpan={7} className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-6 border border-ira-border/50 shadow-sm">
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-ira-muted mb-1">Country</h4>
                  <p className="text-sm text-ira-teal">{inquiry.country || '-'}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-ira-muted mb-1">Expected Quantity</h4>
                  <p className="text-sm text-ira-teal">{inquiry.expected_quantity || '-'}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-ira-muted mb-1">Target Timeline</h4>
                  <p className="text-sm text-ira-teal">{inquiry.target_timeline || '-'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-ira-muted mb-1">Confidentiality Requested</h4>
                  <p className="text-sm text-ira-teal">
                    {inquiry.confidentiality_requested ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 font-semibold">Yes</span>
                    ) : 'No'}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-ira-muted mb-1">Consent Given</h4>
                  <p className="text-sm text-ira-teal">
                    {inquiry.consent_given ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold">Yes</span>
                    ) : 'No'}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-1 md:col-span-2 space-y-4">
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-ira-muted mb-2">Message</h4>
                  <div className="text-sm text-ira-teal whitespace-pre-wrap bg-ira-ivory/30 p-4 border border-ira-border/50 rounded-sm">
                    {inquiry.message || <span className="italic opacity-50">No additional message provided.</span>}
                  </div>
                </div>
              </div>

            </div>
          </td>
        </tr>
      )}
    </>
  )
}
