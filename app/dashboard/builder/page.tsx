"use client";

import { useState } from "react";
import { BuilderSidebar } from "@/components/builder/builder-sidebar";
import { BuilderCanvas } from "@/components/builder/builder-canvas";
import { BuilderToolbar } from "@/components/builder/builder-toolbar";
import { Button } from "@/components/ui/button";
import { Save, Eye, Smartphone, Monitor, Undo, Redo } from "lucide-react";

export interface BuilderElement {
  id: string;
  type: 'section' | 'text' | 'button' | 'image' | 'hero' | 'features' | 'products';
  content: any;
  styles: any;
}

export default function BuilderPage() {
  const [elements, setElements] = useState<BuilderElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [history, setHistory] = useState<BuilderElement[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const addElement = (element: BuilderElement) => {
    const newElements = [...elements, element];
    setElements(newElements);
    addToHistory(newElements);
  };

  const updateElement = (id: string, updates: Partial<BuilderElement>) => {
    const newElements = elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    );
    setElements(newElements);
    addToHistory(newElements);
  };

  const deleteElement = (id: string) => {
    const newElements = elements.filter(el => el.id !== id);
    setElements(newElements);
    addToHistory(newElements);
  };

  const addToHistory = (newElements: BuilderElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1]);
    }
  };

  const handleSave = () => {
    // TODO: Implement save to database
    console.log('Saving:', elements);
    alert('Design saved!');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <BuilderSidebar 
        onAddElement={addElement}
      />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-gray-900">Custom Builder</h1>
            <div className="flex items-center gap-1 ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={undo}
                disabled={historyIndex === 0}
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={redo}
                disabled={historyIndex === history.length - 1}
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Preview Mode Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('desktop')}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={previewMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('tablet')}
              >
                <Smartphone className="h-4 w-4 rotate-90" />
              </Button>
              <Button
                variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('mobile')}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={handleSave}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <BuilderCanvas
          elements={elements}
          selectedElement={selectedElement}
          onSelectElement={setSelectedElement}
          onUpdateElement={updateElement}
          onDeleteElement={deleteElement}
          previewMode={previewMode}
        />
      </div>

      {/* Properties Panel */}
      {selectedElement && (
        <BuilderToolbar
          element={elements.find(el => el.id === selectedElement)}
          onUpdate={(updates) => updateElement(selectedElement, updates)}
          onClose={() => setSelectedElement(null)}
        />
      )}
    </div>
  );
}
