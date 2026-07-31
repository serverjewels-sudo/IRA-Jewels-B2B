import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function ApplicationsPage() {
  const supabase = createClient()
  
  const { data: applications, error } = await supabase
    .from('buyer_applications')
    .select('id, legal_business_name, email, business_type, created_at, status')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch applications:', error)
  }

  const apps = applications || []

  return (
    <div className="p-10">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="font-serif text-4xl text-ira-teal mb-2">Applications</h1>
          <p className="text-ira-muted">Review and manage pending trade account requests.</p>
        </div>
      </div>

      <div className="bg-white border border-ira-border shadow-sm">
        {apps.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
            <svg className="w-12 h-12 text-ira-gold/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg text-ira-teal font-medium mb-1">No applications found</h3>
            <p className="text-sm text-ira-muted">There are currently no trade account applications.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-ira-ivory/50 border-b border-ira-border/50 text-[10px] uppercase tracking-[0.1em] text-ira-teal">
                <tr>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Company Name</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Email</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Business Type</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Date Submitted</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 font-semibold text-right whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ira-border/50">
                {apps.map(app => {
                  const dateObj = new Date(app.created_at)
                  const formattedDate = dateObj.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })
                  
                  return (
                    <tr key={app.id} className="hover:bg-ira-ivory/30 transition-colors">
                      <td className="px-6 py-4 text-ira-teal font-medium whitespace-nowrap">{app.legal_business_name}</td>
                      <td className="px-6 py-4 text-ira-muted whitespace-nowrap">{app.email}</td>
                      <td className="px-6 py-4 text-ira-muted whitespace-nowrap">{app.business_type || '-'}</td>
                      <td className="px-6 py-4 text-ira-muted whitespace-nowrap">{formattedDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-sm text-[10px] uppercase tracking-[0.08em] ${
                          app.status === 'Application Received' 
                            ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                            : 'bg-gray-100 text-gray-800 border border-gray-200'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <Link 
                          href={`/admin/applications/${app.id}`}
                          className="text-[11px] uppercase tracking-[0.08em] text-ira-gold hover:text-ira-teal transition-colors font-semibold"
                        >
                          Review &rarr;
                        </Link>
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
