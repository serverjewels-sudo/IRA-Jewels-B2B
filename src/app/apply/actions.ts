'use server'

import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export type ApplicationData = {
  legalBusinessName: string;
  tradingName: string;
  businessType: string;
  gstNumber: string;
  panNumber: string;
  address: string;
  city: string;
  state: string;
  ownerName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  buyerType: string[];
  categoriesRequired: string[];
  monthlyPurchaseValue: string;
  documents: {
    gst_certificate?: string;
    pan_card?: string;
    visiting_card?: string;
    store_photo?: string;
  };
}

export async function submitTradeApplication(data: ApplicationData) {
  try {
    if (!data.legalBusinessName || !data.ownerName || !data.mobile || !data.email) {
      return { success: false, error: 'Missing required fields.' }
    }

    const supabase = createClient()
    const { error: dbError } = await supabase
      .from('buyer_applications')
      .insert([
        {
          legal_business_name: data.legalBusinessName,
          trading_name: data.tradingName,
          business_type: data.businessType,
          gst_number: data.gstNumber,
          pan_number: data.panNumber,
          address: data.address,
          city: data.city,
          state: data.state,
          owner_name: data.ownerName,
          mobile: data.mobile,
          whatsapp: data.whatsapp,
          email: data.email,
          buyer_type: data.buyerType,
          categories_required: data.categoriesRequired,
          monthly_purchase_value: data.monthlyPurchaseValue,
          documents: data.documents,
        }
      ])

    if (dbError) {
      console.error('Supabase Insert Error:', dbError)
      return { success: false, error: 'Failed to submit application. Please try again or reach out directly.' }
    }

    // Email notification
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        
        const emailBody = `
New Trade Account Application:

BUSINESS INFORMATION
Legal Name: ${data.legalBusinessName}
Trading Name: ${data.tradingName}
Business Type: ${data.businessType}
GST: ${data.gstNumber}
PAN: ${data.panNumber}
Location: ${data.city}, ${data.state}

CONTACT INFORMATION
Owner: ${data.ownerName}
Mobile: ${data.mobile}
WhatsApp: ${data.whatsapp}
Email: ${data.email}

BUYING PROFILE
Buyer Type: ${data.buyerType.join(', ')}
Categories: ${data.categoriesRequired.join(', ')}
Monthly Value: ${data.monthlyPurchaseValue}

DOCUMENTS ATTACHED
GST Certificate: ${data.documents.gst_certificate ? 'Yes' : 'No'}
PAN Card: ${data.documents.pan_card ? 'Yes' : 'No'}
Visiting Card: ${data.documents.visiting_card ? 'Yes' : 'No'}
Store Photo: ${data.documents.store_photo ? 'Yes' : 'No'}
        `

        const { error: emailError } = await resend.emails.send({
          from: 'IRA Jewels <notifications@irajewels.in>',
          to: 'irajewels@iragroup.in',
          subject: `New Trade Account Application — ${data.legalBusinessName}`,
          text: emailBody,
        })

        if (emailError) {
          console.error('Resend Email Error:', emailError)
          // Do not fail the submission to the user, as the application was safely saved in DB.
        }
      } catch (emailCatchError) {
        console.error('Resend Email Catch Error:', emailCatchError)
      }
    } else {
      console.warn('RESEND_API_KEY not found. Email notification skipped.')
    }

    return { success: true }
  } catch (err) {
    console.error('Submission Error:', err)
    return { success: false, error: 'An unexpected error occurred. Please try again.' }
  }
}
