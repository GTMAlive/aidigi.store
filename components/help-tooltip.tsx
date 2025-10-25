"use client";

import { HelpCircle } from "lucide-react";
import { useState } from "react";

interface HelpTooltipProps {
  content: string;
  title?: string;
}

export function HelpTooltip({ content, title }: HelpTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
      >
        <HelpCircle className="h-3.5 w-3.5" />
      </button>
      
      {isOpen && (
        <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 z-50 w-64">
          <div className="rounded-2xl bg-gray-900 p-4 shadow-xl">
            {title && (
              <p className="mb-2 text-sm font-semibold text-white">{title}</p>
            )}
            <p className="text-sm text-gray-300 leading-relaxed">{content}</p>
            <div className="absolute left-1/2 top-full -translate-x-1/2 -mt-1">
              <div className="h-2 w-2 rotate-45 bg-gray-900"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
