import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

// Define the expected shape of our joined query
interface QuoteRequest {
  id: string
  created_at: string
  status: 'requested' | 'under_review' | 'quote_sent'
  notes: string | null
  products: {
    name: string
    sku: string
  } | null
}

export default async function QuotesPage() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Double check authorization
  const { data: buyer, error: buyerError } = await supabase
    .from('buyers')
    .select('is_active')
    .eq('id', user.id)
    .single()

  if (buyerError || !buyer || !buyer.is_active) {
    redirect('/login')
  }

  // Fetch quote requests for this buyer, joined with product details
  const { data: quotes, error: quotesError } = await supabase
    .from('quote_requests')
    .select(`
      id,
      created_at,
      status,
      notes,
      products (
        name,
        sku
      )
    `)
    .eq('buyer_id', user.id)
    .order('created_at', { ascending: false })

  if (quotesError) {
    console.error('Failed to fetch quote requests:', quotesError)
  }

  // Helper to get status styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'requested':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Requested
          </span>
        )
      case 'under_review':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Under Review
          </span>
        )
      case 'quote_sent':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
            Quote Sent
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        )
    }
  }

  // Helper to format date
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-ira-teal mb-3">My Quote Requests</h1>
        <p className="text-ira-muted text-lg">View the status of your bespoke and bulk order inquiries.</p>
      </div>

      {!quotes || quotes.length === 0 ? (
        <div className="bg-white border border-ira-border p-12 text-center">
          <svg className="w-12 h-12 text-ira-gold/50 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="font-serif text-2xl text-ira-teal mb-3">No Quotes Requested</h3>
          <p className="text-ira-muted mb-8 max-w-md mx-auto">
            You haven&apos;t requested any quotes yet. Browse the catalogue to get started.
          </p>
          <Link 
            href="/portal/catalogue"
            className="inline-block px-8 py-3 bg-ira-teal text-white text-[11px] uppercase tracking-[0.1em] hover:bg-ira-teal/90 transition-colors"
          >
            Browse Catalogue
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-ira-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-ira-ivory/50 border-b border-ira-border/50 text-[11px] uppercase tracking-[0.08em] text-ira-muted">
                  <th className="px-6 py-4 font-medium">Product Details</th>
                  <th className="px-6 py-4 font-medium">Notes</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Submitted Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ira-border/30">
                {(quotes as unknown as QuoteRequest[]).map((quote) => (
                  <tr key={quote.id} className="hover:bg-ira-ivory/20 transition-colors">
                    <td className="px-6 py-5 align-top">
                      <div className="text-ira-teal font-medium mb-1">
                        {quote.products?.name || 'Unknown Product'}
                      </div>
                      <div className="text-[11px] uppercase tracking-wider text-ira-muted">
                        SKU: {quote.products?.sku || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <p className="text-sm text-ira-muted max-w-sm">
                        {quote.notes || '—'}
                      </p>
                    </td>
                    <td className="px-6 py-5 align-top">
                      {getStatusBadge(quote.status)}
                    </td>
                    <td className="px-6 py-5 align-top">
                      <span className="text-sm text-ira-muted whitespace-nowrap">
                        {formatDate(quote.created_at)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
