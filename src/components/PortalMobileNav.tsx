'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/portal', label: 'Dashboard' },
  { href: '/portal/catalogue', label: 'Catalogue' },
  { href: '/portal/quotes', label: 'Quotes' },
  { href: '/portal/account', label: 'Account Settings' },
]

export default function PortalMobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

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
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Full-screen Overlay Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-ira-ivory flex flex-col">
          {/* Header inside overlay */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-ira-border bg-ira-teal text-white">
            <span className="font-serif text-lg tracking-wide text-ira-gold">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 -mr-2 text-white/70 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center w-full px-5 py-4 text-lg transition-colors border ${
                    isActive
                      ? 'bg-ira-ivory border-ira-border text-ira-teal font-medium'
                      : 'border-transparent text-ira-muted hover:bg-ira-ivory hover:text-ira-teal'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </div>
  )
}
