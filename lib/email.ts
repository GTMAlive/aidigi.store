// Edge Runtime compatible email service with Resend + Brevo fallback

interface EmailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

type EmailProvider = 'resend' | 'brevo';


/**
 * Send email using Resend (Primary) - Edge Runtime compatible
 */
async function sendWithResend({ to, subject, html, from }: EmailParams): Promise<boolean> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.log('Resend API key not configured');
      return false;
    }

    const fromEmail = from || process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        subject: subject,
        html: html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend error:', error);
      return false;
    }

    const data = await response.json();
    console.log('✅ Email sent via Resend:', data?.id);
    return true;
  } catch (error: any) {
    console.error('Resend failed:', error.message);
    return false;
  }
}

/**
 * Send email using Brevo (Fallback) - Edge Runtime compatible
 */
async function sendWithBrevo({ to, subject, html, from }: EmailParams): Promise<boolean> {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.log('Brevo API key not configured');
      return false;
    }

    const fromEmail = from || process.env.BREVO_FROM_EMAIL || 'noreply@yourdomain.com';
    const [fromName, fromAddr] = fromEmail.includes('<') 
      ? [fromEmail.split('<')[0].trim(), fromEmail.split('<')[1].replace('>', '').trim()]
      : ['AiDigi.store', fromEmail];

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: fromName, email: fromAddr },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Brevo error:', error);
      return false;
    }

    const data = await response.json();
    console.log('✅ Email sent via Brevo:', data?.messageId);
    return true;
  } catch (error: any) {
    console.error('Brevo failed:', error.message);
    return false;
  }
}

/**
 * Send email with automatic fallback
 * Tries Resend first, then Brevo if Resend fails
 */
export async function sendEmail(params: EmailParams): Promise<void> {
  const { to, subject } = params;
  
  console.log(`📧 Sending email to: ${to}`);
  console.log(`📝 Subject: ${subject}`);

  // Try Resend first (primary provider)
  const resendSuccess = await sendWithResend(params);
  if (resendSuccess) {
    return;
  }

  // Fallback to Brevo
  console.log('⚠️ Resend failed, trying Brevo...');
  const brevoSuccess = await sendWithBrevo(params);
  if (brevoSuccess) {
    return;
  }

  // Both failed
  console.error('❌ All email providers failed!');
  throw new Error('Failed to send email via all providers');
}

/**
 * Send email using specific provider
 */
export async function sendEmailWithProvider(
  params: EmailParams,
  provider: EmailProvider
): Promise<void> {
  console.log(`📧 Sending email via ${provider.toUpperCase()} to: ${params.to}`);
  
  const success = provider === 'resend' 
    ? await sendWithResend(params)
    : await sendWithBrevo(params);

  if (!success) {
    throw new Error(`Failed to send email via ${provider}`);
  }
}

export function generateDownloadEmail(
  buyerName: string,
  promptTitle: string,
  downloadLink: string
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px 20px; background: #f9fafb; }
          .button { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>AiDigi.store</h1>
          </div>
          <div class="content">
            <h2>Thank you for your purchase!</h2>
            <p>Hi ${buyerName},</p>
            <p>Your payment was successful. You can now download your prompt pack:</p>
            <p><strong>${promptTitle}</strong></p>
            <p style="text-align: center;">
              <a href="${downloadLink}" class="button">Download Your Prompts</a>
            </p>
            <p>This link will remain active for 30 days. You can download your prompts multiple times during this period.</p>
            <p>If you have any questions, please contact us at support@aidigi.store</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} AiDigi.store. All rights reserved.</p>
            <p>Terms & Conditions | Privacy Policy | Refund Policy</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function generatePayoutNotificationEmail(
  creatorName: string,
  amount: number,
  period: string
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px 20px; background: #f9fafb; }
          .amount { font-size: 32px; font-weight: bold; color: #2563eb; text-align: center; margin: 20px 0; }
          .footer { padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>AiDigi.store</h1>
          </div>
          <div class="content">
            <h2>Weekly Payout Processed</h2>
            <p>Hi ${creatorName},</p>
            <p>Great news! Your weekly payout has been processed.</p>
            <div class="amount">₹${amount.toLocaleString()}</div>
            <p>Period: ${period}</p>
            <p>The funds should arrive in your account within 2-3 business days.</p>
            <p>Keep creating amazing prompts!</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} AiDigi.store. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
