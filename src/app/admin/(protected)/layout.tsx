import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminSidebar from './AdminSidebar'
import AutoLogout from '@/components/AutoLogout'
import AdminMobileNav from '@/components/AdminMobileNav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Check admin_users table for authorization
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('id, is_active')
    .eq('id', user.id)
    .single()

  if (!adminUser || !adminUser.is_active) {
    redirect('/admin/login')
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-ira-ivory font-sans">
      <AutoLogout redirectTo="/admin/login" />
      
      {/* Mobile Header (Hidden on Desktop) */}
      <header className="lg:hidden bg-ira-teal text-white sticky top-0 z-40 border-b border-ira-teal/20">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex flex-col">
            <h2 className="font-serif text-xl tracking-wide text-ira-gold leading-tight">IRA Jewels</h2>
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/50">Admin Panel</p>
          </div>
          <AdminMobileNav />
        </div>
      </header>

      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
