# Windows Setup Guide for PromptMarket

## PowerShell Execution Policy Issue

If you're getting an error about scripts being disabled, you need to adjust PowerShell's execution policy.

### Option 1: Run in Administrator PowerShell (Recommended)

1. Open PowerShell as Administrator
2. Run this command:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Type `Y` to confirm
4. Navigate to your project folder:
   ```powershell
   cd c:\xampp\htdocs\aidigi.store
   ```
5. Install dependencies:
   ```powershell
   npm install
   ```

### Option 2: Bypass for Single Session

Run PowerShell and execute:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
cd c:\xampp\htdocs\aidigi.store
npm install
```

### Option 3: Use Command Prompt Instead

1. Open Command Prompt (cmd.exe)
2. Navigate to project:
   ```cmd
   cd c:\xampp\htdocs\aidigi.store
   ```
3. Run npm commands directly:
   ```cmd
   npm install
   npm run dev
   ```

## Quick Start After Fixing Execution Policy

Once you've resolved the execution policy:

### 1. Install Dependencies
```powershell
npm install
```

This will install:
- Next.js 14
- React 18
- TailwindCSS
- TypeScript
- Radix UI components
- Lucide icons
- And all other dependencies

### 2. Start Development Server
```powershell
npm run dev
```

The app will start on [http://localhost:3000](http://localhost:3000)

## What You'll See

### Homepage (http://localhost:3000)
✅ Hero section: "AI Prompts — Build, Sell, Repeat"
✅ Trust band with icons
✅ 4 featured prompt cards
✅ How It Works (3 steps)
✅ Pricing teaser (Free vs Pro)
✅ Footer with all links

### Product Page (http://localhost:3000/prompt/p1)
✅ Product image and details
✅ Buy Now button
✅ Creator info
✅ Preview section
✅ Reviews

### Dashboard (http://localhost:3000/dashboard)
✅ Stats overview
✅ Quick actions
✅ Recent sales
✅ Navigation sidebar

### Creator Upload (http://localhost:3000/dashboard/upload)
✅ Complete upload form
✅ File upload for prompts
✅ Thumbnail upload
✅ Preview text field

### Checkout (http://localhost:3000/checkout/p1)
✅ Billing form
✅ Order summary
✅ Razorpay integration (demo mode)

### Admin Panel (http://localhost:3000/admin)
✅ Pending prompts review
✅ Purchase management
✅ Payout processing

## Common Windows Issues

### Issue: Module not found errors
**Solution**: Delete `node_modules` and reinstall
```cmd
rmdir /s /q node_modules
npm install
```

### Issue: Port 3000 already in use
**Solution**: Use a different port
```cmd
npm run dev -- -p 3001
```

### Issue: Hot reload not working
**Solution**: Add to `next.config.mjs`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  }
}
```

### Issue: Path issues with XAMPP
**Solution**: XAMPP is for PHP/Apache. This is a Node.js app and doesn't need XAMPP.
You can:
- Keep files in `c:\xampp\htdocs\aidigi.store` (no problem)
- Or move to a simpler path like `c:\projects\promptmarket`

## Recommended Windows Tools

### VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

### Terminal Options
- Windows Terminal (recommended)
- Git Bash
- WSL2 (Windows Subsystem for Linux)

## Next Steps

After getting the dev server running:

1. ✅ Explore all pages
2. ✅ Test responsive design (resize browser)
3. ✅ Review code structure
4. 🔧 Configure Razorpay test keys (optional)
5. 🔧 Set up Cloudflare account (for deployment)
6. 🔧 Customize branding and colors

## Need Help?

Check the main documentation:
- `README.md` - Full project overview
- `QUICKSTART.md` - Quick start guide
- `DEPLOYMENT.md` - Production deployment

## Video Tutorial (Recommended)

For Windows users unfamiliar with Node.js:
1. Search YouTube: "Next.js Windows setup"
2. Follow along with installation steps
3. Return to this project once Node.js is working

## Troubleshooting Resources

- Node.js Windows Issues: https://nodejs.org/en/download/
- PowerShell Execution Policy: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy
- Next.js Docs: https://nextjs.org/docs
