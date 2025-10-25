# PromptMarket — AI Prompts Marketplace

A modern, conversion-focused marketplace for buying and selling AI prompt packs. Built with Next.js, TypeScript, TailwindCSS, and deployed on Cloudflare.

## 🚀 Features

### For Buyers
- Browse high-quality AI prompt packs
- Secure payment via Razorpay
- Instant delivery via email
- 7-day refund policy
- Lifetime access to purchases

### For Creators
- Easy prompt upload system
- Dashboard with sales analytics
- Weekly automated payouts
- Two pricing tiers (Free 15% fee, Pro 5% fee)
- Custom domain support (Pro)

### For Admins
- Review and approve prompts
- Manage users and transactions
- Process refunds
- Handle payout operations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2
- **Payments**: Razorpay
- **Email**: AWS SES
- **Hosting**: Cloudflare Pages
- **Analytics**: Plausible

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd aidigi.store
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
AWS_SES_ACCESS_KEY=your_aws_access_key
AWS_SES_SECRET_KEY=your_aws_secret_key
AWS_SES_REGION=us-east-1
AWS_SES_FROM_EMAIL=noreply@promptmarket.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_SECRET=your_secure_admin_secret
```

4. **Set up Cloudflare D1 Database**
```bash
# Create D1 database
npx wrangler d1 create promptmarket-db

# Update wrangler.toml with your database_id

# Run migrations
npx wrangler d1 execute promptmarket-db --file=./database/schema.sql
```

5. **Set up Cloudflare R2 Bucket**
```bash
# Create R2 bucket
npx wrangler r2 bucket create promptmarket-files
```

6. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000`

## 🚢 Deployment

### Deploy to Cloudflare Pages

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Cloudflare**
```bash
npm run pages:deploy
```

Or connect your GitHub repository to Cloudflare Pages for automatic deployments.

### Environment Variables on Cloudflare

Set these in your Cloudflare Pages dashboard:
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `AWS_SES_ACCESS_KEY`
- `AWS_SES_SECRET_KEY`
- `AWS_SES_REGION`
- `AWS_SES_FROM_EMAIL`
- `NEXT_PUBLIC_APP_URL`
- `ADMIN_SECRET`

### Bindings

Configure in `wrangler.toml`:
- D1 Database: `DB`
- R2 Bucket: `STORAGE`

## 📁 Project Structure

```
├── app/
│   ├── api/              # API routes
│   ├── dashboard/        # Creator dashboard
│   ├── admin/            # Admin panel
│   ├── prompt/[id]/      # Product pages
│   ├── checkout/[id]/    # Checkout flow
│   └── ...               # Other pages
├── components/
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/
│   ├── db.ts             # Database utilities
│   ├── utils.ts          # Helper functions
│   └── email.ts          # Email templates
├── database/
│   └── schema.sql        # Database schema
├── wrangler.toml         # Cloudflare config
└── ...
```

## 🔑 Key Pages

- `/` - Homepage with featured prompts
- `/prompt/[id]` - Individual prompt product page
- `/dashboard` - Creator dashboard
- `/dashboard/upload` - Upload new prompts
- `/dashboard/sales` - Sales ledger
- `/checkout/[id]` - Payment checkout
- `/admin` - Admin panel (protected)

## 💳 Payment Flow

1. Buyer clicks "Buy Now" on a prompt
2. Redirected to checkout page
3. Enter billing info
4. Razorpay Checkout opens
5. Payment processed
6. Webhook receives confirmation
7. Email sent with download link
8. Creator earnings updated

## 📧 Email Templates

Located in `lib/email.ts`:
- Purchase confirmation with download link
- Payout notification
- Prompt approval/rejection

## 🔒 Security

- Secure payment processing via Razorpay
- Environment variables for sensitive data
- Webhook signature verification
- Admin routes protected
- SQL injection prevention with parameterized queries

## 📊 Analytics

Using Plausible Analytics for privacy-friendly tracking:
- Page views
- Purchase conversions
- Traffic sources

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Support

For support, email support@promptmarket.com

## 🎯 Roadmap

- [ ] Social authentication (Google, Twitter)
- [ ] Advanced analytics dashboard
- [ ] Bulk upload for creators
- [ ] Affiliate program
- [ ] Mobile app (React Native)
- [ ] API for developers
- [ ] Prompt versioning
- [ ] Collections/bundles

## 👨‍💻 Development

Built with ❤️ using modern web technologies.

To contribute, please submit a pull request or open an issue.
