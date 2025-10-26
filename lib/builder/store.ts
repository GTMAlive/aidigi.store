// Builder state management using Zustand
import { create } from 'zustand';
import type { BuilderElement, BuilderPage, BuilderComponent, DesignToken, BuilderHistory } from './types';

interface BuilderStore {
  // Pages
  pages: BuilderPage[];
  currentPageId: string;
  
  // Elements
  elements: BuilderElement[];
  selectedElementId: string | null;
  hoveredElementId: string | null;
  
  // History
  history: BuilderHistory;
  
  // Components
  components: BuilderComponent[];
  
  // Design tokens
  tokens: DesignToken[];
  
  // View settings
  zoom: number;
  breakpoint: 'mobile' | 'tablet' | 'desktop';
  showGrid: boolean;
  showRulers: boolean;
  snapToGrid: boolean;
  
  // UI state
  leftPanelWidth: number;
  rightPanelWidth: number;
  showLeftPanel: boolean;
  showRightPanel: boolean;
  activeLeftTab: 'add' | 'layers' | 'pages' | 'assets';
  activeRightTab: 'style' | 'layout' | 'data' | 'interactions' | 'settings';
  
  // Actions
  addElement: (element: BuilderElement, parentId?: string) => void;
  updateElement: (id: string, updates: Partial<BuilderElement>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  hoverElement: (id: string | null) => void;
  
  // History actions
  undo: () => void;
  redo: () => void;
  pushHistory: () => void;
  
  // View actions
  setZoom: (zoom: number) => void;
  setBreakpoint: (breakpoint: 'mobile' | 'tablet' | 'desktop') => void;
  toggleGrid: () => void;
  toggleRulers: () => void;
  toggleSnap: () => void;
  
  // Panel actions
  setLeftPanelWidth: (width: number) => void;
  setRightPanelWidth: (width: number) => void;
  toggleLeftPanel: () => void;
  toggleRightPanel: () => void;
  setActiveLeftTab: (tab: 'add' | 'layers' | 'pages' | 'assets') => void;
  setActiveRightTab: (tab: 'style' | 'layout' | 'data' | 'interactions' | 'settings') => void;
}

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  // Initial state
  pages: [],
  currentPageId: '',
  elements: [],
  selectedElementId: null,
  hoveredElementId: null,
  history: {
    past: [],
    present: [],
    future: [],
  },
  components: [],
  tokens: [
    // Default color tokens
    { id: 'primary', name: 'Primary', value: '#8B5CF6', type: 'color' },
    { id: 'secondary', name: 'Secondary', value: '#EC4899', type: 'color' },
    { id: 'accent', name: 'Accent', value: '#F59E0B', type: 'color' },
    { id: 'neutral-50', name: 'Neutral 50', value: '#F9FAFB', type: 'color' },
    { id: 'neutral-900', name: 'Neutral 900', value: '#111827', type: 'color' },
    // Typography tokens
    { id: 'heading-1', name: 'Heading 1', value: '3rem', type: 'typography' },
    { id: 'heading-2', name: 'Heading 2', value: '2.25rem', type: 'typography' },
    { id: 'body', name: 'Body', value: '1rem', type: 'typography' },
    // Spacing tokens
    { id: 'space-1', name: 'Space 1', value: '0.25rem', type: 'spacing' },
    { id: 'space-4', name: 'Space 4', value: '1rem', type: 'spacing' },
    { id: 'space-8', name: 'Space 8', value: '2rem', type: 'spacing' },
  ],
  zoom: 100,
  breakpoint: 'desktop',
  showGrid: false,
  showRulers: false,
  snapToGrid: true,
  leftPanelWidth: 280,
  rightPanelWidth: 320,
  showLeftPanel: true,
  showRightPanel: false,
  activeLeftTab: 'add',
  activeRightTab: 'style',

  // Element actions
  addElement: (element, parentId) => {
    set((state) => {
      const newElements = [...state.elements];
      
      if (parentId) {
        const addToParent = (els: BuilderElement[]): BuilderElement[] => {
          return els.map(el => {
            if (el.id === parentId) {
              return {
                ...el,
                children: [...(el.children || []), element],
              };
            }
            if (el.children) {
              return {
                ...el,
                children: addToParent(el.children),
              };
            }
            return el;
          });
        };
        return { elements: addToParent(newElements) };
      }
      
      return { elements: [...newElements, element] };
    });
    get().pushHistory();
  },

  updateElement: (id, updates) => {
    set((state) => {
      const updateInTree = (els: BuilderElement[]): BuilderElement[] => {
        return els.map(el => {
          if (el.id === id) {
            return { ...el, ...updates };
          }
          if (el.children) {
            return {
              ...el,
              children: updateInTree(el.children),
            };
          }
          return el;
        });
      };
      return { elements: updateInTree(state.elements) };
    });
    get().pushHistory();
  },

  deleteElement: (id) => {
    set((state) => {
      const deleteFromTree = (els: BuilderElement[]): BuilderElement[] => {
        return els.filter(el => {
          if (el.id === id) return false;
          if (el.children) {
            el.children = deleteFromTree(el.children);
          }
          return true;
        });
      };
      return { 
        elements: deleteFromTree(state.elements),
        selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
      };
    });
    get().pushHistory();
  },

  selectElement: (id) => set({ selectedElementId: id, showRightPanel: id !== null }),
  hoverElement: (id) => set({ hoveredElementId: id }),

  // History actions
  undo: () => {
    set((state) => {
      const { past, present } = state.history;
      if (past.length === 0) return state;
      
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      
      return {
        elements: previous,
        history: {
          past: newPast,
          present: previous,
          future: [present, ...state.history.future],
        },
      };
    });
  },

  redo: () => {
    set((state) => {
      const { future, present } = state.history;
      if (future.length === 0) return state;
      
      const next = future[0];
      const newFuture = future.slice(1);
      
      return {
        elements: next,
        history: {
          past: [...state.history.past, present],
          present: next,
          future: newFuture,
        },
      };
    });
  },

  pushHistory: () => {
    set((state) => ({
      history: {
        past: [...state.history.past, state.history.present],
        present: state.elements,
        future: [],
      },
    }));
  },

  // View actions
  setZoom: (zoom) => set({ zoom }),
  setBreakpoint: (breakpoint) => set({ breakpoint }),
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  toggleRulers: () => set((state) => ({ showRulers: !state.showRulers })),
  toggleSnap: () => set((state) => ({ snapToGrid: !state.snapToGrid })),

  // Panel actions
  setLeftPanelWidth: (width) => set({ leftPanelWidth: width }),
  setRightPanelWidth: (width) => set({ rightPanelWidth: width }),
  toggleLeftPanel: () => set((state) => ({ showLeftPanel: !state.showLeftPanel })),
  toggleRightPanel: () => set((state) => ({ showRightPanel: !state.showRightPanel })),
  setActiveLeftTab: (tab) => set({ activeLeftTab: tab }),
  setActiveRightTab: (tab) => set({ activeRightTab: tab }),
}));
