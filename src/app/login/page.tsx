'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import Image from 'next/image'

export default function BuyerLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // 1. Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError || !authData.user) {
      setError(authError?.message || 'Failed to sign in. Please check your credentials.')
      setIsLoading(false)
      return
    }

    // 2. Check buyers table for active status
    const { data: buyer, error: buyerError } = await supabase
      .from('buyers')
      .select('is_active')
      .eq('id', authData.user.id)
      .single()

    if (buyerError || !buyer || !buyer.is_active) {
      // Invalid buyer or inactive account — sign them out immediately
      await supabase.auth.signOut()
      setError('Your account is not active. Please contact us if you believe this is an error.')
      setIsLoading(false)
      return
    }

    // Success
    router.push('/portal')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-ira-teal flex-col justify-center items-center p-12 text-center relative overflow-hidden">
        {/* Subtle background pattern/overlay could go here */}
        <div className="relative z-10 max-w-md mx-auto">
          <Link href="/">
            <Image 
              src="/logo.svg" 
              alt="IRA Jewels" 
              width={200} 
              height={80} 
              className="mx-auto mb-12 invert brightness-0"
              priority
            />
          </Link>
          <h1 className="font-serif text-4xl lg:text-5xl text-white mb-6 leading-tight">
            Exclusive B2B Portal
          </h1>
          <p className="text-ira-ivory/80 text-lg leading-relaxed">
            Access private collections, buyer pricing and quotations through your secure portal
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 relative">
        {/* Mobile Logo */}
        <div className="lg:hidden mb-12 flex justify-center">
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

        <div className="max-w-sm w-full mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="font-serif text-3xl text-ira-teal mb-3">Welcome Back</h2>
            <p className="text-ira-muted text-sm">Please sign in to access your buyer account.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.08em] text-ira-teal mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-ira-ivory/30 border border-ira-border px-4 py-3 text-[14px] text-ira-teal focus:outline-none focus:border-ira-teal transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.08em] text-ira-teal mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-ira-ivory/30 border border-ira-border px-4 py-3 text-[14px] text-ira-teal focus:outline-none focus:border-ira-teal transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-ira-teal text-white text-[11px] uppercase tracking-[0.1em] hover:bg-ira-teal/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-ira-border/50 text-center lg:text-left">
            <p className="text-sm text-ira-muted">
              Don&apos;t have an account?{' '}
              <Link href="/apply" className="text-ira-teal hover:text-ira-gold transition-colors font-medium">
                Apply for Trade Access
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
