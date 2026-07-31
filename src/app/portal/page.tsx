import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function BuyerDashboard() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: buyer, error } = await supabase
    .from('buyers')
    .select('company_name, buyer_id')
    .eq('id', user.id)
    .single()

  if (error || !buyer) {
    redirect('/login')
  }

  return (
    <div className="p-8 lg:p-12 max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="font-serif text-4xl lg:text-5xl text-ira-teal mb-3">Welcome, {buyer.company_name}</h1>
        <p className="text-ira-muted text-sm flex items-center gap-2">
          Buyer ID: <span className="font-mono text-ira-gold bg-ira-gold/10 px-2 py-0.5">{buyer.buyer_id}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Catalogue Card */}
        <div className="bg-white border border-ira-border p-8 hover:border-ira-teal transition-colors group flex flex-col h-full">
          <div className="mb-6 bg-ira-ivory w-12 h-12 flex items-center justify-center rounded-sm">
            <svg className="w-6 h-6 text-ira-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <h3 className="font-serif text-2xl text-ira-teal mb-3">Private Catalogue</h3>
          <p className="text-sm text-ira-muted mb-8 flex-grow">Browse our exclusive collections with your custom B2B pricing and real-time inventory.</p>
          <div className="inline-block border border-ira-border/50 bg-ira-ivory/50 px-4 py-2 text-[10px] uppercase tracking-wider text-ira-muted w-fit">
            Coming Soon
          </div>
        </div>

        {/* Quotes Card */}
        <div className="bg-white border border-ira-border p-8 hover:border-ira-teal transition-colors group flex flex-col h-full">
          <div className="mb-6 bg-ira-ivory w-12 h-12 flex items-center justify-center rounded-sm">
            <svg className="w-6 h-6 text-ira-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-serif text-2xl text-ira-teal mb-3">Quotations</h3>
          <p className="text-sm text-ira-muted mb-8 flex-grow">View and manage your custom quotes, bulk orders, and bespoke manufacturing requests.</p>
          <div className="inline-block border border-ira-border/50 bg-ira-ivory/50 px-4 py-2 text-[10px] uppercase tracking-wider text-ira-muted w-fit">
            Coming Soon
          </div>
        </div>

        {/* Account Card */}
        <div className="bg-white border border-ira-border p-8 hover:border-ira-teal transition-colors group flex flex-col h-full">
          <div className="mb-6 bg-ira-ivory w-12 h-12 flex items-center justify-center rounded-sm">
            <svg className="w-6 h-6 text-ira-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="font-serif text-2xl text-ira-teal mb-3">Settings</h3>
          <p className="text-sm text-ira-muted mb-8 flex-grow">Manage your company profile, shipping addresses, and team member access.</p>
          <div className="inline-block border border-ira-border/50 bg-ira-ivory/50 px-4 py-2 text-[10px] uppercase tracking-wider text-ira-muted w-fit">
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  )
}
