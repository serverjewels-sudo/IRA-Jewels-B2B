'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function ChangePasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)
    
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

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

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
    setPassword('')
    setConfirmPassword('')
    setIsLoading(false)
  }

  return (
    <div className="bg-white border border-ira-border p-8 max-w-2xl">
      <h3 className="font-serif text-2xl text-ira-teal mb-6">Change Password</h3>
      
      {success && (
        <div className="mb-6 p-4 bg-ira-ivory border border-ira-border text-ira-teal text-sm font-medium">
          Password updated successfully.
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleUpdatePassword} className="space-y-6">
        <div className="max-w-md">
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

        <div className="max-w-md">
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

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-ira-teal text-white text-[11px] uppercase tracking-[0.1em] hover:bg-ira-teal/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  )
}
