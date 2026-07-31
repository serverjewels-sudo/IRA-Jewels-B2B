import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminSidebar from './AdminSidebar'

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
    <div className="flex min-h-screen bg-ira-ivory font-sans">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
