"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Link as LinkIcon,
  Copy,
  Check,
  Twitter,
  Instagram,
  Globe,
  Mail,
  ExternalLink,
  Share2
} from "lucide-react";

interface BiolinkModalProps {
  creator: {
    name: string;
    username: string;
    bio: string;
    avatar_url: string;
    website_url?: string;
    twitter_url?: string;
    instagram_url?: string;
    email?: string;
    is_verified?: boolean;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BiolinkModal({ creator, open, onOpenChange }: BiolinkModalProps) {
  const [copied, setCopied] = useState(false);
  const biolinkUrl = `promptmarket.com/${creator.username}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(biolinkUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${creator.name}'s Store`,
          text: `Check out ${creator.name}'s AI prompts!`,
          url: biolinkUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const links = [
    {
      icon: Globe,
      label: "Visit Store",
      url: `/${creator.username}`,
      color: "from-purple-500 to-pink-500"
    },
    creator.website_url && {
      icon: Globe,
      label: "Website",
      url: creator.website_url,
      color: "from-blue-500 to-cyan-500"
    },
    creator.twitter_url && {
      icon: Twitter,
      label: "Twitter",
      url: creator.twitter_url,
      color: "from-sky-400 to-blue-500"
    },
    creator.instagram_url && {
      icon: Instagram,
      label: "Instagram",
      url: creator.instagram_url,
      color: "from-pink-500 to-purple-500"
    },
    creator.email && {
      icon: Mail,
      label: "Email",
      url: `mailto:${creator.email}`,
      color: "from-gray-500 to-gray-600"
    },
  ].filter(Boolean);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
              <LinkIcon className="h-5 w-5 text-white" />
            </div>
            Biolink
          </DialogTitle>
          <DialogDescription>
            Your all-in-one link for Instagram bio, TikTok, and more!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Profile Preview */}
          <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img 
                      src={creator.avatar_url} 
                      alt={creator.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {creator.is_verified && (
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-purple-600 border-2 border-white flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate">{creator.name}</p>
                  <p className="text-sm text-purple-600">@{creator.username}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Copy Link Section */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Your Biolink URL
            </label>
            <div className="flex gap-2">
              <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 truncate">
                {biolinkUrl}
              </div>
              <Button
                onClick={copyToClipboard}
                className="rounded-xl"
                variant={copied ? "default" : "outline"}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 rounded-xl"
              onClick={shareLink}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-xl"
              asChild
            >
              <a href={`/${creator.username}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Preview
              </a>
            </Button>
          </div>

          {/* All Links */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              All Your Links ({links.length})
            </label>
            <div className="space-y-2">
              {links.map((link: any, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all group"
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${link.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                        {link.label}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Help Text */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-800">
              💡 <strong>Pro Tip:</strong> Use this link in your Instagram bio, TikTok profile, or anywhere else to share all your links at once!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
