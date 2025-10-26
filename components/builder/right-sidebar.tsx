"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useBuilderStore } from "@/lib/builder/store";
import { findElement } from "@/lib/builder/utils";
import {
  Paintbrush,
  Layout,
  Database,
  Zap,
  Settings2,
  X,
} from "lucide-react";

export function RightSidebar() {
  const {
    activeRightTab,
    setActiveRightTab,
    elements,
    selectedElementId,
    updateElement,
    selectElement,
  } = useBuilderStore();

  const selectedElement = selectedElementId
    ? findElement(elements, selectedElementId)
    : null;

  if (!selectedElement) return null;

  const tabs = [
    { id: 'style', label: 'Style', icon: Paintbrush },
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'data', label: 'Data', icon: Database },
    { id: 'interactions', label: 'Effects', icon: Zap },
    { id: 'settings', label: 'Settings', icon: Settings2 },
  ] as const;

  const updateStyle = (property: string, value: any) => {
    updateElement(selectedElementId!, {
      styles: {
        ...selectedElement.styles,
        default: {
          ...selectedElement.styles.default,
          [property]: value,
        },
      },
    });
  };

  const updateContent = (property: string, value: any) => {
    updateElement(selectedElementId!, {
      content: {
        ...selectedElement.content,
        [property]: value,
      },
    });
  };

  return (
    <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col">
      {/* Header */}
      <div className="h-14 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
        <h3 className="text-sm font-bold text-white">Properties</h3>
        <button
          onClick={() => selectElement(null)}
          className="text-gray-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveRightTab(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors whitespace-nowrap ${
              activeRightTab === tab.id
                ? 'bg-gray-800 text-purple-400 border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Style Tab */}
        {activeRightTab === 'style' && (
          <div className="space-y-6">
            {/* Typography */}
            {(selectedElement.type === 'text' || selectedElement.type === 'heading' || selectedElement.type === 'button') && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Typography
                </h4>
                
                <div>
                  <Label className="text-xs text-gray-400">Font Size</Label>
                  <Input
                    type="text"
                    value={selectedElement.styles.default?.fontSize || '1rem'}
                    onChange={(e) => updateStyle('fontSize', e.target.value)}
                    className="mt-1 bg-gray-800 border-gray-700 text-white"
                    placeholder="1rem"
                  />
                </div>

                <div>
                  <Label className="text-xs text-gray-400">Font Weight</Label>
                  <select
                    value={selectedElement.styles.default?.fontWeight || '400'}
                    onChange={(e) => updateStyle('fontWeight', e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm"
                  >
                    <option value="300">Light</option>
                    <option value="400">Regular</option>
                    <option value="500">Medium</option>
                    <option value="600">Semibold</option>
                    <option value="700">Bold</option>
                  </select>
                </div>

                <div>
                  <Label className="text-xs text-gray-400">Text Color</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={selectedElement.styles.default?.color || '#000000'}
                      onChange={(e) => updateStyle('color', e.target.value)}
                      className="w-16 h-10 bg-gray-800 border-gray-700"
                    />
                    <Input
                      type="text"
                      value={selectedElement.styles.default?.color || '#000000'}
                      onChange={(e) => updateStyle('color', e.target.value)}
                      className="flex-1 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-gray-400">Text Align</Label>
                  <div className="grid grid-cols-4 gap-1 mt-1">
                    {['left', 'center', 'right', 'justify'].map((align) => (
                      <Button
                        key={align}
                        variant={selectedElement.styles.default?.textAlign === align ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateStyle('textAlign', align)}
                        className={selectedElement.styles.default?.textAlign === align ? 'bg-purple-600' : 'bg-gray-800 border-gray-700 text-gray-300'}
                      >
                        {align[0].toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Background */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Background
              </h4>
              
              <div>
                <Label className="text-xs text-gray-400">Background Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="color"
                    value={selectedElement.styles.default?.backgroundColor || '#ffffff'}
                    onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                    className="w-16 h-10 bg-gray-800 border-gray-700"
                  />
                  <Input
                    type="text"
                    value={selectedElement.styles.default?.backgroundColor || '#ffffff'}
                    onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                    className="flex-1 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Spacing */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Spacing
              </h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-400">Padding</Label>
                  <Input
                    type="text"
                    value={selectedElement.styles.default?.padding || '0'}
                    onChange={(e) => updateStyle('padding', e.target.value)}
                    className="mt-1 bg-gray-800 border-gray-700 text-white"
                    placeholder="1rem"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-400">Margin</Label>
                  <Input
                    type="text"
                    value={selectedElement.styles.default?.margin || '0'}
                    onChange={(e) => updateStyle('margin', e.target.value)}
                    className="mt-1 bg-gray-800 border-gray-700 text-white"
                    placeholder="1rem"
                  />
                </div>
              </div>
            </div>

            {/* Border */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Border
              </h4>
              
              <div>
                <Label className="text-xs text-gray-400">Border Radius</Label>
                <Input
                  type="text"
                  value={selectedElement.styles.default?.borderRadius || '0'}
                  onChange={(e) => updateStyle('borderRadius', e.target.value)}
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                  placeholder="0.5rem"
                />
              </div>

              <div>
                <Label className="text-xs text-gray-400">Border Width</Label>
                <Input
                  type="text"
                  value={selectedElement.styles.default?.borderWidth || '0'}
                  onChange={(e) => updateStyle('borderWidth', e.target.value)}
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                  placeholder="1px"
                />
              </div>

              <div>
                <Label className="text-xs text-gray-400">Border Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="color"
                    value={selectedElement.styles.default?.borderColor || '#000000'}
                    onChange={(e) => updateStyle('borderColor', e.target.value)}
                    className="w-16 h-10 bg-gray-800 border-gray-700"
                  />
                  <Input
                    type="text"
                    value={selectedElement.styles.default?.borderColor || '#000000'}
                    onChange={(e) => updateStyle('borderColor', e.target.value)}
                    className="flex-1 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Effects */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Effects
              </h4>
              
              <div>
                <Label className="text-xs text-gray-400">Box Shadow</Label>
                <Input
                  type="text"
                  value={selectedElement.styles.default?.boxShadow || 'none'}
                  onChange={(e) => updateStyle('boxShadow', e.target.value)}
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                  placeholder="0 4px 6px rgba(0,0,0,0.1)"
                />
              </div>

              <div>
                <Label className="text-xs text-gray-400">Opacity</Label>
                <Input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={selectedElement.styles.default?.opacity || 1}
                  onChange={(e) => updateStyle('opacity', parseFloat(e.target.value))}
                  className="mt-1 w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {(selectedElement.styles.default?.opacity || 1) * 100}%
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Layout Tab */}
        {activeRightTab === 'layout' && (
          <div className="space-y-6">
            {/* Display */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Display
              </h4>
              
              <div>
                <Label className="text-xs text-gray-400">Display Type</Label>
                <select
                  value={selectedElement.styles.default?.display || 'block'}
                  onChange={(e) => updateStyle('display', e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm"
                >
                  <option value="block">Block</option>
                  <option value="inline">Inline</option>
                  <option value="inline-block">Inline Block</option>
                  <option value="flex">Flex</option>
                  <option value="grid">Grid</option>
                </select>
              </div>
            </div>

            {/* Size */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Size
              </h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-400">Width</Label>
                  <Input
                    type="text"
                    value={selectedElement.styles.default?.width || 'auto'}
                    onChange={(e) => updateStyle('width', e.target.value)}
                    className="mt-1 bg-gray-800 border-gray-700 text-white"
                    placeholder="auto"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-400">Height</Label>
                  <Input
                    type="text"
                    value={selectedElement.styles.default?.height || 'auto'}
                    onChange={(e) => updateStyle('height', e.target.value)}
                    className="mt-1 bg-gray-800 border-gray-700 text-white"
                    placeholder="auto"
                  />
                </div>
              </div>
            </div>

            {/* Position */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Position
              </h4>
              
              <div>
                <Label className="text-xs text-gray-400">Position Type</Label>
                <select
                  value={selectedElement.styles.default?.position || 'static'}
                  onChange={(e) => updateStyle('position', e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm"
                >
                  <option value="static">Static</option>
                  <option value="relative">Relative</option>
                  <option value="absolute">Absolute</option>
                  <option value="fixed">Fixed</option>
                  <option value="sticky">Sticky</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Data Tab */}
        {activeRightTab === 'data' && (
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Content
            </h4>
            
            {selectedElement.content.text !== undefined && (
              <div>
                <Label className="text-xs text-gray-400">Text Content</Label>
                <textarea
                  value={selectedElement.content.text || ''}
                  onChange={(e) => updateContent('text', e.target.value)}
                  rows={4}
                  className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm"
                />
              </div>
            )}

            {selectedElement.content.title !== undefined && (
              <div>
                <Label className="text-xs text-gray-400">Title</Label>
                <Input
                  value={selectedElement.content.title || ''}
                  onChange={(e) => updateContent('title', e.target.value)}
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            )}

            {selectedElement.content.subtitle !== undefined && (
              <div>
                <Label className="text-xs text-gray-400">Subtitle</Label>
                <Input
                  value={selectedElement.content.subtitle || ''}
                  onChange={(e) => updateContent('subtitle', e.target.value)}
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            )}

            {selectedElement.content.url !== undefined && (
              <div>
                <Label className="text-xs text-gray-400">Link URL</Label>
                <Input
                  type="url"
                  value={selectedElement.content.url || ''}
                  onChange={(e) => updateContent('url', e.target.value)}
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                  placeholder="https://"
                />
              </div>
            )}
          </div>
        )}

        {/* Interactions Tab */}
        {activeRightTab === 'interactions' && (
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Interactions & Animations
            </h4>
            
            <div className="text-center py-8">
              <Zap className="h-12 w-12 text-gray-700 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No interactions yet</p>
              <p className="text-xs text-gray-600 mt-1">
                Add animations and effects
              </p>
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                <Zap className="h-3 w-3 mr-2" />
                Add Interaction
              </Button>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeRightTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Element Settings
              </h4>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-gray-400">Element Name</Label>
                  <Input
                    value={selectedElement.name || selectedElement.type}
                    onChange={(e) => updateElement(selectedElementId!, { name: e.target.value })}
                    className="mt-1 bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-xs text-gray-400">Element ID</Label>
                  <Input
                    value={selectedElement.id}
                    disabled
                    className="mt-1 bg-gray-700 border-gray-600 text-gray-400"
                  />
                </div>

                <div>
                  <Label className="text-xs text-gray-400">Element Type</Label>
                  <Input
                    value={selectedElement.type}
                    disabled
                    className="mt-1 bg-gray-700 border-gray-600 text-gray-400 capitalize"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
