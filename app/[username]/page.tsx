import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PromptCard } from "@/components/prompt-card";
import { CreatorProfileActions } from "@/components/creator-profile";
import { mockDB } from "@/lib/db";
import { 
  Twitter, 
  Instagram, 
  Globe, 
  MapPin, 
  Mail,
  CheckCircle,
  Star,
  ShoppingBag,
  Heart,
  Users,
  Link as LinkIcon
} from "lucide-react";

interface CreatorStorePageProps {
  params: {
    username: string;
  };
}

// Mock creator data - in production, fetch from database
const mockCreators: Record<string, {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatar_url: string;
  cover_image_url?: string;
  location?: string;
  website?: string;
  twitter?: string;
  instagram?: string;
  is_verified: boolean;
  total_sales: number;
  rating: number;
  followers: number;
  joined_date: string;
}> = {
  "john-doe": {
    id: "u1",
    username: "john-doe",
    name: "John Doe",
    bio: "AI prompt engineer & content creator. Helping businesses scale with ChatGPT & Midjourney prompts. 5+ years in AI.",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    cover_image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop",
    location: "San Francisco, CA",
    website: "https://johndoe.com",
    twitter: "johndoe",
    instagram: "johndoe",
    is_verified: true,
    total_sales: 1234,
    rating: 4.9,
    followers: 2500,
    joined_date: "January 2024"
  },
  "sarah-ai": {
    id: "u2",
    username: "sarah-ai",
    name: "Sarah Williams",
    bio: "Marketing expert turned AI enthusiast. Creating prompts for social media, copywriting & email marketing.",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    cover_image_url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&h=400&fit=crop",
    location: "London, UK",
    twitter: "sarahai",
    instagram: "sarahai",
    is_verified: true,
    total_sales: 856,
    rating: 4.8,
    followers: 1800,
    joined_date: "March 2024"
  }
};

export default async function CreatorStorePage({ params }: CreatorStorePageProps) {
  const { username } = params;
  
  // Get creator data
  const creator = mockCreators[username];
  
  if (!creator) {
    notFound();
  }

  // Get creator's prompts
  const allPrompts = await mockDB.getPrompts('live');
  const creatorPrompts = allPrompts.filter(p => p.creator_id === creator.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-white">
      {/* Cover Image with Pattern */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700">
          {creator.cover_image_url ? (
            <img 
              src={creator.cover_image_url} 
              alt={creator.name}
              className="h-full w-full object-cover opacity-30 mix-blend-overlay"
            />
          ) : null}
          {/* Animated pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="container mx-auto px-6 -mt-20 pb-12">
        <div className="mx-auto max-w-5xl">
          {/* Profile Card */}
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden mb-8 bg-white backdrop-blur-sm">
            <CardContent className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Avatar */}
                <div className="relative group">
                  <div className="h-36 w-36 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-purple-100 to-pink-100 transition-transform group-hover:scale-105">
                    <img 
                      src={creator.avatar_url} 
                      alt={creator.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {creator.is_verified && (
                    <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 border-4 border-white flex items-center justify-center shadow-lg animate-pulse">
                      <CheckCircle className="h-6 w-6 text-white fill-white" />
                    </div>
                  )}
                  <div className="absolute -top-2 -left-2 h-8 w-8 rounded-full bg-green-500 border-4 border-white shadow-lg"></div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                        {creator.name}
                        {creator.is_verified && (
                          <CheckCircle className="h-6 w-6 text-purple-600 fill-purple-100" />
                        )}
                      </h1>
                      <p className="text-lg text-purple-600 font-medium">@{creator.username}</p>
                    </div>
                    
                    <CreatorProfileActions creator={creator} />
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">{creator.bio}</p>

                  {/* Stats - More Visual */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full border border-green-200">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                        <ShoppingBag className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{creator.total_sales.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Total Sales</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-full border border-yellow-200">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500">
                        <Star className="h-4 w-4 text-white fill-white" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{creator.rating} ⭐</div>
                        <div className="text-xs text-gray-600">Rating</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full border border-purple-200">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{creator.followers.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Followers</div>
                      </div>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {creator.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{creator.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <span>Joined {creator.joined_date}</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3 mt-4">
                    {creator.website && (
                      <Link 
                        href={creator.website}
                        target="_blank"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                      >
                        <Globe className="h-4 w-4" />
                      </Link>
                    )}
                    {creator.twitter && (
                      <Link 
                        href={`https://twitter.com/${creator.twitter}`}
                        target="_blank"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                      >
                        <Twitter className="h-4 w-4" />
                      </Link>
                    )}
                    {creator.instagram && (
                      <Link 
                        href={`https://instagram.com/${creator.instagram}`}
                        target="_blank"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                      >
                        <Instagram className="h-4 w-4" />
                      </Link>
                    )}
                    <Link 
                      href={`mailto:${creator.username}@example.com`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links Section - Biolink */}
          <Card className="border-0 shadow-lg rounded-3xl mb-8 bg-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <LinkIcon className="h-6 w-6 text-purple-600" />
                Quick Links
              </h3>
              <div className="space-y-3">
                {/* Store Link */}
                <a
                  href="#products"
                  className="block group"
                >
                  <div className="p-4 rounded-2xl border-2 border-gray-200 hover:border-purple-400 transition-all hover:shadow-md bg-gradient-to-r from-purple-50 to-pink-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                          <ShoppingBag className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                            🛍️ Shop My AI Prompts
                          </h4>
                          <p className="text-sm text-gray-600">Browse all my premium prompt packs</p>
                        </div>
                      </div>
                      <LinkIcon className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                  </div>
                </a>

                {/* Website Link */}
                {creator.website && (
                  <a
                    href={creator.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="p-4 rounded-2xl border-2 border-gray-200 hover:border-blue-400 transition-all hover:shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                            <Globe className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              🌐 Visit My Website
                            </h4>
                            <p className="text-sm text-gray-600">Learn more about my work</p>
                          </div>
                        </div>
                        <LinkIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </div>
                  </a>
                )}

                {/* Twitter Link */}
                {creator.twitter && (
                  <a
                    href={`https://twitter.com/${creator.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="p-4 rounded-2xl border-2 border-gray-200 hover:border-sky-400 transition-all hover:shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">
                            <Twitter className="h-6 w-6 text-sky-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-sky-600 transition-colors">
                              🐦 Follow on Twitter
                            </h4>
                            <p className="text-sm text-gray-600">@{creator.twitter}</p>
                          </div>
                        </div>
                        <LinkIcon className="h-5 w-5 text-gray-400 group-hover:text-sky-600 transition-colors" />
                      </div>
                    </div>
                  </a>
                )}

                {/* Instagram Link */}
                {creator.instagram && (
                  <a
                    href={`https://instagram.com/${creator.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="p-4 rounded-2xl border-2 border-gray-200 hover:border-pink-400 transition-all hover:shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                            <Instagram className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                              📸 Follow on Instagram
                            </h4>
                            <p className="text-sm text-gray-600">@{creator.instagram}</p>
                          </div>
                        </div>
                        <LinkIcon className="h-5 w-5 text-gray-400 group-hover:text-pink-600 transition-colors" />
                      </div>
                    </div>
                  </a>
                )}

                {/* Email Link */}
                <a
                  href={`mailto:${creator.username}@example.com`}
                  className="block group"
                >
                  <div className="p-4 rounded-2xl border-2 border-gray-200 hover:border-gray-400 transition-all hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                          <Mail className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                            📧 Email Me
                          </h4>
                          <p className="text-sm text-gray-600">Get in touch directly</p>
                        </div>
                      </div>
                      <LinkIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Products Section */}
          <div className="mb-8" id="products">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                ✨ Prompts by {creator.name}
              </h2>
              <p className="text-gray-600 text-lg">
                All prompt packs created by this seller. Click any card to see details and purchase.
              </p>
            </div>
            
            {creatorPrompts.length > 0 ? (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    <strong>{creatorPrompts.length}</strong> prompt{creatorPrompts.length !== 1 ? 's' : ''} available
                  </p>
                  <Badge className="rounded-full bg-purple-100 text-purple-700 px-3 py-1">
                    💯 Quality Verified
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {creatorPrompts.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                  ))}
                </div>
              </>
            ) : (
              <Card className="border-0 shadow-lg rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-12 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500">
                    <ShoppingBag className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Coming Soon! 🚀
                  </h3>
                  <p className="text-gray-700 text-lg mb-6">
                    {creator.name} is working on amazing AI prompts for you.
                    <br />
                    Check back soon or follow to get notified!
                  </p>
                  <Button className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Heart className="mr-2 h-4 w-4" />
                    Follow {creator.name}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* About Section */}
          <Card className="border-0 shadow-sm rounded-3xl">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {creator.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-full bg-purple-100 text-purple-700 px-3 py-1">
                  AI Prompts
                </Badge>
                <Badge className="rounded-full bg-purple-100 text-purple-700 px-3 py-1">
                  ChatGPT
                </Badge>
                <Badge className="rounded-full bg-purple-100 text-purple-700 px-3 py-1">
                  Midjourney
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Generate static paths for known creators
export async function generateStaticParams() {
  return [
    { username: 'john-doe' },
    { username: 'sarah-ai' },
  ];
}
