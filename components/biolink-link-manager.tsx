"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  GripVertical, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  ExternalLink,
  Sparkles
} from "lucide-react";

interface BiolinkLink {
  id: string;
  title: string;
  url: string;
  enabled: boolean;
  clicks?: number;
}

export function BiolinkLinkManager() {
  const [links, setLinks] = useState<BiolinkLink[]>([
    { id: "1", title: "🛍️ Shop My AI Prompts", url: "/john-doe", enabled: true, clicks: 456 },
    { id: "2", title: "📚 Free Prompt Guide", url: "/john-doe#guide", enabled: true, clicks: 234 },
    { id: "3", title: "🐦 Follow on Twitter", url: "https://twitter.com/johndoe", enabled: true, clicks: 189 },
    { id: "4", title: "📸 Instagram", url: "https://instagram.com/johndoe", enabled: true, clicks: 167 },
    { id: "5", title: "🌐 My Website", url: "https://johndoe.com", enabled: true, clicks: 98 },
    { id: "6", title: "📧 Email Me", url: "mailto:john@example.com", enabled: true, clicks: 67 },
  ]);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [editingLink, setEditingLink] = useState<BiolinkLink | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newLink, setNewLink] = useState({ title: "", url: "" });

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (draggedItem && draggedItem !== targetId) {
      const draggedIndex = links.findIndex(link => link.id === draggedItem);
      const targetIndex = links.findIndex(link => link.id === targetId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newLinks = [...links];
        const [removed] = newLinks.splice(draggedIndex, 1);
        newLinks.splice(targetIndex, 0, removed);
        setLinks(newLinks);
      }
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const toggleLinkEnabled = (id: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, enabled: !link.enabled } : link
    ));
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const addLink = () => {
    if (newLink.title && newLink.url) {
      const link: BiolinkLink = {
        id: Date.now().toString(),
        title: newLink.title,
        url: newLink.url,
        enabled: true,
        clicks: 0,
      };
      setLinks([...links, link]);
      setNewLink({ title: "", url: "" });
      setIsAddDialogOpen(false);
    }
  };

  const updateLink = () => {
    if (editingLink) {
      setLinks(links.map(link => 
        link.id === editingLink.id ? editingLink : link
      ));
      setEditingLink(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GripVertical className="h-5 w-5 text-gray-400" />
            Manage Links
            <Badge variant="secondary">{links.length} links</Badge>
          </CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Link</DialogTitle>
                <DialogDescription>
                  Add a new link to your biolink page
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Link Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., 🛍️ Shop My Products"
                    value={newLink.title}
                    onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    placeholder="https://example.com"
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <Button onClick={addLink} className="w-full">
                  Add Link
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Drag and drop</strong> to reorder your links. The order here is how they&apos;ll appear on your biolink page.
            </p>
          </div>

          {links.map((link, index) => (
            <div
              key={link.id}
              draggable
              onDragStart={() => handleDragStart(link.id)}
              onDragOver={(e) => handleDragOver(e, link.id)}
              onDragEnd={handleDragEnd}
              className={`group relative p-4 bg-white border-2 rounded-xl transition-all cursor-move ${
                draggedItem === link.id 
                  ? 'border-purple-400 shadow-lg scale-105 opacity-50' 
                  : link.enabled 
                    ? 'border-gray-200 hover:border-purple-300' 
                    : 'border-gray-100 bg-gray-50 opacity-60'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Drag Handle */}
                <div className="flex flex-col gap-1">
                  <GripVertical className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  <span className="text-xs font-medium text-gray-500">#{index + 1}</span>
                </div>

                {/* Link Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-semibold truncate ${!link.enabled && 'text-gray-400'}`}>
                      {link.title}
                    </h4>
                    {!link.enabled && (
                      <Badge variant="secondary" className="text-xs">
                        Hidden
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    {link.url}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-500">
                      👁️ {link.clicks || 0} clicks
                    </span>
                    {link.clicks && link.clicks > 0 && (
                      <span className="text-xs text-green-600 font-medium">
                        +{Math.round((link.clicks / (links.reduce((acc, l) => acc + (l.clicks || 0), 0) || 1)) * 100)}% CTR
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full"
                    onClick={() => toggleLinkEnabled(link.id)}
                  >
                    {link.enabled ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-full"
                        onClick={() => setEditingLink(link)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Link</DialogTitle>
                        <DialogDescription>
                          Update your link details
                        </DialogDescription>
                      </DialogHeader>
                      {editingLink && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-title">Link Title</Label>
                            <Input
                              id="edit-title"
                              value={editingLink.title}
                              onChange={(e) => setEditingLink({ ...editingLink, title: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-url">URL</Label>
                            <Input
                              id="edit-url"
                              value={editingLink.url}
                              onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <Button onClick={updateLink} className="w-full">
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => deleteLink(link.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {links.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No links yet</h3>
              <p className="text-gray-600 mb-4">Add your first link to get started!</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Link
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
