"use client";

import { useState, useRef } from 'react';
import { ImageIcon, Loader2 } from 'lucide-react';

export interface SimpleImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
}

/**
 * Simplified image upload component (fallback without R2)
 * For development when R2 credentials are not set up
 */
export function SimpleImageUpload({ value, onChange, className = '' }: SimpleImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(value || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // For now, just show local preview using data URL
    // In production, this would upload to R2
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      onChange(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleClick}
        className="w-full h-full border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-gray-900 rounded-2xl bg-white"
      >
        {preview ? (
          <div className="w-full h-full overflow-hidden rounded-2xl">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          </div>
        ) : uploading ? (
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        ) : (
          <>
            <ImageIcon className="h-8 w-8" />
            <span className="text-sm font-medium">Click to upload</span>
          </>
        )}
      </button>
    </div>
  );
}
