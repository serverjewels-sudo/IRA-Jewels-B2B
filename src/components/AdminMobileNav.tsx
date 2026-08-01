'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const NAV_LINKS = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Products', href: '/admin/products' },
  { name: 'Applications', href: '/admin/applications' },
  { name: 'Buyers', href: '/admin/buyers' },
  { name: 'Quotes', href: '/admin/quotes' },
  { name: 'Contact Inquiries', href: '/admin/contact-inquiries' },
]

export default function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 -mr-2 text-white/70 hover:text-white transition-colors"
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Full-screen Overlay Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-ira-teal flex flex-col text-white">
          {/* Header inside overlay */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
            <span className="font-serif text-2xl tracking-wide text-ira-gold">IRA Jewels</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 -mr-2 text-white/70 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-6 space-y-4 bg-ira-teal">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center w-full px-5 py-4 text-lg transition-colors border-l-4 ${
                    isActive
                      ? 'bg-white/10 text-ira-gold border-ira-gold font-medium'
                      : 'border-transparent text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Logout Section */}
          <div className="p-6 border-t border-white/10">
            <button
              onClick={() => {
                setIsOpen(false)
                handleLogout()
              }}
              className="w-full text-left px-5 py-4 text-lg text-red-300 hover:bg-white/5 hover:text-red-200 transition-colors flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
