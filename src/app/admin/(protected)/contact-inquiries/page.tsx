import { createClient } from '@/lib/supabase/server'
import ExpandableRow from './ExpandableRow'

export default async function ContactInquiriesPage() {
  const supabase = createClient()
  
  const { data: inquiries, error } = await supabase
    .from('contact_inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch contact inquiries:', error)
  }

  const inquiriesList = inquiries || []

  return (
    <div className="p-4 md:p-8 lg:p-10">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="font-serif text-4xl text-ira-teal mb-2">Contact Inquiries</h1>
          <p className="text-ira-muted">Review messages and requirements from prospective clients.</p>
        </div>
      </div>

      <div className="bg-white border border-ira-border shadow-sm">
        {inquiriesList.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
            <svg className="w-12 h-12 text-ira-gold/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg text-ira-teal font-medium mb-1">No inquiries found</h3>
            <p className="text-sm text-ira-muted">There are currently no general contact inquiries.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-ira-ivory/50 border-b border-ira-border/50 text-[10px] uppercase tracking-[0.1em] text-ira-teal">
                <tr>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Name</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Company</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Email</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Phone</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Requirement</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Submitted Date</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap w-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ira-border/50">
                {inquiriesList.map(inquiry => (
                  <ExpandableRow key={inquiry.id} inquiry={inquiry} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
