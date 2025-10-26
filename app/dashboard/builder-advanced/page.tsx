"use client";

import { useEffect } from "react";
import { AdvancedToolbar } from "@/components/builder/advanced-toolbar";
import { LeftSidebar } from "@/components/builder/left-sidebar";
import { Canvas } from "@/components/builder/canvas";
import { RightSidebar } from "@/components/builder/right-sidebar";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useBuilderStore } from "@/lib/builder/store";

export default function AdvancedBuilderPage() {
  const { showLeftPanel, showRightPanel } = useBuilderStore();

  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  return (
    <div className="h-screen flex flex-col bg-gray-900 overflow-hidden">
      {/* Top Toolbar */}
      <AdvancedToolbar />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        {showLeftPanel && <LeftSidebar />}

        {/* Canvas */}
        <Canvas />

        {/* Right Sidebar */}
        {showRightPanel && <RightSidebar />}
      </div>

      {/* Bottom Status Bar */}
      <div className="h-10 bg-gray-900 border-t border-gray-800 flex items-center justify-between px-4 text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <span>Press Ctrl+S to save</span>
          <span>•</span>
          <span>Ctrl+Z to undo</span>
          <span>•</span>
          <span>Delete to remove selected element</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Professional Website Builder</span>
        </div>
      </div>
    </div>
  );
}
