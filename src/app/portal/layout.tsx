import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import PortalLogoutButton from '@/components/PortalLogoutButton'
import AutoLogout from '@/components/AutoLogout'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Deep authorization: must be an active buyer
  const { data: buyer, error } = await supabase
    .from('buyers')
    .select('company_name, is_active')
    .eq('id', user.id)
    .single()

  if (error || !buyer || !buyer.is_active) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-ira-ivory flex flex-col">
      <AutoLogout redirectTo="/login" />
      {/* Top Header */}
      <header className="bg-ira-teal text-white sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
          {/* Logo & Company Name */}
          <div className="flex items-center gap-8">
            <Link href="/portal" className="flex items-center">
              <Image 
                src="/logo.svg" 
                alt="IRA Jewels" 
                width={120} 
                height={40} 
                className="invert brightness-0"
              />
            </Link>
            <div className="hidden md:flex items-center gap-3 pl-8 border-l border-white/20">
              <span className="text-[11px] uppercase tracking-[0.1em] text-white/50">Buyer Portal</span>
              <span className="text-white/30">•</span>
              <span className="font-serif text-lg tracking-wide text-ira-gold">{buyer.company_name}</span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-white/70">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <PortalLogoutButton />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-ira-border hidden lg:block overflow-y-auto">
          <nav className="p-6 space-y-2">
            <Link href="/portal" className="flex items-center gap-3 px-4 py-3 bg-ira-ivory/50 text-ira-teal text-sm font-medium border border-ira-border">
              Dashboard
            </Link>
            <Link href="/portal/catalogue" className="flex items-center gap-3 px-4 py-3 text-ira-muted hover:bg-ira-ivory/50 hover:text-ira-teal transition-colors text-sm">
              Catalogue
            </Link>
            <Link href="/portal/quotes" className="flex items-center gap-3 px-4 py-3 text-ira-muted hover:bg-ira-ivory/50 hover:text-ira-teal transition-colors text-sm">
              Quotes
            </Link>
            <Link href="/portal/account" className="flex items-center gap-3 px-4 py-3 text-ira-muted hover:bg-ira-ivory/50 hover:text-ira-teal transition-colors text-sm">
              Account Settings
            </Link>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
