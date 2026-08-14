'use server'

import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function submitQuoteRequest(productId: string, productSku: string, productName: string, notes: string) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: 'You must be logged in to request a quote.' }
    }

    // 1. Get buyer details
    const { data: buyer, error: buyerError } = await supabase
      .from('buyers')
      .select('company_name, buyer_id, is_active')
      .eq('id', user.id)
      .single()

    if (buyerError || !buyer || !buyer.is_active) {
      return { success: false, error: 'Active buyer account required.' }
    }

    // 2. Insert into quote_requests
    const { error: dbError } = await supabase
      .from('quote_requests')
      .insert([
        {
          buyer_id: user.id,
          product_id: productId,
          product_sku: productSku,
          notes: notes,
          status: 'Requested'
        }
      ])

    if (dbError) {
      console.error('Supabase Insert Error (quote_requests):', dbError)
      return { success: false, error: 'Failed to submit quote request. Please try again later.' }
    }

    // 3. Send email via Resend
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      
      const emailBody = `
New Quote Request Received:

Company: ${buyer.company_name}
Buyer ID: ${buyer.buyer_id}

Product Name: ${productName}
Product SKU: ${productSku}

Requirements/Notes:
${notes || 'None'}
      `

      const { error: emailError } = await resend.emails.send({
        from: 'IRA Jewels <notifications@irajewels.in>',
        to: 'irajewels@iragroup.in',
        subject: `New Quote Request — ${productName} (${productSku})`,
        text: emailBody,
      })

      if (emailError) {
        console.error('Resend Email Error (quote_requests):', emailError)
        // We still return success to the user as requested
      }
    } else {
      console.warn('RESEND_API_KEY not found in environment variables.')
    }

    return { success: true }
  } catch (err) {
    console.error('Quote Request Submission Error:', err)
    return { success: false, error: 'An unexpected error occurred. Please try again later.' }
  }
}
