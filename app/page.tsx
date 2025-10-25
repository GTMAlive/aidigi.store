import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PromptCard } from "@/components/prompt-card";
import { mockDB } from "@/lib/db";
import { 
  Sparkles, 
  Shield, 
  Zap, 
  Upload, 
  CheckCircle, 
  Wallet,
  TrendingUp,
  Star,
  Users,
  Gift,
  Heart
} from "lucide-react";

export default async function HomePage() {
  const featuredPrompts = await mockDB.getPrompts('live');

  return (
    <div className="flex flex-col">
      {/* Hero Section - Stan Store Style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-white py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            {/* Avatar/Profile Circle */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                    <Sparkles className="h-12 w-12 text-purple-600" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-green-500 border-4 border-white"></div>
              </div>
            </div>

            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                AI Prompts
              </span>
            </h1>
            <p className="mb-4 text-2xl font-medium text-gray-700 md:text-3xl">
              Build, Sell, Repeat.
            </p>
            <p className="mb-8 text-lg text-gray-600 md:text-xl">
              The first platform that pays you to start.
              <br className="hidden md:block" />
              First ₹10,000 = <strong className="text-purple-600">0% fees</strong> • Keep 90-100% forever
            </p>
            
            {/* Value Props */}
            <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
              <Badge className="rounded-full bg-green-100 px-4 py-2 text-green-700 font-semibold">
                <Gift className="mr-2 h-4 w-4" />
                First ₹10k FREE
              </Badge>
              <Badge className="rounded-full bg-blue-100 px-4 py-2 text-blue-700 font-semibold">
                <TrendingUp className="mr-2 h-4 w-4" />
                Growth Share Pricing
              </Badge>
              <Badge className="rounded-full bg-purple-100 px-4 py-2 text-purple-700 font-semibold">
                <Heart className="mr-2 h-4 w-4" />
                Buyer Rewards
              </Badge>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-4">
              <Button size="lg" className="rounded-full px-12 py-6 text-lg font-semibold shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" asChild>
                <Link href="#featured">Explore Prompts</Link>
              </Button>
              <Button size="lg" variant="ghost" className="rounded-full text-lg font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50" asChild>
                <Link href="/dashboard/upload">Start Selling →</Link>
              </Button>
            </div>
            
            {/* Social Proof - Stan Store Style */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"></div>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white"></div>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 border-2 border-white"></div>
                </div>
                <span>1000+ creators</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span>4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-500" />
                <span>Instant delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Prompts */}
      <section id="featured" className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">Featured Prompts</h2>
            <p className="text-lg text-gray-600 md:text-xl">
              High-quality AI prompts curated by our team
            </p>
          </div>
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredPrompts.slice(0, 4).map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          </div>
          <div className="mt-16 text-center">
            <Button 
              className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 text-lg font-semibold hover:from-purple-700 hover:to-pink-700 shadow-lg"
              asChild
            >
              <Link href="/browse">View All Prompts</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-b from-purple-50/50 to-white py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">How It Works</h2>
            <p className="text-lg text-gray-600 md:text-xl">
              Start selling your AI prompts in three simple steps
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <Card className="border-0 bg-white shadow-sm rounded-3xl hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <div className="mb-3 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                  Step 1
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  Upload your prompt pack
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Upload your prompt pack — title, description, price. Share your expertise with the community.
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-0 bg-white shadow-sm rounded-3xl hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <div className="mb-3 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                  Step 2
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  We review & publish
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We review & publish — you keep most of the sale. Quality is our priority.
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-0 bg-white shadow-sm rounded-3xl hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <Wallet className="h-8 w-8 text-white" />
                </div>
                <div className="mb-3 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                  Step 3
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  Buyers pay, you earn
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Buyers pay — prompt delivered instantly. You get paid weekly. It&apos;s that simple.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Simple Pricing</h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that works for you
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            {/* Free Plan */}
            <Card className="border-2">
              <CardContent className="p-8">
                <div className="mb-6">
                  <Badge variant="secondary">Free Plan</Badge>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">Free</span>
                  </div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                    <span>Branded footer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                    <span>10k visitors/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                    <span>15% transaction fee</span>
                  </li>
                </ul>
                <Button className="mt-6 w-full" variant="outline" asChild>
                  <Link href="/dashboard">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-primary shadow-lg">
              <CardContent className="p-8">
                <div className="mb-6">
                  <Badge>Pro Plan</Badge>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">₹49</span>
                    <span className="text-muted-foreground"> / month</span>
                  </div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                    <span>Custom domain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                    <span>Remove branding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                    <span>Unlimited visitors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                    <span className="font-semibold">5% transaction fee</span>
                  </li>
                </ul>
                <Button className="mt-6 w-full" asChild>
                  <Link href="/pricing">Upgrade to Pro</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container relative mx-auto px-6 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-6xl">
            Ready to Start Selling?
          </h2>
          <p className="mb-10 text-xl text-purple-100 md:text-2xl">
            Join thousands of creators earning from their AI prompts
          </p>
          <Button 
            className="rounded-full bg-white px-12 py-6 text-lg font-semibold text-purple-600 hover:bg-purple-50 shadow-2xl"
            asChild
          >
            <Link href="/dashboard/upload">Create Your First Prompt</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
