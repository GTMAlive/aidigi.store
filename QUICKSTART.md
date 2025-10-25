# PromptMarket — Quick Start Guide

Get your AI prompt marketplace running in 5 minutes!

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Overview

```
PromptMarket/
├── app/                    # Next.js 14 App Router
│   ├── page.tsx           # Homepage (Hero + Featured Prompts)
│   ├── prompt/[id]/       # Dynamic product pages
│   ├── checkout/[id]/     # Payment checkout
│   ├── dashboard/         # Creator dashboard
│   │   ├── page.tsx       # Dashboard overview
│   │   ├── upload/        # Upload new prompts
│   │   ├── prompts/       # Manage prompts
│   │   ├── sales/         # Sales ledger
│   │   └── settings/      # Account settings
│   ├── admin/             # Admin panel
│   ├── api/               # API routes
│   │   ├── razorpay/      # Payment endpoints
│   │   └── download/      # File downloads
│   └── ...                # Other pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Navigation
│   ├── footer.tsx        # Footer
│   └── prompt-card.tsx   # Product card
├── lib/                  # Utilities
│   ├── db.ts            # Database (mock + types)
│   ├── utils.ts         # Helper functions
│   └── email.ts         # Email templates
└── database/
    └── schema.sql       # D1 database schema
```

## 🎨 Key Features

### Homepage (`/`)
- Hero section with CTA buttons
- Trust band
- Featured prompts grid (2-column on mobile, 4-column on desktop)
- "How It Works" section (3 steps)
- Pricing teaser
- Footer with links

### Product Page (`/prompt/[id]`)
- Large thumbnail
- Title, tags, ratings
- Description
- Preview section
- Purchase card with Razorpay integration
- Creator info
- Reviews section

### Creator Dashboard (`/dashboard`)
- Overview with stats
- Upload form for new prompts
- Manage existing prompts
- Sales ledger with earnings
- Settings (profile, payout info)

### Checkout (`/checkout/[id]`)
- Billing information form
- Order summary
- Razorpay payment integration
- Success page with download link

### Admin Panel (`/admin`)
- Pending prompts review
- Approve/reject prompts
- View all purchases
- Process refunds
- Manage payouts

## 🎯 Quick Customization

### Change Brand Colors

Edit `tailwind.config.ts`:
```typescript
primary: "#2563eb", // Change to your brand color
```

### Update Site Name

Search and replace "PromptMarket" throughout:
```bash
# On Windows PowerShell
(Get-Content -Path .\app\layout.tsx) -replace 'PromptMarket', 'YourBrand' | Set-Content -Path .\app\layout.tsx
```

### Modify Copy

Edit `app/page.tsx` for homepage copy:
- Hero headline
- Subheadline
- Trust band text
- How It Works steps

## 🧪 Testing

### Test Data

The app includes mock data in `lib/db.ts`:
- 4 sample prompts with different categories
- Mock sales data
- Sample reviews

### Test Razorpay (Demo Mode)

The checkout page has demo mode enabled. To use real Razorpay:

1. Get API keys from Razorpay Dashboard
2. Add to `.env.local`
3. Uncomment Razorpay code in `app/checkout/[id]/page.tsx`

## 📱 Responsive Design

All pages are fully responsive:
- Mobile: Single column, hamburger menu
- Tablet: 2-column grid
- Desktop: 4-column grid, full navigation

## 🔧 Common Tasks

### Add a New Page

```bash
# Create new page
New-Item -ItemType File -Path "app\about\page.tsx"
```

### Add Mock Prompts

Edit `lib/db.ts` and add to the `prompts` array.

### Change Transaction Fees

Update pricing in:
- `app/page.tsx` (pricing section)
- `app/pricing/page.tsx`
- `lib/utils.ts` (`calculatePlatformFee`)

### Modify Email Templates

Edit `lib/email.ts`:
- `generateDownloadEmail()`
- `generatePayoutNotificationEmail()`

## 📦 Next Steps

1. **Set up Cloudflare D1**: Follow `DEPLOYMENT.md`
2. **Configure Razorpay**: Add API keys
3. **Set up AWS SES**: For email delivery
4. **Add authentication**: Implement user login
5. **Deploy to Cloudflare Pages**: Production deployment

## 🆘 Need Help?

- **Documentation**: See `README.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Database Schema**: See `database/schema.sql`

## 🎉 You're Ready!

The marketplace is now running locally. Explore the different pages:

- Homepage: http://localhost:3000
- Sample Product: http://localhost:3000/prompt/p1
- Dashboard: http://localhost:3000/dashboard
- Admin: http://localhost:3000/admin
- Pricing: http://localhost:3000/pricing

Start customizing and building your AI prompt marketplace!
