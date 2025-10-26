"use client";

import { useState, useRef } from 'react';
import { ImageIcon, Loader2, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Show local preview using data URL
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

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

      {preview ? (
        // Show preview with hover overlay
        <div className="relative group w-full h-full">
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <img src={preview} alt="Profile" className="w-full h-full object-cover" />
          </div>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={handleClick}
              className="h-8 text-xs"
            >
              <Upload className="h-3 w-3 mr-1" />
              Change
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={handleRemove}
              className="h-8 text-xs"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ) : (
        // Show upload button
        <button
          type="button"
          onClick={handleClick}
          disabled={uploading}
          className="w-full h-full border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-gray-900 rounded-2xl bg-white cursor-pointer"
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          ) : (
            <>
              <ImageIcon className="h-8 w-8" />
              <span className="text-xs font-medium">Click to upload</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
