// Database utilities for Cloudflare D1
// In production, this will use the D1 binding from Cloudflare Workers

export type User = {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  username?: string;
  bio?: string;
  avatar_url?: string;
  cover_image_url?: string;
  location?: string;
  website?: string;
  twitter?: string;
  instagram?: string;
  role: 'creator' | 'admin';
  social_link?: string;
  is_verified: number;
  followers_count?: number;
  payout_details?: string;
  created_at: number;
  updated_at: number;
};

export type Prompt = {
  id: string;
  creator_id: string;
  title: string;
  description: string;
  short_description?: string;
  price: number;
  category: string;
  tags?: string;
  thumbnail_url?: string;
  file_url: string;
  preview_text?: string;
  status: 'draft' | 'pending' | 'live' | 'rejected';
  rating: number;
  review_count: number;
  sales_count: number;
  created_at: number;
  updated_at: number;
};

export type Purchase = {
  id: string;
  prompt_id: string;
  buyer_email: string;
  buyer_name?: string;
  amount: number;
  platform_fee: number;
  creator_amount: number;
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  status: 'pending' | 'completed' | 'refunded';
  download_token?: string;
  download_count: number;
  created_at: number;
  updated_at: number;
};

export type Review = {
  id: string;
  prompt_id: string;
  purchase_id: string;
  buyer_email: string;
  buyer_name?: string;
  rating: number;
  comment?: string;
  created_at: number;
};

// Mock database for development
// In production, these will use the actual D1 database
class MockDB {
  private prompts: Prompt[] = [
    {
      id: 'p1',
      creator_id: 'u1',
      title: 'ChatGPT Content Writing Master Pack',
      description: 'Complete collection of 50+ prompts for professional content writing. Includes blog posts, social media, emails, and more.',
      short_description: '50+ content writing prompts for ChatGPT',
      price: 499,
      category: 'Content Writing',
      tags: JSON.stringify(['ChatGPT', 'Content', 'Writing']),
      thumbnail_url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
      file_url: 'mock-url',
      preview_text: 'Write a comprehensive blog post about [TOPIC]...',
      status: 'live',
      rating: 4.8,
      review_count: 24,
      sales_count: 156,
      created_at: Date.now() - 86400000 * 30,
      updated_at: Date.now() - 86400000 * 30,
    },
    {
      id: 'p2',
      creator_id: 'u2',
      title: 'Midjourney Art Styles Collection',
      description: 'Unlock stunning AI art with 100+ curated Midjourney prompts. From photorealistic to abstract, create amazing visuals.',
      short_description: '100+ Midjourney prompts for stunning art',
      price: 799,
      category: 'AI Art',
      tags: JSON.stringify(['Midjourney', 'Art', 'Design']),
      thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
      file_url: 'mock-url',
      preview_text: 'A photorealistic portrait of [SUBJECT] in the style of...',
      status: 'live',
      rating: 4.9,
      review_count: 38,
      sales_count: 203,
      created_at: Date.now() - 86400000 * 20,
      updated_at: Date.now() - 86400000 * 20,
    },
    {
      id: 'p3',
      creator_id: 'u1',
      title: 'Marketing Copy Templates',
      description: 'High-converting marketing copy prompts for ads, landing pages, and email campaigns. Tested and proven formulas.',
      short_description: 'Marketing copy prompts that convert',
      price: 599,
      category: 'Marketing',
      tags: JSON.stringify(['ChatGPT', 'Marketing', 'Copywriting']),
      thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      file_url: 'mock-url',
      preview_text: 'Create a compelling headline for [PRODUCT]...',
      status: 'live',
      rating: 4.7,
      review_count: 19,
      sales_count: 89,
      created_at: Date.now() - 86400000 * 15,
      updated_at: Date.now() - 86400000 * 15,
    },
    {
      id: 'p4',
      creator_id: 'u3',
      title: 'Code Documentation Prompts',
      description: 'Professional prompts for generating code documentation, API docs, and technical writing.',
      short_description: 'Generate perfect code documentation',
      price: 399,
      category: 'Development',
      tags: JSON.stringify(['ChatGPT', 'Coding', 'Documentation']),
      thumbnail_url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400',
      file_url: 'mock-url',
      preview_text: 'Generate comprehensive documentation for [CODE]...',
      status: 'live',
      rating: 4.6,
      review_count: 12,
      sales_count: 45,
      created_at: Date.now() - 86400000 * 10,
      updated_at: Date.now() - 86400000 * 10,
    },
  ];

  async getPrompts(status?: string): Promise<Prompt[]> {
    if (status) {
      return this.prompts.filter(p => p.status === status);
    }
    return this.prompts;
  }

  async getPromptById(id: string): Promise<Prompt | null> {
    return this.prompts.find(p => p.id === id) || null;
  }
}

export const mockDB = new MockDB();
