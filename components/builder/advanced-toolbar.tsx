"use client";

import { Button } from "@/components/ui/button";
import { useBuilderStore } from "@/lib/builder/store";
import {
  Save,
  Eye,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Monitor,
  Tablet,
  Smartphone,
  Grid3x3,
  Ruler,
  Share2,
  Settings,
  ChevronDown,
} from "lucide-react";

export function AdvancedToolbar() {
  const {
    zoom,
    setZoom,
    breakpoint,
    setBreakpoint,
    showGrid,
    toggleGrid,
    showRulers,
    toggleRulers,
    snapToGrid,
    toggleSnap,
    undo,
    redo,
    history,
  } = useBuilderStore();

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  return (
    <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="text-white font-bold text-sm">Builder</div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
        <div className="h-6 w-px bg-gray-700" />
        
        {/* Undo/Redo */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={undo}
            disabled={!canUndo}
            className="text-gray-300 hover:text-white disabled:opacity-30"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={redo}
            disabled={!canRedo}
            className="text-gray-300 hover:text-white disabled:opacity-30"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Center Section - Device & Zoom */}
      <div className="flex items-center gap-3">
        {/* Device Selector */}
        <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
          <Button
            variant={breakpoint === 'desktop' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBreakpoint('desktop')}
            className={breakpoint === 'desktop' ? 'bg-purple-600' : 'text-gray-400'}
            title="Desktop (≥1200px)"
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant={breakpoint === 'tablet' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBreakpoint('tablet')}
            className={breakpoint === 'tablet' ? 'bg-purple-600' : 'text-gray-400'}
            title="Tablet (≥768px)"
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant={breakpoint === 'mobile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBreakpoint('mobile')}
            className={breakpoint === 'mobile' ? 'bg-purple-600' : 'text-gray-400'}
            title="Mobile (<768px)"
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(Math.max(25, zoom - 25))}
            disabled={zoom <= 25}
            className="text-gray-400 hover:text-white p-1 h-6"
          >
            <ZoomOut className="h-3 w-3" />
          </Button>
          <span className="text-xs text-gray-300 w-12 text-center">{zoom}%</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(Math.min(200, zoom + 25))}
            disabled={zoom >= 200}
            className="text-gray-400 hover:text-white p-1 h-6"
          >
            <ZoomIn className="h-3 w-3" />
          </Button>
        </div>

        {/* View Tools */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleGrid}
            className={`${showGrid ? 'text-purple-400' : 'text-gray-400'} hover:text-white`}
            title="Toggle Grid"
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleRulers}
            className={`${showRulers ? 'text-purple-400' : 'text-gray-400'} hover:text-white`}
            title="Toggle Rulers"
          >
            <Ruler className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:text-white"
          title="Preview"
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:text-white"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:text-white"
        >
          <Settings className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          className="bg-purple-600 hover:bg-purple-700"
          title="Publish (Ctrl+S)"
        >
          <Save className="h-4 w-4 mr-2" />
          Publish
        </Button>
      </div>
    </div>
  );
}
