import { createClient } from '@/lib/supabase/server'

export default async function BuyersPage() {
  const supabase = createClient()
  
  const { data: buyers, error } = await supabase
    .from('buyers')
    .select(`
      id,
      buyer_id,
      company_name,
      price_tier,
      is_active,
      created_at,
      buyer_applications (
        owner_name,
        email,
        mobile
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch buyers:', error)
  }

  const buyersList = buyers || []

  return (
    <div className="p-4 md:p-8 lg:p-10">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="font-serif text-4xl text-ira-teal mb-2">Buyers</h1>
          <p className="text-ira-muted">View all approved B2B trade accounts.</p>
        </div>
      </div>

      <div className="bg-white border border-ira-border shadow-sm">
        {buyersList.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
            <svg className="w-12 h-12 text-ira-gold/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 className="text-lg text-ira-teal font-medium mb-1">No buyers found</h3>
            <p className="text-sm text-ira-muted">There are currently no approved trade accounts.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-ira-ivory/50 border-b border-ira-border/50 text-[10px] uppercase tracking-[0.1em] text-ira-teal">
                <tr>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Buyer ID</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Company Name</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Owner Name</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Email</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Mobile</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Price Tier</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Approved Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ira-border/50">
                {buyersList.map(buyer => {
                  const dateObj = new Date(buyer.created_at)
                  const formattedDate = dateObj.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })
                  
                  // Handle potential array or object from the joined table
                  const appData = Array.isArray(buyer.buyer_applications) 
                    ? buyer.buyer_applications[0] 
                    : buyer.buyer_applications;
                  
                  return (
                    <tr key={buyer.id} className="hover:bg-ira-ivory/30 transition-colors">
                      <td className="px-6 py-4 text-ira-teal font-medium whitespace-nowrap">{buyer.buyer_id || '-'}</td>
                      <td className="px-6 py-4 text-ira-teal font-medium whitespace-nowrap">{buyer.company_name}</td>
                      <td className="px-6 py-4 text-ira-muted whitespace-nowrap">{appData?.owner_name || '-'}</td>
                      <td className="px-6 py-4 text-ira-muted whitespace-nowrap">{appData?.email || '-'}</td>
                      <td className="px-6 py-4 text-ira-muted whitespace-nowrap">{appData?.mobile || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-1 rounded-sm text-[10px] uppercase tracking-[0.08em] bg-ira-gold/10 text-ira-gold border border-ira-gold/20 font-semibold">
                          {buyer.price_tier || 'TIER_1'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-sm text-[10px] uppercase tracking-[0.08em] ${
                          buyer.is_active 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                          {buyer.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-ira-muted whitespace-nowrap">{formattedDate}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
