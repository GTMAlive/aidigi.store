import Link from "next/link";
import { Sparkles, Twitter, Github, Mail, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-purple-100 bg-gradient-to-b from-white to-purple-50/30">
      <div className="container mx-auto px-6 py-16">
        {/* Brand Section */}
        <div className="mb-12 text-center">
          <Link href="/" className="inline-flex items-center space-x-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl blur opacity-40" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                AiDigi.store
              </span>
              <span className="text-[10px] font-semibold text-purple-600/60 tracking-wider uppercase">
                AI Commerce Platform
              </span>
            </div>
          </Link>
          <p className="mt-6 text-gray-600 max-w-xl mx-auto text-lg">
            The future of AI commerce. Build your AI empire with beautiful storefronts,
            <br className="hidden md:block" />
            biolinks, and the lowest fees in the industry.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Zap className="h-4 w-4 text-green-600" />
            <span className="text-sm font-semibold text-green-600">First ₹10,000 = 0% Fees</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-12">
          <Link 
            href="https://twitter.com" 
            className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link 
            href="https://github.com" 
            className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link 
            href="mailto:hello@aidigi.store" 
            className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
          >
            <Mail className="h-5 w-5" />
          </Link>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm mb-8">
          <Link href="/pricing" className="text-gray-600 hover:text-purple-600 transition-colors">
            Pricing
          </Link>
          <Link href="/faq" className="text-gray-600 hover:text-purple-600 transition-colors">
            FAQ
          </Link>
          <Link href="/terms" className="text-gray-600 hover:text-purple-600 transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="text-gray-600 hover:text-purple-600 transition-colors">
            Privacy
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">
            Contact
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} AiDigi.store. Empowering the next generation of AI creators.
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Built with ⚡ for creators, by creators.
          </p>
        </div>
      </div>
    </footer>
  );
}
