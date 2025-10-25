"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Eye,
  Sparkles,
  Zap,
  Crown,
  Palette
} from "lucide-react";

interface StoreTheme {
  id: string;
  name: string;
  description: string;
  preview: string;
  gradient: string;
  isPro?: boolean;
  isPopular?: boolean;
  icon: any;
}

const themes: StoreTheme[] = [
  {
    id: "purple-pink",
    name: "Purple Passion",
    description: "Bold purple and pink gradients with modern vibes",
    preview: "/themes/purple-pink.jpg",
    gradient: "from-purple-600 via-pink-500 to-purple-700",
    isPopular: true,
    icon: Sparkles,
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    description: "Calm blue tones perfect for professional creators",
    preview: "/themes/ocean-blue.jpg",
    gradient: "from-blue-600 via-cyan-500 to-blue-700",
    icon: Zap,
  },
  {
    id: "sunset-orange",
    name: "Sunset Vibes",
    description: "Warm orange and red gradients for energetic brands",
    preview: "/themes/sunset.jpg",
    gradient: "from-orange-500 via-red-500 to-pink-600",
    icon: Sparkles,
  },
  {
    id: "forest-green",
    name: "Forest Fresh",
    description: "Natural green tones for eco-friendly creators",
    preview: "/themes/forest.jpg",
    gradient: "from-green-600 via-emerald-500 to-teal-600",
    icon: Sparkles,
  },
  {
    id: "midnight-dark",
    name: "Midnight Dark",
    description: "Sleek dark theme with neon accents",
    preview: "/themes/dark.jpg",
    gradient: "from-gray-900 via-purple-900 to-gray-900",
    isPro: true,
    icon: Crown,
  },
  {
    id: "golden-luxury",
    name: "Golden Luxury",
    description: "Premium gold and black for high-end products",
    preview: "/themes/luxury.jpg",
    gradient: "from-amber-600 via-yellow-500 to-amber-700",
    isPro: true,
    icon: Crown,
  },
  {
    id: "minimal-white",
    name: "Minimal White",
    description: "Clean white background with subtle accents",
    preview: "/themes/minimal.jpg",
    gradient: "from-gray-50 via-white to-gray-100",
    icon: Palette,
  },
  {
    id: "retro-wave",
    name: "Retro Wave",
    description: "80s inspired neon colors and gradients",
    preview: "/themes/retro.jpg",
    gradient: "from-pink-500 via-purple-500 to-cyan-500",
    isPro: true,
    icon: Zap,
  },
];

interface StoreThemeSelectorProps {
  currentTheme?: string;
  onThemeChange?: (themeId: string) => void;
}

export function StoreThemeSelector({ 
  currentTheme = "purple-pink",
  onThemeChange 
}: StoreThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    onThemeChange?.(themeId);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Palette className="h-5 w-5 text-purple-600" />
            Store Theme
          </h3>
          <p className="text-sm text-gray-600">
            Choose a theme that matches your brand. Your store will automatically update!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme) => {
            const Icon = theme.icon;
            const isSelected = selectedTheme === theme.id;
            const isLocked = theme.isPro;

            return (
              <div
                key={theme.id}
                className={`relative group cursor-pointer rounded-2xl border-2 transition-all ${
                  isSelected
                    ? 'border-purple-500 shadow-lg shadow-purple-200'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => !isLocked && handleThemeSelect(theme.id)}
              >
                {/* Preview */}
                <div className={`h-32 rounded-t-xl bg-gradient-to-br ${theme.gradient} relative overflow-hidden`}>
                  {/* Mockup elements */}
                  <div className="absolute inset-0 p-4 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm mb-2"></div>
                    <div className="w-20 h-2 bg-white/40 backdrop-blur-sm rounded mb-1"></div>
                    <div className="w-16 h-2 bg-white/30 backdrop-blur-sm rounded"></div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex gap-2">
                    {theme.isPopular && (
                      <Badge className="bg-yellow-500 text-white border-0">
                        ⭐ Popular
                      </Badge>
                    )}
                    {theme.isPro && (
                      <Badge className="bg-amber-500 text-white border-0">
                        <Crown className="h-3 w-3 mr-1" />
                        Pro
                      </Badge>
                    )}
                  </div>

                  {/* Selected Check */}
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 shadow-lg">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Lock Overlay */}
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-purple-600" />
                      {theme.name}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    {theme.description}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {!isLocked ? (
                      <>
                        <Button
                          size="sm"
                          variant={isSelected ? "default" : "outline"}
                          className="flex-1 rounded-full"
                          onClick={() => handleThemeSelect(theme.id)}
                        >
                          {isSelected ? (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Active
                            </>
                          ) : (
                            'Select'
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`/john-doe?theme=${theme.id}`, '_blank');
                          }}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        className="flex-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                      >
                        <Crown className="h-3 w-3 mr-1" />
                        Upgrade to Pro
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-800">
            💡 <strong>Pro Tip:</strong> Click the eye icon to preview any theme before selecting it. Your store will update instantly!
          </p>
        </div>

        {/* Pro Upgrade Banner */}
        <div className="mt-6 p-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-lg mb-1 flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Unlock Premium Themes
              </h4>
              <p className="text-white/90 text-sm">
                Get access to exclusive themes, custom colors, and more with Pro
              </p>
            </div>
            <Button className="rounded-full bg-white text-purple-600 hover:bg-gray-100">
              Upgrade Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
