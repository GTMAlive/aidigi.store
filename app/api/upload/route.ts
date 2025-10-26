import { NextRequest, NextResponse } from 'next/server';
import { generateFileName } from '@/lib/r2-upload';

// Configure to run on Edge Runtime (required for Cloudflare Pages)
export const runtime = 'edge';

/**
 * POST /api/upload
 * Upload files to Cloudflare R2 storage
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'media';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileName = generateFileName(file.name);
    const key = `${folder}/${fileName}`;

    // Note: R2 upload functionality requires Cloudflare R2 bindings
    // For now, this endpoint validates the file but doesn't upload
    // The SimpleImageUpload component uses local data URLs instead
    
    // TODO: Implement R2 upload using Cloudflare Workers R2 bindings
    // This requires setting up R2 bucket bindings in wrangler.toml
    
    return NextResponse.json(
      { error: 'R2 upload not yet configured. Using local preview instead.' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
