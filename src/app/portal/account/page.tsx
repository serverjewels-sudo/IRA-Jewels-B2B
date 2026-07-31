import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ChangePasswordForm from '@/components/ChangePasswordForm'

export default async function AccountPage() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch buyer data with joined application data
  const { data: buyer, error } = await supabase
    .from('buyers')
    .select(`
      company_name,
      buyer_id,
      price_tier,
      created_at,
      buyer_applications:application_id (
        owner_name,
        email,
        mobile,
        whatsapp
      )
    `)
    .eq('id', user.id)
    .single()

  if (error || !buyer) {
    console.error('Error fetching buyer account details:', error)
    redirect('/login')
  }

  // Extract application data
  // Using type assertion or handling potential array response from one-to-one/many join
  const applicationData = Array.isArray(buyer.buyer_applications) 
    ? buyer.buyer_applications[0] 
    : buyer.buyer_applications

  const formattedDate = new Date(buyer.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-ira-teal mb-3">Account Details</h1>
        <p className="text-ira-muted text-lg">Manage your secure B2B profile and preferences</p>
      </div>

      <div className="space-y-12">
        {/* Read-Only Info Card */}
        <div className="bg-white border border-ira-border overflow-hidden">
          <div className="p-8 border-b border-ira-border/50 bg-ira-ivory/30 flex justify-between items-start">
            <div>
              <h2 className="font-serif text-2xl text-ira-teal mb-1">{buyer.company_name}</h2>
              <p className="text-[11px] uppercase tracking-[0.1em] text-ira-muted">
                Buyer ID: {buyer.buyer_id}
              </p>
            </div>
            {buyer.price_tier && (
              <div className="px-4 py-1.5 bg-ira-gold text-white text-[11px] uppercase tracking-[0.1em] font-medium">
                {buyer.price_tier.replace('_', ' ')} Tier
              </div>
            )}
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div>
                <p className="text-[11px] uppercase tracking-[0.08em] text-ira-muted mb-1">Owner Name</p>
                <p className="text-ira-teal font-medium">{applicationData?.owner_name || '—'}</p>
              </div>
              
              <div>
                <p className="text-[11px] uppercase tracking-[0.08em] text-ira-muted mb-1">Email Address</p>
                <p className="text-ira-teal font-medium">{applicationData?.email || '—'}</p>
              </div>
              
              <div>
                <p className="text-[11px] uppercase tracking-[0.08em] text-ira-muted mb-1">Mobile Number</p>
                <p className="text-ira-teal font-medium">{applicationData?.mobile || '—'}</p>
              </div>
              
              <div>
                <p className="text-[11px] uppercase tracking-[0.08em] text-ira-muted mb-1">WhatsApp Number</p>
                <p className="text-ira-teal font-medium">{applicationData?.whatsapp || '—'}</p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.08em] text-ira-muted mb-1">Member Since</p>
                <p className="text-ira-teal font-medium">{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  )
}
