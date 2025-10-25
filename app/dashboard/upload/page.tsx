"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload, 
  FileText, 
  Image as ImageIcon,
  Sparkles,
  BookOpen,
  FileCode,
  Palette,
  Video,
  Music,
  Package,
  ArrowRight,
  Check,
  Zap
} from "lucide-react";

type ProductType = 'ai-prompts' | 'templates' | 'ebooks' | 'graphics' | 'courses' | 'audio' | null;

export default function UploadPage() {
  const [selectedProductType, setSelectedProductType] = useState<ProductType>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert("Prompt submitted for review! You'll be notified once it's approved.");
    setIsSubmitting(false);
  };

  // Product type options
  const productTypes = [
    {
      id: 'ai-prompts' as ProductType,
      name: 'AI Prompts',
      description: 'ChatGPT, Midjourney, DALL-E prompts and templates',
      icon: Sparkles,
      popular: true,
      examples: ['ChatGPT prompts', 'Midjourney templates', 'AI writing packs'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'templates' as ProductType,
      name: 'Templates & Tools',
      description: 'Notion templates, spreadsheets, productivity tools',
      icon: FileCode,
      popular: true,
      examples: ['Notion templates', 'Excel sheets', 'Automation tools'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'ebooks' as ProductType,
      name: 'eBooks & Guides',
      description: 'Digital books, guides, and written content',
      icon: BookOpen,
      popular: false,
      examples: ['How-to guides', 'Industry reports', 'Strategy books'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'graphics' as ProductType,
      name: 'Graphics & Design',
      description: 'Logos, icons, UI kits, design resources',
      icon: Palette,
      popular: false,
      examples: ['Icon packs', 'UI kits', 'Branding assets'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'courses' as ProductType,
      name: 'Courses & Videos',
      description: 'Video tutorials, courses, and educational content',
      icon: Video,
      popular: false,
      examples: ['Video courses', 'Tutorials', 'Masterclasses'],
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: 'audio' as ProductType,
      name: 'Audio & Music',
      description: 'Music tracks, sound effects, audio files',
      icon: Music,
      popular: false,
      examples: ['Background music', 'Sound effects', 'Podcasts'],
      color: 'from-indigo-500 to-purple-500'
    },
  ];

  if (!selectedProductType) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-3 text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            What do you want to sell?
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose the type of product you want to upload. You can sell multiple product types!
          </p>
        </div>

        {/* Product Type Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedProductType(type.id)}
                className="group relative p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-400 transition-all hover:shadow-xl text-left"
              >
                {/* Popular Badge */}
                {type.popular && (
                  <div className="absolute -top-3 -right-3">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
                      <Zap className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}

                {/* Icon */}
                <div className="mb-4">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${type.color} p-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-full w-full text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {type.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {type.description}
                </p>

                {/* Examples */}
                <div className="space-y-2">
                  {type.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                      <Check className="h-3 w-3 text-green-600" />
                      {example}
                    </div>
                  ))}
                </div>

                {/* Arrow */}
                <div className="mt-4 flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Help Section */}
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Not sure what to sell?
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  AI Prompts are our most popular category! They&apos;re easy to create, in high demand, and you can start earning quickly.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">First ₹10,000 = 0% fees</Badge>
                  <Badge variant="secondary">Instant delivery</Badge>
                  <Badge variant="secondary">Global audience</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const selectedType = productTypes.find(t => t.id === selectedProductType);
  const SelectedIcon = selectedType?.icon || Sparkles;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Back Button & Header */}
      <div>
        <Button 
          variant="ghost" 
          onClick={() => setSelectedProductType(null)}
          className="mb-4 -ml-4"
        >
          ← Back to product types
        </Button>
        <div className="flex items-center gap-4 mb-4">
          <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${selectedType?.color} p-4`}>
            <SelectedIcon className="h-full w-full text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Upload {selectedType?.name}</h1>
            <p className="text-gray-600">
              {selectedType?.description}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Prompt Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., ChatGPT Content Writing Master Pack"
                required
              />
              <p className="text-sm text-muted-foreground">
                Choose a clear, descriptive title for your prompt pack
              </p>
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <Label htmlFor="short-desc">Short Description *</Label>
              <Input
                id="short-desc"
                placeholder="e.g., 50+ content writing prompts for ChatGPT"
                required
              />
              <p className="text-sm text-muted-foreground">
                A brief one-liner that appears in cards
              </p>
            </div>

            {/* Full Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Full Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe what's included, who it's for, and what problems it solves..."
                rows={6}
                required
              />
              <p className="text-sm text-muted-foreground">
                Detailed description shown on the product page
              </p>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="content-writing">Content Writing</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="ai-art">AI Art</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="ChatGPT, Content, Writing (comma-separated)"
              />
              <p className="text-sm text-muted-foreground">
                Add relevant tags to help buyers find your prompt
              </p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                placeholder="499"
                min="99"
                step="1"
                required
              />
              <p className="text-sm text-muted-foreground">
                Minimum price: ₹99 • You earn 85% (Free plan) or 95% (Pro plan)
              </p>
            </div>

            {/* Prompt File */}
            <div className="space-y-2">
              <Label htmlFor="prompt-file">Prompt File *</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="prompt-file"
                  type="file"
                  accept=".txt,.md,.pdf"
                  required
                  className="flex-1"
                />
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Upload your prompt pack (.txt, .md, or .pdf format)
              </p>
            </div>

            {/* Thumbnail */}
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail Image</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  className="flex-1"
                />
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Recommended: 1200x630px • Max 2MB
              </p>
            </div>

            {/* Preview Text */}
            <div className="space-y-2">
              <Label htmlFor="preview">Preview Text</Label>
              <Textarea
                id="preview"
                placeholder="Copy the first 1-2 lines of your prompt here..."
                rows={3}
              />
              <p className="text-sm text-muted-foreground">
                A small sample shown to potential buyers (optional)
              </p>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                <Upload className="mr-2 h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Submit for Review"}
              </Button>
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Your prompt will be reviewed within 24-48 hours. You&apos;ll receive an email once it&apos;s approved or if changes are needed.
            </p>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
