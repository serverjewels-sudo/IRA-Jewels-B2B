import { createClient } from '@/lib/supabase/server'

import Link from 'next/link'

import { getPlaceholderImage } from '@/lib/placeholders'
import ProductVisibilityToggle from './ProductVisibilityToggle'
import ProductStatusAction from './ProductStatusAction'

export default async function AdminProductsPage() {
  const supabase = createClient()
  

  // Fetch all products
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
  }

  const hasProducts = products && products.length > 0;

  return (
    <div className="p-10 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-4xl text-ira-teal">Products</h1>
        <Link 
          href="/admin/products/add"
          className="bg-ira-teal text-white px-6 py-3 text-[13px] uppercase tracking-[0.08em] hover:bg-[#01354a] transition-colors"
        >
          Add Product
        </Link>
      </div>

      <div className="bg-white border border-ira-border shadow-sm overflow-hidden">
        {!hasProducts ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <svg className="w-16 h-16 text-ira-muted/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-xl text-ira-teal font-medium mb-2">No products found</h3>
            <p className="text-ira-muted mb-6">Get started by creating your first product.</p>
            <Link 
              href="/admin/products/add"
              className="bg-ira-teal text-white px-6 py-3 text-[13px] uppercase tracking-[0.08em] hover:bg-[#01354a] transition-colors inline-block"
            >
              Add Product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-ira-border bg-ira-ivory/30">
                  <th className="px-6 py-4 text-[11px] uppercase tracking-[0.08em] text-ira-muted font-medium w-24">Image</th>
                  <th className="px-6 py-4 text-[11px] uppercase tracking-[0.08em] text-ira-muted font-medium">SKU</th>
                  <th className="px-6 py-4 text-[11px] uppercase tracking-[0.08em] text-ira-muted font-medium">Name</th>
                  <th className="px-6 py-4 text-[11px] uppercase tracking-[0.08em] text-ira-muted font-medium">Category</th>
                  <th className="px-6 py-4 text-[11px] uppercase tracking-[0.08em] text-ira-muted font-medium">Gold Purity</th>
                  <th className="px-6 py-4 text-[11px] uppercase tracking-[0.08em] text-ira-muted font-medium text-center">Public/Private</th>
                  <th className="px-6 py-4 text-[11px] uppercase tracking-[0.08em] text-ira-muted font-medium text-center">Status</th>
                  <th className="px-6 py-4 text-[11px] uppercase tracking-[0.08em] text-ira-muted font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ira-border/50">
                {products.map((product) => {
                  const hasImage = product.images && product.images.length > 0;
                  const imageUrl = hasImage ? product.images[0] : getPlaceholderImage(product.category || 'general', 200);
                  
                  return (
                    <tr key={product.id} className="hover:bg-ira-ivory/10 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 relative bg-gray-100 overflow-hidden border border-ira-border/50">
                          {/* We use standard img to allow unsplash placeholders cleanly like the rest of the site, 
                              or next/image if configured. standard img avoids next.config.js host errors */}
                          <img 
                            src={imageUrl} 
                            alt={product.name || 'Product'} 
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[14px] text-ira-text font-medium">
                        {product.sku}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-ira-teal font-medium">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-ira-text capitalize">
                        {product.category || '-'}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-ira-text">
                        {product.gold_purity || '-'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <ProductVisibilityToggle 
                          productId={product.id} 
                          initialIsPublic={product.is_public} 
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        {product.is_active ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link 
                            href={`/admin/products/${product.id}/edit`}
                            className="text-xs uppercase tracking-wider font-medium text-ira-gold hover:text-ira-teal transition-colors"
                          >
                            Edit
                          </Link>
                          <ProductStatusAction 
                            productId={product.id} 
                            isActive={product.is_active} 
                          />
                        </div>
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
