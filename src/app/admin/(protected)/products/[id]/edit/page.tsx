import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductForm from '../../ProductForm'

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !product) {
    notFound()
  }

  return (
    <div className="p-10 max-w-[1400px] mx-auto">
      <div className="mb-8">
        <Link 
          href="/admin/products" 
          className="inline-flex items-center gap-2 text-sm text-ira-muted hover:text-ira-teal transition-colors mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </Link>
        <h1 className="font-serif text-4xl text-ira-teal">Edit Product — {product.name}</h1>
        <p className="text-ira-muted mt-2">Update information, pricing, or visibility settings.</p>
      </div>

      <ProductForm mode="edit" initialData={product} />
    </div>
  )
}
