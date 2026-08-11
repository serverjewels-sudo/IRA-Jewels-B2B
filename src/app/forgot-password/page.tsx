'use client'

import { useState } from 'react'
import { resetClient as supabase } from '@/lib/supabase/resetClient'
import Link from 'next/link'
import Image from 'next/image'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    // Call reset password with direct redirect to the reset page (Implicit flow)
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    // Always show the same success message regardless of whether the email exists
    setMessage('If an account exists with that email, a reset link has been sent.')
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-ira-teal flex-col justify-center items-center p-12 text-center relative overflow-hidden">
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
            Account Recovery
          </h1>
          <p className="text-ira-ivory/80 text-lg leading-relaxed">
            Regain access to your secure account
          </p>
        </div>
      </div>

      {/* Right Panel - Forgot Password Form */}
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
            <h2 className="font-serif text-3xl text-ira-teal mb-3">Forgot Password</h2>
            <p className="text-ira-muted text-sm">Enter your email address and we&apos;ll send you a link to reset your password.</p>
          </div>

          {message && (
            <div className="mb-6 p-4 bg-ira-ivory border border-ira-border text-ira-teal text-sm font-medium">
              {message}
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-6">
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-ira-teal text-white text-[11px] uppercase tracking-[0.1em] hover:bg-ira-teal/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-ira-border/50 text-center lg:text-left">
            <p className="text-sm text-ira-muted">
              Remembered your password?{' '}
              <Link href="/login" className="text-ira-teal hover:text-ira-gold transition-colors font-medium">
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
