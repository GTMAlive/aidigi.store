"use client";

import { useState, useRef } from 'react';
import { uploadToR2, validateFile } from '@/lib/r2-upload';
import { Button } from '@/components/ui/button';
import { ImageIcon, Upload, X, Loader2 } from 'lucide-react';

export interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: 'avatars' | 'products' | 'media';
  maxSize?: number;
  className?: string;
  previewClassName?: string;
  shape?: 'square' | 'circle' | 'rounded';
}

export function ImageUpload({
  value,
  onChange,
  folder = 'media',
  maxSize = 5 * 1024 * 1024,
  className = '',
  previewClassName = '',
  shape = 'rounded',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const [preview, setPreview] = useState<string>(value || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');

    // Validate file
    const validation = validateFile(file, { maxSize });
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to R2
    setUploading(true);
    try {
      const result = await uploadToR2(file, folder);
      
      if (result.success && result.url) {
        onChange(result.url);
        setPreview(result.url);
      } else {
        setError(result.error || 'Upload failed');
        setPreview(value || '');
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
      setPreview(value || '');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const shapeClasses = {
    square: 'rounded-xl',
    circle: 'rounded-full',
    rounded: 'rounded-2xl',
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
        <div className="relative group">
          <div className={`overflow-hidden ${shapeClasses[shape]} ${previewClassName}`}>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 ${shapeClasses[shape]}`}>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleClick}
              disabled={uploading}
              className="h-8"
            >
              <Upload className="h-3.5 w-3.5 mr-1.5" />
              Change
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={handleRemove}
              disabled={uploading}
              className="h-8"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>

          {uploading && (
            <div className={`absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center ${shapeClasses[shape]}`}>
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleClick}
          disabled={uploading}
          className={`w-full border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-gray-900 ${shapeClasses[shape]} ${previewClassName}`}
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          ) : (
            <>
              <ImageIcon className="h-8 w-8" />
              <span className="text-sm font-medium">Click to upload</span>
              <span className="text-xs text-gray-500">
                {Math.round(maxSize / 1024 / 1024)}MB max
              </span>
            </>
          )}
        </button>
      )}

      {error && (
        <p className="text-xs text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
}
