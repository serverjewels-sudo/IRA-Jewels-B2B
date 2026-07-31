'use server'

import { createAdminClient } from '@/lib/supabase/admin'

function generateSecurePassword() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_'
  return Array.from(crypto.getRandomValues(new Uint32Array(16)))
    .map(x => chars[x % chars.length])
    .join('')
}

export async function approveApplication({
  applicationId,
  email,
  tradingName,
  legalBusinessName,
  priceTier
}: {
  applicationId: string
  email: string
  tradingName?: string
  legalBusinessName: string
  priceTier: string
}) {
  const supabaseAdmin = createAdminClient()
  const password = generateSecurePassword()

  // 1. Create Auth User
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })

  if (authError || !authData.user) {
    return { success: false, error: authError?.message || 'Failed to create user account' }
  }

  const newUserId = authData.user.id
  const companyName = (tradingName && tradingName.trim().length > 0) ? tradingName : legalBusinessName

  // 2. Insert into buyers table
  const { error: buyerError } = await supabaseAdmin
    .from('buyers')
    .insert({
      id: newUserId,
      application_id: applicationId,
      company_name: companyName,
      price_tier: priceTier,
      is_active: true
    })

  if (buyerError) {
    return { 
      success: false, 
      error: `Failed to create buyer profile. The auth account for ${email} was created but orphaned and must be manually deleted. Database error: ${buyerError.message}` 
    }
  }

  // 3. Update application status
  const { error: appError } = await supabaseAdmin
    .from('buyer_applications')
    .update({ 
      status: 'Approved',
      price_tier: priceTier
    })
    .eq('id', applicationId)

  if (appError) {
    return { 
      success: false, 
      error: `Buyer account was created successfully, but the application status failed to update — manually mark this application as Approved in Supabase. Database error: ${appError.message}` 
    }
  }

  // Fetch the auto-generated buyer_id
  const { data: buyerData } = await supabaseAdmin
    .from('buyers')
    .select('buyer_id')
    .eq('id', newUserId)
    .single()

  return { 
    success: true, 
    credentials: {
      email,
      password,
      buyerId: buyerData?.buyer_id
    }
  }
}

export async function rejectApplication({
  applicationId,
  note
}: {
  applicationId: string
  note?: string
}) {
  const supabaseAdmin = createAdminClient()

  const { error } = await supabaseAdmin
    .from('buyer_applications')
    .update({ 
      status: 'Rejected',
      notes: note || null
    })
    .eq('id', applicationId)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}
