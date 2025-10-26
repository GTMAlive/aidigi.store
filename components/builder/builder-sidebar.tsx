"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  LayoutTemplate, 
  Type, 
  Image, 
  Square,
  Sparkles,
  Grid3x3,
  ShoppingBag,
  Search,
  Plus
} from "lucide-react";
import type { BuilderElement } from "@/app/dashboard/builder/page";

interface BuilderSidebarProps {
  onAddElement: (element: BuilderElement) => void;
}

const sections = [
  {
    id: 'hero',
    name: 'Hero Header',
    description: 'Eye-catching header',
    icon: Sparkles,
    color: 'bg-purple-500',
  },
  {
    id: 'features',
    name: 'Features Grid',
    description: 'Highlight key features',
    icon: Grid3x3,
    color: 'bg-blue-500',
  },
  {
    id: 'products',
    name: 'Products Showcase',
    description: 'Display your products',
    icon: ShoppingBag,
    color: 'bg-green-500',
  },
];

const elements = [
  {
    id: 'text',
    name: 'Text',
    description: 'Add a text heading',
    icon: Type,
    color: 'bg-gray-600',
  },
  {
    id: 'button',
    name: 'Button',
    description: 'Call-to-action button',
    icon: Square,
    color: 'bg-orange-500',
  },
  {
    id: 'image',
    name: 'Image',
    description: 'Upload an image',
    icon: Image,
    color: 'bg-pink-500',
  },
];

export function BuilderSidebar({ onAddElement }: BuilderSidebarProps) {
  const [activeTab, setActiveTab] = useState<'sections' | 'elements'>('sections');
  const [searchQuery, setSearchQuery] = useState('');

  const generateId = () => `el-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleAddSection = (type: string) => {
    const element: BuilderElement = {
      id: generateId(),
      type: type as any,
      content: getSectionDefaultContent(type),
      styles: getSectionDefaultStyles(type),
    };
    onAddElement(element);
  };

  const handleAddElement = (type: string) => {
    const element: BuilderElement = {
      id: generateId(),
      type: type as any,
      content: getElementDefaultContent(type),
      styles: getElementDefaultStyles(type),
    };
    onAddElement(element);
  };

  const getSectionDefaultContent = (type: string) => {
    switch (type) {
      case 'hero':
        return {
          title: 'Welcome to Your Store',
          subtitle: 'Build something amazing',
          buttonText: 'Get Started',
        };
      case 'features':
        return {
          title: 'Amazing Features',
          features: [
            { title: 'Feature 1', description: 'Description here' },
            { title: 'Feature 2', description: 'Description here' },
            { title: 'Feature 3', description: 'Description here' },
          ],
        };
      case 'products':
        return {
          title: 'Featured Products',
          productCount: 4,
        };
      default:
        return {};
    }
  };

  const getSectionDefaultStyles = (type: string) => {
    return {
      padding: '4rem 1.5rem',
      backgroundColor: '#ffffff',
      textAlign: 'center',
    };
  };

  const getElementDefaultContent = (type: string) => {
    switch (type) {
      case 'text':
        return { text: 'Click to edit text' };
      case 'button':
        return { text: 'Click me', link: '#' };
      case 'image':
        return { src: '', alt: 'Image' };
      default:
        return {};
    }
  };

  const getElementDefaultStyles = (type: string) => {
    return {
      padding: '1rem',
      margin: '0.5rem',
    };
  };

  const filteredSections = sections.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredElements = elements.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-gray-900 text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <LayoutTemplate className="h-5 w-5 text-purple-400" />
          <h2 className="font-bold text-lg">Builder</h2>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-gray-800 border-gray-700 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        <button
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'sections'
              ? 'bg-gray-800 text-white border-b-2 border-purple-500'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('sections')}
        >
          Sections
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'elements'
              ? 'bg-gray-800 text-white border-b-2 border-purple-500'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('elements')}
        >
          Elements
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {activeTab === 'sections' ? (
          <>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Sections
            </div>
            {filteredSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleAddSection(section.id)}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group"
              >
                <div className={`${section.color} p-2 rounded-lg`}>
                  <section.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{section.name}</div>
                  <div className="text-xs text-gray-400">{section.description}</div>
                </div>
                <Plus className="h-4 w-4 text-gray-400 group-hover:text-white" />
              </button>
            ))}
          </>
        ) : (
          <>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Elements
            </div>
            {filteredElements.map((element) => (
              <button
                key={element.id}
                onClick={() => handleAddElement(element.id)}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group"
              >
                <div className={`${element.color} p-2 rounded-lg`}>
                  <element.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{element.name}</div>
                  <div className="text-xs text-gray-400">{element.description}</div>
                </div>
                <Plus className="h-4 w-4 text-gray-400 group-hover:text-white" />
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
