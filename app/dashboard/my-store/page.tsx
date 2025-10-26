"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StoreThemeSelector } from "@/components/store-theme-selector";
import { BiolinkLinkManager } from "@/components/biolink-link-manager";
import { ImageUpload } from "@/components/ui/image-upload";
import { 
  ShoppingBag,
  Link as LinkIcon,
  Check,
  Info,
  Store,
  Eye,
  Copy,
  User,
  Sparkles,
  Palette,
  Globe,
  Twitter,
  Instagram,
  MapPin,
  Image as ImageIcon,
  Save,
  Plus,
  Layers,
  Settings,
  Type,
  Layout,
  Square,
  ChevronRight,
  GripVertical,
  Trash2
} from "lucide-react";

type DisplayMode = 'storefront' | 'biolink' | null;

export default function MyStorePage() {
  const [displayMode, setDisplayMode] = useState<DisplayMode>(null);
  const [activeTab, setActiveTab] = useState<'settings' | 'appearance' | 'links'>('settings');
  const [username, setUsername] = useState("john-doe");
  const [copied, setCopied] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [customComponents, setCustomComponents] = useState<Array<{id: string, type: string, content: any}>>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [builderView, setBuilderView] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [saved, setSaved] = useState(false);
  const [bioText, setBioText] = useState("AI prompt engineer & content creator. Building amazing things! ✨");
  const [avatarUrl, setAvatarUrl] = useState("");
  
  const storeUrl = typeof window !== 'undefined' ? `${window.location.origin}/${username}` : `/${username}`;
  const bioCharCount = bioText.length;
  const maxBioChars = 150;

  const handleUsernameCheck = async () => {
    setIsCheckingUsername(true);
    setTimeout(() => {
      setIsCheckingUsername(false);
    }, 500);
  };
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(storeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newComponents = [...customComponents];
    const draggedItem = newComponents[draggedIndex];
    newComponents.splice(draggedIndex, 1);
    newComponents.splice(index, 0, draggedItem);
    setCustomComponents(newComponents);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const updateComponent = (id: string, newContent: any) => {
    setCustomComponents(customComponents.map(comp => 
      comp.id === id ? { ...comp, content: { ...comp.content, ...newContent } } : comp
    ));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Mode Selection Screen
  if (!displayMode) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="mb-3 text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Choose Your Page Style
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Select how you want your public page to look. You can change this anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Storefront Option */}
          <button
            onClick={() => setDisplayMode('storefront')}
            className="group p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-400 transition-all hover:shadow-xl text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-3 group-hover:scale-110 transition-transform">
                <ShoppingBag className="h-full w-full text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  🛍️ Storefront
                </h3>
                <Badge className="mt-1 bg-purple-100 text-purple-700 text-xs">For Sellers</Badge>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Perfect for selling products. Shows your products prominently with a professional e-commerce layout.
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Check className="h-3 w-3 text-green-600" />
                Product showcase layout
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Check className="h-3 w-3 text-green-600" />
                Professional storefront
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Check className="h-3 w-3 text-green-600" />
                E-commerce focused
              </div>
            </div>
          </button>

          {/* Biolink Option */}
          <button
            onClick={() => setDisplayMode('biolink')}
            className="group p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-400 transition-all hover:shadow-xl text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-3 group-hover:scale-110 transition-transform">
                <LinkIcon className="h-full w-full text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  🔗 Biolink
                </h3>
                <Badge className="mt-1 bg-blue-100 text-blue-700 text-xs">For Influencers</Badge>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Linktree-style page. Shows your links prominently - perfect for Instagram bio and social media profiles.
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Check className="h-3 w-3 text-green-600" />
                Link-in-bio style
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Check className="h-3 w-3 text-green-600" />
                Social media focused
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Check className="h-3 w-3 text-green-600" />
                Easy link management
              </div>
            </div>
          </button>

        </div>

        <Card className="border-0 bg-gradient-to-br from-blue-50 to-cyan-50 max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Info className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Not sure which to choose?
                </h3>
                <p className="text-sm text-gray-700">
                  <strong>Storefront</strong> if you&apos;re selling products. <strong>Biolink</strong> if you need a link-in-bio page for social media. You can switch anytime!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // STOREFRONT MODE PAGE
  if (displayMode === 'storefront') {
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🛍️ My Storefront
              </h1>
              <Badge variant="outline" className="text-xs">
                Storefront Mode
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setDisplayMode('biolink')}>
                Switch to Biolink
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Save className="h-3 w-3 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Split Layout */}
        <div className="flex-1 flex overflow-hidden">

          {/* Left Panel - Editor */}
          <div className="w-1/2 border-r border-gray-200 overflow-y-auto bg-gray-50">
            <div className="p-6 space-y-6">
              {/* URL Section */}
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <ShoppingBag className="h-4 w-4 text-purple-600 flex-shrink-0" />
                    <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono text-gray-700 truncate">
                      {storeUrl}
                    </div>
                  </div>
                  <Button
                    onClick={copyToClipboard}
                    size="sm"
                    variant={copied ? "default" : "outline"}
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex-1 px-4 py-3 text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      activeTab === 'settings'
                        ? 'border-b-2 border-purple-600 text-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Store className="h-3 w-3" />
                    Info
                  </button>
                  <button
                    onClick={() => setActiveTab('appearance')}
                    className={`flex-1 px-4 py-3 text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      activeTab === 'appearance'
                        ? 'border-b-2 border-purple-600 text-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Palette className="h-3 w-3" />
                    Theme
                  </button>
                  <button
                    onClick={() => setActiveTab('links')}
                    className={`flex-1 px-4 py-3 text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      activeTab === 'links'
                        ? 'border-b-2 border-purple-600 text-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Globe className="h-3 w-3" />
                    Social
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-4">
                  {activeTab === 'settings' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Store Information</h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="name" className="text-xs">Store Name *</Label>
                          <Input id="name" placeholder="John's Store" defaultValue="John Doe" className="mt-1 h-9 text-sm" />
                        </div>
                        <div>
                          <Label htmlFor="username" className="text-xs">Username *</Label>
                          <div className="flex gap-2 mt-1">
                            <Input 
                              id="username" 
                              placeholder="john-doe" 
                              value={username}
                              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                              className="h-9 text-sm"
                            />
                            <Button variant="outline" size="sm" onClick={handleUsernameCheck} disabled={isCheckingUsername}>
                              {isCheckingUsername ? "..." : "Check"}
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="bio" className="text-xs">Store Description</Label>
                          <Textarea id="bio" placeholder="Describe your store..." rows={3} className="mt-1 text-sm" />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'appearance' && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Choose Theme</h3>
                      <StoreThemeSelector 
                        currentTheme="purple-pink"
                        onThemeChange={(themeId) => console.log('Theme changed to:', themeId)}
                      />
                    </div>
                  )}

                  {activeTab === 'links' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Social Links</h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="website" className="text-xs">Website</Label>
                          <div className="relative mt-1">
                            <Globe className="absolute left-3 top-2.5 h-3 w-3 text-muted-foreground" />
                            <Input id="website" placeholder="https://yourwebsite.com" className="pl-9 h-9 text-sm" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="twitter" className="text-xs">Twitter</Label>
                          <div className="relative mt-1">
                            <Twitter className="absolute left-3 top-2.5 h-3 w-3 text-muted-foreground" />
                            <Input id="twitter" placeholder="twitter.com/username" className="pl-9 h-9 text-sm" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Live Preview */}
          <div className="w-1/2 bg-white overflow-hidden flex flex-col">
            <div className="border-b border-gray-200 px-6 py-3 bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Live Preview
                </h3>
                <div className="flex items-center gap-2">
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('mobile')}
                      className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                        viewMode === 'mobile'
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      📱 Mobile
                    </button>
                    <button
                      onClick={() => setViewMode('desktop')}
                      className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                        viewMode === 'desktop'
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      💻 Desktop
                    </button>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`/${username}`} target="_blank" rel="noopener noreferrer">
                      <Sparkles className="h-3 w-3 mr-2" />
                      Open
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-purple-600 to-pink-600 flex items-start justify-center">
              <div className={`transition-all duration-300 space-y-4 ${
                viewMode === 'mobile' ? 'w-full max-w-md' : 'w-full max-w-4xl'
              }`}>
                {/* Profile Card */}
                <div className={`bg-white/95 backdrop-blur rounded-3xl shadow-2xl overflow-hidden border border-white/20 ${
                  viewMode === 'desktop' ? 'col-span-2' : ''
                }`}>
                  <div className={viewMode === 'desktop' ? 'p-8' : 'p-6'}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                        JD
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-lg font-bold text-gray-900">John Doe</h2>
                          <Check className="h-4 w-4 text-purple-600 bg-purple-100 rounded-full p-0.5" />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">@{username}</p>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          AI prompt engineer & content creator. Helping businesses scale with ChatGPT & Midjourney prompts.
                        </p>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900">1,234</div>
                          <div className="text-xs text-gray-600">Total Sales</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900">4.9</div>
                          <div className="text-xs text-gray-600">Rating</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900">2,500</div>
                          <div className="text-xs text-gray-600">Followers</div>
                        </div>
                      </div>
                    </div>

                    {/* Location & Social */}
                    <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        San Francisco, CA
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        Joined January 2024
                      </span>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Globe className="h-3 w-3 text-purple-600" />
                      </div>
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Twitter className="h-3 w-3 text-blue-600" />
                      </div>
                      <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
                        <Instagram className="h-3 w-3 text-pink-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products Section */}
                <div className={`bg-white/95 backdrop-blur rounded-3xl shadow-2xl border border-white/20 ${
                  viewMode === 'desktop' ? 'col-span-2 p-8' : 'p-6'
                }`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className={viewMode === 'desktop' ? 'h-6 w-6 text-purple-600' : 'h-5 w-5 text-purple-600'} />
                    <h3 className={viewMode === 'desktop' ? 'text-xl font-bold text-gray-900' : 'text-base font-bold text-gray-900'}>
                      Prompts by John Doe
                    </h3>
                  </div>
                  <p className={viewMode === 'desktop' ? 'text-sm text-gray-600 mb-6' : 'text-xs text-gray-600 mb-4'}>
                    All prompt packs created by this seller. Click any card to see details and purchase.
                  </p>

                  {/* Product Cards */}
                  <div className={viewMode === 'desktop' ? 'grid grid-cols-2 gap-4' : 'space-y-3'}>
                    {/* Product 1 */}
                    <div className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-gray-900 mb-1">ChatGPT Content Writing Master Pack</h4>
                            <p className="text-xs text-gray-600">Content writing prompts for ChatGPT</p>
                          </div>
                          <Badge className="bg-purple-100 text-purple-700 text-xs">ChatGPT</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 text-xs text-gray-600">
                              <Sparkles className="h-3 w-3 text-yellow-500" />
                              4.8
                            </span>
                            <span className="text-xs text-gray-600">108 sales</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-purple-600">₹499</span>
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 h-7 px-3 text-xs rounded-lg">
                              Buy Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product 2 */}
                    <div className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-32 bg-gradient-to-br from-blue-200 to-cyan-300 flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-blue-400" />
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-gray-900 mb-1">Marketing Copy Templates</h4>
                            <p className="text-xs text-gray-600">Marketing copy prompts that convert</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-700 text-xs">Marketing</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 text-xs text-gray-600">
                              <Sparkles className="h-3 w-3 text-yellow-500" />
                              4.7
                            </span>
                            <span className="text-xs text-gray-600">89 sales</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-purple-600">₹599</span>
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 h-7 px-3 text-xs rounded-lg">
                              Buy Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* No Products State - Show this when user has 0 products */}
                  {/* <div className="text-center py-8">
                    <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                      <ShoppingBag className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">No products yet</p>
                    <p className="text-xs text-gray-600">Upload your first product to get started</p>
                  </div> */}
                </div>

                <p className="text-center text-xs text-white/80 mt-4">
                  👁️ This is how your storefront will look to visitors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // BIOLINK MODE PAGE - PREMIUM REDESIGN
  if (displayMode === 'biolink') {
    return (
      <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        {/* Floating Top Toolbar */}
        <div className="relative z-10">
          <div className="mx-6 mt-4 mb-2 bg-white/80 backdrop-blur-xl border border-gray-200/60 rounded-2xl shadow-lg shadow-black/5">
            <div className="px-6 py-3.5 flex items-center justify-between">
              {/* Left: Branding */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setDisplayMode(null)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors group"
                >
                  <Store className="h-4 w-4" />
                  <span className="font-medium">AiDigi.store</span>
                </button>
                <div className="h-4 w-px bg-gray-300" />
                <h1 className="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  My Biolink
                </h1>
              </div>

              {/* Center: Device Toggle */}
              <div className="flex items-center gap-2 bg-gray-100/70 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    viewMode === 'mobile'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  📱 Mobile
                </button>
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    viewMode === 'desktop'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  💻 Desktop
                </button>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-xs"
                  asChild
                >
                  <a href={`/${username}`} target="_blank" rel="noopener noreferrer">
                    <Eye className="h-3.5 w-3.5 mr-1.5" />
                    Preview
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs"
                  onClick={() => setDisplayMode('storefront')}
                >
                  Switch to Storefront
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSave}
                  className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm"
                >
                  {saved ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5 mr-1.5" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Split Layout */}
        <div className="flex-1 flex overflow-hidden px-6 pb-6 gap-6">
          {/* Left Panel - Editor */}
          <div className="w-1/2 overflow-y-auto">
            <div className="space-y-4">
              {/* Your Link URL Card */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm p-4 border border-gray-200/60">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block">
                  Your Biolink URL
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/60 rounded-xl">
                    <LinkIcon className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <div className="flex-1 text-sm font-medium text-gray-900 truncate">
                      {storeUrl}
                    </div>
                  </div>
                  <Button
                    onClick={copyToClipboard}
                    size="sm"
                    variant={copied ? "default" : "outline"}
                    className={copied ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                {copied && (
                  <p className="text-xs text-green-600 mt-2 font-medium animate-in fade-in">
                    ✓ Link copied to clipboard!
                  </p>
                )}
              </div>

              {/* Modern Segmented Tab Control */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 p-2">
                <div className="flex gap-1">
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                      activeTab === 'settings'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('links')}
                    className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                      activeTab === 'links'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <LinkIcon className="h-4 w-4" />
                      <span>Links</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('appearance')}
                    className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                      activeTab === 'appearance'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Palette className="h-4 w-4" />
                      <span>Theme</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Tab Content Area */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 p-6">
                {/* Profile Tab */}
                {activeTab === 'settings' && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Profile Information</h3>
                      <p className="text-xs text-gray-600">This is how you appear to your visitors</p>
                    </div>

                    {/* Avatar Upload */}
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border border-gray-200/60">
                      <label className="text-sm font-semibold text-gray-900 block mb-2">Profile Photo</label>
                      <div className="flex items-start gap-4">
                        <ImageUpload
                          value={avatarUrl}
                          onChange={setAvatarUrl}
                          folder="avatars"
                          shape="rounded"
                          className="w-24 h-24 flex-shrink-0"
                          previewClassName="w-24 h-24"
                        />
                        <div className="flex-1 pt-2">
                          <p className="text-xs text-gray-600 mb-2">
                            Upload a square image (recommended: 400x400px)
                          </p>
                          <p className="text-xs text-gray-500">
                            Click the box to upload. Images are stored securely in Cloudflare R2.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Display Name */}
                    <div>
                      <Label htmlFor="display-name" className="text-sm font-semibold text-gray-900 mb-2 block">
                        Display Name *
                      </Label>
                      <Input 
                        id="display-name" 
                        placeholder="John Doe" 
                        defaultValue="John Doe" 
                        className="h-11 text-sm rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </div>

                    {/* Username */}
                    <div>
                      <Label htmlFor="username-input" className="text-sm font-semibold text-gray-900 mb-2 block">
                        Username *
                      </Label>
                      <div className="flex gap-2">
                        <Input 
                          id="username-input" 
                          placeholder="john-doe" 
                          value={username}
                          onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                          className="h-11 text-sm rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleUsernameCheck} 
                          disabled={isCheckingUsername}
                          className="h-11 px-4 rounded-xl"
                        >
                          {isCheckingUsername ? "..." : "Check"}
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5">Your unique URL: {storeUrl}</p>
                    </div>

                    {/* Bio with Character Count */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="bio-input" className="text-sm font-semibold text-gray-900">
                          Bio
                        </Label>
                        <span className={`text-xs font-medium ${bioCharCount > maxBioChars ? 'text-red-600' : 'text-gray-500'}`}>
                          {bioCharCount} / {maxBioChars}
                        </span>
                      </div>
                      <Textarea 
                        id="bio-input" 
                        placeholder="Tell people about yourself..." 
                        rows={3}
                        value={bioText}
                        onChange={(e) => setBioText(e.target.value)}
                        maxLength={maxBioChars}
                        className="text-sm rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                      />
                      <div className="mt-2 flex items-center gap-2">
                        <Button size="sm" variant="outline" className="text-xs h-8 rounded-lg">
                          <Sparkles className="h-3 w-3 mr-1.5" />
                          AI Suggest Bio
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Links Tab */}
                {activeTab === 'links' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Manage Links</h3>
                      <p className="text-xs text-gray-600">Add and organize your links (drag to reorder)</p>
                    </div>
                    <BiolinkLinkManager />
                  </div>
                )}

                {/* Theme Tab */}
                {activeTab === 'appearance' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Choose Theme</h3>
                      <p className="text-xs text-gray-600">Customize colors, fonts, and styles</p>
                    </div>
                    <StoreThemeSelector 
                      currentTheme="purple-pink"
                      onThemeChange={(themeId) => console.log('Theme changed to:', themeId)}
                    />
                    <div className="pt-2">
                      <Button size="sm" variant="outline" className="text-xs h-8 rounded-lg w-full">
                        <Sparkles className="h-3 w-3 mr-1.5" />
                        AI Generate Theme from Photo
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Live Preview */}
          <div className="w-1/2 overflow-hidden flex flex-col">
            {/* Preview Header */}
            <div className="flex items-center justify-center py-4 bg-white/40 backdrop-blur-sm border-b border-gray-200/60">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Eye className="h-4 w-4 text-blue-600" />
                <span>Live Preview</span>
                <span className="text-gray-400">•</span>
                <span className="text-xs text-gray-500">Updates in real-time</span>
              </div>
            </div>

            {/* Preview Area with Device Frame */}
            <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 flex items-start justify-center">
              <div className={`transition-all duration-500 ease-out ${
                viewMode === 'mobile' ? 'w-full max-w-sm' : 'w-full max-w-4xl'
              }`}>
                {/* Mobile Device Frame */}
                {viewMode === 'mobile' && (
                  <div className="mx-auto" style={{ maxWidth: '375px' }}>
                    {/* iPhone-style Frame */}
                    <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10"></div>
                      
                      {/* Screen */}
                      <div className="relative bg-white rounded-[2.5rem] overflow-hidden" style={{ height: '667px' }}>
                        {/* Status Bar */}
                        <div className="absolute top-0 left-0 right-0 h-11 bg-gradient-to-b from-black/5 to-transparent z-10 flex items-center justify-between px-6 pt-2">
                          <span className="text-xs font-semibold">9:41</span>
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-3 bg-gray-900/70 rounded-sm"></div>
                            <div className="w-4 h-3 bg-gray-900/70 rounded-sm"></div>
                            <div className="w-6 h-3 bg-gray-900/70 rounded-sm"></div>
                          </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="h-full overflow-y-auto pt-11 pb-8 px-5 bg-gradient-to-br from-blue-600 to-purple-600">
                          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl p-6 animate-in fade-in duration-500">
                            {/* Profile Section */}
                            <div className="text-center mb-6">
                              {avatarUrl ? (
                                <div className="h-24 w-24 rounded-2xl mx-auto mb-4 shadow-lg ring-4 ring-white/50 overflow-hidden">
                                  <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                              ) : (
                                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg ring-4 ring-white/50">
                                  JD
                                </div>
                              )}
                              <h2 className="text-xl font-bold text-gray-900 mb-1">
                                John Doe
                              </h2>
                              <p className="text-sm text-gray-600 mb-3">
                                @{username}
                              </p>
                              <p className="text-sm text-gray-700 leading-relaxed">
                                {bioText}
                              </p>
                            </div>

                            {/* Links */}
                            <div className="space-y-3">
                              <a href="#" className="block group">
                                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                        <ShoppingBag className="h-6 w-6 text-white" />
                                      </div>
                                      <div>
                                        <h4 className="font-bold text-gray-900 text-sm">Shop My Prompts</h4>
                                        <p className="text-xs text-gray-600">Premium AI prompt packs</p>
                                      </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                  </div>
                                </div>
                              </a>

                              <a href="#" className="block group">
                                <div className="p-4 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Globe className="h-6 w-6 text-blue-600" />
                                      </div>
                                      <div>
                                        <h4 className="font-bold text-gray-900 text-sm">Visit My Website</h4>
                                        <p className="text-xs text-gray-600">Learn more about my work</p>
                                      </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                  </div>
                                </div>
                              </a>

                              <a href="#" className="block group">
                                <div className="p-4 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="h-12 w-12 rounded-xl bg-sky-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Twitter className="h-6 w-6 text-sky-600" />
                                      </div>
                                      <div>
                                        <h4 className="font-bold text-gray-900 text-sm">Follow on Twitter</h4>
                                        <p className="text-xs text-gray-600">@johndoe</p>
                                      </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Desktop View */}
                {viewMode === 'desktop' && (
                  <div className="w-full animate-in fade-in zoom-in-95 duration-500">
                    {/* Browser Chrome */}
                    <div className="bg-white rounded-t-2xl border border-b-0 border-gray-300 shadow-xl">
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
                        <div className="flex items-center gap-1.5">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-1 mx-4">
                          <div className="bg-gray-100 rounded-lg px-4 py-1.5 text-xs text-gray-600 font-mono">
                            {storeUrl}
                          </div>
                        </div>
                      </div>

                      {/* Browser Content */}
                      <div className="bg-gradient-to-br from-blue-600 to-purple-600 overflow-y-auto" style={{ height: '600px' }}>
                        <div className="flex items-start justify-center p-12">
                          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-12 w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                            {/* Profile Section */}
                            <div className="text-center mb-8">
                              {avatarUrl ? (
                                <div className="h-32 w-32 rounded-3xl mx-auto mb-6 shadow-2xl ring-8 ring-white/50 overflow-hidden">
                                  <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                              ) : (
                                <div className="h-32 w-32 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-4xl mx-auto mb-6 shadow-2xl ring-8 ring-white/50">
                                  JD
                                </div>
                              )}
                              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                John Doe
                              </h2>
                              <p className="text-base text-gray-600 mb-4">
                                @{username}
                              </p>
                              <p className="text-base text-gray-700 max-w-xl mx-auto leading-relaxed">
                                {bioText}
                              </p>
                            </div>

                            {/* Links */}
                            <div className="space-y-4">
                              <a href="#" className="block group">
                                <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <ShoppingBag className="h-7 w-7 text-white" />
                                      </div>
                                      <div>
                                        <h4 className="font-bold text-gray-900 text-lg">Shop My Prompts</h4>
                                        <p className="text-sm text-gray-600">Premium AI prompt packs</p>
                                      </div>
                                    </div>
                                    <ChevronRight className="h-6 w-6 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                  </div>
                                </div>
                              </a>

                              <a href="#" className="block group">
                                <div className="p-5 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Globe className="h-7 w-7 text-blue-600" />
                                      </div>
                                      <div>
                                        <h4 className="font-bold text-gray-900 text-lg">Visit My Website</h4>
                                        <p className="text-sm text-gray-600">Learn more about my work</p>
                                      </div>
                                    </div>
                                    <ChevronRight className="h-6 w-6 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                  </div>
                                </div>
                              </a>

                              <a href="#" className="block group">
                                <div className="p-5 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      <div className="h-14 w-14 rounded-xl bg-sky-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Twitter className="h-7 w-7 text-sky-600" />
                                      </div>
                                      <div>
                                        <h4 className="font-bold text-gray-900 text-lg">Follow on Twitter</h4>
                                        <p className="text-sm text-gray-600">@johndoe</p>
                                      </div>
                                    </div>
                                    <ChevronRight className="h-6 w-6 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer Hint */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-600 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center gap-2 shadow-sm">
                    <span className="animate-pulse">👁️</span>
                    <span>This is how your biolink looks to visitors</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  // Should never reach here
  return null;
}
