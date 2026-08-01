import { createClient } from '@/lib/supabase/server'
import QuoteStatusSelect from './QuoteStatusSelect'

export default async function QuoteRequestsPage() {
  const supabase = createClient()
  
  const { data: quotes, error } = await supabase
    .from('quote_requests')
    .select(`
      id,
      product_id,
      product_sku,
      notes,
      status,
      created_at,
      buyers (
        company_name,
        buyer_id
      ),
      products (
        name
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch quote requests:', error)
  }

  const quotesList = quotes || []

  return (
    <div className="p-4 md:p-8 lg:p-10">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="font-serif text-4xl text-ira-teal mb-2">Quote Requests</h1>
          <p className="text-ira-muted">Review and manage price quotation inquiries.</p>
        </div>
      </div>

      <div className="bg-white border border-ira-border shadow-sm">
        {quotesList.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
            <svg className="w-12 h-12 text-ira-gold/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="text-lg text-ira-teal font-medium mb-1">No quote requests found</h3>
            <p className="text-sm text-ira-muted">There are currently no active quote inquiries.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-ira-ivory/50 border-b border-ira-border/50 text-[10px] uppercase tracking-[0.1em] text-ira-teal">
                <tr>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Buyer Company</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Buyer ID</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Product Name</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Product SKU</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Notes</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Submitted Date</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ira-border/50">
                {quotesList.map(quote => {
                  const dateObj = new Date(quote.created_at)
                  const formattedDate = dateObj.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })
                  
                  // Handle potential array or object from joined tables
                  const buyerData = Array.isArray(quote.buyers) ? quote.buyers[0] : quote.buyers;
                  const productData = Array.isArray(quote.products) ? quote.products[0] : quote.products;
                  
                  return (
                    <tr key={quote.id} className="hover:bg-ira-ivory/30 transition-colors">
                      <td className="px-6 py-4 text-ira-teal font-medium whitespace-nowrap">{buyerData?.company_name || '-'}</td>
                      <td className="px-6 py-4 text-ira-muted whitespace-nowrap">{buyerData?.buyer_id || '-'}</td>
                      <td className="px-6 py-4 text-ira-muted whitespace-nowrap">{productData?.name || 'Unknown Product'}</td>
                      <td className="px-6 py-4 text-ira-muted whitespace-nowrap">{quote.product_sku || '-'}</td>
                      <td className="px-6 py-4 text-ira-muted max-w-[200px]">
                        <div 
                          className="truncate cursor-help"
                          title={quote.notes || 'No notes provided'}
                        >
                          {quote.notes || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-ira-muted whitespace-nowrap">{formattedDate}</td>
                      <td className="px-6 py-4 text-right">
                        <QuoteStatusSelect 
                          quoteId={quote.id} 
                          initialStatus={quote.status || 'Requested'} 
                        />
                      </td>
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
