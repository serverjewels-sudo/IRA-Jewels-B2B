'use client'

import { useTransition } from 'react'
import { toggleProductArchive } from './actions'

interface ProductStatusActionProps {
  productId: string
  isActive: boolean
}

export default function ProductStatusAction({ productId, isActive }: ProductStatusActionProps) {
  const [isPending, startTransition] = useTransition()

  const handleAction = () => {
    if (isActive) {
      const confirmed = window.confirm("Archive this product? It will be hidden everywhere but not deleted.")
      if (!confirmed) return;
    }

    startTransition(async () => {
      const result = await toggleProductArchive(productId, !isActive)
      if (!result.success) {
        alert(result.error || 'Failed to update product status')
      }
    })
  }

  return (
    <button 
      onClick={handleAction}
      disabled={isPending}
      className={`text-xs uppercase tracking-wider font-medium transition-colors ${
        isActive 
          ? 'text-red-600 hover:text-red-800' 
          : 'text-ira-teal hover:text-[#01354a]'
      } disabled:opacity-50`}
    >
      {isPending ? 'Saving...' : isActive ? 'Archive' : 'Unarchive'}
    </button>
  )
}
