'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/portal', label: 'Dashboard' },
  { href: '/portal/catalogue', label: 'Catalogue' },
  { href: '/portal/quotes', label: 'Quotes' },
  { href: '/portal/account', label: 'Account Settings' },
]

export default function PortalSidebar() {
  const pathname = usePathname()

  return (
    <nav className="p-6 space-y-2">
      {NAV_LINKS.map((link) => {
        // EXACT match prevents /portal (dashboard) from staying highlighted
        // when visiting other routes like /portal/catalogue
        const isActive = pathname === link.href

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
              isActive
                ? 'bg-ira-ivory/50 text-ira-teal font-medium border border-ira-border'
                : 'text-ira-muted hover:bg-ira-ivory/50 hover:text-ira-teal border border-transparent'
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
