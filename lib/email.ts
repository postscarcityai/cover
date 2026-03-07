import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

const isDevelopment = process.env.NODE_ENV === 'development'
const devOverrideEmail = process.env.SENDGRID_TO_EMAIL

const TO_EMAIL = isDevelopment && devOverrideEmail
  ? devOverrideEmail
  : (process.env.SENDGRID_TO_EMAIL || 'contact@example.com')

const CC_EMAIL = isDevelopment
  ? undefined
  : (process.env.SENDGRID_CC_EMAIL || undefined)

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@example.com'
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Cover'

interface ContactLeadInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  message?: string
  subject?: string
}

export function isEmailServiceConfigured(): boolean {
  return !!(process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL)
}

export async function sendContactFormAlert(lead: ContactLeadInfo): Promise<boolean> {
  if (!isEmailServiceConfigured()) {
    console.log('[Email] SendGrid not configured, skipping email send')
    return false
  }

  try {
    const msg = {
      to: TO_EMAIL,
      cc: CC_EMAIL,
      from: { email: FROM_EMAIL, name: `${SITE_NAME} Notifications` },
      subject: `New Contact Form Submission - ${lead.firstName} ${lead.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #2A2C53; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
          </div>

          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #2A2C53; margin-top: 0;">Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">${lead.firstName} ${lead.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;"><a href="mailto:${lead.email}">${lead.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;"><a href="tel:${lead.phone}">${lead.phone}</a></td>
              </tr>
              ${lead.subject ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;"><strong>Subject:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">${lead.subject}</td>
              </tr>
              ` : ''}
              ${lead.message ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;"><strong>Message:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">${lead.message}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div style="padding: 20px; background: #2A2C53; text-align: center;">
            <p style="color: #ccc; margin: 0; font-size: 12px;">
              ${SITE_NAME} - Automated Contact Notification
            </p>
          </div>
        </div>
      `
    }

    await sgMail.send(msg)
    console.log(`[Email] Contact alert sent for ${lead.firstName} ${lead.lastName}`)
    return true
  } catch (error) {
    console.error('[Email] Error sending contact alert:', error)
    return false
  }
}
