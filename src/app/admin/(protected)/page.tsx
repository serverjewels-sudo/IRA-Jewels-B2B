import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = createClient()
  
  // Fetch pending applications count
  const { count, error } = await supabase
    .from('buyer_applications')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'Application Received')

  const pendingCount = error ? 0 : count || 0

  return (
    <div className="p-10">
      <h1 className="font-serif text-4xl text-ira-teal mb-2">Welcome Back</h1>
      <p className="text-ira-muted mb-10">Here's what's happening at IRA Jewels today.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Applications Stat Card */}
        <div className="bg-white border border-ira-border p-6 shadow-sm">
          <h3 className="text-[11px] uppercase tracking-[0.08em] text-ira-gold mb-1">Pending Applications</h3>
          <div className="flex items-end gap-3 mt-3">
            <span className="text-4xl font-serif text-ira-teal leading-none">{pendingCount}</span>
            <span className="text-sm text-ira-muted mb-1">awaiting review</span>
          </div>
        </div>

        {/* Placeholders */}
        <div className="bg-ira-ivory/50 border border-ira-border/50 border-dashed p-6 flex flex-col justify-center items-center text-center min-h-[120px]">
          <h3 className="text-sm text-ira-teal font-medium mb-1">Products</h3>
          <span className="text-xs text-ira-muted uppercase tracking-wider">Coming Soon</span>
        </div>

        <div className="bg-ira-ivory/50 border border-ira-border/50 border-dashed p-6 flex flex-col justify-center items-center text-center min-h-[120px]">
          <h3 className="text-sm text-ira-teal font-medium mb-1">Buyers</h3>
          <span className="text-xs text-ira-muted uppercase tracking-wider">Coming Soon</span>
        </div>

        <div className="bg-ira-ivory/50 border border-ira-border/50 border-dashed p-6 flex flex-col justify-center items-center text-center min-h-[120px]">
          <h3 className="text-sm text-ira-teal font-medium mb-1">Quotes</h3>
          <span className="text-xs text-ira-muted uppercase tracking-wider">Coming Soon</span>
        </div>
      </div>
    </div>
  )
}
