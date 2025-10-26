// Core builder types and interfaces

export type ElementType = 
  | 'section' | 'hero' | 'features' | 'pricing' | 'testimonials' | 'faq' | 'cta'
  | 'text' | 'heading' | 'button' | 'image' | 'video' | 'icon' | 'divider' | 'spacer'
  | 'form' | 'input' | 'textarea' | 'select' | 'checkbox' | 'radio'
  | 'box' | 'list' | 'link' | 'embed' | 'map' | 'social';

export type DisplayType = 'block' | 'inline' | 'flex' | 'grid' | 'inline-flex' | 'inline-block';
export type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
export type AlignType = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type JustifyType = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface DesignToken {
  id: string;
  name: string;
  value: string;
  type: 'color' | 'typography' | 'spacing' | 'radius' | 'shadow';
}

export interface StyleState {
  default: Partial<CSSProperties>;
  hover?: Partial<CSSProperties>;
  focus?: Partial<CSSProperties>;
  active?: Partial<CSSProperties>;
  disabled?: Partial<CSSProperties>;
}

export interface ResponsiveStyles {
  mobile?: Partial<CSSProperties>;
  tablet?: Partial<CSSProperties>;
  desktop?: Partial<CSSProperties>;
}

export interface BuilderElement {
  id: string;
  type: ElementType;
  name?: string;
  content: Record<string, any>;
  styles: StyleState;
  responsiveStyles?: ResponsiveStyles;
  classes?: string[];
  children?: BuilderElement[];
  locked?: boolean;
  hidden?: boolean;
  component?: string; // Reference to component master
  overrides?: Record<string, any>; // For component instances
}

export interface BuilderComponent {
  id: string;
  name: string;
  description?: string;
  master: BuilderElement;
  variants?: Record<string, Partial<BuilderElement>>;
  thumbnail?: string;
}

export interface BuilderPage {
  id: string;
  name: string;
  slug: string;
  elements: BuilderElement[];
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
    canonical?: string;
  };
  isHome?: boolean;
}

export interface BuilderHistory {
  past: BuilderElement[][];
  present: BuilderElement[];
  future: BuilderElement[][];
}

export interface BuilderState {
  pages: BuilderPage[];
  currentPage: string;
  elements: BuilderElement[];
  selectedElement: string | null;
  hoveredElement: string | null;
  history: BuilderHistory;
  components: BuilderComponent[];
  tokens: DesignToken[];
  zoom: number;
  breakpoint: 'mobile' | 'tablet' | 'desktop';
  showGrid: boolean;
  showRulers: boolean;
  snapToGrid: boolean;
}

export interface CSSProperties {
  // Layout
  display?: DisplayType;
  position?: PositionType;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  
  // Flexbox
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent?: JustifyType;
  alignItems?: AlignType;
  alignContent?: AlignType;
  gap?: string;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string;
  
  // Grid
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridGap?: string;
  gridColumnGap?: string;
  gridRowGap?: string;
  
  // Spacing
  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  
  // Typography
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string | number;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textDecoration?: string;
  color?: string;
  
  // Background
  background?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  
  // Border
  border?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  borderRadius?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  
  // Effects
  boxShadow?: string;
  opacity?: number;
  filter?: string;
  backdropFilter?: string;
  transform?: string;
  transition?: string;
  
  // Other
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  zIndex?: number;
  cursor?: string;
}

export interface Interaction {
  id: string;
  trigger: 'load' | 'click' | 'hover' | 'scroll' | 'scrollIntoView';
  action: 'animate' | 'toggle' | 'navigate' | 'showHide';
  target?: string;
  animation?: {
    property: string;
    from: string;
    to: string;
    duration: number;
    easing: string;
    delay?: number;
  };
}
