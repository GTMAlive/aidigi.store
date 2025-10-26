"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Paintbrush, Layout, Type as TypeIcon } from "lucide-react";
import type { BuilderElement } from "@/app/dashboard/builder/page";

interface BuilderToolbarProps {
  element: BuilderElement | undefined;
  onUpdate: (updates: Partial<BuilderElement>) => void;
  onClose: () => void;
}

export function BuilderToolbar({ element, onUpdate, onClose }: BuilderToolbarProps) {
  if (!element) return null;

  const updateStyle = (key: string, value: string) => {
    onUpdate({
      styles: {
        ...element.styles,
        [key]: value,
      },
    });
  };

  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: {
        ...element.content,
        [key]: value,
      },
    });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Paintbrush className="h-5 w-5 text-purple-600" />
          <h3 className="font-bold text-lg">Properties</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <TypeIcon className="h-4 w-4 text-gray-600" />
          <h4 className="font-semibold text-sm text-gray-900">Content</h4>
        </div>

        <div className="space-y-4">
          {element.type === 'text' && (
            <div>
              <Label htmlFor="text-content">Text</Label>
              <Input
                id="text-content"
                value={element.content.text || ''}
                onChange={(e) => updateContent('text', e.target.value)}
                placeholder="Enter text..."
              />
            </div>
          )}

          {element.type === 'button' && (
            <>
              <div>
                <Label htmlFor="button-text">Button Text</Label>
                <Input
                  id="button-text"
                  value={element.content.text || ''}
                  onChange={(e) => updateContent('text', e.target.value)}
                  placeholder="Button text..."
                />
              </div>
              <div>
                <Label htmlFor="button-link">Link</Label>
                <Input
                  id="button-link"
                  value={element.content.link || ''}
                  onChange={(e) => updateContent('link', e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </>
          )}

          {element.type === 'image' && (
            <>
              <div>
                <Label htmlFor="image-src">Image URL</Label>
                <Input
                  id="image-src"
                  value={element.content.src || ''}
                  onChange={(e) => updateContent('src', e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="image-alt">Alt Text</Label>
                <Input
                  id="image-alt"
                  value={element.content.alt || ''}
                  onChange={(e) => updateContent('alt', e.target.value)}
                  placeholder="Image description..."
                />
              </div>
            </>
          )}

          {element.type === 'hero' && (
            <>
              <div>
                <Label htmlFor="hero-title">Title</Label>
                <Input
                  id="hero-title"
                  value={element.content.title || ''}
                  onChange={(e) => updateContent('title', e.target.value)}
                  placeholder="Hero title..."
                />
              </div>
              <div>
                <Label htmlFor="hero-subtitle">Subtitle</Label>
                <Input
                  id="hero-subtitle"
                  value={element.content.subtitle || ''}
                  onChange={(e) => updateContent('subtitle', e.target.value)}
                  placeholder="Hero subtitle..."
                />
              </div>
              <div>
                <Label htmlFor="hero-button">Button Text</Label>
                <Input
                  id="hero-button"
                  value={element.content.buttonText || ''}
                  onChange={(e) => updateContent('buttonText', e.target.value)}
                  placeholder="Button text..."
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Styling Section */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Layout className="h-4 w-4 text-gray-600" />
          <h4 className="font-semibold text-sm text-gray-900">Styling</h4>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="bg-color">Background Color</Label>
            <div className="flex gap-2">
              <Input
                id="bg-color"
                type="color"
                value={element.styles.backgroundColor || '#ffffff'}
                onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                className="w-16 h-10"
              />
              <Input
                value={element.styles.backgroundColor || '#ffffff'}
                onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                placeholder="#ffffff"
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="text-align">Text Align</Label>
            <div className="grid grid-cols-3 gap-2">
              {['left', 'center', 'right'].map((align) => (
                <Button
                  key={align}
                  variant={element.styles.textAlign === align ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateStyle('textAlign', align)}
                  className="capitalize"
                >
                  {align}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="padding">Padding</Label>
              <Input
                id="padding"
                value={element.styles.padding || ''}
                onChange={(e) => updateStyle('padding', e.target.value)}
                placeholder="1rem"
              />
            </div>
            <div>
              <Label htmlFor="margin">Margin</Label>
              <Input
                id="margin"
                value={element.styles.margin || ''}
                onChange={(e) => updateStyle('margin', e.target.value)}
                placeholder="0.5rem"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="border-radius">Border Radius</Label>
            <Input
              id="border-radius"
              value={element.styles.borderRadius || ''}
              onChange={(e) => updateStyle('borderRadius', e.target.value)}
              placeholder="8px"
            />
          </div>

          <div>
            <Label htmlFor="font-size">Font Size</Label>
            <Input
              id="font-size"
              value={element.styles.fontSize || ''}
              onChange={(e) => updateStyle('fontSize', e.target.value)}
              placeholder="16px"
            />
          </div>

          <div>
            <Label htmlFor="font-weight">Font Weight</Label>
            <select
              id="font-weight"
              value={element.styles.fontWeight || 'normal'}
              onChange={(e) => updateStyle('fontWeight', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="normal">Normal</option>
              <option value="medium">Medium</option>
              <option value="semibold">Semibold</option>
              <option value="bold">Bold</option>
            </select>
          </div>

          <div>
            <Label htmlFor="text-color">Text Color</Label>
            <div className="flex gap-2">
              <Input
                id="text-color"
                type="color"
                value={element.styles.color || '#000000'}
                onChange={(e) => updateStyle('color', e.target.value)}
                className="w-16 h-10"
              />
              <Input
                value={element.styles.color || '#000000'}
                onChange={(e) => updateStyle('color', e.target.value)}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
