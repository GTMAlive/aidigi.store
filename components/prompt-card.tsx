import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Prompt } from "@/lib/db";

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const tags = prompt.tags ? JSON.parse(prompt.tags) : [];

  return (
      <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border-0 bg-white shadow-sm transition-shadow hover:shadow-xl">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
          {prompt.thumbnail_url ? (
            <img
              src={prompt.thumbnail_url}
              alt={prompt.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="rounded-2xl bg-white/80 p-6 backdrop-blur-sm">
                <ShoppingCart className="h-16 w-16 text-purple-400" />
              </div>
            </div>
          )}
          <div className="absolute top-4 right-4 flex gap-2">
            {tags.slice(0, 1).map((tag: string) => (
              <Badge key={tag} className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-purple-700 backdrop-blur-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <CardContent className="flex-1 p-6">
          <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900">
            {prompt.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">
            {prompt.short_description || prompt.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">{prompt.rating.toFixed(1)}</span>
              </div>
              <span>•</span>
              <span>{prompt.sales_count} sales</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-auto border-t border-gray-100 bg-gradient-to-br from-purple-50/50 to-pink-50/50 p-6">
          <div className="flex w-full items-center justify-between">
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {formatPrice(prompt.price)}
            </span>
            <Link href={`/prompt/${prompt.id}`}>
              <div className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 transition-colors cursor-pointer">
                Buy Now
              </div>
            </Link>
          </div>
        </CardFooter>
      </Card>
  );
}
