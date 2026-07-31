'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import Image from 'next/image'

export default function ResetPasswordPage() {
  // States
  const [isChecking, setIsChecking] = useState(true)
  const [hasValidSession, setHasValidSession] = useState(false)
  
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setHasValidSession(true)
      }
      setIsChecking(false)
    }
    
    checkSession()
  }, [supabase.auth])

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      setIsLoading(false)
      return
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      setIsLoading(false)
      return
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: password
    })

    if (updateError) {
      setError(updateError.message || 'Failed to update password. Please try again.')
      setIsLoading(false)
      return
    }

    // Success!
    setSuccess(true)
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
            Update Password
          </h1>
          <p className="text-ira-ivory/80 text-lg leading-relaxed">
            Secure your account with a new password to access the portal
          </p>
        </div>
      </div>

      {/* Right Panel - Content */}
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
            <h2 className="font-serif text-3xl text-ira-teal mb-3">Reset Password</h2>
            {!isChecking && hasValidSession && !success && (
              <p className="text-ira-muted text-sm">Please enter your new password below.</p>
            )}
          </div>

          {isChecking ? (
            <div className="text-center text-ira-muted py-8">
              Verifying link...
            </div>
          ) : !hasValidSession ? (
            <div className="text-center lg:text-left">
              <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                This link has expired or is invalid.
              </div>
              <Link href="/forgot-password" className="inline-block px-8 py-3 bg-ira-teal text-white text-[11px] uppercase tracking-[0.1em] hover:bg-ira-teal/90 transition-colors">
                Request New Link
              </Link>
            </div>
          ) : success ? (
            <div className="text-center lg:text-left">
              <div className="mb-8 p-4 bg-ira-ivory border border-ira-border text-ira-teal text-sm font-medium">
                Password updated successfully.
              </div>
              <Link href="/login" className="inline-block px-8 py-3 bg-ira-teal text-white text-[11px] uppercase tracking-[0.1em] hover:bg-ira-teal/90 transition-colors">
                Go to Login
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.08em] text-ira-teal mb-2">New Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full bg-ira-ivory/30 border border-ira-border px-4 py-3 text-[14px] text-ira-teal focus:outline-none focus:border-ira-teal transition-colors"
                  />
                  <p className="text-[10px] text-ira-muted mt-2 tracking-wide">Must be at least 8 characters long.</p>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.08em] text-ira-teal mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full bg-ira-ivory/30 border border-ira-border px-4 py-3 text-[14px] text-ira-teal focus:outline-none focus:border-ira-teal transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-ira-teal text-white text-[11px] uppercase tracking-[0.1em] hover:bg-ira-teal/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
