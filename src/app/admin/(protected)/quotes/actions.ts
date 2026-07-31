'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateQuoteStatus(id: string, newStatus: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('quote_requests')
    .update({ status: newStatus })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/quotes')
  return { success: true }
}
