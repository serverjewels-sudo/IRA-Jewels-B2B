'use client'

import { useState } from 'react'
import RequestQuoteModal from './RequestQuoteModal'

interface RequestQuoteButtonProps {
  productId: string;
  productSku: string;
  productName: string;
}

export default function RequestQuoteButton({ productId, productSku, productName }: RequestQuoteButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasRequested, setHasRequested] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-ira-teal text-white h-[48px] px-8 rounded-[5px] text-[13px] uppercase tracking-[0.08em] hover:bg-[#01354a] transition-colors flex items-center justify-center"
      >
        {hasRequested ? 'Quote Requested' : 'Request Quote'}
      </button>

      <RequestQuoteModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productId={productId}
        productSku={productSku}
        productName={productName}
        onSubmitSuccess={() => setHasRequested(true)}
      />
    </>
  )
}
