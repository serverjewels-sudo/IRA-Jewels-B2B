'use client'

import { useState, useTransition } from 'react'
import { updateQuoteStatus } from './actions'

interface QuoteStatusSelectProps {
  quoteId: string
  initialStatus: string
}

export default function QuoteStatusSelect({ quoteId, initialStatus }: QuoteStatusSelectProps) {
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState(initialStatus)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    const oldStatus = status;
    
    // Optimistically update
    setStatus(newStatus);

    startTransition(async () => {
      const result = await updateQuoteStatus(quoteId, newStatus)
      if (!result.success) {
        // Revert on error
        setStatus(oldStatus)
        alert(result.error || 'Failed to update quote status')
      }
    })
  }

  // Determine badge styling based on status
  let statusClasses = 'bg-gray-100 text-gray-800 border-gray-200'
  if (status === 'Requested') statusClasses = 'bg-amber-100 text-amber-800 border-amber-200'
  if (status === 'Under Review') statusClasses = 'bg-blue-100 text-blue-800 border-blue-200'
  if (status === 'Quote Sent') statusClasses = 'bg-emerald-100 text-emerald-800 border-emerald-200'

  return (
    <div className="relative inline-block w-full max-w-[140px]">
      <select
        value={status}
        onChange={handleChange}
        disabled={isPending}
        className={`appearance-none w-full outline-none cursor-pointer rounded-sm border px-2 py-1 pr-6 text-[10px] uppercase tracking-[0.08em] font-medium disabled:opacity-50 transition-colors ${statusClasses}`}
      >
        <option value="Requested">Requested</option>
        <option value="Under Review">Under Review</option>
        <option value="Quote Sent">Quote Sent</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-70">
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
