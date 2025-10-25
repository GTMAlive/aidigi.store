"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BiolinkModal } from "@/components/biolink-modal";
import { 
  Heart, 
  Mail, 
  Link as LinkIcon 
} from "lucide-react";

interface CreatorProfileActionsProps {
  creator: {
    id: string;
    name: string;
    username: string;
    email?: string;
    avatar_url: string;
    bio: string;
    is_verified?: boolean;
    website_url?: string;
    twitter_url?: string;
    instagram_url?: string;
  };
}

export function CreatorProfileActions({ creator }: CreatorProfileActionsProps) {
  const [biolinkOpen, setBiolinkOpen] = useState(false);

  return (
    <>
      <div className="flex gap-3">
        <Button className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 shadow-lg hover:shadow-xl transition-all">
          <Heart className="mr-2 h-4 w-4" />
          Follow
        </Button>
        <Button variant="outline" className="rounded-full border-2 border-purple-200 hover:bg-purple-50">
          <Mail className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          className="rounded-full border-2 border-green-200 hover:bg-green-50 text-green-700 hover:text-green-800"
          onClick={() => setBiolinkOpen(true)}
        >
          <LinkIcon className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Biolink</span>
        </Button>
      </div>

      <BiolinkModal 
        creator={creator}
        open={biolinkOpen}
        onOpenChange={setBiolinkOpen}
      />
    </>
  );
}
