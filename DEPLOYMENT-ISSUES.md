# Cloudflare Pages Deployment Issues & Solutions

## 🚨 Current Problem

The application **cannot be deployed to Cloudflare Pages** using `@cloudflare/next-on-pages` because of a fundamental incompatibility:

### The Conflict
- **Cloudflare Pages requires**: All dynamic routes to use Edge Runtime
- **Your API routes need**: Node.js runtime (for Razorpay SDK, Brevo email, crypto module)
- **Result**: Build fails with "Module not found: Can't resolve 'crypto'"

### Affected Routes
```
/api/razorpay/create-order
/api/razorpay/webhook
/api/download/[token]
```

These routes use:
- `crypto` module (Node.js built-in)
- Razorpay SDK (requires Node.js)
- Brevo email SDK (requires Node.js `http` module)
- Resend email (requires `@react-email/render`)

---

## ✅ Recommended Solutions

### Option 1: Deploy to Vercel (Easiest)
**Vercel natively supports Next.js** and handles both Edge and Node.js runtimes automatically.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Pros:**
- Zero configuration needed
- Your code works as-is
- Free hobby plan available
- Made by Next.js creators

**Cons:**
- Different platform than Cloudflare

### Option 2: Replace Node.js Dependencies with Edge-Compatible Alternatives

#### Replace Razorpay SDK
Instead of using the SDK, make direct HTTP requests:

```typescript
// app/api/razorpay/create-order/route.ts
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  const { promptId, amount } = await request.json();
  
  // Direct API call instead of SDK
  const response = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(process.env.RAZORPAY_KEY_ID + ':' + process.env.RAZORPAY_KEY_SECRET)}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: amount * 100,
      currency: 'INR',
    }),
  });
  
  return NextResponse.json(await response.json());
}
```

#### Replace crypto with Web Crypto API
```typescript
// For webhook signature verification
const encoder = new TextEncoder();
const keyData = encoder.encode(process.env.RAZORPAY_WEBHOOK_SECRET);
const dataToSign = encoder.encode(body);

const key = await crypto.subtle.importKey(
  'raw',
  keyData,
  { name: 'HMAC', hash: 'SHA-256' },
  false,
  ['sign']
);

const signature = await crypto.subtle.sign('HMAC', key, dataToSign);
const signatureHex = Array.from(new Uint8Array(signature))
  .map(b => b.toString(16).padStart(2, '0'))
  .join('');
```

#### Replace Brevo with Edge-Compatible Email Service
Use **Resend** with direct fetch calls (or Cloudflare's Email Workers):

```typescript
export const runtime = 'edge';

export async function sendEmail(to: string, subject: string, html: string) {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'noreply@yourdomain.com',
      to,
      subject,
      html,
    }),
  });
}
```

### Option 3: Use Cloudflare Workers for API Routes
Deploy your frontend to Cloudflare Pages but run API routes as separate Cloudflare Workers.

---

## 📝 Next Steps

### If you choose Vercel (Recommended for quick deployment):
1. Create account at vercel.com
2. Run `vercel` in your project directory
3. Connect your GitHub repo
4. Add environment variables in Vercel dashboard
5. Deploy completes in ~2 minutes

### If you want to stay on Cloudflare:
1. Follow "Option 2" above to refactor API routes
2. Remove all Node.js dependencies (Razorpay SDK, Brevo, etc.)
3. Use Web Crypto API and direct HTTP requests
4. Estimated work: 2-4 hours of refactoring

---

## 🔍 Why This Happens

Cloudflare Workers (which powers Pages) runs on the V8 engine without Node.js APIs. The `@cloudflare/next-on-pages` adapter tries to make Next.js work on this platform, but it has limitations:

- ✅ Works: Edge Runtime routes, static pages, client components
- ❌ Doesn't work: Node.js modules (`crypto`, `fs`, `http`, etc.), npm packages that need Node.js

Vercel's platform has both Edge and Node.js runtimes, so it handles this automatically.

---

## 🎯 Quick Decision Matrix

| Factor | Vercel | Refactor for Cloudflare |
|--------|--------|------------------------|
| Time to deploy | 10 minutes | 2-4 hours |
| Code changes | None | Extensive |
| Learning curve | Minimal | Medium |
| Long-term maintenance | Easy | Medium |
| Cost (hobby/small scale) | Free | Free |

**Recommendation**: Deploy to Vercel now, optionally migrate to Cloudflare later if needed.
