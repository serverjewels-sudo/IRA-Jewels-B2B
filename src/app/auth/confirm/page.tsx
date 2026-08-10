'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import Image from 'next/image'

function AuthConfirmContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/portal'

  const handleConfirm = async () => {
    if (!code) return

    setIsLoading(true)
    setError(null)

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      setError('This link has expired or was already used. Please request a new one.')
      setIsLoading(false)
    } else {
      router.push(next)
    }
  }

  if (!code) {
    return (
      <div className="text-center">
        <p className="text-ira-muted text-sm mb-6">Invalid or missing authentication code.</p>
        <Link href="/login" className="inline-block py-3 px-6 bg-ira-teal text-white text-[11px] uppercase tracking-[0.1em] hover:bg-ira-teal/90 transition-colors">
          Back to Login
        </Link>
      </div>
    )
  }

  return (
    <div className="text-center">
      <h2 className="font-serif text-3xl text-ira-teal mb-3">Secure Verification</h2>
      
      {error ? (
        <div className="mb-6">
          <div className="p-4 bg-ira-ivory border border-ira-border text-ira-teal text-sm font-medium mb-6">
            {error}
          </div>
          <Link href="/forgot-password" className="text-ira-teal hover:text-ira-gold transition-colors font-medium text-sm">
            Request a new link
          </Link>
        </div>
      ) : (
        <>
          <p className="text-ira-muted text-sm mb-8">Click below to continue and verify your email link securely.</p>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-full py-4 bg-ira-teal text-white text-[11px] uppercase tracking-[0.1em] hover:bg-ira-teal/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Continue'}
          </button>
        </>
      )}
    </div>
  )
}

export default function AuthConfirmPage() {
  return (
    <div className="min-h-screen bg-ira-ivory flex flex-col items-center justify-center px-6 py-12">
      <div className="mb-8">
        <Link href="/">
          <Image 
            src="/logo.svg" 
            alt="IRA Jewels" 
            width={160} 
            height={60} 
            priority
          />
        </Link>
      </div>
      <div className="bg-white max-w-sm w-full p-8 md:p-12 border border-ira-border shadow-sm">
        <Suspense fallback={<div className="text-center text-ira-muted text-sm">Loading...</div>}>
          <AuthConfirmContent />
        </Suspense>
      </div>
    </div>
  )
}
