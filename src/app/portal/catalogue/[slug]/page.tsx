import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import ProductGallery from '@/components/ProductGallery'

export default async function CatalogueDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get buyer details needed for watermark and validation
  const { data: buyer, error: buyerError } = await supabase
    .from('buyers')
    .select('company_name, buyer_id, is_active')
    .eq('id', user.id)
    .single()

  if (buyerError || !buyer || !buyer.is_active) {
    redirect('/login')
  }

  // Fetch all product fields from the scoped view
  const { data: product, error: productError } = await supabase
    .from('products_buyer_view')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (productError || !product) {
    notFound()
  }

  // Formatting helpers
  const categoryName = product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : '';
  const priceFormatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price);

  return (
    <div className="p-8 lg:p-12 max-w-[1320px] mx-auto min-h-[calc(100vh-200px)]">
      
      {/* Breadcrumb */}
      <div className="mb-10 text-[13px] text-ira-muted tracking-[0.08em] uppercase">
        <Link href="/portal/catalogue" className="hover:text-ira-teal transition-colors">Catalogue</Link>
        <span className="mx-2">/</span>
        <span className="text-ira-text font-medium">{product.name || product.sku}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        
        {/* Left Column: Image Gallery with Watermark */}
        <div className="w-full lg:w-1/2">
          <ProductGallery 
            images={product.images || []} 
            category={product.category}
            buyerCompanyName={buyer.company_name}
            buyerId={buyer.buyer_id}
            productName={product.name || product.sku}
          />
        </div>

        {/* Right Column: Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col pt-2 lg:pt-6">
          <div className="mb-8">
            <h1 className="font-serif text-[clamp(32px,4vw,48px)] text-ira-teal leading-[1.1] mb-3">
              {product.name}
            </h1>
            <p className="text-[14px] text-ira-muted tracking-wider uppercase">
              SKU: <span className="text-ira-text font-medium">{product.sku}</span>
            </p>
          </div>

          <div className="mb-10">
            <p className="text-[clamp(24px,3vw,32px)] text-ira-teal font-medium tracking-wide">
              {priceFormatted}
            </p>
          </div>
          
          {/* Specifications Table */}
          <div className="space-y-4 mb-10 text-[15px] text-ira-text border-t border-ira-border pt-6">
            <div className="grid grid-cols-[160px_1fr] border-b border-ira-border/50 pb-3">
              <span className="text-ira-muted uppercase text-[12px] tracking-wider self-center">Category</span>
              <span className="font-medium">{categoryName}</span>
            </div>
            
            {product.gold_purity && (
              <div className="grid grid-cols-[160px_1fr] border-b border-ira-border/50 pb-3">
                <span className="text-ira-muted uppercase text-[12px] tracking-wider self-center">Gold Purity</span>
                <span className="font-medium">{product.gold_purity}</span>
              </div>
            )}
            
            {(product.approx_gold_weight_min || product.approx_gold_weight_max) && (
              <div className="grid grid-cols-[160px_1fr] border-b border-ira-border/50 pb-3">
                <span className="text-ira-muted uppercase text-[12px] tracking-wider self-center">Est. Gold Wt.</span>
                <span className="font-medium">
                  {product.approx_gold_weight_min ? `${product.approx_gold_weight_min}g` : ''} 
                  {product.approx_gold_weight_min && product.approx_gold_weight_max ? ' - ' : ''} 
                  {product.approx_gold_weight_max ? `${product.approx_gold_weight_max}g` : ''}
                </span>
              </div>
            )}
            
            {product.approx_diamond_weight && (
              <div className="grid grid-cols-[160px_1fr] border-b border-ira-border/50 pb-3">
                <span className="text-ira-muted uppercase text-[12px] tracking-wider self-center">Est. Diamond Wt.</span>
                <span className="font-medium">{product.approx_diamond_weight} ct</span>
              </div>
            )}
            
            {product.diamond_type && (
              <div className="grid grid-cols-[160px_1fr] border-b border-ira-border/50 pb-3">
                <span className="text-ira-muted uppercase text-[12px] tracking-wider self-center">Diamond Type</span>
                <span className="font-medium">{product.diamond_type}</span>
              </div>
            )}
          </div>
          
          {product.description && (
            <div className="text-ira-muted leading-relaxed text-[15px]">
              <p>{product.description}</p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  )
}
