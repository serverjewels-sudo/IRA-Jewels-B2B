'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      if (data.user) {
        // Authorize checking the admin_users table
        const { data: adminUser, error: adminError } = await supabase
          .from('admin_users')
          .select('is_active')
          .eq('id', data.user.id)
          .single()

        if (adminError || !adminUser || !adminUser.is_active) {
          await supabase.auth.signOut()
          throw new Error('This account is not authorized for admin access.')
        }

        router.push('/admin')
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ira-ivory flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-ira-border shadow-sm p-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-ira-teal">Admin Login</h1>
          <p className="text-sm text-ira-muted mt-2">Secure access for IRA Jewels staff</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.08em] text-ira-teal mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-ira-ivory/50 border border-ira-border px-4 py-3 text-[14px] text-ira-teal focus:outline-none focus:border-ira-teal transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-[11px] uppercase tracking-[0.08em] text-ira-teal mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-ira-ivory/50 border border-ira-border px-4 py-3 text-[14px] text-ira-teal focus:outline-none focus:border-ira-teal transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-ira-teal text-[11px] uppercase tracking-[0.08em] text-white py-3 hover:bg-ira-teal/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
