'use server'

import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function submitContactInquiry(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const company = formData.get('company') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const country = formData.get('country') as string
    const requirement = formData.get('requirement') as string
    const quantity = formData.get('quantity') as string
    const timeline = formData.get('timeline') as string
    const message = formData.get('message') as string
    const isConfidential = formData.get('isConfidential') === 'on'
    const consent = formData.get('consent') === 'on'

    if (!name || !email || !consent) {
      return { success: false, error: 'Missing required fields.' }
    }

    // 1. Insert into Supabase
    const supabase = createClient()
    const { error: dbError } = await supabase
      .from('contact_inquiries')
      .insert([
        {
          name,
          company,
          email,
          phone,
          country,
          requirement,
          expected_quantity: quantity,
          target_timeline: timeline,
          message,
          confidentiality_requested: isConfidential,
          consent_given: consent,
        }
      ])

    if (dbError) {
      console.error('Supabase Insert Error:', dbError)
      return { success: false, error: 'Failed to save your inquiry. Please try again or reach out directly via WhatsApp.' }
    }

    // 2. Send email via Resend
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      
      const emailBody = `
New Contact Inquiry Received:

Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone}
Country: ${country}
Requirement: ${requirement}
Expected Quantity: ${quantity}
Target Timeline: ${timeline}
Confidential: ${isConfidential ? 'Yes' : 'No'}

Message:
${message}
      `

      const { error: emailError } = await resend.emails.send({
        from: 'IRA Jewels <notifications@irajewels.in>',
        to: 'irajewels@iragroup.in',
        subject: `New Contact Inquiry — ${name} (${company})`,
        text: emailBody,
      })

      if (emailError) {
        console.error('Resend Email Error:', emailError)
        return { success: false, error: 'Inquiry saved, but failed to send email notification. Please try again or reach out directly via WhatsApp.' }
      }
    } else {
      console.warn('RESEND_API_KEY not found in environment variables.')
    }

    return { success: true }
  } catch (err) {
    console.error('Submission Error:', err)
    return { success: false, error: 'An unexpected error occurred. Please try again or reach out directly via WhatsApp.' }
  }
}
