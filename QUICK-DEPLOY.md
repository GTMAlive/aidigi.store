# ⚡ Quick Deploy to Cloudflare - 5 Minutes

## 🎯 Essential Steps Only

### 1. Fix PowerShell (If Needed)

```powershell
# Run PowerShell as Administrator, then:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 2. Authenticate

```powershell
npx wrangler login
```
Browser opens → Login to Cloudflare → Done

### 3. Create Database

```powershell
npx wrangler d1 create promptmarket-db
```

**Copy the `database_id` from output!**

Edit `wrangler.toml` - replace `your-database-id-here` with your ID:
```toml
database_id = "paste-your-id-here"
```

Run migrations:
```powershell
npx wrangler d1 execute promptmarket-db --file=./database/schema.sql --remote
```

### 4. Create Storage

```powershell
npx wrangler r2 bucket create promptmarket-files
```

### 5. Deploy

**Option A: Via GitHub (Recommended)**

```powershell
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/promptmarket.git
git push -u origin main
```

Then go to:
1. https://dash.cloudflare.com/ → Pages
2. Connect to Git → Select repo
3. Settings: Framework = Next.js, Build = `.next`
4. Add environment variables (copy from `.env.example`)
5. Bind D1 (DB) and R2 (STORAGE) in Settings → Functions
6. Deploy!

**Option B: Direct Deploy**

```powershell
npm install
npm run build
npx wrangler pages deploy .next --project-name=promptmarket
```

---

## 🔑 Required Environment Variables

Add these in Cloudflare Dashboard → Pages → Settings → Environment variables:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
RESEND_API_KEY=your_resend_key
BREVO_API_KEY=your_brevo_key
NEXT_PUBLIC_APP_URL=https://your-project.pages.dev
ADMIN_SECRET=change_this_strong_password
```

---

## ✅ Verify

1. Visit your site: `https://your-project.pages.dev`
2. Test signup/login
3. Upload a prompt
4. Make a test payment

---

## 🆘 Troubleshooting

**Build fails?**
```powershell
rm -rf .next node_modules
npm install
npm run build
```

**Database not working?**
- Check database_id in wrangler.toml
- Verify D1 binding is added (DB)

**Environment variables not working?**
- Redeploy after adding variables
- Check spelling (case-sensitive)

---

## 📚 Full Guide

See `CLOUDFLARE-DEPLOYMENT-GUIDE.md` for complete details.

---

## 🚀 That's It!

Your site is now live on Cloudflare's global edge network! 🎉
