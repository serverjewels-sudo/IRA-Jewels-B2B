'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { createProduct, updateProduct, type ProductInsert } from './actions'

const CATEGORIES = [
  { label: 'Rings', value: 'rings' },
  { label: 'Earrings', value: 'earrings' },
  { label: 'Pendants', value: 'pendants' },
  { label: 'Necklaces', value: 'necklaces' },
  { label: 'Bracelets', value: 'bracelets' },
  { label: 'Bangles', value: 'bangles' },
  { label: 'Mangalsutras', value: 'mangalsutras' },
  { label: "Men's Jewellery", value: 'mens-jewellery' }
]

const GOLD_PURITIES = ['14K', '18K', '22K']
const DIAMOND_TYPES = ['Natural', 'Lab-Grown']

type ProductFormProps = {
  mode?: 'add' | 'edit'
  initialData?: {
    id: string
    name: string
    sku: string
    slug: string
    category: string
    gold_purity: string
    approx_gold_weight_min?: number | null
    approx_gold_weight_max?: number | null
    approx_diamond_weight?: number | null
    diamond_type?: string | null
    description?: string | null
    images: string[]
    tier1_price: number
    tier2_price: number
    tier3_price: number
    is_public: boolean
    is_active: boolean
  } | null
}

export default function ProductForm({ mode = 'add', initialData }: ProductFormProps) {
  const router = useRouter()
  const supabase = createClient()

  // Form State
  const [name, setName] = useState(initialData?.name || '')
  const [sku, setSku] = useState(initialData?.sku || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [category, setCategory] = useState(initialData?.category || '')
  const [goldPurity, setGoldPurity] = useState(initialData?.gold_purity || '')
  const [minWeight, setMinWeight] = useState(initialData?.approx_gold_weight_min?.toString() || '')
  const [maxWeight, setMaxWeight] = useState(initialData?.approx_gold_weight_max?.toString() || '')
  const [diamondWeight, setDiamondWeight] = useState(initialData?.approx_diamond_weight?.toString() || '')
  const [diamondType, setDiamondType] = useState(initialData?.diamond_type || '')
  const [description, setDescription] = useState(initialData?.description || '')
  
  const [tier1Price, setTier1Price] = useState(initialData?.tier1_price?.toString() || '')
  const [tier2Price, setTier2Price] = useState(initialData?.tier2_price?.toString() || '')
  const [tier3Price, setTier3Price] = useState(initialData?.tier3_price?.toString() || '')

  const [isPublic, setIsPublic] = useState(initialData?.is_public ?? false)
  const [isActive, setIsActive] = useState(initialData?.is_active ?? false)

  // Images state
  const [existingImages, setExistingImages] = useState<string[]>(initialData?.images || [])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Generate slug automatically from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    if (mode === 'add') {
      setSlug(newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
    }
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      
      setSelectedFiles(prev => [...prev, ...filesArray])
      setImagePreviews(prev => [...prev, ...filesArray.map(file => URL.createObjectURL(file))])
    }
  }

  const removeExistingImage = (index: number) => {
    const newExisting = [...existingImages]
    newExisting.splice(index, 1)
    setExistingImages(newExisting)
  }

  const removeNewImage = (index: number) => {
    const newFiles = [...selectedFiles]
    newFiles.splice(index, 1)
    
    const newPreviews = [...imagePreviews]
    URL.revokeObjectURL(newPreviews[index])
    newPreviews.splice(index, 1)
    
    setSelectedFiles(newFiles)
    setImagePreviews(newPreviews)
  }

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // 1. Client-side validation
    if (!name || !sku || !slug || !category || !goldPurity || !tier1Price || !tier2Price || !tier3Price) {
      setError('Please fill in all required fields.')
      setLoading(false)
      return
    }

    try {
      // 2. Upload images if any
      const uploadedImageUrls: string[] = []
      
      if (selectedFiles.length > 0) {
        for (const file of selectedFiles) {
          const fileExt = file.name.split('.').pop()
          const fileName = `${crypto.randomUUID()}.${fileExt}`
          
          const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(fileName, file)
            
          if (uploadError) {
            console.error('Upload error:', uploadError)
            setError(`Failed to upload image ${file.name}. Please try again.`)
            setLoading(false)
            return
          }
          
          const { data } = supabase.storage.from('product-images').getPublicUrl(fileName)
          uploadedImageUrls.push(data.publicUrl)
        }
      }

      // 3. Prepare payload
      const finalImages = [...existingImages, ...uploadedImageUrls]

      const payload: ProductInsert = {
        name,
        sku,
        slug,
        category,
        gold_purity: goldPurity,
        approx_gold_weight_min: minWeight ? parseFloat(minWeight) : null,
        approx_gold_weight_max: maxWeight ? parseFloat(maxWeight) : null,
        approx_diamond_weight: diamondWeight ? parseFloat(diamondWeight) : null,
        diamond_type: diamondType || null,
        description: description || null,
        images: finalImages,
        tier1_price: parseFloat(tier1Price),
        tier2_price: parseFloat(tier2Price),
        tier3_price: parseFloat(tier3Price),
        is_public: isPublic,
        is_active: isActive
      }

      // 4. Submit to server action
      let result
      if (mode === 'add') {
        result = await createProduct(payload)
      } else {
        if (!initialData?.id) {
          setError('Product ID is missing.')
          setLoading(false)
          return
        }
        result = await updateProduct(initialData.id, payload)
      }
      
      if (!result.success) {
        setError(result.error || `Failed to ${mode} product`)
        setLoading(false)
        return
      }

      // 5. Success
      router.push('/admin/products')
      router.refresh()
      
    } catch (err) {
      console.error('Unexpected error:', err)
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  const labelClass = "block text-[11px] uppercase tracking-[0.08em] text-ira-teal mb-2 font-semibold"
  const requiredStar = <span className="text-ira-gold ml-1">*</span>
  const inputClass = "w-full p-3 border border-ira-border/50 bg-white focus:outline-none focus:border-ira-teal/50 text-sm"

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-5xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Basic Info Section */}
      <section className="bg-white border border-ira-border shadow-sm p-8">
        <h2 className="font-serif text-2xl text-ira-teal mb-6 pb-4 border-b border-ira-border/50">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>Product Name {requiredStar}</label>
            <input 
              type="text" 
              value={name}
              onChange={handleNameChange}
              required
              className={inputClass}
              placeholder="e.g. Classic Gold Bangle"
            />
          </div>
          
          <div>
            <label className={labelClass}>SKU {requiredStar}</label>
            <input 
              type="text" 
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              required
              className={inputClass}
              placeholder="e.g. IRA-BNG-001"
            />
          </div>

          <div>
            <label className={labelClass}>Slug {requiredStar}</label>
            <input 
              type="text" 
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className={inputClass}
              placeholder="e.g. classic-gold-bangle"
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Category {requiredStar}</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className={inputClass}
            >
              <option value="">Select Category...</option>
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="bg-white border border-ira-border shadow-sm p-8">
        <h2 className="font-serif text-2xl text-ira-teal mb-6 pb-4 border-b border-ira-border/50">Specifications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Gold Purity {requiredStar}</label>
            <select 
              value={goldPurity}
              onChange={(e) => setGoldPurity(e.target.value)}
              required
              className={inputClass}
            >
              <option value="">Select Purity...</option>
              {GOLD_PURITIES.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Min Weight (g)</label>
              <input 
                type="number" 
                step="0.01"
                min="0"
                value={minWeight}
                onChange={(e) => setMinWeight(e.target.value)}
                className={inputClass}
                placeholder="e.g. 15.5"
              />
            </div>
            <div>
              <label className={labelClass}>Max Weight (g)</label>
              <input 
                type="number" 
                step="0.01"
                min="0"
                value={maxWeight}
                onChange={(e) => setMaxWeight(e.target.value)}
                className={inputClass}
                placeholder="e.g. 18.2"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Diamond Type</label>
            <select 
              value={diamondType}
              onChange={(e) => setDiamondType(e.target.value)}
              className={inputClass}
            >
              <option value="">None / N/A</option>
              {DIAMOND_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Approx Diamond Weight (ct)</label>
            <input 
              type="number" 
              step="0.01"
              min="0"
              value={diamondWeight}
              onChange={(e) => setDiamondWeight(e.target.value)}
              className={inputClass}
              placeholder="e.g. 1.25"
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${inputClass} min-h-[100px]`}
              placeholder="Product details and descriptive copy..."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white border border-ira-border shadow-sm p-8">
        <h2 className="font-serif text-2xl text-ira-teal mb-6 pb-4 border-b border-ira-border/50">B2B Pricing Tiers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelClass}>Tier 1 Price (₹) {requiredStar}</label>
            <input 
              type="number" 
              min="0"
              value={tier1Price}
              onChange={(e) => setTier1Price(e.target.value)}
              required
              className={inputClass}
              placeholder="0.00"
            />
          </div>
          <div>
            <label className={labelClass}>Tier 2 Price (₹) {requiredStar}</label>
            <input 
              type="number" 
              min="0"
              value={tier2Price}
              onChange={(e) => setTier2Price(e.target.value)}
              required
              className={inputClass}
              placeholder="0.00"
            />
          </div>
          <div>
            <label className={labelClass}>Tier 3 Price (₹) {requiredStar}</label>
            <input 
              type="number" 
              min="0"
              value={tier3Price}
              onChange={(e) => setTier3Price(e.target.value)}
              required
              className={inputClass}
              placeholder="0.00"
            />
          </div>
        </div>
      </section>

      {/* Images Section */}
      <section className="bg-white border border-ira-border shadow-sm p-8">
        <h2 className="font-serif text-2xl text-ira-teal mb-6 pb-4 border-b border-ira-border/50">Product Images</h2>
        
        <div className="space-y-4">
          <label className="block w-full border-2 border-dashed border-ira-border/50 bg-ira-ivory/20 hover:bg-ira-ivory/50 transition-colors p-8 text-center cursor-pointer">
            <svg className="w-8 h-8 text-ira-muted mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span className="text-sm text-ira-teal font-medium">Click to upload images</span>
            <span className="block text-xs text-ira-muted mt-1">JPEG, PNG, WEBP allowed</span>
            <input 
              type="file" 
              accept="image/jpeg, image/png, image/webp" 
              multiple 
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {(existingImages.length > 0 || imagePreviews.length > 0) && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {/* Existing Images */}
              {existingImages.map((url, index) => (
                <div key={url} className="relative group aspect-square border border-ira-border/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="Existing product image" className="w-full h-full object-cover" />
                  <div className="absolute top-0 left-0 bg-black/60 text-white text-[10px] px-2 py-1 uppercase tracking-wider font-semibold w-full">Existing</div>
                  <button 
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-2 right-2 bg-white/90 text-red-600 p-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm z-10"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              
              {/* New Previews */}
              {imagePreviews.map((preview, index) => (
                <div key={preview} className="relative group aspect-square border border-ira-border/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="New upload preview" className="w-full h-full object-cover" />
                  <div className="absolute top-0 left-0 bg-ira-gold/90 text-white text-[10px] px-2 py-1 uppercase tracking-wider font-semibold w-full">New</div>
                  <button 
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute top-2 right-2 bg-white/90 text-red-600 p-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm z-10"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Visibility Section */}
      <section className="bg-white border border-ira-border shadow-sm p-8">
        <h2 className="font-serif text-2xl text-ira-teal mb-6 pb-4 border-b border-ira-border/50">Visibility</h2>
        
        <div className="space-y-6">
          <label className="flex items-start gap-4 cursor-pointer">
            <input 
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="mt-1"
            />
            <div>
              <span className="block text-sm font-medium text-ira-teal">Is Active</span>
              <span className="block text-xs text-ira-muted mt-1">
                If active, the product is fully published. If inactive, it is archived and inaccessible to everyone.
              </span>
            </div>
          </label>
          
          <label className="flex items-start gap-4 cursor-pointer">
            <input 
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="mt-1"
            />
            <div>
              <span className="block text-sm font-medium text-ira-teal">Is Public (Guest Visible)</span>
              <span className="block text-xs text-ira-muted mt-1">
                If public, unauthenticated guests can see this product on the public catalogue. If private, only approved B2B buyers can see it.
              </span>
            </div>
          </label>
        </div>
      </section>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="px-6 py-3 border border-ira-border text-sm uppercase tracking-[0.08em] text-ira-muted hover:text-ira-teal hover:border-ira-teal/30 transition-colors"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-ira-teal text-white px-8 py-3 text-sm uppercase tracking-[0.08em] hover:bg-[#01354a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {mode === 'add' ? 'Saving...' : 'Updating...'}
            </>
          ) : (
            mode === 'add' ? 'Save Product' : 'Update Product'
          )}
        </button>
      </div>
    </form>
  )
}
