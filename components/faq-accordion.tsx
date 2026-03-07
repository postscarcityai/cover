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

export function FAQAccordion({ faqs, className = '' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className={`space-y-3 ${className}`}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden transition-all border"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: openIndex === index ? 'var(--accent)' : 'var(--border)',
            }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer transition-colors"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              <h3 className="font-medium text-lg" style={{ color: 'var(--fg)' }}>
                {faq.question}
              </h3>
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: openIndex === index
                    ? 'var(--accent)'
                    : 'color-mix(in srgb, var(--accent) 15%, transparent)',
                }}
              >
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}
                  style={{ color: openIndex === index ? 'var(--accent-fg)' : 'var(--accent)' }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                </svg>
              </div>
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
              <div className="leading-relaxed px-6 pb-6" style={{ color: 'var(--fg-muted)' }}>
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
