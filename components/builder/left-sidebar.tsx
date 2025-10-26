"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBuilderStore } from "@/lib/builder/store";
import { componentLibrary } from "@/lib/builder/component-library";
import { generateId } from "@/lib/builder/utils";
import {
  Plus,
  Layers,
  FileText,
  Image,
  Search,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  GripVertical,
} from "lucide-react";

export function LeftSidebar() {
  const {
    activeLeftTab,
    setActiveLeftTab,
    elements,
    addElement,
    selectedElementId,
    selectElement,
    updateElement,
  } = useBuilderStore();

  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: 'add', label: 'Add', icon: Plus },
    { id: 'layers', label: 'Layers', icon: Layers },
    { id: 'pages', label: 'Pages', icon: FileText },
    { id: 'assets', label: 'Assets', icon: Image },
  ] as const;

  const handleAddComponent = (template: any) => {
    const element = template();
    addElement(element);
    selectElement(element.id);
  };

  const renderElementTree = (els: typeof elements, depth = 0) => {
    return els.map((el) => (
      <div key={el.id}>
        <button
          onClick={() => selectElement(el.id)}
          className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-700 transition-colors ${
            selectedElementId === el.id ? 'bg-gray-700 text-purple-400' : 'text-gray-300'
          }`}
          style={{ paddingLeft: `${depth * 1 + 0.75}rem` }}
        >
          <GripVertical className="h-3 w-3 flex-shrink-0 text-gray-500" />
          <span className="flex-1 truncate text-left capitalize">
            {el.name || el.type}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                updateElement(el.id, { hidden: !el.hidden });
              }}
              className="p-1 hover:bg-gray-600 rounded"
              title={el.hidden ? "Show" : "Hide"}
            >
              {el.hidden ? (
                <EyeOff className="h-3 w-3 text-gray-500" />
              ) : (
                <Eye className="h-3 w-3 text-gray-400" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                updateElement(el.id, { locked: !el.locked });
              }}
              className="p-1 hover:bg-gray-600 rounded"
              title={el.locked ? "Unlock" : "Lock"}
            >
              {el.locked ? (
                <Lock className="h-3 w-3 text-gray-500" />
              ) : (
                <Unlock className="h-3 w-3 text-gray-400" />
              )}
            </button>
          </div>
          {el.children && el.children.length > 0 && (
            <ChevronRight className="h-3 w-3 text-gray-500" />
          )}
        </button>
        {el.children && el.children.length > 0 && (
          <div>{renderElementTree(el.children, depth + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveLeftTab(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
              activeLeftTab === tab.id
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
      <div className="flex-1 overflow-y-auto">
        {/* Add Tab */}
        {activeLeftTab === 'add' && (
          <div className="p-4">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Sections */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Sections
              </h3>
              <div className="space-y-2">
                {componentLibrary.sections
                  .filter((comp) =>
                    comp.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((comp) => (
                    <button
                      key={comp.id}
                      onClick={() => handleAddComponent(comp.template)}
                      className="w-full p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all text-left border border-gray-700 hover:border-purple-500 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                          <Plus className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-white truncate">
                            {comp.name}
                          </h4>
                          <p className="text-xs text-gray-400 truncate">
                            {comp.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* Elements */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Elements
              </h3>
              <div className="space-y-2">
                {componentLibrary.elements
                  .filter((comp) =>
                    comp.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((comp) => (
                    <button
                      key={comp.id}
                      onClick={() => handleAddComponent(comp.template)}
                      className="w-full p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all text-left border border-gray-700 hover:border-purple-500"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0">
                          <Plus className="h-5 w-5 text-gray-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-white truncate">
                            {comp.name}
                          </h4>
                          <p className="text-xs text-gray-400 truncate">
                            {comp.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* Forms */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Forms
              </h3>
              <div className="space-y-2">
                {componentLibrary.forms
                  .filter((comp) =>
                    comp.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((comp) => (
                    <button
                      key={comp.id}
                      onClick={() => handleAddComponent(comp.template)}
                      className="w-full p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all text-left border border-gray-700 hover:border-purple-500"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                          <Plus className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-white truncate">
                            {comp.name}
                          </h4>
                          <p className="text-xs text-gray-400 truncate">
                            {comp.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Layers Tab */}
        {activeLeftTab === 'layers' && (
          <div className="p-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Page Structure
            </h3>
            {elements.length === 0 ? (
              <div className="text-center py-8">
                <Layers className="h-12 w-12 text-gray-700 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No elements yet</p>
                <p className="text-xs text-gray-600 mt-1">
                  Add components to get started
                </p>
              </div>
            ) : (
              <div className="space-y-1">{renderElementTree(elements)}</div>
            )}
          </div>
        )}

        {/* Pages Tab */}
        {activeLeftTab === 'pages' && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Pages
              </h3>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-3 w-3 mr-1" />
                New
              </Button>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-gray-800 rounded-lg border border-purple-500">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white font-medium">Home</span>
                  <span className="text-xs text-purple-400">Active</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assets Tab */}
        {activeLeftTab === 'assets' && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Assets
              </h3>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-3 w-3 mr-1" />
                Upload
              </Button>
            </div>
            <div className="text-center py-8">
              <Image className="h-12 w-12 text-gray-700 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No assets uploaded</p>
              <p className="text-xs text-gray-600 mt-1">
                Upload images, videos, or icons
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
