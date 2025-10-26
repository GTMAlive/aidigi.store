"use client";

import { useBuilderStore } from "@/lib/builder/store";
import { findElement } from "@/lib/builder/utils";
import type { BuilderElement } from "@/lib/builder/types";
import { Button } from "@/components/ui/button";
import { Trash2, Move, Copy, Sparkles, Zap, ShoppingBag, Star } from "lucide-react";

export function Canvas() {
  const {
    elements,
    selectedElementId,
    hoveredElementId,
    selectElement,
    hoverElement,
    deleteElement,
    breakpoint,
    zoom,
    showGrid,
  } = useBuilderStore();

  const getCanvasWidth = () => {
    switch (breakpoint) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      default:
        return '100%';
    }
  };

  const renderElement = (element: BuilderElement): React.ReactNode => {
    const isSelected = selectedElementId === element.id;
    const isHovered = hoveredElementId === element.id;

    if (element.hidden) return null;

    const combinedStyles = {
      ...element.styles.default,
      position: 'relative' as const,
    };

    const wrapperClass = `
      ${isSelected ? 'ring-2 ring-purple-500 ring-offset-2' : ''}
      ${isHovered && !isSelected ? 'ring-2 ring-purple-300 ring-offset-1' : ''}
      ${element.locked ? 'pointer-events-none opacity-50' : ''}
      transition-all cursor-pointer
    `;

    // Render based on element type
    const content = (() => {
      switch (element.type) {
        case 'hero':
          return (
            <div style={combinedStyles} className="relative">
              <div className="max-w-4xl mx-auto text-center py-20">
                <h1 className="text-5xl font-bold mb-4" style={{ color: combinedStyles.color }}>
                  {element.content.title}
                </h1>
                <p className="text-xl mb-8 opacity-90">
                  {element.content.subtitle}
                </p>
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  {element.content.buttonText}
                </Button>
              </div>
            </div>
          );

        case 'features':
          return (
            <div style={combinedStyles} className="py-16 px-8">
              <h2 className="text-3xl font-bold text-center mb-4">{element.content.title}</h2>
              {element.content.subtitle && (
                <p className="text-center text-gray-600 mb-12">{element.content.subtitle}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {element.content.features?.map((feature: any, i: number) => (
                  <div key={i} className="text-center">
                    <div className="h-16 w-16 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'pricing':
          return (
            <div style={combinedStyles} className="py-16 px-8">
              <h2 className="text-3xl font-bold text-center mb-4">{element.content.title}</h2>
              {element.content.subtitle && (
                <p className="text-center text-gray-600 mb-12">{element.content.subtitle}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {element.content.plans?.map((plan: any, i: number) => (
                  <div
                    key={i}
                    className={`bg-white rounded-2xl p-8 border-2 ${
                      plan.highlighted ? 'border-purple-500 shadow-xl scale-105' : 'border-gray-200'
                    }`}
                  >
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features?.map((feature: string, j: number) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <Star className="h-4 w-4 text-purple-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Choose Plan
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'testimonials':
          return (
            <div style={combinedStyles} className="py-16 px-8">
              <h2 className="text-3xl font-bold text-center mb-12">{element.content.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {element.content.testimonials?.map((testimonial: any, i: number) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                    <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="font-bold text-purple-600">
                          {testimonial.author[0]}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-sm">{testimonial.author}</div>
                        <div className="text-xs text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'faq':
          return (
            <div style={combinedStyles} className="py-16 px-8">
              <h2 className="text-3xl font-bold text-center mb-4">{element.content.title}</h2>
              {element.content.subtitle && (
                <p className="text-center text-gray-600 mb-12">{element.content.subtitle}</p>
              )}
              <div className="max-w-3xl mx-auto space-y-4">
                {element.content.questions?.map((q: any, i: number) => (
                  <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-lg mb-2">{q.question}</h3>
                    <p className="text-gray-600">{q.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'cta':
          return (
            <div style={combinedStyles} className="py-20 px-8 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold mb-4" style={{ color: combinedStyles.color }}>
                  {element.content.title}
                </h2>
                <p className="text-xl mb-8 opacity-90">{element.content.subtitle}</p>
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  {element.content.buttonText}
                </Button>
              </div>
            </div>
          );

        case 'heading':
          const HeadingTag = element.content.level || 'h2';
          return (
            <HeadingTag style={combinedStyles}>
              {element.content.text}
            </HeadingTag>
          );

        case 'text':
          return <p style={combinedStyles}>{element.content.text}</p>;

        case 'button':
          return (
            <button style={combinedStyles}>
              {element.content.text}
            </button>
          );

        case 'image':
          return element.content.src ? (
            <img
              src={element.content.src}
              alt={element.content.alt}
              style={combinedStyles}
            />
          ) : (
            <div
              style={combinedStyles}
              className="bg-gray-200 flex items-center justify-center min-h-[200px]"
            >
              <span className="text-gray-400">Image Placeholder</span>
            </div>
          );

        case 'divider':
          return <hr style={combinedStyles} />;

        case 'spacer':
          return <div style={combinedStyles} />;

        case 'box':
          return (
            <div style={combinedStyles}>
              {element.children?.map((child) => (
                <div key={child.id}>{renderElement(child)}</div>
              ))}
            </div>
          );

        default:
          return (
            <div style={combinedStyles} className="p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-500">
                <span className="capitalize">{element.type}</span> Component
              </div>
            </div>
          );
      }
    })();

    return (
      <div
        key={element.id}
        className={wrapperClass}
        onClick={(e) => {
          e.stopPropagation();
          if (!element.locked) selectElement(element.id);
        }}
        onMouseEnter={(e) => {
          e.stopPropagation();
          hoverElement(element.id);
        }}
        onMouseLeave={() => hoverElement(null)}
      >
        {/* Selection Controls */}
        {isSelected && !element.locked && (
          <div className="absolute -top-10 right-0 flex items-center gap-1 bg-purple-600 text-white rounded-lg px-2 py-1 shadow-lg z-50">
            <span className="text-xs font-medium capitalize mr-2">{element.name || element.type}</span>
            <button
              className="p-1 hover:bg-purple-700 rounded"
              title="Move"
            >
              <Move className="h-3 w-3" />
            </button>
            <button
              className="p-1 hover:bg-purple-700 rounded"
              title="Duplicate"
            >
              <Copy className="h-3 w-3" />
            </button>
            <button
              className="p-1 hover:bg-red-500 rounded"
              onClick={(e) => {
                e.stopPropagation();
                deleteElement(element.id);
              }}
              title="Delete"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        )}

        {content}

        {/* Render children if any */}
        {element.children?.map((child) => renderElement(child))}
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gray-100 overflow-auto p-8">
      <div
        className="mx-auto bg-white shadow-lg transition-all duration-300"
        style={{
          width: getCanvasWidth(),
          minHeight: '100vh',
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top center',
          backgroundImage: showGrid
            ? 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)'
            : 'none',
          backgroundSize: showGrid ? '20px 20px' : 'auto',
        }}
        onClick={() => selectElement(null)}
      >
        {elements.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center p-12">
              <div className="h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Start Building
              </h3>
              <p className="text-gray-600 mb-4">
                Add sections and elements from the left sidebar
              </p>
              <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
                <span>Hero</span>
                <span>•</span>
                <span>Features</span>
                <span>•</span>
                <span>Pricing</span>
                <span>•</span>
                <span>More</span>
              </div>
            </div>
          </div>
        ) : (
          elements.map((element) => renderElement(element))
        )}
      </div>
    </div>
  );
}
