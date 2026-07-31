'use client'

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

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-64 bg-ira-teal text-white flex flex-col h-screen sticky top-0 border-r border-ira-teal/20">
      <div className="p-6 border-b border-white/10">
        <h2 className="font-serif text-2xl tracking-wide text-ira-gold">IRA Jewels</h2>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {NAV_LINKS.map(link => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-4 py-3 text-sm transition-colors ${
                isActive
                  ? 'bg-white/10 text-ira-gold border-l-2 border-ira-gold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
              }`}
            >
              {link.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 text-sm text-red-300 hover:bg-white/5 hover:text-red-200 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Logout
        </button>
      </div>
    </aside>
  )
}
