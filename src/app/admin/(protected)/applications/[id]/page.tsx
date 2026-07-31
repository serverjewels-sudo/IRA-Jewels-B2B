import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ApplicationReviewPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const adminClient = createAdminClient()

  const { data: application, error } = await supabase
    .from('buyer_applications')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !application) {
    notFound()
  }

  // Generate signed URLs for existing documents
  const docs = application.documents as Record<string, string> || {}
  const signedUrls: Record<string, string> = {}

  for (const [key, path] of Object.entries(docs)) {
    if (path) {
      const { data } = await adminClient.storage
        .from('buyer-documents')
        .createSignedUrl(path, 3600) // 1 hour expiry
        
      if (data?.signedUrl) {
        signedUrls[key] = data.signedUrl
      }
    }
  }

  const dateObj = new Date(application.created_at)
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })

  const docLabels: Record<string, string> = {
    gst_certificate: 'GST Certificate',
    pan_card: 'PAN Card',
    visiting_card: 'Visiting Card',
    store_photo: 'Store Photograph'
  }

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <Link 
          href="/admin/applications"
          className="text-[11px] uppercase tracking-[0.1em] text-ira-teal hover:text-ira-gold transition-colors inline-flex items-center gap-2"
        >
          &larr; Back to Applications
        </Link>
        <span className={`inline-flex items-center px-3 py-1.5 rounded-sm text-[11px] uppercase tracking-[0.1em] font-semibold ${
          application.status === 'Application Received' 
            ? 'bg-amber-100 text-amber-800 border border-amber-200' 
            : 'bg-gray-100 text-gray-800 border border-gray-200'
        }`}>
          {application.status}
        </span>
      </div>

      <div className="bg-white border border-ira-border shadow-sm p-8 sm:p-12 mb-10">
        <div className="border-b border-ira-border/50 pb-8 mb-8">
          <h1 className="font-serif text-4xl text-ira-teal mb-2">{application.legal_business_name}</h1>
          <p className="text-ira-muted text-sm">Submitted on {formattedDate}</p>
        </div>

        <div className="space-y-12">
          {/* Business Information */}
          <section>
            <h2 className="text-[11px] uppercase tracking-[0.1em] text-ira-gold mb-6 border-b border-ira-border/30 pb-2">Business Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-ira-muted mb-1">Trading Name</label>
                <p className="text-ira-teal text-sm">{application.trading_name || '-'}</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-ira-muted mb-1">Business Type</label>
                <p className="text-ira-teal text-sm">{application.business_type || '-'}</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-ira-muted mb-1">GST Number</label>
                <p className="text-ira-teal text-sm font-mono">{application.gst_number || '-'}</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-ira-muted mb-1">PAN Number</label>
                <p className="text-ira-teal text-sm font-mono">{application.pan_number || '-'}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase tracking-wider text-ira-muted mb-1">Address</label>
                <p className="text-ira-teal text-sm">{application.address || '-'}, {application.city}, {application.state}</p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-[11px] uppercase tracking-[0.1em] text-ira-gold mb-6 border-b border-ira-border/30 pb-2">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-ira-muted mb-1">Owner Name</label>
                <p className="text-ira-teal text-sm">{application.owner_name}</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-ira-muted mb-1">Email Address</label>
                <p className="text-ira-teal text-sm">
                  <a href={`mailto:${application.email}`} className="hover:text-ira-gold transition-colors">{application.email}</a>
                </p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-ira-muted mb-1">Mobile Number</label>
                <p className="text-ira-teal text-sm">
                  <a href={`tel:${application.mobile}`} className="hover:text-ira-gold transition-colors">{application.mobile}</a>
                </p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-ira-muted mb-1">WhatsApp Number</label>
                <p className="text-ira-teal text-sm">
                  {application.whatsapp ? <a href={`https://wa.me/${application.whatsapp.replace(/\\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-ira-gold transition-colors">{application.whatsapp}</a> : '-'}
                </p>
              </div>
            </div>
          </section>

          {/* Buying Profile */}
          <section>
            <h2 className="text-[11px] uppercase tracking-[0.1em] text-ira-gold mb-6 border-b border-ira-border/30 pb-2">Buying Profile</h2>
            <div className="grid grid-cols-1 gap-y-8">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-ira-muted mb-3">Buyer Type</label>
                <div className="flex flex-wrap gap-2">
                  {(application.buyer_type || []).map((type: string) => (
                    <span key={type} className="bg-ira-ivory border border-ira-border/50 text-ira-teal px-3 py-1 text-xs">
                      {type}
                    </span>
                  ))}
                  {(!application.buyer_type || application.buyer_type.length === 0) && <span className="text-ira-muted text-sm">-</span>}
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-ira-muted mb-3">Categories Required</label>
                <div className="flex flex-wrap gap-2">
                  {(application.categories_required || []).map((cat: string) => (
                    <span key={cat} className="bg-ira-ivory border border-ira-border/50 text-ira-teal px-3 py-1 text-xs">
                      {cat}
                    </span>
                  ))}
                  {(!application.categories_required || application.categories_required.length === 0) && <span className="text-ira-muted text-sm">-</span>}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-ira-muted mb-1">Approximate Monthly Purchase</label>
                <p className="text-ira-teal text-sm font-medium">{application.monthly_purchase_value || '-'}</p>
              </div>
            </div>
          </section>

          {/* Documents */}
          <section>
            <h2 className="text-[11px] uppercase tracking-[0.1em] text-ira-gold mb-6 border-b border-ira-border/30 pb-2">Uploaded Documents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(signedUrls).length > 0 ? (
                Object.entries(signedUrls).map(([key, url]) => (
                  <a 
                    key={key} 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border border-ira-teal/20 hover:border-ira-teal transition-colors group bg-ira-ivory/20"
                  >
                    <svg className="w-6 h-6 text-ira-teal/60 group-hover:text-ira-teal transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <span className="text-sm font-medium text-ira-teal group-hover:text-ira-gold transition-colors">
                      {docLabels[key] || key}
                    </span>
                  </a>
                ))
              ) : (
                <p className="text-sm text-ira-muted col-span-full">No documents attached.</p>
              )}
            </div>
            <p className="text-[10px] text-ira-muted mt-4">
              Note: Document links are generated securely and will expire in 1 hour. Refresh the page to generate new links.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
