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
