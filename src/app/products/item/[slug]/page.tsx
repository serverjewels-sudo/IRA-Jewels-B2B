import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getPlaceholderImage } from "@/lib/placeholders";

function formatCategoryName(slug: string) {
  if (!slug) return '';
  if (slug === "mens-jewellery") return "Men's Jewellery";
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  
  // Fetch the specific product
  const { data: product, error } = await supabase
    .from('products_public')
    .select('*')
    .eq('slug', params.slug)
    .single();
    
  if (error || !product) {
    notFound();
  }

  // Fetch related products (same category, excluding current product)
  const { data: relatedProductsData } = await supabase
    .from('products_public')
    .select('*')
    .eq('category', product.category)
    .neq('slug', product.slug)
    .limit(4);
    
  const relatedProducts = relatedProductsData || [];
  const categoryName = formatCategoryName(product.category);

  const hasMainImage = product.images && product.images.length > 0;
  const mainImageUrl = hasMainImage ? product.images[0] : getPlaceholderImage(product.category, 600);

  return (
    <div className="min-h-screen bg-ira-ivory flex flex-col">
      <Header />
      
      <main className="flex-grow pt-[140px] pb-[120px] max-md:pt-[120px] max-md:pb-[78px]">
        {/* Breadcrumb */}
        <section className="w-[min(1320px,calc(100%-56px))] mx-auto mb-10">
          <Reveal>
            <p className="text-[13px] text-ira-muted tracking-[0.08em] uppercase">
              <Link href="/" className="hover:text-ira-teal transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="hover:text-ira-teal transition-colors">Products</Link>
              <span className="mx-2">/</span>
              <Link href={`/products/${product.category}`} className="hover:text-ira-teal transition-colors">{categoryName}</Link>
              <span className="mx-2">/</span>
              <span className="text-ira-text font-medium">{product.name || product.sku}</span>
            </p>
          </Reveal>
        </section>

        {/* Product Details */}
        <section className="w-[min(1320px,calc(100%-56px))] mx-auto mb-32">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            
            {/* Left Column: Image */}
            <div className="w-full lg:w-1/2">
              <Reveal>
                <div className="aspect-[4/5] bg-[#e5e0d7] w-full max-w-[600px] max-h-[600px] overflow-hidden">
                  <img 
                    src={mainImageUrl} 
                    alt={product.name || product.sku || 'Product Image'} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
            
            {/* Right Column: Info */}
            <div className="w-full lg:w-1/2 flex flex-col lg:pt-4">
              <Reveal delay={100}>
                <h1 className="font-serif text-[clamp(32px,4vw,48px)] text-ira-teal leading-[1.1] mb-2">
                  {product.name || product.sku}
                </h1>
                <p className="text-[14px] text-ira-muted mb-8 tracking-wider">
                  SKU: {product.sku || 'N/A'}
                </p>
                
                <div className="space-y-4 mb-8 text-[16px] text-ira-text">
                  <div className="grid grid-cols-[140px_1fr] border-b border-ira-border pb-3">
                    <span className="text-ira-muted uppercase text-[12px] tracking-wider self-center">Category</span>
                    <span className="font-medium">{categoryName}</span>
                  </div>
                  
                  {product.gold_purity && (
                    <div className="grid grid-cols-[140px_1fr] border-b border-ira-border pb-3">
                      <span className="text-ira-muted uppercase text-[12px] tracking-wider self-center">Gold Purity</span>
                      <span className="font-medium">{product.gold_purity}</span>
                    </div>
                  )}
                  
                  {(product.min_gold_weight || product.max_gold_weight) && (
                    <div className="grid grid-cols-[140px_1fr] border-b border-ira-border pb-3">
                      <span className="text-ira-muted uppercase text-[12px] tracking-wider self-center">Est. Gold Wt.</span>
                      <span className="font-medium">
                        {product.min_gold_weight ? `${product.min_gold_weight}g` : ''} 
                        {product.min_gold_weight && product.max_gold_weight ? ' - ' : ''} 
                        {product.max_gold_weight ? `${product.max_gold_weight}g` : ''}
                      </span>
                    </div>
                  )}
                  
                  {product.approx_diamond_weight && (
                    <div className="grid grid-cols-[140px_1fr] border-b border-ira-border pb-3">
                      <span className="text-ira-muted uppercase text-[12px] tracking-wider self-center">Est. Diamond Wt.</span>
                      <span className="font-medium">{product.approx_diamond_weight} ct</span>
                    </div>
                  )}
                  
                  {product.diamond_type && (
                    <div className="grid grid-cols-[140px_1fr] border-b border-ira-border pb-3">
                      <span className="text-ira-muted uppercase text-[12px] tracking-wider self-center">Diamond Type</span>
                      <span className="font-medium">{product.diamond_type}</span>
                    </div>
                  )}
                </div>
                
                {product.description && (
                  <div className="mb-10 text-ira-muted leading-relaxed">
                    <p>{product.description}</p>
                  </div>
                )}
                
                <div className="flex flex-col gap-4 mt-auto max-w-[400px]">
                  <Link 
                    href="/login"
                    className="w-full bg-ira-teal text-white h-[48px] rounded-[5px] flex items-center justify-center text-[14px] uppercase tracking-[0.08em] hover:-translate-y-0.5 transition-transform"
                  >
                    Login to View Full Details
                  </Link>
                  <Link 
                    href="/apply"
                    className="w-full bg-transparent border border-ira-teal text-ira-teal h-[48px] rounded-[5px] flex items-center justify-center text-[14px] uppercase tracking-[0.08em] hover:bg-ira-teal hover:text-white transition-colors"
                  >
                    Apply for B2B Account
                  </Link>
                </div>
              </Reveal>
            </div>
            
          </div>
        </section>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <section className="w-[min(1320px,calc(100%-56px))] mx-auto">
            <Reveal>
              <h2 className="font-serif text-[32px] text-ira-teal mb-8 text-center">
                You May Also Like
              </h2>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {relatedProducts.map((related, index) => {
                  const hasImage = related.images && related.images.length > 0;
                  const imageUrl = hasImage ? related.images[0] : getPlaceholderImage(product.category, 400);

                  return (
                  <Reveal key={related.id || related.slug} delay={(index % 4) * 50}>
                    <article className="bg-white border border-ira-border hover:border-ira-gold transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                      <Link href={`/products/item/${related.slug}`} className="flex flex-col flex-grow">
                        <div className="aspect-[4/5] bg-[#e5e0d7] overflow-hidden relative">
                          <img 
                            src={imageUrl} 
                            alt={related.sku || 'Product'} 
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        
                        <div className="p-5 flex flex-col flex-grow">
                          <div className="mb-4">
                            <span className="text-[11px] text-ira-gold uppercase tracking-[0.15em] font-bold block mb-1">
                              {categoryName}
                            </span>
                            <h2 className="font-serif text-[22px] text-ira-text m-0 mb-1">
                              {related.sku || 'N/A'}
                            </h2>
                            {related.gold_purity && (
                              <p className="text-[13px] text-ira-muted m-0">
                                {related.gold_purity}
                              </p>
                            )}
                          </div>
                          
                          <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-ira-border/50">
                            <div className="w-full border border-ira-teal text-ira-teal h-[42px] flex items-center justify-center text-[11px] uppercase tracking-[0.08em] hover:bg-ira-teal hover:text-white transition-colors">
                              Login to View Details
                            </div>
                            <div className="w-full bg-ira-teal text-white h-[42px] flex items-center justify-center text-[11px] uppercase tracking-[0.08em] hover:-translate-y-0.5 transition-transform">
                              Apply for B2B Account
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  </Reveal>
                  );
                })}
              </div>
            </Reveal>
          </section>
        )}
        
      </main>
      
      <Footer />
    </div>
  );
}
