-- PromptMarket Database Schema for Cloudflare D1

-- Users table (creators and buyers)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  username TEXT UNIQUE, -- for creator storefront URLs: site.com/username
  bio TEXT, -- creator bio for their store page
  avatar_url TEXT, -- profile picture URL
  cover_image_url TEXT, -- cover image for creator store
  location TEXT, -- city, country
  website TEXT, -- personal website
  twitter TEXT, -- twitter handle
  instagram TEXT, -- instagram handle
  role TEXT DEFAULT 'creator' CHECK(role IN ('creator', 'admin')),
  social_link TEXT,
  is_verified INTEGER DEFAULT 0,
  followers_count INTEGER DEFAULT 0,
  payout_details TEXT, -- JSON: {type: 'bank'|'upi', details: {...}}
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- Prompts table
CREATE TABLE IF NOT EXISTS prompts (
  id TEXT PRIMARY KEY,
  creator_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  price REAL NOT NULL,
  category TEXT NOT NULL,
  tags TEXT, -- JSON array
  thumbnail_url TEXT,
  file_url TEXT NOT NULL, -- R2 URL
  preview_text TEXT, -- First 1-2 lines for preview
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'pending', 'live', 'rejected')),
  rating REAL DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_prompts_creator ON prompts(creator_id);
CREATE INDEX idx_prompts_status ON prompts(status);
CREATE INDEX idx_prompts_category ON prompts(category);

-- Purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id TEXT PRIMARY KEY,
  prompt_id TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  buyer_name TEXT,
  amount REAL NOT NULL,
  platform_fee REAL NOT NULL,
  creator_amount REAL NOT NULL,
  razorpay_payment_id TEXT UNIQUE,
  razorpay_order_id TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'completed', 'refunded')),
  download_token TEXT UNIQUE,
  download_count INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (prompt_id) REFERENCES prompts(id) ON DELETE CASCADE
);

CREATE INDEX idx_purchases_prompt ON purchases(prompt_id);
CREATE INDEX idx_purchases_buyer_email ON purchases(buyer_email);
CREATE INDEX idx_purchases_razorpay ON purchases(razorpay_payment_id);
CREATE INDEX idx_purchases_download_token ON purchases(download_token);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  prompt_id TEXT NOT NULL,
  purchase_id TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  buyer_name TEXT,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (prompt_id) REFERENCES prompts(id) ON DELETE CASCADE,
  FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE
);

CREATE INDEX idx_reviews_prompt ON reviews(prompt_id);
CREATE UNIQUE INDEX idx_reviews_purchase ON reviews(purchase_id);

-- Payouts table
CREATE TABLE IF NOT EXISTS payouts (
  id TEXT PRIMARY KEY,
  creator_id TEXT NOT NULL,
  amount REAL NOT NULL,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'processing', 'completed', 'failed')),
  period_start INTEGER NOT NULL,
  period_end INTEGER NOT NULL,
  transaction_id TEXT,
  notes TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_payouts_creator ON payouts(creator_id);
CREATE INDEX idx_payouts_status ON payouts(status);

-- Sessions table (simple auth)
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);

-- Plans table (free vs pro)
CREATE TABLE IF NOT EXISTS creator_plans (
  id TEXT PRIMARY KEY,
  creator_id TEXT UNIQUE NOT NULL,
  plan_type TEXT DEFAULT 'free' CHECK(plan_type IN ('free', 'pro')),
  monthly_fee REAL DEFAULT 0,
  transaction_fee_percent REAL DEFAULT 15,
  custom_domain TEXT,
  remove_branding INTEGER DEFAULT 0,
  subscription_start INTEGER,
  subscription_end INTEGER,
  stripe_subscription_id TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_creator_plans_creator ON creator_plans(creator_id);
