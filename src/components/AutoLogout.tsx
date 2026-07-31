'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

interface AutoLogoutProps {
  redirectTo: string
}

// 30 minutes in milliseconds
const INACTIVITY_TIMEOUT = 30 * 60 * 1000

export default function AutoLogout({ redirectTo }: AutoLogoutProps) {
  const router = useRouter()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleLogout = async () => {
      await supabase.auth.signOut()
      router.push(redirectTo)
      router.refresh()
    }

    const resetTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(handleLogout, INACTIVITY_TIMEOUT)
    }

    // Set initial timer
    resetTimer()

    // Events to track for activity
    const events = ['mousemove', 'keydown', 'click', 'scroll']

    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, resetTimer, { passive: true })
    })

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      events.forEach(event => {
        window.removeEventListener(event, resetTimer)
      })
    }
  }, [redirectTo, router])

  // This component doesn't render any UI
  return null
}
