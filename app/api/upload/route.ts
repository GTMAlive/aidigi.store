import { NextRequest, NextResponse } from 'next/server';
import { generateFileName } from '@/lib/r2-upload';

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

    // Get R2 bucket from Cloudflare Workers binding
    // Note: This requires Cloudflare Workers environment
    const env = process.env as any;
    
    // For development, we'll use a simpler approach
    // In production with Cloudflare Pages, this will use R2 binding
    if (env.R2_BUCKET) {
      // Production: Use Cloudflare R2 binding
      const arrayBuffer = await file.arrayBuffer();
      await env.R2_BUCKET.put(key, arrayBuffer, {
        httpMetadata: {
          contentType: file.type,
        },
      });
    } else {
      // Development fallback: Use AWS S3 SDK for R2
      // We'll implement this with the @aws-sdk/client-s3 package
      const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
      
      const s3Client = new S3Client({
        region: 'auto',
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID!,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
        },
      });

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      });

      await s3Client.send(command);
    }

    // Return public URL
    const publicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      key: key,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}

// Configure maximum file size for API route
export const config = {
  api: {
    bodyParser: false,
    responseLimit: '10mb',
  },
};
