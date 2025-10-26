"use client";

import { useState } from "react";
import { Trash2, Move, Edit } from "lucide-react";
import type { BuilderElement } from "@/app/dashboard/builder/page";
import { cn } from "@/lib/utils";

interface BuilderCanvasProps {
  elements: BuilderElement[];
  selectedElement: string | null;
  onSelectElement: (id: string) => void;
  onUpdateElement: (id: string, updates: Partial<BuilderElement>) => void;
  onDeleteElement: (id: string) => void;
  previewMode: 'desktop' | 'tablet' | 'mobile';
}

export function BuilderCanvas({
  elements,
  selectedElement,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  previewMode,
}: BuilderCanvasProps) {
  const [editingText, setEditingText] = useState<string | null>(null);

  const getCanvasWidth = () => {
    switch (previewMode) {
      case 'mobile':
        return 'max-w-sm';
      case 'tablet':
        return 'max-w-2xl';
      default:
        return 'max-w-full';
    }
  };

  const renderElement = (element: BuilderElement) => {
    const isSelected = selectedElement === element.id;
    const isEditing = editingText === element.id;

    return (
      <div
        key={element.id}
        className={cn(
          "relative group transition-all",
          isSelected && "ring-2 ring-purple-500 ring-offset-2"
        )}
        onClick={(e) => {
          e.stopPropagation();
          onSelectElement(element.id);
        }}
        style={element.styles}
      >
        {/* Element Controls */}
        {isSelected && (
          <div className="absolute -top-10 right-0 flex items-center gap-1 bg-purple-600 text-white rounded-lg px-2 py-1 shadow-lg z-10">
            <button
              className="p-1 hover:bg-purple-700 rounded"
              title="Move"
            >
              <Move className="h-3 w-3" />
            </button>
            <button
              className="p-1 hover:bg-purple-700 rounded"
              onClick={(e) => {
                e.stopPropagation();
                setEditingText(element.id);
              }}
              title="Edit"
            >
              <Edit className="h-3 w-3" />
            </button>
            <button
              className="p-1 hover:bg-red-600 rounded"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteElement(element.id);
              }}
              title="Delete"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* Render based on type */}
        {element.type === 'hero' && (
          <div className="py-20 text-center">
            {isEditing ? (
              <input
                type="text"
                value={element.content.title}
                onChange={(e) =>
                  onUpdateElement(element.id, {
                    content: { ...element.content, title: e.target.value },
                  })
                }
                onBlur={() => setEditingText(null)}
                className="text-5xl font-bold mb-4 bg-transparent border-2 border-purple-500 rounded px-2"
                autoFocus
              />
            ) : (
              <h1 className="text-5xl font-bold mb-4">{element.content.title}</h1>
            )}
            <p className="text-xl text-gray-600 mb-8">{element.content.subtitle}</p>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold">
              {element.content.buttonText}
            </button>
          </div>
        )}

        {element.type === 'features' && (
          <div className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">{element.content.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {element.content.features.map((feature: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {element.type === 'products' && (
          <div className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">{element.content.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array(element.content.productCount).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100"></div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2">Product {index + 1}</h3>
                    <p className="text-gray-600 text-sm mb-3">Description here</p>
                    <div className="text-xl font-bold text-purple-600">₹499</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {element.type === 'text' && (
          isEditing ? (
            <input
              type="text"
              value={element.content.text}
              onChange={(e) =>
                onUpdateElement(element.id, {
                  content: { text: e.target.value },
                })
              }
              onBlur={() => setEditingText(null)}
              className="w-full bg-transparent border-2 border-purple-500 rounded px-2 py-1"
              autoFocus
            />
          ) : (
            <p className="text-gray-900">{element.content.text}</p>
          )
        )}

        {element.type === 'button' && (
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            {element.content.text}
          </button>
        )}

        {element.type === 'image' && (
          <div className="bg-gray-200 rounded-lg overflow-hidden">
            {element.content.src ? (
              <img
                src={element.content.src}
                alt={element.content.alt}
                className="w-full h-auto"
              />
            ) : (
              <div className="h-48 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">Click to upload image</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
      <div className={cn("mx-auto bg-white shadow-lg rounded-lg overflow-hidden min-h-screen", getCanvasWidth())}>
        {elements.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen text-center p-8">
            <div>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Move className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Start Building</h3>
              <p className="text-gray-600 mb-4">Add sections and elements from the left sidebar</p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <span>Sections</span>
                <span>•</span>
                <span>Elements</span>
                <span>•</span>
                <span>Text</span>
              </div>
            </div>
          </div>
        ) : (
          <div onClick={() => onSelectElement("")}>
            {elements.map(renderElement)}
          </div>
        )}
      </div>
    </div>
  );
}
