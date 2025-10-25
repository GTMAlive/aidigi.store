# Creator Storefront Feature

## Overview
Each creator gets their own personalized storefront accessible at `yoursite.com/username` - just like Stan Store!

## Features

### 1. **Individual Creator Pages**
- Custom URL: `promptmarket.com/john-doe`
- Personalized profile with avatar and cover image
- Creator bio and description
- Social media links (Twitter, Instagram, Website)
- Location and "Joined" date
- Verified badge for trusted creators

### 2. **Creator Stats**
- Total sales count
- Average rating (out of 5)
- Follower count
- Social proof badges

### 3. **Product Showcase**
- All prompts by that creator displayed in a grid
- Same Stan Store style cards as the homepage
- Empty state if creator hasn't published prompts yet

### 4. **Profile Customization**
Creators can customize their store via Dashboard → Profile:
- Username (unique URL slug)
- Display name
- Bio (500 characters)
- Location
- Avatar image (400x400px)
- Cover image (1200x400px)
- Social links (Website, Twitter, Instagram)

## File Structure

```
app/
├── [username]/
│   ├── page.tsx           # Dynamic creator storefront
│   └── not-found.tsx      # 404 for invalid usernames
├── dashboard/
│   └── profile/
│       └── page.tsx       # Profile customization page
```

## Database Schema

The `users` table now includes:
- `username` - Unique username for URL (e.g., "john-doe")
- `bio` - Creator description
- `avatar_url` - Profile picture URL
- `cover_image_url` - Cover/banner image URL
- `location` - City, Country
- `website` - Personal website URL
- `twitter` - Twitter handle
- `instagram` - Instagram handle
- `followers_count` - Number of followers
- `is_verified` - Verification badge status

## URL Structure

### Creator Store URLs
- ✅ `promptmarket.com/john-doe` - John's creator store
- ✅ `promptmarket.com/sarah-ai` - Sarah's creator store
- ✅ `promptmarket.com/invalid-user` - 404 Not Found

### Other Routes (Not Affected)
- `promptmarket.com/` - Homepage
- `promptmarket.com/prompt/p1` - Product page
- `promptmarket.com/dashboard` - Creator dashboard
- `promptmarket.com/pricing` - Pricing page
- `promptmarket.com/faq` - FAQ page

## Implementation Details

### Dynamic Route: `app/[username]/page.tsx`
- Uses Next.js dynamic routes with `[username]` parameter
- Fetches creator data from database by username
- Returns 404 if username doesn't exist
- Displays all prompts by that creator
- Stan Store inspired design with gradients

### Profile Management: `app/dashboard/my-store/page.tsx`
- Username availability checker
- Live URL preview: `promptmarket.com/your-username`
- Image upload for avatar and cover
- Social media link inputs
- Character counter for bio (500 max)

### Database Indexes
```sql
CREATE INDEX idx_users_username ON users(username);
```
Fast lookup for creator stores by username.

## Mock Data

Two sample creators are available:
1. **john-doe** - `/john-doe`
   - John Doe, AI prompt engineer
   - San Francisco, CA
   - 1234 sales, 4.9 rating
   - Has prompts available

2. **sarah-ai** - `/sarah-ai`
   - Sarah Williams, Marketing expert
   - London, UK
   - 856 sales, 4.8 rating
   - Has prompts available

## How to Use

### For Creators:
1. Go to Dashboard → Profile
2. Set your unique username
3. Add bio, location, social links
4. Upload avatar and cover images
5. Save changes
6. Share your store: `promptmarket.com/your-username`

### For Buyers:
1. Browse prompts on homepage
2. Click on creator name/avatar
3. View their full creator store
4. See all their prompts in one place
5. Follow creators (coming soon)

## Future Enhancements

- [ ] Follow/Unfollow creators
- [ ] Creator analytics (views, clicks)
- [ ] Custom themes per creator
- [ ] Featured products section
- [ ] Testimonials/reviews on profile
- [ ] Creator newsletter signup
- [ ] Custom domain mapping (Pro feature)
- [ ] Creator badges (Top Seller, Verified, etc.)

## Stan Store Comparison

| Feature | Stan Store | PromptMarket |
|---------|-----------|--------------|
| Custom URLs | ✅ `/username` | ✅ `/username` |
| Avatar & Cover | ✅ | ✅ |
| Bio | ✅ | ✅ |
| Social Links | ✅ | ✅ |
| Product Grid | ✅ | ✅ |
| Gradients | ✅ Purple/Pink | ✅ Purple/Pink |
| Rounded Design | ✅ | ✅ |
| Verification Badge | ✅ | ✅ |

## Benefits

### For Creators:
- Professional online presence
- Easy to share on social media
- Build personal brand
- Own your audience
- Track performance

### For Platform:
- Creator retention
- More engagement
- Social proof
- Organic growth via sharing
- Community building

## Technical Notes

- Uses Next.js 14 App Router dynamic routes
- Server-side rendered for SEO
- Static generation for performance (`generateStaticParams`)
- Mobile-responsive design
- Optimized images with Next.js Image
- Type-safe with TypeScript

## Example Usage

```typescript
// Visit a creator store
https://promptmarket.com/john-doe

// Share your store
"Check out my AI prompts: promptmarket.com/yourname"

// Link from anywhere
<Link href="/john-doe">View John's Store</Link>
```

---

This feature transforms PromptMarket into a true creator platform where every creator has their own space to showcase their work - just like Stan Store! 🎨✨
