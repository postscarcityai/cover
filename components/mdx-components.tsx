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
      <h1 className="text-5xl md:text-6xl font-bold text-[#2A2C53] mb-8 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-bold text-[#2A2C53] mb-6 mt-12 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-bold text-[#2A2C53] mb-4 mt-8 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-semibold text-[#2A2C53] mb-4 mt-6">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="text-lg text-gray-700 leading-relaxed mb-6 pl-6 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="text-lg text-gray-700 leading-relaxed mb-6 pl-6 space-y-2 list-decimal">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="list-disc">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#2A2C53] pl-6 py-4 my-8 bg-gray-50 italic text-lg text-gray-700">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-[#2A2C53]">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-900 text-white p-6 rounded-lg my-8 overflow-x-auto">
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <Link href={href || '#'} className="text-[#2A2C53] hover:text-[#2A2C53]/80 underline font-medium">
        {children}
      </Link>
    ),
    // Custom components for legal content
    LegalHighlight: ({ children }: { children: React.ReactNode }) => (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8">
        <div className="text-yellow-800 font-semibold mb-2">⚖️ Key Legal Point</div>
        <div className="text-yellow-700">{children}</div>
      </div>
    ),
    CaseAlert: ({ children }: { children: React.ReactNode }) => (
      <div className="bg-red-50 border-l-4 border-red-400 p-6 my-8">
        <div className="text-red-800 font-semibold mb-2">🚨 Case Alert</div>
        <div className="text-red-700">{children}</div>
      </div>
    ),
    PracticalTip: ({ children }: { children: React.ReactNode }) => (
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-8">
        <div className="text-blue-800 font-semibold mb-2">💡 Practical Tip</div>
        <div className="text-blue-700">{children}</div>
      </div>
    ),
    DefenseStrategy: ({ children }: { children: React.ReactNode }) => (
      <div className="bg-green-50 border-l-4 border-green-400 p-6 my-8">
        <div className="text-green-800 font-semibold mb-2">🛡️ Defense Strategy</div>
        <div className="text-green-700">{children}</div>
      </div>
    ),
    QuestionAnswer: ({ question, answer }: { question: string; answer: string }) => (
      <div className="bg-purple-50 border-l-4 border-purple-400 p-6 my-8">
        <div className="text-purple-800 font-semibold mb-3 flex items-start">
          <span className="mr-2">❓</span>
          <span>{question}</span>
        </div>
        <div className="text-purple-700 leading-relaxed">{answer}</div>
      </div>
    ),
    CallToAction: ({ href, children }: { href?: string; children: React.ReactNode }) => (
      <div className="bg-purple-accent-600 text-white p-12 my-16 text-center">
        <div className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">{children}</div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href={href || '/contact'}
            className="inline-block bg-purple-accent-700 hover:bg-purple-accent-800 text-white font-montserrat font-semibold uppercase tracking-wide px-8 py-4 rounded-none transition-colors"
          >
            Get Legal Help
          </a>
          <a
            href={`tel:${siteConfig.contact.phone.replace(/[^\d]/g, '')}`}
            className="inline-block border-2 border-white bg-transparent text-white hover:bg-white hover:text-purple-accent-600 font-montserrat font-semibold uppercase tracking-wide px-8 py-4 rounded-none transition-colors"
          >
            Call {siteConfig.contact.phone}
          </a>
        </div>
      </div>
    ),
    // Editorial image components
    ImageQuote: ({ src, alt, quote, attribution }: { src?: string; alt?: string; quote: string; attribution?: string }) => (
      <div className="my-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="bg-gray-200 aspect-[4/3] flex items-center justify-center text-gray-500 text-lg font-medium overflow-hidden">
          {src ? (
            <Image src={src} alt={alt || ''} width={600} height={450} className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=" />
          ) : (
            `[Image: ${alt || 'Editorial Photo'}]`
          )}
        </div>
        <blockquote className="text-lg italic text-gray-700 border-l-4 border-[#2A2C53] pl-6">
          "{quote}"
          {attribution && (
            <cite className="block text-sm text-gray-500 mt-2 not-italic">— {attribution}</cite>
          )}
        </blockquote>
      </div>
    ),
    ImageText: ({ src, alt, text, attribution }: { src?: string; alt?: string; text: string; attribution?: string }) => (
      <div className="my-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="bg-gray-200 aspect-[4/3] flex items-center justify-center text-gray-500 text-lg font-medium overflow-hidden">
          {src ? (
            <Image src={src} alt={alt || ''} width={600} height={450} className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=" />
          ) : (
            `[Image: ${alt || 'Editorial Photo'}]`
          )}
        </div>
        <div className="text-lg text-gray-700">
          {text}
          {attribution && (
            <div className="text-sm text-gray-500 mt-2">— {attribution}</div>
          )}
        </div>
      </div>
    ),
    ImageRight: ({ src, alt, quote, attribution }: { src?: string; alt?: string; quote: string; attribution?: string }) => (
      <div className="my-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <blockquote className="text-lg italic text-gray-700 border-l-4 border-[#2A2C53] pl-6 lg:order-1">
          "{quote}"
          {attribution && (
            <cite className="block text-sm text-gray-500 mt-2 not-italic">— {attribution}</cite>
          )}
        </blockquote>
        <div className="bg-gray-200 aspect-[4/3] flex items-center justify-center text-gray-500 text-lg font-medium lg:order-2 overflow-hidden">
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
        <div className="text-lg text-gray-700 lg:order-1">
          {text}
          {attribution && (
            <div className="text-sm text-gray-500 mt-2">— {attribution}</div>
          )}
        </div>
        <div className="bg-gray-200 aspect-[4/3] flex items-center justify-center text-gray-500 text-lg font-medium lg:order-2 overflow-hidden">
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
        {text && <p className="text-sm text-gray-600 italic mt-3 px-4 pb-4">{text}</p>}
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
        <div className="bg-gray-200 aspect-[16/9] flex items-center justify-center text-gray-500 text-xl font-medium overflow-hidden">
          {src ? (
            <Image src={src} alt={alt || ''} width={1200} height={675} className="w-full h-full object-cover" sizes="100vw" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=" />
          ) : (
            `[Full Width Image: ${alt || 'Editorial Photo'}]`
          )}
        </div>
        {caption && (
          <p className="text-sm text-gray-500 italic text-center mt-4 px-4 sm:px-6 lg:px-8">
            {caption}
          </p>
        )}
      </div>
    ),
    ...components,
  }
}
