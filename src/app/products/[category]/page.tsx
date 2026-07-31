import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getPlaceholderImage } from "@/lib/placeholders";

const VALID_CATEGORIES = [
  "rings", "earrings", "pendants", "necklaces", 
  "bracelets", "bangles", "mangalsutras", "mens-jewellery"
];

function formatCategoryName(slug: string) {
  if (slug === "mens-jewellery") return "Men's Jewellery";
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const categorySlug = params.category.toLowerCase();
  
  if (!VALID_CATEGORIES.includes(categorySlug)) {
    notFound();
  }

  const categoryName = formatCategoryName(categorySlug);
  
  // Fetch products
  const supabase = createClient();
  const { data: products, error } = await supabase
    .from('products_public')
    .select('*')
    .eq('category', categorySlug);
    
  if (error) {
    console.error("Error fetching products:", error);
    // Continue with empty array if there's an error so the page doesn't crash completely
  }
  
  const productList = products || [];

  return (
    <div className="min-h-screen bg-ira-ivory flex flex-col">
      <Header />
      
      <main className="flex-grow pt-[140px] pb-[120px] max-md:pt-[120px] max-md:pb-[78px]">
        {/* Page Header */}
        <section className="w-[min(1320px,calc(100%-56px))] mx-auto mb-16">
          <Reveal>
            <p className="text-[13px] text-ira-muted tracking-[0.08em] uppercase mb-4">
              <Link href="/" className="hover:text-ira-teal transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="hover:text-ira-teal transition-colors">Products</Link>
              <span className="mx-2">/</span>
              <span className="text-ira-text font-medium">{categoryName}</span>
            </p>
            <h1 className="font-serif text-[clamp(40px,5vw,60px)] text-ira-teal leading-[1] tracking-[-0.04em] mb-4">
              {categoryName} Collection
            </h1>
          </Reveal>
        </section>

        {/* Product Grid or Empty State */}
        <section className="w-[min(1320px,calc(100%-56px))] mx-auto mb-24">
          {productList.length === 0 ? (
            <Reveal>
              <div className="bg-white border border-ira-border p-12 text-center flex flex-col items-center">
                <p className="text-[18px] text-ira-muted mb-6 max-w-[600px]">
                  No products currently listed in this category. Check back soon, or apply for a trade account to see our full range.
                </p>
                <Link 
                  href="/apply"
                  className="bg-ira-teal text-white h-[48px] px-8 rounded-[5px] flex items-center justify-center text-[14px] uppercase tracking-[0.08em] hover:-translate-y-0.5 transition-transform"
                >
                  Apply for Trade Account
                </Link>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {productList.map((product, index) => {
                const hasImage = product.images && product.images.length > 0;
                const imageUrl = hasImage ? product.images[0] : getPlaceholderImage(product.category || categorySlug, 400);

                return (
                <Reveal key={product.id || index} delay={(index % 4) * 50}>
                  <article className="bg-white border border-ira-border hover:border-ira-gold transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                    <Link href={`/products/item/${product.slug}`} className="block">
                      <div className="aspect-[4/5] bg-[#e5e0d7] overflow-hidden relative">
                        <img 
                          src={imageUrl} 
                          alt={product.sku || 'Product'} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </Link>
                    
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="mb-4">
                        <span className="text-[11px] text-ira-gold uppercase tracking-[0.15em] font-bold block mb-1">
                          {product.category || categoryName}
                        </span>
                        <Link href={`/products/item/${product.slug}`} className="hover:text-ira-teal transition-colors block">
                          <h2 className="font-serif text-[22px] text-ira-text m-0 mb-1 hover:text-ira-teal transition-colors">
                            {product.sku || 'N/A'}
                          </h2>
                        </Link>
                        {product.gold_purity && (
                          <p className="text-[13px] text-ira-muted m-0">
                            {product.gold_purity}
                          </p>
                        )}
                      </div>
                      
                      <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-ira-border/50">
                        <Link 
                          href="/login"
                          className="w-full border border-ira-teal text-ira-teal h-[42px] flex items-center justify-center text-[11px] uppercase tracking-[0.08em] hover:bg-ira-teal hover:text-white transition-colors"
                        >
                          Login to View Details
                        </Link>
                        <Link 
                          href="/apply"
                          className="w-full bg-ira-teal text-white h-[42px] flex items-center justify-center text-[11px] uppercase tracking-[0.08em] hover:-translate-y-0.5 transition-transform"
                        >
                          Apply for B2B Account
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
                );
              })}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
