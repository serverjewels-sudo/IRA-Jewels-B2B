'use client'

import { useState, useTransition } from 'react'
import { toggleProductVisibility } from './actions'

interface ProductVisibilityToggleProps {
  productId: string
  initialIsPublic: boolean
}

export default function ProductVisibilityToggle({ productId, initialIsPublic }: ProductVisibilityToggleProps) {
  const [isPending, startTransition] = useTransition()
  const [isPublic, setIsPublic] = useState(initialIsPublic)
  const [error, setError] = useState<string | null>(null)

  const handleToggle = () => {
    const newIsPublic = !isPublic;
    // Optimistically update
    setIsPublic(newIsPublic);
    setError(null);

    startTransition(async () => {
      const result = await toggleProductVisibility(productId, newIsPublic)
      if (!result.success) {
        // Revert on error
        setIsPublic(!newIsPublic)
        setError(result.error || 'Failed to update visibility')
      }
    })
  }

  return (
    <div className="flex flex-col gap-1 items-start">
      <button 
        type="button"
        role="switch"
        aria-checked={isPublic}
        disabled={isPending}
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ira-teal focus:ring-offset-2 disabled:opacity-50 ${
          isPublic ? 'bg-ira-teal' : 'bg-gray-200'
        }`}
      >
        <span className="sr-only">Toggle public visibility</span>
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isPublic ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      <span className="text-xs text-ira-muted font-medium">
        {isPublic ? 'Public' : 'Private'}
      </span>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
