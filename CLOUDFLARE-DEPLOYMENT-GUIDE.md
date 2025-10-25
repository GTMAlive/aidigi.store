# 🚀 Complete Cloudflare Deployment Guide

## Prerequisites

Before you begin, ensure you have:
- ✅ Cloudflare account (sign up at https://dash.cloudflare.com/sign-up)
- ✅ Node.js v18+ installed
- ✅ Git repository (GitHub/GitLab/Bitbucket)
- ✅ Payment accounts ready (Razorpay, Resend/Brevo)

---

## 📦 Step 1: Authenticate with Cloudflare

### 1.1 Login to Wrangler

```powershell
# If you get execution policy error, run PowerShell as Administrator and execute:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then authenticate
npx wrangler login
```

This will open a browser window to authenticate with your Cloudflare account.

---

## 🗄️ Step 2: Create D1 Database

### 2.1 Create the Database

```powershell
npx wrangler d1 create promptmarket-db
```

**Output will look like:**
```
✅ Successfully created DB 'promptmarket-db'
📋 Created your database using D1's new storage backend.

[[d1_databases]]
binding = "DB"
database_name = "promptmarket-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### 2.2 Copy the database_id

**IMPORTANT:** Copy the `database_id` from the output (the UUID).

### 2.3 Update wrangler.toml

Open `wrangler.toml` and replace `your-database-id-here` with your actual database ID:

```toml
[[d1_databases]]
binding = "DB"
database_name = "promptmarket-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # ← Paste your ID here
```

### 2.4 Run Database Migrations

```powershell
# Run the schema migration
npx wrangler d1 execute promptmarket-db --file=./database/schema.sql --remote
```

This creates all the necessary tables in your D1 database.

---

## 📁 Step 3: Create R2 Storage Bucket

### 3.1 Create the Bucket

```powershell
npx wrangler r2 bucket create promptmarket-files
```

**Output:**
```
✅ Created bucket 'promptmarket-files'
```

### 3.2 Verify Configuration

Your `wrangler.toml` should already have:

```toml
[[r2_buckets]]
binding = "STORAGE"
bucket_name = "promptmarket-files"
```

---

## 🔑 Step 4: Set Up Third-Party Services

### 4.1 Razorpay (Payment Gateway)

1. Sign up at https://razorpay.com/
2. Get your API keys from Dashboard → Settings → API Keys
3. Generate webhook secret from Dashboard → Webhooks
4. Note down:
   - Key ID (starts with `rzp_`)
   - Key Secret
   - Webhook Secret

### 4.2 Resend (Email Service)

1. Sign up at https://resend.com/
2. Go to API Keys section
3. Create a new API key
4. Verify your domain (or use `onboarding@resend.dev` for testing)
5. Note down your API key

### 4.3 Brevo (Backup Email Service)

1. Sign up at https://www.brevo.com/
2. Go to SMTP & API → API Keys
3. Create a new API key (v3)
4. Note down your API key

---

## 🌐 Step 5: Deploy to Cloudflare Pages

### Option A: Deploy via GitHub (Recommended)

#### 5.1 Push to GitHub

```powershell
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/promptmarket.git
git push -u origin main
```

#### 5.2 Connect to Cloudflare Pages

1. Go to https://dash.cloudflare.com/
2. Click **Pages** in the sidebar
3. Click **Create a project**
4. Click **Connect to Git**
5. Select your repository
6. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/`

#### 5.3 Add Environment Variables

In Cloudflare Pages project settings → Environment variables, add:

```env
# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Email - Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev

# Email - Brevo (Fallback)
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BREVO_FROM_EMAIL=noreply@yourdomain.com

# App Config
NEXT_PUBLIC_APP_URL=https://your-project.pages.dev
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Admin
ADMIN_SECRET=your_super_secure_admin_password_change_this
```

**IMPORTANT:** 
- Add these for both **Production** and **Preview** environments
- Never commit `.env` files to git

#### 5.4 Bind D1 and R2

In Cloudflare Pages → Settings → Functions:

**D1 Database Bindings:**
- Variable name: `DB`
- D1 database: Select `promptmarket-db`

**R2 Bucket Bindings:**
- Variable name: `STORAGE`
- R2 bucket: Select `promptmarket-files`

#### 5.5 Deploy

Click **Save and Deploy**. Cloudflare will:
1. Build your Next.js app
2. Deploy to edge network
3. Provide a URL: `https://your-project.pages.dev`

---

### Option B: Deploy via CLI (Manual)

#### 5.1 Build the Project

```powershell
# Install dependencies
npm install

# Build for production
npm run build
```

#### 5.2 Deploy with Wrangler

```powershell
npx wrangler pages deploy .next --project-name=promptmarket
```

#### 5.3 Set Environment Variables via CLI

```powershell
# Set secrets (one at a time)
npx wrangler pages secret put RAZORPAY_KEY_SECRET --project-name=promptmarket
npx wrangler pages secret put ADMIN_SECRET --project-name=promptmarket

# For non-secret env vars, use the dashboard
```

---

## ⚙️ Step 6: Configure Webhooks

### 6.1 Razorpay Webhook

1. Go to Razorpay Dashboard → Webhooks
2. Create new webhook
3. URL: `https://your-project.pages.dev/api/razorpay/webhook`
4. Events: Select all payment events
5. Copy the webhook secret
6. Add to Cloudflare environment variables

### 6.2 Test Webhook

```powershell
# Use Razorpay test mode to verify
# Make a test payment and check logs in Cloudflare
```

---

## 🧪 Step 7: Testing

### 7.1 Test the Deployment

1. Visit your site: `https://your-project.pages.dev`
2. Test key features:
   - ✅ Homepage loads
   - ✅ Can view prompts
   - ✅ Creator signup/login works
   - ✅ Upload prompt (test)
   - ✅ Payment flow (test mode)
   - ✅ Email delivery

### 7.2 Check Logs

```powershell
# View real-time logs
npx wrangler pages deployment tail
```

Or check in Cloudflare Dashboard → Pages → Your Project → Logs

---

## 🌍 Step 8: Custom Domain (Optional)

### 8.1 Add Custom Domain

1. Cloudflare Pages → Your Project → Custom domains
2. Click **Set up a custom domain**
3. Enter your domain: `promptmarket.com`
4. Follow DNS configuration instructions

### 8.2 Update Environment Variables

Update `NEXT_PUBLIC_APP_URL` to your custom domain:
```env
NEXT_PUBLIC_APP_URL=https://promptmarket.com
```

---

## 🔧 Step 9: Post-Deployment Configuration

### 9.1 Create Admin Account

Since you need an admin to approve prompts:

```powershell
# Connect to your D1 database
npx wrangler d1 execute promptmarket-db --remote --command="
INSERT INTO users (id, email, password_hash, name, role, created_at, updated_at)
VALUES (
  'admin-001',
  'admin@promptmarket.com',
  'TEMP_PASSWORD_HASH',
  'Admin',
  'admin',
  strftime('%s', 'now'),
  strftime('%s', 'now')
);"
```

**Note:** You'll need to implement proper password hashing. For now, create through the signup flow then update role to 'admin' manually.

### 9.2 Test Admin Panel

1. Visit: `https://your-domain.com/admin`
2. Login with admin credentials
3. Verify you can approve/reject prompts

---

## 📊 Step 10: Monitoring & Analytics

### 10.1 Cloudflare Analytics

- Built-in analytics in Cloudflare Dashboard
- View traffic, performance, security events

### 10.2 Plausible Analytics (Optional)

1. Sign up at https://plausible.io/
2. Add your domain
3. Get script code
4. Add to `app/layout.tsx`

### 10.3 Error Tracking

Consider adding:
- Sentry (error tracking)
- LogFlare (log management)

---

## 🔄 Continuous Deployment

### Automatic Deployments

Once connected to GitHub:
- Push to `main` branch → Auto-deploys to production
- Push to other branches → Creates preview deployments
- Each PR gets a unique preview URL

### Manual Deployments

```powershell
# Rebuild and deploy
npm run build
npx wrangler pages deploy .next --project-name=promptmarket
```

---

## 🛠️ Troubleshooting

### Common Issues

**1. Build Fails**
```powershell
# Check Node version
node --version  # Should be 18+

# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

**2. Database Connection Issues**
```powershell
# Verify D1 binding
npx wrangler d1 list

# Check if tables exist
npx wrangler d1 execute promptmarket-db --remote --command="SELECT name FROM sqlite_master WHERE type='table';"
```

**3. R2 Storage Issues**
```powershell
# List R2 buckets
npx wrangler r2 bucket list

# Check binding in wrangler.toml
```

**4. Environment Variables Not Working**
- Ensure variables are set for correct environment (Production/Preview)
- Redeploy after adding new variables
- Check variable names match exactly (case-sensitive)

**5. Payment Webhook Not Triggering**
- Verify webhook URL is correct
- Check Razorpay webhook logs
- Ensure webhook secret matches
- Check Cloudflare Pages function logs

---

## 📈 Performance Optimization

### 1. Enable Caching

Add cache headers in `next.config.mjs`:
```javascript
async headers() {
  return [
    {
      source: '/prompt/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, s-maxage=86400',
        },
      ],
    },
  ];
}
```

### 2. Image Optimization

- Use Cloudflare Images (optional paid service)
- Or use next/image with proper optimization

### 3. Enable Cloudflare Features

- **Auto Minify**: CSS, JavaScript, HTML
- **Brotli Compression**: Better than gzip
- **HTTP/3**: Faster protocol
- **Early Hints**: Faster page loads

---

## 💰 Cost Estimation

### Free Tier Limits (Cloudflare)

- **Pages**: Unlimited requests, 500 builds/month
- **D1**: 5M reads/day, 100K writes/day, 5GB storage
- **R2**: 10GB storage, 1M Class A ops/month, 10M Class B ops/month
- **Workers**: 100K requests/day

### Estimated Costs (After Free Tier)

- **D1**: $0.001 per 1K reads, $1 per 1M writes
- **R2**: $0.015/GB storage, minimal egress fees
- **Pages**: Free unlimited requests
- **Total**: ~$5-20/month for small to medium traffic

### Third-Party Services

- **Razorpay**: 2% per transaction
- **Resend**: Free up to 3K emails/month, then $20/mo
- **Brevo**: Free up to 9K emails/month (backup)

---

## 🔒 Security Checklist

Before going live:

- ✅ Change `ADMIN_SECRET` to strong password
- ✅ Use production Razorpay keys (not test)
- ✅ Verify webhook signature validation
- ✅ Enable HTTPS only (Cloudflare does this by default)
- ✅ Add CSP headers
- ✅ Rate limiting for APIs
- ✅ Input validation on all forms
- ✅ SQL injection prevention (use parameterized queries)
- ✅ Verify email domains
- ✅ Add CAPTCHA on signup/login (optional)

---

## 📚 Useful Commands

```powershell
# View deployment logs
npx wrangler pages deployment tail

# List deployments
npx wrangler pages deployment list --project-name=promptmarket

# View D1 data
npx wrangler d1 execute promptmarket-db --remote --command="SELECT * FROM users LIMIT 5;"

# List R2 files
npx wrangler r2 object list promptmarket-files

# Rollback deployment
# Go to Cloudflare Dashboard → Pages → Deployments → Select previous → Rollback

# Local development with Cloudflare
npm run pages:dev
```

---

## 🎉 You're Live!

Your site should now be live at:
- Production: `https://your-project.pages.dev` or `https://yourdomain.com`
- Preview deployments: Unique URLs for each branch/PR

### Next Steps

1. ✅ Test all features thoroughly
2. ✅ Create your first creator account
3. ✅ Upload test prompts
4. ✅ Make test purchases
5. ✅ Monitor analytics
6. ✅ Share with beta users
7. ✅ Gather feedback
8. ✅ Iterate and improve

---

## 📞 Support Resources

- **Cloudflare Docs**: https://developers.cloudflare.com/pages/
- **Next.js on Cloudflare**: https://developers.cloudflare.com/pages/framework-guides/nextjs/
- **D1 Docs**: https://developers.cloudflare.com/d1/
- **R2 Docs**: https://developers.cloudflare.com/r2/
- **Community**: https://community.cloudflare.com/

---

## 🚀 Deployment Checklist

Print this and check off as you go:

- [ ] Wrangler installed and authenticated
- [ ] D1 database created and migrated
- [ ] R2 bucket created
- [ ] wrangler.toml updated with database_id
- [ ] GitHub repository created
- [ ] Cloudflare Pages project created
- [ ] Environment variables added (all of them!)
- [ ] D1 database binding added
- [ ] R2 bucket binding added
- [ ] Razorpay credentials configured
- [ ] Email service configured (Resend/Brevo)
- [ ] Webhook URL configured in Razorpay
- [ ] First deployment successful
- [ ] Homepage loads correctly
- [ ] Test signup/login works
- [ ] Test prompt upload works
- [ ] Test payment flow works
- [ ] Test email delivery works
- [ ] Admin panel accessible
- [ ] Custom domain configured (optional)
- [ ] Analytics configured
- [ ] Security checklist completed
- [ ] Monitoring set up

---

**Congratulations!** 🎉 Your AI Prompts Marketplace is now live on Cloudflare! 🚀
