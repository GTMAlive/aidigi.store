# Email Outbound Setup Guide

## 🚀 Option 1: Resend (RECOMMENDED - Easiest)

### Why Resend?
- ✅ **Free tier:** 3,000 emails/month
- ✅ **Simple API:** Just 3 lines of code
- ✅ **No AWS complexity**
- ✅ **Modern dashboard:** Easy to test and monitor
- ✅ **Perfect for Indian startups**

### Setup Steps

#### 1. Sign Up
1. Go to [https://resend.com](https://resend.com)
2. Sign up with GitHub or email
3. Verify your email address

#### 2. Get API Key
1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Copy the key (starts with `re_`)

#### 3. Add Domain (Optional for now)
For testing, Resend provides `onboarding@resend.dev` - you can use this immediately!

For production:
1. Go to **Domains** → **Add Domain**
2. Add your domain (e.g., `aidigi.store`)
3. Add the DNS records they provide

#### 4. Update .env.local
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 💰 Option 2: AWS SES (Free Tier Available)

### Why AWS SES?
- ✅ **Free tier:** 62,000 emails/month (first 12 months)
- ✅ **After free tier:** $0.10 per 1,000 emails
- ✅ **Enterprise-grade**
- ⚠️ **More complex setup**

### Setup Steps

#### 1. Create AWS Account
1. Go to [https://aws.amazon.com](https://aws.amazon.com)
2. Sign up (requires credit card, but won't charge for free tier)

#### 2. Verify Email Address
1. Go to **SES Console** → **Verified Identities**
2. Click **Create Identity**
3. Choose **Email Address**
4. Enter your email (e.g., `noreply@aidigi.store`)
5. Check your inbox and verify

#### 3. Request Production Access
By default, SES is in "sandbox mode" (can only send to verified emails)

1. Go to **Account Dashboard**
2. Click **Request Production Access**
3. Fill the form:
   - **Use case:** Transactional emails (order confirmations)
   - **Website URL:** Your domain
   - **Expected volume:** Start with 1,000/month
4. Usually approved in 24 hours

#### 4. Create Access Keys
1. Go to **IAM Console**
2. Create a new user (e.g., `ses-smtp-user`)
3. Attach policy: `AmazonSESFullAccess`
4. Create **Access Key**
5. Copy **Access Key ID** and **Secret Access Key**

#### 5. Update .env.local
```env
AWS_SES_ACCESS_KEY=AKIA...
AWS_SES_SECRET_KEY=your_secret_key
AWS_SES_REGION=ap-south-1
AWS_SES_FROM_EMAIL=noreply@aidigi.store
```

---

## 📧 Option 3: Gmail SMTP (Quickest for Testing)

### Why Gmail?
- ✅ **Free**
- ✅ **Works immediately**
- ⚠️ **Limited to 500 emails/day**
- ⚠️ **Not for production scale**

### Setup Steps

#### 1. Enable 2-Step Verification
1. Go to [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**

#### 2. Generate App Password
1. Go to [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select **App:** Mail
3. Select **Device:** Other (Custom name) → "PromptMarket"
4. Click **Generate**
5. Copy the 16-character password

#### 3. Update .env.local
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your_16_char_app_password
SMTP_FROM_EMAIL=your-email@gmail.com
```

---

## 🔧 Implementation Code

I'll create the implementation for you based on which option you choose. Let me know which one you want!

### For Resend (Recommended)
```bash
npm install resend
```

### For AWS SES
```bash
npm install @aws-sdk/client-ses
```

### For Gmail/Nodemailer
```bash
npm install nodemailer
```

---

## 📊 Comparison Table

| Feature | Resend | AWS SES | Gmail SMTP |
|---------|--------|---------|------------|
| **Free Tier** | 3,000/mo forever | 62,000/mo (12 months) | 500/day |
| **Cost After** | $1/mo for 10k | $0.10 per 1k | Free (limited) |
| **Setup Time** | 5 minutes | 30-60 minutes | 5 minutes |
| **Production Ready** | ✅ Yes | ✅ Yes | ❌ No |
| **Email Tracking** | ✅ Yes | ⚠️ Manual | ❌ No |
| **Best For** | Startups | Enterprise | Testing only |

---

## 🎯 My Recommendation

**For your project, use Resend:**
1. Quick setup (5 minutes)
2. Free forever for 3,000 emails/month
3. Perfect for your scale
4. Modern API and dashboard
5. No credit card needed to start

**When to use AWS SES:**
- You need 50,000+ emails/month
- You're already using AWS services
- You need advanced features

**When to use Gmail:**
- Just testing locally
- Not ready for production

---

## ❓ Next Steps

Tell me which option you want, and I'll:
1. ✅ Install the required packages
2. ✅ Update the email service code
3. ✅ Integrate with your Razorpay webhook
4. ✅ Test email sending

**Quick Decision:**
- Want to go live fast? → **Choose Resend**
- Already have AWS? → **Choose AWS SES**
- Just testing? → **Choose Gmail**
