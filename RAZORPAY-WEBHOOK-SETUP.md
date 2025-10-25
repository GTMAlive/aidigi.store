# Razorpay Webhook Setup Guide

## Overview
This guide will help you configure Razorpay webhooks to automatically process payments and update your database.

## Prerequisites
- Active Razorpay account
- Live or Test API keys configured in your `.env` file

## Setup Steps

### 1. Get Your Webhook URL

Your webhook endpoint is available at:
```
{YOUR_DOMAIN}/api/razorpay/webhook
```

**Examples:**
- **Development:** `http://localhost:3000/api/razorpay/webhook`
- **Production:** `https://yourdomain.com/api/razorpay/webhook`

> **Note:** For development testing, you'll need to expose your local server using a tool like [ngrok](https://ngrok.com/) or [cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/).

### 2. Configure Webhook in Razorpay Dashboard

1. **Log in to Razorpay Dashboard**
   - Go to [https://dashboard.razorpay.com](https://dashboard.razorpay.com)

2. **Navigate to Webhooks**
   - Click on **Settings** → **Webhooks**

3. **Create New Webhook**
   - Click on **"Create Webhook"** or **"Add New Webhook"**

4. **Enter Webhook Details**
   - **Webhook URL:** Enter your webhook URL (as shown above)
   - **Alert Email:** Enter your email address for webhook failure notifications
   - **Secret:** Leave this blank initially (Razorpay will generate one)

5. **Select Active Events**
   
   Check the following events under **Payment Events**:
   - ✅ `payment.authorized`
   - ✅ `payment.captured`
   - ✅ `payment.failed`
   
   Under **Refund Events** (optional but recommended):
   - ✅ `refund.created`

6. **Click "Create Webhook"**

### 3. Get the Webhook Secret

After creating the webhook:

1. You'll see your newly created webhook in the list
2. Click on the webhook to view details
3. Copy the **Webhook Secret** (it will look like: `whsec_xxxxxxxxxxxxxx`)

### 4. Update Your Environment Variables

Add the webhook secret to your `.env` file:

```env
# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxx

# Your app URL (important for generating download links)
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## Testing the Webhook

### Using Razorpay Test Mode

1. Make a test payment using Razorpay's test credentials
2. Monitor your application logs to see webhook events being processed
3. Verify that purchases are being updated in your database

### Test Card Details (Test Mode)

- **Card Number:** 4111 1111 1111 1111
- **CVV:** Any 3 digits
- **Expiry:** Any future date

### Webhook Test Events

You can also send test webhooks from the Razorpay Dashboard:
1. Go to your webhook settings
2. Click **"Send Test Webhook"**
3. Select an event type and click **"Send"**

## What the Webhook Does

### On `payment.captured` or `payment.authorized`:
1. ✅ Verifies webhook signature for security
2. ✅ Updates purchase status to "completed"
3. ✅ Generates a secure download token
4. ✅ Increments sales count for the prompt
5. ✅ Logs the download link (TODO: sends email to buyer)

### On `payment.failed`:
1. ✅ Updates purchase status back to "pending"
2. ✅ Logs the failure

### On `refund.created`:
1. ✅ Updates purchase status to "refunded"
2. ✅ Decrements sales count
3. ✅ Logs the refund (TODO: notifies creator)

## Troubleshooting

### Webhook Not Receiving Events

1. **Check URL Accessibility**
   - Ensure your webhook URL is publicly accessible
   - Verify HTTPS is working (required for production)

2. **Check Webhook Logs**
   - Go to Razorpay Dashboard → Webhooks → View Logs
   - Look for failed delivery attempts

3. **Verify Signature**
   - Ensure `RAZORPAY_WEBHOOK_SECRET` is correctly set
   - Check your application logs for "Invalid signature" errors

### Database Not Updating

1. **Check Database Connection**
   - Ensure Cloudflare D1 is properly configured
   - Verify database bindings in `wrangler.toml`

2. **Check Logs**
   - Look for "Database not available in webhook context" warnings
   - Verify the database schema is up to date

### Common Errors

| Error | Solution |
|-------|----------|
| "Invalid signature" | Double-check your `RAZORPAY_WEBHOOK_SECRET` |
| "Database not available" | Verify Cloudflare D1 bindings |
| "Prompt not found" | Ensure prompts are marked as "live" |
| Webhook timeout | Check if your endpoint responds within 10 seconds |

## Security Best Practices

1. ✅ **Always verify webhook signatures** - Already implemented in the code
2. ✅ **Use HTTPS in production** - Required by Razorpay
3. ✅ **Keep webhook secret secure** - Never commit to version control
4. ✅ **Monitor webhook logs** - Regularly check for suspicious activity
5. ✅ **Implement idempotency** - Handle duplicate webhook events gracefully

## Next Steps

After webhook setup:

1. **Implement Email Notifications**
   - Uncomment email sending code in `webhook/route.ts`
   - Configure AWS SES or your email service

2. **Test Payment Flow**
   - Make a test purchase
   - Verify download link generation
   - Test the download endpoint

3. **Monitor Production**
   - Set up logging/monitoring
   - Track webhook delivery success rates
   - Monitor for failed payments

## Support

- **Razorpay Docs:** [https://razorpay.com/docs/webhooks/](https://razorpay.com/docs/webhooks/)
- **Razorpay Support:** [https://razorpay.com/support/](https://razorpay.com/support/)

---

**Last Updated:** October 2025
