'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleProductVisibility(productId: string, isPublic: boolean) {
  const supabase = createClient()
  
  // Verify user is an admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  // Check admin role
  const { data: admin } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', user.id)
    .eq('is_active', true)
    .single()

  if (!admin) {
    return { success: false, error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('products')
    .update({ is_public: isPublic })
    .eq('id', productId)

  if (error) {
    console.error('Error toggling product visibility:', error)
    return { success: false, error: 'Failed to update visibility' }
  }

  revalidatePath('/admin/products')
  return { success: true }
}

export async function toggleProductArchive(productId: string, isActive: boolean) {
  const supabase = createClient()
  
  // Verify user is an admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  // Check admin role
  const { data: admin } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', user.id)
    .eq('is_active', true)
    .single()

  if (!admin) {
    return { success: false, error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('products')
    .update({ is_active: isActive })
    .eq('id', productId)

  if (error) {
    console.error('Error toggling product archive status:', error)
    return { success: false, error: 'Failed to update status' }
  }

  revalidatePath('/admin/products')
  return { success: true }
}

export type ProductInsert = {
  name: string
  slug: string
  sku: string
  category: string
  gold_purity: string
  approx_gold_weight_min: number | null
  approx_gold_weight_max: number | null
  approx_diamond_weight: number | null
  diamond_type: string | null
  description: string | null
  images: string[]
  is_public: boolean
  is_active: boolean
  tier1_price: number
  tier2_price: number
  tier3_price: number
}

export async function createProduct(data: ProductInsert) {
  const supabase = createClient()
  
  // Verify user is an admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { data: admin } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', user.id)
    .eq('is_active', true)
    .single()

  if (!admin) {
    return { success: false, error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('products')
    .insert([data])

  if (error) {
    console.error('Error creating product:', error)
    // Check for unique constraint violation (code 23505)
    if (error.code === '23505') {
      if (error.message.includes('sku')) {
        return { success: false, error: 'This SKU is already in use.' }
      }
      if (error.message.includes('slug')) {
        return { success: false, error: 'This Slug is already in use.' }
      }
      return { success: false, error: 'A duplicate value constraint was violated.' }
    }
    return { success: false, error: 'Failed to create product. Please try again.' }
  }

  revalidatePath('/admin/products')
  return { success: true }
}

export async function updateProduct(id: string, data: ProductInsert) {
  const supabase = createClient()
  
  // Verify user is an admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { data: admin } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', user.id)
    .eq('is_active', true)
    .single()

  if (!admin) {
    return { success: false, error: 'Unauthorized' }
  }

  // Explicit check for unique SKU excluding this product's ID
  const { data: existingSku } = await supabase
    .from('products')
    .select('id')
    .eq('sku', data.sku)
    .neq('id', id)
    .single()

  if (existingSku) {
    return { success: false, error: 'This SKU is already in use.' }
  }

  // Explicit check for unique Slug excluding this product's ID
  const { data: existingSlug } = await supabase
    .from('products')
    .select('id')
    .eq('slug', data.slug)
    .neq('id', id)
    .single()

  if (existingSlug) {
    return { success: false, error: 'This Slug is already in use.' }
  }

  const { error } = await supabase
    .from('products')
    .update(data)
    .eq('id', id)

  if (error) {
    console.error('Error updating product:', error)
    return { success: false, error: 'Failed to update product. Please try again.' }
  }

  revalidatePath('/admin/products')
  return { success: true }
}
