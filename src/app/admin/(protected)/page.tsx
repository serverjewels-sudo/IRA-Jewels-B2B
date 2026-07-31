import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = createClient()
  
  // Fetch pending applications count
  const { count, error } = await supabase
    .from('buyer_applications')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'Application Received')

  const pendingCount = error ? 0 : count || 0

  // Fetch active products count
  const { count: productsCountRes, error: productsError } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  const productsCount = productsError ? 0 : productsCountRes || 0

  // Fetch active buyers count
  const { count: buyersCountRes, error: buyersError } = await supabase
    .from('buyers')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  const buyersCount = buyersError ? 0 : buyersCountRes || 0

  // Fetch pending quotes count
  const { count: quotesCountRes, error: quotesError } = await supabase
    .from('quote_requests')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'Requested')

  const quotesCount = quotesError ? 0 : quotesCountRes || 0

  return (
    <div className="p-10">
      <h1 className="font-serif text-4xl text-ira-teal mb-2">Welcome Back</h1>
      <p className="text-ira-muted mb-10">Here&apos;s what&apos;s happening at IRA Jewels today.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Applications Stat Card */}
        <div className="bg-white border border-ira-border p-6 shadow-sm">
          <h3 className="text-[11px] uppercase tracking-[0.08em] text-ira-gold mb-1">Pending Applications</h3>
          <div className="flex items-end gap-3 mt-3">
            <span className="text-4xl font-serif text-ira-teal leading-none">{pendingCount}</span>
            <span className="text-sm text-ira-muted mb-1">awaiting review</span>
          </div>
        </div>

        {/* Products Stat Card */}
        <Link href="/admin/products" className="bg-white border border-ira-border p-6 shadow-sm hover:shadow-md transition-shadow block">
          <h3 className="text-[11px] uppercase tracking-[0.08em] text-ira-gold mb-1">Active Products</h3>
          <div className="flex items-end gap-3 mt-3">
            <span className="text-4xl font-serif text-ira-teal leading-none">{productsCount}</span>
            <span className="text-sm text-ira-muted mb-1">in catalogue</span>
          </div>
        </Link>

        {/* Buyers Stat Card */}
        <Link href="/admin/buyers" className="bg-white border border-ira-border p-6 shadow-sm hover:shadow-md transition-shadow block">
          <h3 className="text-[11px] uppercase tracking-[0.08em] text-ira-gold mb-1">Active Buyers</h3>
          <div className="flex items-end gap-3 mt-3">
            <span className="text-4xl font-serif text-ira-teal leading-none">{buyersCount}</span>
            <span className="text-sm text-ira-muted mb-1">approved accounts</span>
          </div>
        </Link>

        {/* Quotes Stat Card */}
        <Link href="/admin/quotes" className="bg-white border border-ira-border p-6 shadow-sm hover:shadow-md transition-shadow block">
          <h3 className="text-[11px] uppercase tracking-[0.08em] text-ira-gold mb-1">Pending Quotes</h3>
          <div className="flex items-end gap-3 mt-3">
            <span className="text-4xl font-serif text-ira-teal leading-none">{quotesCount}</span>
            <span className="text-sm text-ira-muted mb-1">needs pricing</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
