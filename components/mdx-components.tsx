import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/site.config'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="text-5xl md:text-6xl font-light mb-8 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--fg)' }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-light mb-6 mt-12 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--fg)' }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-bold mb-4 mt-8 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--fg)' }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-semibold mb-4 mt-6" style={{ color: 'var(--fg)' }}>
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--fg-muted)' }}>
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="text-lg leading-relaxed mb-6 pl-6 space-y-2" style={{ color: 'var(--fg-muted)' }}>
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="text-lg leading-relaxed mb-6 pl-6 space-y-2 list-decimal" style={{ color: 'var(--fg-muted)' }}>
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="list-disc">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-6 py-4 my-8 italic text-lg" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--surface)', color: 'var(--fg-muted)' }}>
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="px-2 py-1 rounded text-sm font-mono" style={{ backgroundColor: 'var(--muted)', color: 'var(--accent)' }}>
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="p-6 rounded-lg my-8 overflow-x-auto" style={{ backgroundColor: 'var(--muted)', color: 'var(--fg)' }}>
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <Link href={href || '#'} className="underline font-medium" style={{ color: 'var(--accent)' }}>
        {children}
      </Link>
    ),
    // Custom components for legal content
    LegalHighlight: ({ children }: { children: React.ReactNode }) => (
      <div className="border-l-4 p-6 my-8" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--accent)' }}>
        <div className="font-semibold mb-2" style={{ color: 'var(--fg)' }}>Key Legal Point</div>
        <div style={{ color: 'var(--fg-muted)' }}>{children}</div>
      </div>
    ),
    CaseAlert: ({ children }: { children: React.ReactNode }) => (
      <div className="border-l-4 p-6 my-8" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--accent)' }}>
        <div className="font-semibold mb-2" style={{ color: 'var(--fg)' }}>Case Alert</div>
        <div style={{ color: 'var(--fg-muted)' }}>{children}</div>
      </div>
    ),
    PracticalTip: ({ children }: { children: React.ReactNode }) => (
      <div className="border-l-4 p-6 my-8" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--accent)' }}>
        <div className="font-semibold mb-2" style={{ color: 'var(--fg)' }}>Practical Tip</div>
        <div style={{ color: 'var(--fg-muted)' }}>{children}</div>
      </div>
    ),
    DefenseStrategy: ({ children }: { children: React.ReactNode }) => (
      <div className="border-l-4 p-6 my-8" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--accent)' }}>
        <div className="font-semibold mb-2" style={{ color: 'var(--fg)' }}>Defense Strategy</div>
        <div style={{ color: 'var(--fg-muted)' }}>{children}</div>
      </div>
    ),
    QuestionAnswer: ({ question, answer }: { question: string; answer: string }) => (
      <div className="border-l-4 p-6 my-8" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--accent)' }}>
        <div className="font-semibold mb-3 flex items-start" style={{ color: 'var(--fg)' }}>
          <span className="mr-2">Q:</span>
          <span>{question}</span>
        </div>
        <div className="leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{answer}</div>
      </div>
    ),
    CallToAction: ({ href, children }: { href?: string; children: React.ReactNode }) => (
      <div className="p-12 my-16 text-center" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-fg)' }}>
        <div className="text-xl mb-8 leading-relaxed max-w-3xl mx-auto opacity-90">{children}</div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href={href || '/contact'}
            className="inline-block font-semibold uppercase tracking-wide px-8 py-4 transition-all"
            style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 80%, black)', color: 'var(--accent-fg)' }}
          >
            Get Help Now
          </a>
          <a
            href={`tel:${siteConfig.contact.phone.replace(/[^\d]/g, '')}`}
            className="inline-block border-2 bg-transparent font-semibold uppercase tracking-wide px-8 py-4 transition-all"
            style={{ borderColor: 'var(--accent-fg)', color: 'var(--accent-fg)' }}
          >
            Call {siteConfig.contact.phone}
          </a>
        </div>
      </div>
    ),
    // Editorial image components
    ImageQuote: ({ src, alt, quote, attribution }: { src?: string; alt?: string; quote: string; attribution?: string }) => (
      <div className="my-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="aspect-[4/3] flex items-center justify-center text-lg font-medium overflow-hidden" style={{ backgroundColor: 'var(--muted)', color: 'var(--fg-muted)' }}>
          {src ? (
            <Image src={src} alt={alt || ''} width={600} height={450} className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=" />
          ) : (
            `[Image: ${alt || 'Editorial Photo'}]`
          )}
        </div>
        <blockquote className="text-lg italic border-l-4 pl-6" style={{ borderColor: 'var(--accent)', color: 'var(--fg-muted)' }}>
          "{quote}"
          {attribution && (
            <cite className="block text-sm mt-2 not-italic" style={{ color: 'var(--fg-muted)' }}>— {attribution}</cite>
          )}
        </blockquote>
      </div>
    ),
    ImageText: ({ src, alt, text, attribution }: { src?: string; alt?: string; text: string; attribution?: string }) => (
      <div className="my-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="aspect-[4/3] flex items-center justify-center text-lg font-medium overflow-hidden" style={{ backgroundColor: 'var(--muted)', color: 'var(--fg-muted)' }}>
          {src ? (
            <Image src={src} alt={alt || ''} width={600} height={450} className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=" />
          ) : (
            `[Image: ${alt || 'Editorial Photo'}]`
          )}
        </div>
        <div className="text-lg" style={{ color: 'var(--fg-muted)' }}>
          {text}
          {attribution && (
            <div className="text-sm mt-2" style={{ color: 'var(--fg-muted)' }}>— {attribution}</div>
          )}
        </div>
      </div>
    ),
    ImageRight: ({ src, alt, quote, attribution }: { src?: string; alt?: string; quote: string; attribution?: string }) => (
      <div className="my-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <blockquote className="text-lg italic border-l-4 pl-6 lg:order-1" style={{ borderColor: 'var(--accent)', color: 'var(--fg-muted)' }}>
          "{quote}"
          {attribution && (
            <cite className="block text-sm mt-2 not-italic" style={{ color: 'var(--fg-muted)' }}>— {attribution}</cite>
          )}
        </blockquote>
        <div className="aspect-[4/3] flex items-center justify-center text-lg font-medium lg:order-2 overflow-hidden" style={{ backgroundColor: 'var(--muted)', color: 'var(--fg-muted)' }}>
          {src ? (
            <Image src={src} alt={alt || ''} width={600} height={450} className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=" />
          ) : (
            `[Image: ${alt || 'Editorial Photo'}]`
          )}
        </div>
      </div>
    ),
    ImageTextRight: ({ src, alt, text, attribution }: { src?: string; alt?: string; text: string; attribution?: string }) => (
      <div className="my-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="text-lg lg:order-1" style={{ color: 'var(--fg-muted)' }}>
          {text}
          {attribution && (
            <div className="text-sm mt-2" style={{ color: 'var(--fg-muted)' }}>— {attribution}</div>
          )}
        </div>
        <div className="aspect-[4/3] flex items-center justify-center text-lg font-medium lg:order-2 overflow-hidden" style={{ backgroundColor: 'var(--muted)', color: 'var(--fg-muted)' }}>
          {src ? (
            <Image src={src} alt={alt || ''} width={600} height={450} className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=" />
          ) : (
            `[Image: ${alt || 'Editorial Photo'}]`
          )}
        </div>
      </div>
    ),
    BlogImage: ({ src, alt, text, attribution }: { src?: string; alt?: string; text: string; attribution?: string }) => (
      <div className="my-12 rounded-lg overflow-hidden shadow-md">
        {src ? (
          <Image src={src} alt={alt || ''} width={800} height={600} className="w-full h-auto object-cover" sizes="(max-width: 768px) 100vw, 75vw" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=" />
        ) : (
          `[Image: ${alt || 'Editorial'}]`
        )}
        {text && <p className="text-sm italic mt-3 px-4 pb-4" style={{ color: 'var(--fg-muted)' }}>{text}</p>}
      </div>
    ),
    SideBySide: ({ left, right }: { left?: string; right?: string }) => (
      <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg overflow-hidden shadow-md">
          <Image src={left || ''} alt="Left" width={600} height={450} className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=" />
        </div>
        <div className="rounded-lg overflow-hidden shadow-md">
          <Image src={right || ''} alt="Right" width={600} height={450} className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=" />
        </div>
      </div>
    ),
    FullWidthImage: ({ src, alt, caption }: { src?: string; alt?: string; caption?: string }) => (
      <div className="my-16 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="aspect-[16/9] flex items-center justify-center text-xl font-medium overflow-hidden" style={{ backgroundColor: 'var(--muted)', color: 'var(--fg-muted)' }}>
          {src ? (
            <Image src={src} alt={alt || ''} width={1200} height={675} className="w-full h-full object-cover" sizes="100vw" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=" />
          ) : (
            `[Full Width Image: ${alt || 'Editorial Photo'}]`
          )}
        </div>
        {caption && (
          <p className="text-sm italic text-center mt-4 px-4 sm:px-6 lg:px-8" style={{ color: 'var(--fg-muted)' }}>
            {caption}
          </p>
        )}
      </div>
    ),
    ...components,
  }
}
