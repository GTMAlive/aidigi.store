// Builder utility functions

import type { BuilderElement } from './types';

// Generate unique IDs
export const generateId = (prefix: string = 'el'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Find element by ID in tree
export const findElement = (
  elements: BuilderElement[],
  id: string
): BuilderElement | null => {
  for (const element of elements) {
    if (element.id === id) return element;
    if (element.children) {
      const found = findElement(element.children, id);
      if (found) return found;
    }
  }
  return null;
};

// Get element path (breadcrumbs)
export const getElementPath = (
  elements: BuilderElement[],
  id: string,
  path: BuilderElement[] = []
): BuilderElement[] | null => {
  for (const element of elements) {
    const currentPath = [...path, element];
    if (element.id === id) return currentPath;
    if (element.children) {
      const found = getElementPath(element.children, id, currentPath);
      if (found) return found;
    }
  }
  return null;
};

// Flatten element tree
export const flattenElements = (elements: BuilderElement[]): BuilderElement[] => {
  const flat: BuilderElement[] = [];
  const traverse = (els: BuilderElement[]) => {
    els.forEach(el => {
      flat.push(el);
      if (el.children) traverse(el.children);
    });
  };
  traverse(elements);
  return flat;
};

// Convert CSS object to string
export const cssToString = (styles: Record<string, any>): string => {
  return Object.entries(styles)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join('; ');
};

// Parse CSS string to object
export const stringToCss = (cssString: string): Record<string, any> => {
  const styles: Record<string, any> = {};
  cssString.split(';').forEach(rule => {
    const [key, value] = rule.split(':').map(s => s.trim());
    if (key && value) {
      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      styles[camelKey] = value;
    }
  });
  return styles;
};

// Keyboard shortcut handler
export const handleKeyboardShortcut = (
  event: KeyboardEvent,
  actions: {
    undo?: () => void;
    redo?: () => void;
    delete?: () => void;
    duplicate?: () => void;
    save?: () => void;
    preview?: () => void;
  }
) => {
  const { key, ctrlKey, metaKey, shiftKey } = event;
  const mod = ctrlKey || metaKey;

  // Undo: Ctrl/Cmd + Z
  if (mod && key === 'z' && !shiftKey) {
    event.preventDefault();
    actions.undo?.();
  }
  
  // Redo: Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y
  if ((mod && key === 'z' && shiftKey) || (mod && key === 'y')) {
    event.preventDefault();
    actions.redo?.();
  }
  
  // Delete: Delete or Backspace
  if (key === 'Delete' || key === 'Backspace') {
    event.preventDefault();
    actions.delete?.();
  }
  
  // Duplicate: Ctrl/Cmd + D
  if (mod && key === 'd') {
    event.preventDefault();
    actions.duplicate?.();
  }
  
  // Save: Ctrl/Cmd + S
  if (mod && key === 's') {
    event.preventDefault();
    actions.save?.();
  }
  
  // Preview: Ctrl/Cmd + P
  if (mod && key === 'p') {
    event.preventDefault();
    actions.preview?.();
  }
};

// Calculate element bounds
export const getElementBounds = (elementId: string): DOMRect | null => {
  const element = document.getElementById(elementId);
  return element ? element.getBoundingClientRect() : null;
};

// Check if elements overlap
export const elementsOverlap = (rect1: DOMRect, rect2: DOMRect): boolean => {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
};

// Snap value to grid
export const snapToGrid = (value: number, gridSize: number = 8): number => {
  return Math.round(value / gridSize) * gridSize;
};

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Clone element deeply
export const cloneElement = (element: BuilderElement): BuilderElement => {
  return {
    ...element,
    id: generateId(element.type),
    children: element.children?.map(cloneElement),
  };
};

// Export to HTML
export const exportToHTML = (elements: BuilderElement[]): string => {
  const renderElement = (el: BuilderElement): string => {
    const tag = el.type === 'text' ? 'p' : el.type === 'heading' ? 'h2' : 'div';
    const styles = cssToString(el.styles.default || {});
    const classes = el.classes?.join(' ') || '';
    
    let content = '';
    if (el.content.text) content = el.content.text;
    if (el.children) {
      content = el.children.map(renderElement).join('');
    }
    
    return `<${tag} class="${classes}" style="${styles}">${content}</${tag}>`;
  };
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Page</title>
</head>
<body>
  ${elements.map(renderElement).join('\n  ')}
</body>
</html>`;
};
