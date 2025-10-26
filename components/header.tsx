"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuthModal } from "@/components/auth-modal";
import { 
  Sparkles, 
  User, 
  LayoutDashboard,
  Zap,
  TrendingUp,
  LogIn
} from "lucide-react";

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-100/50 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg group-hover:scale-105 transition-transform">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
              AiDigi.store
            </span>
            <span className="text-[10px] font-semibold text-purple-600/60 tracking-wider uppercase">
              AI Commerce Platform
            </span>
          </div>
        </Link>
        
        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link 
            href="/pricing" 
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors group"
          >
            <TrendingUp className="h-4 w-4 text-purple-600 group-hover:scale-110 transition-transform" />
            Pricing
            <Badge className="bg-green-500 text-white text-[10px] px-2">
              0% Fees
            </Badge>
          </Link>
          <Link 
            href="/" 
            className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            Explore
          </Link>
          <Link 
            href="/faq" 
            className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            FAQ
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="lg" 
            className="hidden sm:flex items-center gap-2 rounded-xl border-purple-200 hover:bg-purple-50 hover:border-purple-300" 
            onClick={() => setShowAuthModal(true)}
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
          <Button 
            size="lg" 
            className="rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all font-semibold" 
            asChild
          >
            <Link href="/dashboard/upload">
              <Zap className="h-4 w-4 mr-2" />
              Start Selling
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </header>
  );
}
