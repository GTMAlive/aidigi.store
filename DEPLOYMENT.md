# PromptMarket Deployment Guide

## Prerequisites

- Node.js 18+ installed
- Cloudflare account
- Razorpay account
- AWS account (for SES email)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

AWS_SES_ACCESS_KEY=your_aws_access_key
AWS_SES_SECRET_KEY=your_aws_secret_key
AWS_SES_REGION=us-east-1
AWS_SES_FROM_EMAIL=noreply@promptmarket.com

NEXT_PUBLIC_APP_URL=https://promptmarket.com
NEXT_PUBLIC_ANALYTICS_ID=your_plausible_domain
ADMIN_SECRET=create_a_secure_random_string
```

## Step 3: Set Up Cloudflare D1 Database

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Create D1 database:
```bash
wrangler d1 create promptmarket-db
```

4. Copy the database_id from output and update `wrangler.toml`

5. Run migrations:
```bash
wrangler d1 execute promptmarket-db --local --file=./database/schema.sql
wrangler d1 execute promptmarket-db --remote --file=./database/schema.sql
```

## Step 4: Set Up Cloudflare R2 Storage

1. Create R2 bucket:
```bash
wrangler r2 bucket create promptmarket-files
```

2. Configure CORS (optional):
```bash
wrangler r2 bucket cors put promptmarket-files --cors-config cors.json
```

Example `cors.json`:
```json
[
  {
    "AllowedOrigins": ["https://promptmarket.com"],
    "AllowedMethods": ["GET", "PUT"],
    "AllowedHeaders": ["*"]
  }
]
```

## Step 5: Configure Razorpay

1. Go to Razorpay Dashboard
2. Get API keys (Test/Live)
3. Set up webhook:
   - URL: `https://promptmarket.com/api/razorpay/webhook`
   - Events: `payment.captured`, `payment.failed`, `refund.created`
   - Copy webhook secret

## Step 6: Configure AWS SES

1. Verify your domain in AWS SES
2. Create SMTP credentials
3. Move out of sandbox mode (for production)
4. Add sender email to verified identities

## Step 7: Build and Deploy

### Option A: Deploy via Wrangler

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy .next --project-name=promptmarket
```

### Option B: Connect GitHub to Cloudflare Pages

1. Push code to GitHub
2. Go to Cloudflare Dashboard → Pages
3. Create new project from GitHub
4. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Environment variables: Add all from `.env.local`

## Step 8: Configure Custom Domain

1. In Cloudflare Pages, go to Custom Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning

## Step 9: Set Environment Variables in Cloudflare

In Cloudflare Pages → Settings → Environment Variables, add:
- All variables from `.env.local`
- Set for Production and Preview environments

## Step 10: Configure Bindings

In Cloudflare Pages → Settings → Functions:
- Bind D1 database: `DB` → `promptmarket-db`
- Bind R2 bucket: `STORAGE` → `promptmarket-files`

## Post-Deployment Checklist

- [ ] Test payment flow with Razorpay test mode
- [ ] Verify email delivery works
- [ ] Test file upload and download
- [ ] Check all pages load correctly
- [ ] Test responsive design on mobile
- [ ] Verify webhooks are working
- [ ] Set up monitoring/alerts
- [ ] Add Plausible analytics script
- [ ] Test admin panel access
- [ ] Create initial creator accounts
- [ ] Upload sample prompts

## Monitoring

1. Set up Cloudflare Analytics
2. Configure Plausible Analytics
3. Monitor Razorpay dashboard for payments
4. Set up AWS CloudWatch for SES
5. Use Cloudflare Logs for debugging

## Troubleshooting

### Build fails
- Check Node.js version (18+)
- Clear `.next` folder and rebuild
- Verify all dependencies installed

### Database connection issues
- Verify database_id in `wrangler.toml`
- Check bindings are configured
- Run migrations again

### Payment not working
- Verify Razorpay keys are correct
- Check webhook URL is accessible
- Review Razorpay logs

### Emails not sending
- Verify AWS SES credentials
- Check sender email is verified
- Ensure not in SES sandbox mode

## Security Notes

- Never commit `.env.local` to git
- Use strong ADMIN_SECRET
- Rotate API keys regularly
- Enable Cloudflare WAF rules
- Set up rate limiting
- Monitor for suspicious activity

## Backup Strategy

- Cloudflare D1 has automatic backups
- Export database regularly:
  ```bash
  wrangler d1 export promptmarket-db --remote --output=backup.sql
  ```
- R2 files are durable by default
- Keep code in version control

## Scaling

- Cloudflare Pages scales automatically
- D1 handles up to 100k reads/sec
- R2 has unlimited storage
- Monitor usage in Cloudflare Dashboard
- Upgrade Pro plan as needed

## Support

For deployment issues:
- Cloudflare Discord: discord.gg/cloudflaredev
- Razorpay Support: support@razorpay.com
- AWS Support: aws.amazon.com/support
