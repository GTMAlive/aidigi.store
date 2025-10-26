import { NextRequest, NextResponse } from "next/server";
import { sendEmail, generateDownloadEmail } from "@/lib/email";

export const runtime = 'edge';

// Helper function for HMAC-SHA256 using Web Crypto API
async function hmacSha256(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(message);
  
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, messageData);
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Helper function to generate random token
function generateRandomToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    // Verify webhook signature using Web Crypto API
    const expectedSignature = await hmacSha256(
      process.env.RAZORPAY_WEBHOOK_SECRET || "",
      body
    );

    if (signature !== expectedSignature) {
      return NextResponse.json(
        { success: false, error: "Invalid signature" },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);

    // Handle different events
    switch (event.event) {
      case "payment.captured":
      case "payment.authorized":
        // Payment successful
        const payment = event.payload.payment.entity;
        
        console.log("Payment captured/authorized:", payment.id);
        
        try {
          // Generate a secure download token using Web Crypto API
          const downloadToken = generateRandomToken();
          
          // Get the database binding (Cloudflare D1)
          // @ts-ignore
          const db = process.env.DB || globalThis.DB;
          
          if (db) {
            // Update purchase record in database
            await db.prepare(`
              UPDATE purchases 
              SET status = 'completed',
                  razorpay_payment_id = ?,
                  download_token = ?,
                  updated_at = ?
              WHERE razorpay_order_id = ?
            `)
            .bind(
              payment.id,
              downloadToken,
              Date.now(),
              payment.order_id
            )
            .run();
            
            // Increment sales count for the prompt
            const purchase = await db.prepare(
              'SELECT prompt_id FROM purchases WHERE razorpay_order_id = ?'
            ).bind(payment.order_id).first();
            
            if (purchase) {
              await db.prepare(`
                UPDATE prompts 
                SET sales_count = sales_count + 1,
                    updated_at = ?
                WHERE id = ?
              `)
              .bind(Date.now(), purchase.prompt_id)
              .run();
            }
            
            // Generate download link
            const downloadLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/download/${downloadToken}`;
            
            console.log("Payment processed successfully. Download link:", downloadLink);
            
            // Send email with download link
            const buyerEmail = payment.notes?.buyerEmail;
            const buyerName = payment.notes?.buyerName || 'Customer';
            const promptId = payment.notes?.promptId;
            
            if (buyerEmail && promptId) {
              try {
                // Get prompt details for email
                const promptData = await db.prepare(
                  'SELECT title FROM prompts WHERE id = ?'
                ).bind(promptId).first();
                
                const promptTitle = promptData?.title || 'Your Purchase';
                
                // Send download email
                await sendEmail({
                  to: buyerEmail,
                  subject: `Your ${promptTitle} - Download Ready!`,
                  html: generateDownloadEmail(buyerName, promptTitle, downloadLink),
                });
                
                console.log('✅ Download email sent to:', buyerEmail);
              } catch (emailError: any) {
                console.error('❌ Failed to send email:', emailError.message);
                // Don't fail the webhook if email fails
              }
            }
          } else {
            console.warn("Database not available in webhook context");
          }
        } catch (dbError: any) {
          console.error("Database error:", dbError);
          // Don't fail the webhook, log and continue
        }
        
        break;

      case "payment.failed":
        // Payment failed
        const failedPayment = event.payload.payment.entity;
        console.log("Payment failed:", failedPayment.id);
        
        try {
          // @ts-ignore
          const db = process.env.DB || globalThis.DB;
          
          if (db && failedPayment.order_id) {
            await db.prepare(`
              UPDATE purchases 
              SET status = 'pending',
                  updated_at = ?
              WHERE razorpay_order_id = ?
            `)
            .bind(Date.now(), failedPayment.order_id)
            .run();
          }
        } catch (dbError: any) {
          console.error("Database error on payment failure:", dbError);
        }
        
        break;

      case "refund.created":
        // Refund processed
        const refund = event.payload.refund.entity;
        console.log("Refund created:", refund.id);
        
        try {
          // @ts-ignore
          const db = process.env.DB || globalThis.DB;
          
          if (db && refund.payment_id) {
            // Update purchase status to refunded
            await db.prepare(`
              UPDATE purchases 
              SET status = 'refunded',
                  updated_at = ?
              WHERE razorpay_payment_id = ?
            `)
            .bind(Date.now(), refund.payment_id)
            .run();
            
            // Decrement sales count
            const purchase = await db.prepare(
              'SELECT prompt_id FROM purchases WHERE razorpay_payment_id = ?'
            ).bind(refund.payment_id).first();
            
            if (purchase) {
              await db.prepare(`
                UPDATE prompts 
                SET sales_count = GREATEST(sales_count - 1, 0),
                    updated_at = ?
                WHERE id = ?
              `)
              .bind(Date.now(), purchase.prompt_id)
              .run();
            }
            
            // TODO: Notify creator about refund
          }
        } catch (dbError: any) {
          console.error("Database error on refund:", dbError);
        }
        
        break;

      default:
        console.log("Unhandled event:", event.event);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
