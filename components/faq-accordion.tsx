'use client';

import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  className?: string;
}

/**
 * FAQ Accordion Component
 * 
 * Reusable, accessible FAQ accordion with:
 * - Only one FAQ open at a time
 * - Smooth expand/collapse animations
 * - Schema.org FAQPage structured data for SEO
 * - Keyboard accessible
 * - ARIA compliant
 * 
 * @example
 * ```tsx
 * <FAQAccordion 
 *   faqs={[
 *     { question: "What is your return policy?", answer: "We offer..." },
 *     { question: "How long does shipping take?", answer: "Typically..." }
 *   ]}
 * />
 * ```
 */
export function FAQAccordion({ faqs, className = '' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQPage schema for search engines
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* FAQ Accordion */}
      <div className={`space-y-4 ${className}`}>
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white shadow-md border-t border-black/85 overflow-hidden transition-shadow hover:shadow-lg"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              <h3 className="font-montserrat font-light text-xl text-gray-900">
                {faq.question}
              </h3>
              <svg 
                className={`flex-shrink-0 w-6 h-6 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                style={{ color: 'var(--theme-primary)' }}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ 
                maxHeight: openIndex === index ? '1000px' : '0',
                opacity: openIndex === index ? 1 : 0
              }}
            >
              <div className="font-montserrat text-gray-700 leading-relaxed px-6 pb-6">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

