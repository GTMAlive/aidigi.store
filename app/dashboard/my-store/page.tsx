"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StoreThemeSelector } from "@/components/store-theme-selector";
import { BiolinkLinkManager } from "@/components/biolink-link-manager";
import { 
  ShoppingBag,
  Link as LinkIcon,
  Check,
  Zap,
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
  ArrowLeft,
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

type DisplayMode = 'storefront' | 'biolink' | 'custom' | null;

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
  
  const storeUrl = typeof window !== 'undefined' ? `${window.location.origin}/${username}` : `/${username}`;

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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

          {/* Custom/Scratch Option */}
          <button
            onClick={() => setDisplayMode('custom')}
            className="group p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-orange-400 transition-all hover:shadow-xl text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 p-3 group-hover:scale-110 transition-transform">
                <Sparkles className="h-full w-full text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  ✨ Custom
                </h3>
                <Badge className="mt-1 bg-orange-100 text-orange-700 text-xs">Advanced</Badge>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Build from scratch. Full creative control with drag-and-drop builder - perfect for unique brands.
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Check className="h-3 w-3 text-green-600" />
                Complete customization
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Check className="h-3 w-3 text-green-600" />
                Drag & drop builder
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Check className="h-3 w-3 text-green-600" />
                Unlimited flexibility
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
                  <strong>Storefront</strong> if you&apos;re selling products. <strong>Biolink</strong> if you need a link-in-bio page for social media. <strong>Custom</strong> if you want complete creative control. You can switch anytime!
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

  // BIOLINK MODE PAGE
  if (displayMode === 'biolink') {
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                🔗 My Biolink
              </h1>
              <Badge variant="outline" className="text-xs">
                Biolink Mode
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setDisplayMode('storefront')}>
                Switch to Storefront
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600">
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
                    <LinkIcon className="h-4 w-4 text-blue-600 flex-shrink-0" />
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
                    onClick={() => setActiveTab('links')}
                    className={`flex-1 px-4 py-3 text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      activeTab === 'links'
                        ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <LinkIcon className="h-3 w-3" />
                    Links
                  </button>
                  <button
                    onClick={() => setActiveTab('appearance')}
                    className={`flex-1 px-4 py-3 text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      activeTab === 'appearance'
                        ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Palette className="h-3 w-3" />
                    Theme
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex-1 px-4 py-3 text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      activeTab === 'settings'
                        ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <User className="h-3 w-3" />
                    Profile
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-4">
                  {activeTab === 'links' && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Manage Links</h3>
                      <BiolinkLinkManager />
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

                  {activeTab === 'settings' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Profile Information</h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="name" className="text-xs">Display Name *</Label>
                          <Input id="name" placeholder="John Doe" defaultValue="John Doe" className="mt-1 h-9 text-sm" />
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
                          <Label htmlFor="bio" className="text-xs">Bio</Label>
                          <Textarea id="bio" placeholder="Tell people about yourself..." rows={3} className="mt-1 text-sm" />
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
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      📱 Mobile
                    </button>
                    <button
                      onClick={() => setViewMode('desktop')}
                      className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                        viewMode === 'desktop'
                          ? 'bg-blue-600 text-white'
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
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-blue-600 to-cyan-600 flex items-start justify-center">
              <div className={`transition-all duration-300 space-y-4 ${
                viewMode === 'mobile' ? 'w-full max-w-md' : 'w-full max-w-3xl'
              }`}>
                {/* Biolink Preview */}
                <div className={`bg-white/95 backdrop-blur rounded-3xl shadow-2xl overflow-hidden border border-white/20 ${
                  viewMode === 'desktop' ? 'p-12' : 'p-6'
                }`}>
                  <div className="text-center mb-6">
                    <div className={`rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold mx-auto mb-3 ${
                      viewMode === 'desktop' ? 'h-28 w-28 text-3xl' : 'h-20 w-20 text-2xl'
                    }`}>
                      JD
                    </div>
                    <h2 className={viewMode === 'desktop' ? 'text-2xl font-bold text-gray-900 mb-2' : 'text-xl font-bold text-gray-900 mb-1'}>
                      John Doe
                    </h2>
                    <p className={viewMode === 'desktop' ? 'text-base text-gray-600 mb-4' : 'text-sm text-gray-600 mb-3'}>
                      @{username}
                    </p>
                    <p className={viewMode === 'desktop' ? 'text-base text-gray-700 max-w-xl mx-auto' : 'text-sm text-gray-700'}>
                      AI prompt engineer & content creator. Building amazing things! ✨
                    </p>
                  </div>

                  {/* Links */}
                  <div className={viewMode === 'desktop' ? 'space-y-4 max-w-2xl mx-auto' : 'space-y-3'}>
                    <a href="#" className="block p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <ShoppingBag className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">Shop My Prompts</h4>
                            <p className="text-xs text-gray-600">Premium AI prompt packs</p>
                          </div>
                        </div>
                        <LinkIcon className="h-4 w-4 text-gray-400" />
                      </div>
                    </a>

                    <a href="#" className="block p-4 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-400 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Globe className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">Visit My Website</h4>
                            <p className="text-xs text-gray-600">Learn more about my work</p>
                          </div>
                        </div>
                        <LinkIcon className="h-4 w-4 text-gray-400" />
                      </div>
                    </a>

                    <a href="#" className="block p-4 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-400 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center">
                            <Twitter className="h-5 w-5 text-sky-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">Follow on Twitter</h4>
                            <p className="text-xs text-gray-600">@johndoe</p>
                          </div>
                        </div>
                        <LinkIcon className="h-4 w-4 text-gray-400" />
                      </div>
                    </a>
                  </div>
                </div>

                <p className="text-center text-xs text-white/80 mt-4">
                  👁️ This is how your biolink will look to visitors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CUSTOM MODE PAGE - ADVANCED BUILDER
  if (displayMode === 'custom') {
    return (
      <div className="h-screen flex flex-col overflow-hidden bg-gray-900">
        {/* Top Toolbar */}
        <div className="h-14 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 flex-shrink-0">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setDisplayMode(null)}
              className="text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit
            </Button>
            <div className="h-6 w-px bg-gray-700"></div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-orange-500" />
              Custom Builder
            </h1>
          </div>

          {/* Center Section - Device Switcher */}
          <div className="flex items-center gap-1 bg-gray-900 rounded-lg p-1">
            <button
              onClick={() => setBuilderView('mobile')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                builderView === 'mobile'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Mobile View"
            >
              📱
            </button>
            <button
              onClick={() => setBuilderView('tablet')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                builderView === 'tablet'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Tablet View"
            >
              📱
            </button>
            <button
              onClick={() => setBuilderView('desktop')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                builderView === 'desktop'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Desktop View"
            >
              💻
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.open(`/${username}`, '_blank')}
              className="text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button 
              size="sm" 
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        {/* Main Builder Area */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Left Sidebar - Components & Layers */}
          {showLeftPanel && (
            <div className="w-72 bg-gray-800 border-r border-gray-700 flex flex-col">
              {/* Sidebar Tabs */}
              <div className="flex border-b border-gray-700">
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex-1 px-4 py-3 text-xs font-semibold transition-all ${
                    activeTab === 'settings'
                      ? 'bg-gray-900 text-orange-500 border-b-2 border-orange-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Plus className="h-4 w-4 mx-auto mb-1" />
                  Add
                </button>
                <button
                  onClick={() => setActiveTab('links')}
                  className={`flex-1 px-4 py-3 text-xs font-semibold transition-all ${
                    activeTab === 'links'
                      ? 'bg-gray-900 text-orange-500 border-b-2 border-orange-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Layers className="h-4 w-4 mx-auto mb-1" />
                  Layers
                </button>
              </div>

              {/* Add Components Tab */}
              {activeTab === 'settings' && (
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  <div className="mb-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                      Sections
                    </h3>
                  </div>

                  {/* Hero Section */}
                  <button
                    onClick={() => {
                      setCustomComponents([...customComponents, {
                        id: `hero-${Date.now()}`,
                        type: 'hero',
                        content: { 
                          title: 'Build Something Amazing',
                          subtitle: 'Create stunning landing pages in minutes',
                          buttonText: 'Get Started',
                          buttonUrl: '#'
                        }
                      }]);
                    }}
                    className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all text-left group border border-gray-600"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <Layout className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-white">Hero Section</h4>
                        <p className="text-xs text-gray-400">Large header with CTA</p>
                      </div>
                    </div>
                  </button>

                  {/* Features Section */}
                  <button
                    onClick={() => {
                      setCustomComponents([...customComponents, {
                        id: `features-${Date.now()}`,
                        type: 'features',
                        content: {
                          title: 'Amazing Features',
                          features: [
                            { icon: 'zap', title: 'Feature 1', description: 'Description here' },
                            { icon: 'star', title: 'Feature 2', description: 'Description here' },
                            { icon: 'heart', title: 'Feature 3', description: 'Description here' }
                          ]
                        }
                      }]);
                    }}
                    className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all text-left group border border-gray-600"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-white">Features Grid</h4>
                        <p className="text-xs text-gray-400">Showcase key features</p>
                      </div>
                    </div>
                  </button>

                  {/* Products Section */}
                  <button
                    onClick={() => {
                      setCustomComponents([...customComponents, {
                        id: `products-${Date.now()}`,
                        type: 'products',
                        content: {
                          title: 'Our Products',
                          products: [
                            { name: 'Product 1', price: '₹499', image: '' },
                            { name: 'Product 2', price: '₹599', image: '' }
                          ]
                        }
                      }]);
                    }}
                    className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all text-left group border border-gray-600"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-white">Products Showcase</h4>
                        <p className="text-xs text-gray-400">Display products for sale</p>
                      </div>
                    </div>
                  </button>

                  <div className="my-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                      Elements
                    </h3>
                  </div>

                  {/* Text Block */}
                  <button
                    onClick={() => {
                      setCustomComponents([...customComponents, {
                        id: `text-${Date.now()}`,
                        type: 'text',
                        content: { text: 'Add your text here. Double click to edit.' }
                      }]);
                    }}
                    className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all text-left group border border-gray-600"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gray-600 flex items-center justify-center flex-shrink-0">
                        <Type className="h-5 w-5 text-gray-300" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-white">Text</h4>
                        <p className="text-xs text-gray-400">Paragraph or heading</p>
                      </div>
                    </div>
                  </button>

                  {/* Button */}
                  <button
                    onClick={() => {
                      setCustomComponents([...customComponents, {
                        id: `button-${Date.now()}`,
                        type: 'button',
                        content: { text: 'Click Me', url: '#' }
                      }]);
                    }}
                    className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all text-left group border border-gray-600"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-orange-600 flex items-center justify-center flex-shrink-0">
                        <Square className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-white">Button</h4>
                        <p className="text-xs text-gray-400">Call to action button</p>
                      </div>
                    </div>
                  </button>

                  {/* Image */}
                  <button
                    onClick={() => {
                      setCustomComponents([...customComponents, {
                        id: `image-${Date.now()}`,
                        type: 'image',
                        content: { url: '', alt: 'Image' }
                      }]);
                    }}
                    className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all text-left group border border-gray-600"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-pink-600 flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-white">Image</h4>
                        <p className="text-xs text-gray-400">Upload or link image</p>
                      </div>
                    </div>
                  </button>
                </div>
              )}

              {/* Layers Tab */}
              {activeTab === 'links' && (
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="mb-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Page Layers
                    </h3>
                  </div>
                  {customComponents.length === 0 ? (
                    <div className="text-center py-8">
                      <Layers className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-sm text-gray-400">No components yet</p>
                      <p className="text-xs text-gray-500 mt-1">Add components to get started</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {customComponents.map((component, index) => (
                        <button
                          key={component.id}
                          onClick={() => {
                            setSelectedComponent(component.id);
                            setShowRightPanel(true);
                          }}
                          className={`w-full p-2.5 rounded-lg transition-all text-left flex items-center gap-2 ${
                            selectedComponent === component.id
                              ? 'bg-orange-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          <GripVertical className="h-3 w-3 flex-shrink-0" />
                          <span className="text-xs font-medium flex-1 truncate capitalize">
                            {component.type} {index + 1}
                          </span>
                          <ChevronRight className="h-3 w-3 flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Canvas - Main Editing Area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-gray-900">
            {/* Canvas Toolbar */}
            <div className="h-12 bg-gray-850 border-b border-gray-700 flex items-center justify-between px-4">
              <div className="text-xs text-gray-400">
                {customComponents.length} {customComponents.length === 1 ? 'component' : 'components'}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  className="text-gray-400 hover:text-white text-xs"
                  onClick={() => setShowLeftPanel(!showLeftPanel)}
                >
                  {showLeftPanel ? 'Hide' : 'Show'} Sidebar
                </button>
              </div>
            </div>

            {/* Canvas Content */}
            <div className="flex-1 overflow-auto p-8 flex justify-center">
              <div 
                className={`bg-white shadow-2xl transition-all duration-300 min-h-full ${
                  builderView === 'mobile' ? 'w-[375px]' :
                  builderView === 'tablet' ? 'w-[768px]' :
                  'w-full max-w-[1200px]'
                }`}
                style={{ minHeight: '600px' }}
              >
                {customComponents.length === 0 ? (
                  // Empty State
                  <div className="flex items-center justify-center h-full p-12">
                    <div className="text-center">
                      <div className="h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                        <Plus className="h-10 w-10 text-orange-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Start Building
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Add sections and elements from the left sidebar
                      </p>
                      <div className="flex items-center justify-center gap-3 text-xs text-gray-500">
                        <span>Hero • Features • Products • Text</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Render Components
                  <div>
                    {customComponents.map((component, index) => (
                      <div
                        key={component.id}
                        className={`relative group transition-all ${
                          selectedComponent === component.id
                            ? 'ring-2 ring-orange-500 ring-offset-2'
                            : 'hover:ring-2 hover:ring-orange-300 hover:ring-offset-1'
                        }`}
                        onClick={() => {
                          setSelectedComponent(component.id);
                          setShowRightPanel(true);
                        }}
                      >
                        {/* Component Type Indicator */}
                        {selectedComponent === component.id && (
                          <div className="absolute -top-8 left-4 bg-orange-600 text-white text-xs px-3 py-1 rounded-t flex items-center gap-2">
                            <Settings className="h-3 w-3" />
                            <span className="capitalize">{component.type}</span>
                          </div>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCustomComponents(customComponents.filter((_, i) => i !== index));
                            if (selectedComponent === component.id) {
                              setSelectedComponent(null);
                              setShowRightPanel(false);
                            }
                          }}
                          className="absolute top-4 right-4 z-10 h-8 w-8 rounded-lg bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                        {/* Render Component */}
                        {component.type === 'hero' && (
                          <div className="min-h-[500px] bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center px-8 py-20">
                            <div className="max-w-3xl text-center text-white">
                              <h1 className="text-5xl font-bold mb-4">{component.content.title}</h1>
                              <p className="text-xl mb-8 text-white/90">{component.content.subtitle}</p>
                              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                                {component.content.buttonText}
                              </Button>
                            </div>
                          </div>
                        )}

                        {component.type === 'features' && (
                          <div className="py-16 px-8">
                            <h2 className="text-3xl font-bold text-center mb-12">{component.content.title}</h2>
                            <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
                              {component.content.features.map((feature: any, i: number) => (
                                <div key={i} className="text-center">
                                  <div className="h-16 w-16 rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-4">
                                    <Zap className="h-8 w-8 text-orange-600" />
                                  </div>
                                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                  <p className="text-gray-600 text-sm">{feature.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {component.type === 'products' && (
                          <div className="py-16 px-8 bg-gray-50">
                            <h2 className="text-3xl font-bold text-center mb-12">{component.content.title}</h2>
                            <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
                              {component.content.products.map((product: any, i: number) => (
                                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg">
                                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                    <ImageIcon className="h-12 w-12 text-gray-400" />
                                  </div>
                                  <div className="p-6">
                                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                                    <div className="flex items-center justify-between">
                                      <span className="text-2xl font-bold text-orange-600">{product.price}</span>
                                      <Button size="sm">Buy Now</Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {component.type === 'text' && (
                          <div className="py-8 px-8">
                            <p className="text-gray-700">{component.content.text}</p>
                          </div>
                        )}

                        {component.type === 'button' && (
                          <div className="py-8 px-8 text-center">
                            <Button>{component.content.text}</Button>
                          </div>
                        )}

                        {component.type === 'image' && (
                          <div className="py-8 px-8">
                            <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                              <ImageIcon className="h-16 w-16 text-gray-400" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Properties Panel */}
          {showRightPanel && selectedComponent && (
            <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
              {/* Header */}
              <div className="h-12 bg-gray-850 border-b border-gray-700 flex items-center justify-between px-4">
                <h3 className="text-sm font-bold text-white">Properties</h3>
                <button
                  onClick={() => setShowRightPanel(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {(() => {
                  const component = customComponents.find(c => c.id === selectedComponent);
                  if (!component) return null;

                  return (
                    <div className="space-y-4">
                      <div className="bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-bold text-gray-400 uppercase mb-2">Component Type</div>
                        <div className="text-sm text-white capitalize">{component.type}</div>
                      </div>

                      {component.type === 'hero' && (
                        <>
                          <div>
                            <Label className="text-xs text-gray-400">Title</Label>
                            <Input
                              value={component.content.title}
                              onChange={(e) => updateComponent(component.id, { title: e.target.value })}
                              className="mt-1 h-9 bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-400">Subtitle</Label>
                            <Textarea
                              value={component.content.subtitle}
                              onChange={(e) => updateComponent(component.id, { subtitle: e.target.value })}
                              rows={2}
                              className="mt-1 bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-400">Button Text</Label>
                            <Input
                              value={component.content.buttonText}
                              onChange={(e) => updateComponent(component.id, { buttonText: e.target.value })}
                              className="mt-1 h-9 bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                        </>
                      )}

                      {component.type === 'text' && (
                        <div>
                          <Label className="text-xs text-gray-400">Text Content</Label>
                          <Textarea
                            value={component.content.text}
                            onChange={(e) => updateComponent(component.id, { text: e.target.value })}
                            rows={6}
                            className="mt-1 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      )}

                      {component.type === 'button' && (
                        <>
                          <div>
                            <Label className="text-xs text-gray-400">Button Text</Label>
                            <Input
                              value={component.content.text}
                              onChange={(e) => updateComponent(component.id, { text: e.target.value })}
                              className="mt-1 h-9 bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-400">Link URL</Label>
                            <Input
                              value={component.content.url}
                              onChange={(e) => updateComponent(component.id, { url: e.target.value })}
                              placeholder="https://"
                              className="mt-1 h-9 bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                        </>
                      )}

                      {component.type === 'features' && (
                        <div>
                          <Label className="text-xs text-gray-400">Section Title</Label>
                          <Input
                            value={component.content.title}
                            onChange={(e) => updateComponent(component.id, { title: e.target.value })}
                            className="mt-1 h-9 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      )}

                      {component.type === 'products' && (
                        <div>
                          <Label className="text-xs text-gray-400">Section Title</Label>
                          <Input
                            value={component.content.title}
                            onChange={(e) => updateComponent(component.id, { title: e.target.value })}
                            className="mt-1 h-9 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      )}

                      <div className="pt-4 border-t border-gray-700">
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            setCustomComponents(customComponents.filter(c => c.id !== component.id));
                            setSelectedComponent(null);
                            setShowRightPanel(false);
                          }}
                        >
                          <Trash2 className="h-3 w-3 mr-2" />
                          Delete Component
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Should never reach here
  return null;
}
