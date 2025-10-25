import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockDB } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { 
  Star, 
  ShoppingCart, 
  Download, 
  CheckCircle, 
  Shield,
  ExternalLink,
  User
} from "lucide-react";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const prompt = await mockDB.getPromptById(params.id);
  
  if (!prompt) {
    return {
      title: "Prompt Not Found",
    };
  }

  return {
    title: `${prompt.title} — PromptMarket`,
    description: prompt.description,
  };
}

export default async function PromptPage({ params }: { params: { id: string } }) {
  const prompt = await mockDB.getPromptById(params.id);

  if (!prompt) {
    notFound();
  }

  const tags = prompt.tags ? JSON.parse(prompt.tags) : [];

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image */}
            <div className="mb-6 aspect-video overflow-hidden rounded-lg bg-muted">
              {prompt.thumbnail_url ? (
                <img
                  src={prompt.thumbnail_url}
                  alt={prompt.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Title and Tags */}
            <div className="mb-6">
              <div className="mb-3 flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                {prompt.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-foreground">{prompt.rating.toFixed(1)}</span>
                  <span>({prompt.review_count} reviews)</span>
                </div>
                <span>•</span>
                <span>{prompt.sales_count} sales</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="mb-3 text-xl font-semibold">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {prompt.description}
              </p>
            </div>

            {/* Preview */}
            {prompt.preview_text && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="mb-3 text-xl font-semibold">Preview</h2>
                  <div className="rounded-md bg-muted p-4 font-mono text-sm">
                    {prompt.preview_text}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    This is just a preview. Full prompt pack delivered after purchase.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* What's Included */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">What&apos;s Included</h2>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                    <span>Complete prompt pack with detailed instructions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                    <span>Instant download after purchase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                    <span>Lifetime access to purchased prompts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                    <span>7-day refund policy if not as described</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Reviews Placeholder */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Reviews</h2>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="font-medium">Amazing quality!</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      These prompts saved me hours of work. Highly recommend!
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      — Sarah M. • 2 days ago
                    </p>
                  </div>
                  <div className="border-b pb-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">Great value</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Good collection of prompts. Worth the price.
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      — John D. • 1 week ago
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              {/* Purchase Card */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="mb-2 text-3xl font-bold text-primary">
                      {formatPrice(prompt.price)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      One-time payment • Instant access
                    </p>
                  </div>
                  <Button size="lg" className="w-full" asChild>
                    <a href={`/checkout/${prompt.id}`}>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Buy Now
                    </a>
                  </Button>
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Secure payment via Razorpay</span>
                  </div>
                </CardContent>
              </Card>

              {/* Creator Info */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-semibold">About the Creator</h3>
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <User className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="font-medium">Creator Name</span>
                        <CheckCircle className="h-4 w-4 text-green-500" aria-label="Verified" />
                      </div>
                      <p className="mb-2 text-sm text-muted-foreground">
                        AI Prompt Expert
                      </p>
                      <a
                        href="https://twitter.com/creator"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Twitter
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 font-semibold">Why Buy Here?</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <Download className="h-5 w-5 shrink-0 text-primary" />
                      <span>Instant delivery to your email</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="h-5 w-5 shrink-0 text-primary" />
                      <span>Secure payment processing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                      <span>7-day money-back guarantee</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
