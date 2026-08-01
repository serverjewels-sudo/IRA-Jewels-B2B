import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPlaceholderImage } from '@/lib/placeholders'

export default async function CataloguePage() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get buyer's tier
  const { data: buyer, error: buyerError } = await supabase
    .from('buyers')
    .select('price_tier, is_active')
    .eq('id', user.id)
    .single()

  if (buyerError || !buyer || !buyer.is_active) {
    redirect('/login')
  }

  const { data: products, error: productsError } = await supabase
    .from('products_buyer_view')
    .select('id, name, slug, sku, category, gold_purity, images, price')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (productsError) {
    console.error('Failed to fetch catalogue:', productsError)
  }

  return (
    <div className="p-8 lg:p-12">
      <div className="mb-12 border-b border-ira-border/50 pb-8">
        <h1 className="font-serif text-4xl lg:text-5xl text-ira-teal mb-4">Full Catalogue</h1>
        <p className="text-ira-muted text-sm max-w-2xl leading-relaxed">
          Browse our complete range, including private listings and exclusive collections. 
          Prices shown are specific to your approved B2B tier.
        </p>
      </div>

      {!products || products.length === 0 ? (
        <div className="text-center py-24 bg-white border border-ira-border">
          <svg className="w-12 h-12 text-ira-gold/50 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="font-serif text-2xl text-ira-teal mb-2">No Products Available</h3>
          <p className="text-ira-muted text-sm">We are currently updating our catalogue. Please check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col bg-white border border-ira-border hover:border-ira-teal transition-colors">
              <div className="relative aspect-square w-full bg-ira-ivory/50 overflow-hidden border-b border-ira-border">
                {product.images && product.images.length > 0 ? (
                  <Image 
                    src={product.images[0]} 
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <Image 
                    src={getPlaceholderImage(product.category)}
                    alt={`${product.category} placeholder`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                )}
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="font-serif text-lg text-ira-teal leading-tight">{product.name}</h3>
                  <span className="text-[9px] uppercase tracking-wider text-ira-teal font-medium whitespace-nowrap bg-ira-ivory border border-ira-border/50 px-2 py-0.5">
                    {product.sku}
                  </span>
                </div>
                
                <div className="text-[10px] uppercase tracking-[0.08em] text-ira-muted mb-6 flex gap-2">
                  <span>{product.category}</span>
                  <span className="text-ira-border">•</span>
                  <span>{product.gold_purity}</span>
                </div>
                
                <div className="mt-auto pt-4 border-t border-ira-border/50 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                  <span className="text-ira-teal font-medium tracking-wide whitespace-nowrap">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price)}
                  </span>
                  
                  <Link 
                    href={`/portal/catalogue/${product.slug}`}
                    className="text-[10px] uppercase tracking-[0.1em] text-ira-gold hover:text-ira-teal transition-colors flex items-center gap-1.5 whitespace-nowrap"
                  >
                    View Details
                    <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
