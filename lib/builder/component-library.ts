// Pre-built component library
import type { BuilderElement } from './types';
import { generateId } from './utils';

export const componentLibrary = {
  sections: [
    {
      id: 'hero',
      name: 'Hero Section',
      description: 'Large header with title, subtitle, and CTA',
      icon: 'layout',
      category: 'sections',
      template: (): BuilderElement => ({
        id: generateId('hero'),
        type: 'hero',
        name: 'Hero Section',
        content: {
          title: 'Build Something Amazing',
          subtitle: 'Create stunning websites with our powerful builder',
          buttonText: 'Get Started',
          buttonUrl: '#',
          backgroundImage: '',
        },
        styles: {
          default: {
            minHeight: '600px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 2rem',
            textAlign: 'center',
            color: '#ffffff',
          },
        },
      }),
    },
    {
      id: 'features',
      name: 'Features Grid',
      description: '3-column feature showcase',
      icon: 'grid',
      category: 'sections',
      template: (): BuilderElement => ({
        id: generateId('features'),
        type: 'features',
        name: 'Features Section',
        content: {
          title: 'Amazing Features',
          subtitle: 'Everything you need to succeed',
          features: [
            {
              icon: 'zap',
              title: 'Lightning Fast',
              description: 'Built for speed and performance',
            },
            {
              icon: 'shield',
              title: 'Secure & Reliable',
              description: 'Enterprise-grade security',
            },
            {
              icon: 'sparkles',
              title: 'Beautiful Design',
              description: 'Stunning out of the box',
            },
          ],
        },
        styles: {
          default: {
            padding: '5rem 2rem',
            backgroundColor: '#ffffff',
            textAlign: 'center',
          },
        },
      }),
    },
    {
      id: 'pricing',
      name: 'Pricing Table',
      description: 'Pricing cards with features',
      icon: 'dollar-sign',
      category: 'sections',
      template: (): BuilderElement => ({
        id: generateId('pricing'),
        type: 'pricing',
        name: 'Pricing Section',
        content: {
          title: 'Choose Your Plan',
          subtitle: 'Flexible pricing for teams of all sizes',
          plans: [
            {
              name: 'Starter',
              price: '$29',
              period: '/month',
              features: ['10 Projects', '5GB Storage', 'Basic Support'],
              highlighted: false,
            },
            {
              name: 'Professional',
              price: '$79',
              period: '/month',
              features: ['Unlimited Projects', '50GB Storage', 'Priority Support', 'Advanced Features'],
              highlighted: true,
            },
            {
              name: 'Enterprise',
              price: '$199',
              period: '/month',
              features: ['Everything in Pro', 'Unlimited Storage', '24/7 Support', 'Custom Solutions'],
              highlighted: false,
            },
          ],
        },
        styles: {
          default: {
            padding: '5rem 2rem',
            backgroundColor: '#f9fafb',
          },
        },
      }),
    },
    {
      id: 'testimonials',
      name: 'Testimonials',
      description: 'Customer reviews and quotes',
      icon: 'message-circle',
      category: 'sections',
      template: (): BuilderElement => ({
        id: generateId('testimonials'),
        type: 'testimonials',
        name: 'Testimonials Section',
        content: {
          title: 'What Our Customers Say',
          testimonials: [
            {
              quote: 'This product has completely transformed how we work. Highly recommended!',
              author: 'Sarah Johnson',
              role: 'CEO, TechCorp',
              avatar: '',
            },
            {
              quote: 'Outstanding support and amazing features. Worth every penny.',
              author: 'Michael Chen',
              role: 'Designer, Creative Studio',
              avatar: '',
            },
            {
              quote: 'The best investment we made this year. Game changer!',
              author: 'Emma Williams',
              role: 'Founder, StartupXYZ',
              avatar: '',
            },
          ],
        },
        styles: {
          default: {
            padding: '5rem 2rem',
            backgroundColor: '#ffffff',
          },
        },
      }),
    },
    {
      id: 'faq',
      name: 'FAQ Section',
      description: 'Frequently asked questions',
      icon: 'help-circle',
      category: 'sections',
      template: (): BuilderElement => ({
        id: generateId('faq'),
        type: 'faq',
        name: 'FAQ Section',
        content: {
          title: 'Frequently Asked Questions',
          subtitle: 'Everything you need to know',
          questions: [
            {
              question: 'How does it work?',
              answer: 'Our platform is designed to be intuitive and easy to use. Simply sign up, choose a plan, and start building.',
            },
            {
              question: 'What payment methods do you accept?',
              answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.',
            },
            {
              question: 'Can I cancel anytime?',
              answer: 'Yes, you can cancel your subscription at any time with no penalties.',
            },
          ],
        },
        styles: {
          default: {
            padding: '5rem 2rem',
            backgroundColor: '#f9fafb',
          },
        },
      }),
    },
    {
      id: 'cta',
      name: 'Call to Action',
      description: 'Conversion-focused CTA section',
      icon: 'megaphone',
      category: 'sections',
      template: (): BuilderElement => ({
        id: generateId('cta'),
        type: 'cta',
        name: 'CTA Section',
        content: {
          title: 'Ready to Get Started?',
          subtitle: 'Join thousands of satisfied customers today',
          buttonText: 'Start Free Trial',
          buttonUrl: '#',
        },
        styles: {
          default: {
            padding: '5rem 2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            textAlign: 'center',
            color: '#ffffff',
          },
        },
      }),
    },
    {
      id: 'gallery',
      name: 'Image Gallery',
      description: 'Grid of images',
      icon: 'image',
      category: 'sections',
      template: (): BuilderElement => ({
        id: generateId('gallery'),
        type: 'section',
        name: 'Gallery Section',
        content: {
          title: 'Gallery',
          columns: 3,
        },
        styles: {
          default: {
            padding: '5rem 2rem',
          },
        },
      }),
    },
  ],

  elements: [
    {
      id: 'heading',
      name: 'Heading',
      description: 'H1, H2, H3 heading',
      icon: 'type',
      category: 'elements',
      template: (level: 'h1' | 'h2' | 'h3' = 'h2'): BuilderElement => ({
        id: generateId('heading'),
        type: 'heading',
        name: `Heading ${level.toUpperCase()}`,
        content: {
          text: 'Your Heading Here',
          level,
        },
        styles: {
          default: {
            fontSize: level === 'h1' ? '3rem' : level === 'h2' ? '2.25rem' : '1.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#111827',
          },
        },
      }),
    },
    {
      id: 'text',
      name: 'Text',
      description: 'Paragraph text',
      icon: 'align-left',
      category: 'elements',
      template: (): BuilderElement => ({
        id: generateId('text'),
        type: 'text',
        name: 'Text Block',
        content: {
          text: 'Add your text content here. Click to edit.',
        },
        styles: {
          default: {
            fontSize: '1rem',
            lineHeight: '1.6',
            color: '#4b5563',
            marginBottom: '1rem',
          },
        },
      }),
    },
    {
      id: 'button',
      name: 'Button',
      description: 'Call to action button',
      icon: 'square',
      category: 'elements',
      template: (): BuilderElement => ({
        id: generateId('button'),
        type: 'button',
        name: 'Button',
        content: {
          text: 'Click Me',
          url: '#',
          variant: 'primary',
        },
        styles: {
          default: {
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#8b5cf6',
            color: '#ffffff',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            textAlign: 'center',
            cursor: 'pointer',
            border: 'none',
          },
          hover: {
            backgroundColor: '#7c3aed',
          },
        },
      }),
    },
    {
      id: 'image',
      name: 'Image',
      description: 'Image element',
      icon: 'image',
      category: 'elements',
      template: (): BuilderElement => ({
        id: generateId('image'),
        type: 'image',
        name: 'Image',
        content: {
          src: '',
          alt: 'Image description',
          width: '100%',
          height: 'auto',
        },
        styles: {
          default: {
            width: '100%',
            height: 'auto',
            borderRadius: '0.5rem',
          },
        },
      }),
    },
    {
      id: 'video',
      name: 'Video',
      description: 'Video embed',
      icon: 'video',
      category: 'elements',
      template: (): BuilderElement => ({
        id: generateId('video'),
        type: 'video',
        name: 'Video',
        content: {
          src: '',
          poster: '',
          autoplay: false,
          controls: true,
        },
        styles: {
          default: {
            width: '100%',
            height: 'auto',
            borderRadius: '0.5rem',
          },
        },
      }),
    },
    {
      id: 'divider',
      name: 'Divider',
      description: 'Horizontal line',
      icon: 'minus',
      category: 'elements',
      template: (): BuilderElement => ({
        id: generateId('divider'),
        type: 'divider',
        name: 'Divider',
        content: {},
        styles: {
          default: {
            width: '100%',
            height: '1px',
            backgroundColor: '#e5e7eb',
            margin: '2rem 0',
            border: 'none',
          },
        },
      }),
    },
    {
      id: 'spacer',
      name: 'Spacer',
      description: 'Vertical spacing',
      icon: 'move-vertical',
      category: 'elements',
      template: (): BuilderElement => ({
        id: generateId('spacer'),
        type: 'spacer',
        name: 'Spacer',
        content: {
          height: '2rem',
        },
        styles: {
          default: {
            height: '2rem',
            width: '100%',
          },
        },
      }),
    },
    {
      id: 'icon',
      name: 'Icon',
      description: 'Icon element',
      icon: 'star',
      category: 'elements',
      template: (): BuilderElement => ({
        id: generateId('icon'),
        type: 'icon',
        name: 'Icon',
        content: {
          icon: 'star',
          size: '2rem',
          color: '#8b5cf6',
        },
        styles: {
          default: {
            width: '2rem',
            height: '2rem',
            color: '#8b5cf6',
          },
        },
      }),
    },
    {
      id: 'box',
      name: 'Container',
      description: 'Generic container',
      icon: 'square',
      category: 'elements',
      template: (): BuilderElement => ({
        id: generateId('box'),
        type: 'box',
        name: 'Container',
        content: {},
        styles: {
          default: {
            padding: '1rem',
            backgroundColor: '#f9fafb',
            borderRadius: '0.5rem',
          },
        },
        children: [],
      }),
    },
  ],

  forms: [
    {
      id: 'form',
      name: 'Form',
      description: 'Contact form',
      icon: 'mail',
      category: 'forms',
      template: (): BuilderElement => ({
        id: generateId('form'),
        type: 'form',
        name: 'Contact Form',
        content: {
          action: '',
          method: 'POST',
        },
        styles: {
          default: {
            padding: '2rem',
            backgroundColor: '#ffffff',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
          },
        },
        children: [],
      }),
    },
    {
      id: 'input',
      name: 'Text Input',
      description: 'Text input field',
      icon: 'edit',
      category: 'forms',
      template: (): BuilderElement => ({
        id: generateId('input'),
        type: 'input',
        name: 'Text Input',
        content: {
          type: 'text',
          placeholder: 'Enter text...',
          label: 'Label',
          required: false,
        },
        styles: {
          default: {
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
          },
          focus: {
            borderColor: '#8b5cf6',
          },
        },
      }),
    },
    {
      id: 'textarea',
      name: 'Text Area',
      description: 'Multi-line text input',
      icon: 'align-left',
      category: 'forms',
      template: (): BuilderElement => ({
        id: generateId('textarea'),
        type: 'textarea',
        name: 'Text Area',
        content: {
          placeholder: 'Enter message...',
          label: 'Message',
          rows: 4,
          required: false,
        },
        styles: {
          default: {
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            fontFamily: 'inherit',
          },
        },
      }),
    },
  ],
};

export const getComponentTemplate = (id: string, category?: string) => {
  const categories = category 
    ? [componentLibrary[category as keyof typeof componentLibrary]]
    : Object.values(componentLibrary);
  
  for (const cat of categories) {
    const component = cat.find((c: any) => c.id === id);
    if (component) return component.template();
  }
  return null;
};
