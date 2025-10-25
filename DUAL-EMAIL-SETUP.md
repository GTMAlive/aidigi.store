# 🔥 Dual Email Provider Setup (Resend + Brevo)

## ✨ What You Get

- **12,000 FREE emails/month** (3k Resend + 9k Brevo)
- **Automatic fallback** (if Resend fails, Brevo takes over)
- **Zero downtime** for email delivery
- **Production-ready** setup

---

## 🚀 Quick Setup (15 Minutes Total)

### Step 1: Set Up Resend (Primary - 5 minutes)

#### 1.1 Create Account
1. Go to [https://resend.com](https://resend.com)
2. Click **"Sign Up"**
3. Sign up with GitHub or email (No credit card needed!)
4. Verify your email

#### 1.2 Get API Key
1. Go to **Settings** → **API Keys** → [https://resend.com/api-keys](https://resend.com/api-keys)
2. Click **"Create API Key"**
3. Name it: `PromptMarket Production`
4. Permission: **Full access**
5. Click **"Add"**
6. **Copy the key** (starts with `re_`)

#### 1.3 Test Email (Optional but Recommended)
For immediate testing, Resend provides: `onboarding@resend.dev`
- ✅ Works immediately
- ✅ No domain setup needed
- ✅ Perfect for testing

For production with your domain:
1. Go to **Domains** → **Add Domain**
2. Enter your domain (e.g., `aidigi.store`)
3. Add the DNS records to your domain provider:
   - **TXT record** for verification
   - **MX records** for receiving
   - **DKIM records** for authentication
4. Wait 10-60 minutes for DNS propagation
5. Click **"Verify"**

#### 1.4 Add to .env.local
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
```

For custom domain:
```env
RESEND_FROM_EMAIL=noreply@aidigi.store
```

---

### Step 2: Set Up Brevo (Fallback - 10 minutes)

#### 2.1 Create Account
1. Go to [https://www.brevo.com](https://www.brevo.com) (formerly Sendinblue)
2. Click **"Sign Up Free"**
3. Fill in your details:
   - Email
   - Password
   - Company name (you can use "PromptMarket")
4. Verify your email

#### 2.2 Complete Onboarding
1. Select **"Transactional"** as your primary use case
2. Skip any upsells (stay on free tier)
3. You might need to add some basic info about your business

#### 2.3 Get API Key
1. Go to **Settings** (top right gear icon)
2. Click **"SMTP & API"** in the left menu
3. Or direct link: [https://app.brevo.com/settings/keys/api](https://app.brevo.com/settings/keys/api)
4. Under **"API Keys"** section, you'll see your **Master API key**
5. Click **"Generate a new API key"** (optional, or use master key)
6. **Copy the key** (starts with `xkeysib-`)

#### 2.4 Add Sender Email
1. Go to **Senders** → **Add a Sender**
2. Or direct: [https://app.brevo.com/senders](https://app.brevo.com/senders)
3. Add your email:
   - **From email:** `noreply@aidigi.store` (or your Gmail for testing)
   - **From name:** `PromptMarket`
4. Verify the email (check your inbox)

For testing, you can use your personal email first!

#### 2.5 Add to .env.local
```env
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BREVO_FROM_EMAIL=noreply@aidigi.store
```

For testing with personal email:
```env
BREVO_FROM_EMAIL=yourname@gmail.com
```

---

## 🔧 Complete .env.local Configuration

Open your `.env.local` file and add both services:

```env
# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxx

# Email - Resend (Primary - 3,000 free/month)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev

# Email - Brevo (Fallback - 9,000 free/month)
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BREVO_FROM_EMAIL=noreply@aidigi.store

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🧪 Test Your Setup

### Option 1: Quick Test (Recommended)

Create a test file: `test-email.js`

```javascript
// test-email.js
const { Resend } = require('resend');

async function testResend() {
  const resend = new Resend('re_YOUR_API_KEY_HERE');
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['your-email@gmail.com'], // Change to your email
      subject: 'Test from Resend',
      html: '<strong>It works!</strong>',
    });

    if (error) {
      console.error('❌ Error:', error);
    } else {
      console.log('✅ Email sent!', data);
    }
  } catch (error) {
    console.error('❌ Failed:', error);
  }
}

testResend();
```

Run it:
```bash
node test-email.js
```

### Option 2: Test Through Your App

1. Start your dev server:
```bash
npm run dev
```

2. Make a test payment
3. Check your terminal logs:
   - `✅ Email sent via Resend` - Success!
   - `⚠️ Resend failed, trying Brevo...` - Fallback working!
   - `✅ Email sent via Brevo` - Backup success!

4. Check your email inbox!

---

## 📊 How the Fallback Works

```
Payment Successful
        ↓
   Try Resend (Primary)
        ↓
   ✅ Success? → Email delivered!
        ↓
   ❌ Failed?
        ↓
   Try Brevo (Fallback)
        ↓
   ✅ Success? → Email delivered!
        ↓
   ❌ Both failed? → Error logged
```

**You can see this in action in your terminal logs!**

---

## 🎯 Email Limits & Best Practices

### Free Tier Limits

| Provider | Free Emails | Daily Limit | Best Use |
|----------|-------------|-------------|----------|
| **Resend** | 3,000/month | ~100/day | Purchase confirmations |
| **Brevo** | 9,000/month | 300/day | All other emails |
| **TOTAL** | 12,000/month | 400/day | Combined capacity |

### When to Use Which Service

**Automatic (Default):**
- System tries Resend first
- Falls back to Brevo if Resend fails
- You don't need to do anything!

**Manual Selection:**
```typescript
// Force specific provider
import { sendEmailWithProvider } from '@/lib/email';

// Use Resend only
await sendEmailWithProvider({
  to: 'buyer@email.com',
  subject: 'Your Order',
  html: emailHTML
}, 'resend');

// Use Brevo only
await sendEmailWithProvider({
  to: 'buyer@email.com',
  subject: 'Your Order',
  html: emailHTML
}, 'brevo');
```

### Load Balancing Strategy

If you want to distribute emails evenly:

```typescript
// Round-robin example
let emailCount = 0;

function getProvider() {
  emailCount++;
  return emailCount % 2 === 0 ? 'resend' : 'brevo';
}

// Use in your code
await sendEmailWithProvider(params, getProvider());
```

---

## 🐛 Troubleshooting

### Resend Issues

| Problem | Solution |
|---------|----------|
| "Invalid API key" | Check key starts with `re_` and no extra spaces |
| "Domain not verified" | Use `onboarding@resend.dev` for testing |
| "Rate limit exceeded" | You've sent 3,000+ this month, Brevo will take over |

### Brevo Issues

| Problem | Solution |
|---------|----------|
| "Invalid API key" | Check key starts with `xkeysib-` |
| "Sender not verified" | Verify sender email in Brevo dashboard |
| "Daily limit exceeded" | You've sent 300+ today, wait 24 hours |

### Both Providers Failing

If both fail, check:
1. ✅ API keys are correct in `.env.local`
2. ✅ From emails are verified
3. ✅ Dev server restarted after adding keys
4. ✅ Internet connection working
5. ✅ Check provider status pages:
   - Resend: [https://status.resend.com](https://status.resend.com)
   - Brevo: [https://status.brevo.com](https://status.brevo.com)

### Testing Fallback

Temporarily break Resend to test fallback:
```env
# In .env.local - make Resend key invalid
RESEND_API_KEY=re_invalid_key_for_testing
BREVO_API_KEY=xkeysib-your_real_brevo_key
```

Send a test email → Should see "Resend failed, trying Brevo..." in logs!

---

## 📈 Monitoring Email Delivery

### Resend Dashboard
- Go to [https://resend.com/emails](https://resend.com/emails)
- See all sent emails
- Track opens, clicks, bounces
- View delivery status

### Brevo Dashboard
- Go to [https://app.brevo.com/statistics](https://app.brevo.com/statistics)
- Real-time email statistics
- Delivery rates
- Error logs

### Application Logs
Check your terminal/console for:
- `✅ Email sent via Resend` - Success
- `⚠️ Resend failed, trying Brevo...` - Fallback triggered
- `✅ Email sent via Brevo` - Backup worked
- `❌ All email providers failed!` - Both failed (rare)

---

## 🎉 You're All Set!

### What Happens Now

1. **Customer makes payment** → Razorpay webhook triggered
2. **Download token generated** → Secure download link created
3. **Email sent via Resend** → Professional delivery
4. **If Resend fails** → Brevo takes over automatically
5. **Customer receives email** → With download link
6. **You see logs** → Track everything in terminal

### Next Steps

1. ✅ Make a test purchase
2. ✅ Check your email
3. ✅ Verify download link works
4. ✅ Monitor dashboard for analytics
5. 🚀 Launch your app!

---

## 💡 Pro Tips

1. **Keep both providers active** - Never know when you'll need backup
2. **Monitor usage** - Check dashboards monthly
3. **Test regularly** - Make test purchases to verify
4. **Use meaningful subjects** - Better open rates
5. **Responsive HTML** - Emails look good on mobile

## 📞 Support

- **Resend Docs:** [https://resend.com/docs](https://resend.com/docs)
- **Brevo Docs:** [https://developers.brevo.com](https://developers.brevo.com)
- **Resend Discord:** [https://resend.com/discord](https://resend.com/discord)

---

**Questions? Check the troubleshooting section above or test with the provided code snippets!**

🎯 **Total Setup Time:** ~15 minutes
🆓 **Total Free Emails:** 12,000/month
✅ **Fallback Protection:** Automatic
🚀 **Production Ready:** Yes!
