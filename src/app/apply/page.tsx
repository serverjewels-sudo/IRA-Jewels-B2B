import { Metadata } from 'next'
import TradeApplicationForm from './TradeApplicationForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Apply for Trade Account — IRA Jewels',
  description: 'Apply for a B2B trade account with IRA Jewels. Secure wholesale catalogues and dependable production support for retailers, wholesalers, and jewellery brands.',
}

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-ira-ivory pt-[120px] pb-24">
      <div className="w-[calc(100%-56px)] mx-auto">
        <div className="mb-12">
          <Link href="/" className="text-[11px] uppercase tracking-[0.1em] text-ira-teal/70 hover:text-ira-teal transition-colors mb-6 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="font-serif text-4xl lg:text-5xl text-ira-teal mb-4">Apply for Trade Account</h1>
          <p className="text-ira-teal/80 max-w-2xl">
            Partner with IRA Jewels for dependable manufacturing and wholesale sourcing. 
            Complete the application below and our business team will review your details promptly.
          </p>
        </div>

        <TradeApplicationForm />
      </div>
    </main>
  )
}
