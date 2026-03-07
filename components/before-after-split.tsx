'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PlaceholderImage } from '@/components/placeholder-image';

interface BeforeAfterSplitProps {
  beforeImage: string;
  afterImage: string;
  alt?: string;
  className?: string;
  showLabels?: boolean;
}

export function BeforeAfterSplit({
  beforeImage,
  afterImage,
  alt = 'Before and after comparison',
  className = '',
  showLabels = true,
}: BeforeAfterSplitProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [beforeFailed, setBeforeFailed] = useState(false);
  const [afterFailed, setAfterFailed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  if (beforeFailed && afterFailed) {
    return <PlaceholderImage label={alt} className={className} />;
  }

  return (
    <div
      className={`relative w-full aspect-[4/3] overflow-hidden ${className}`}
      style={{ backgroundColor: 'var(--muted)' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsDragging(false)}
      role="img"
      aria-label={alt}
    >
      <div className="absolute inset-0">
        {afterFailed ? (
          <div className="w-full h-full" style={{ backgroundColor: 'var(--muted)' }}>
            <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="400" height="300" fill="var(--muted)" />
              <rect x="160" y="110" width="80" height="80" rx="8" stroke="var(--border)" strokeWidth="1.5" fill="none" />
              <text x="200" y="215" textAnchor="middle" fill="var(--fg-muted)" fontSize="12" opacity="0.4">After</text>
            </svg>
          </div>
        ) : (
          <Image
            src={afterImage}
            alt={`${alt} - After`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setAfterFailed(true)}
          />
        )}
      </div>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        {beforeFailed ? (
          <div className="w-full h-full" style={{ backgroundColor: 'var(--surface)' }}>
            <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="400" height="300" fill="var(--surface)" />
              <rect x="160" y="110" width="80" height="80" rx="8" stroke="var(--border)" strokeWidth="1.5" fill="none" />
              <text x="200" y="215" textAnchor="middle" fill="var(--fg-muted)" fontSize="12" opacity="0.4">Before</text>
            </svg>
          </div>
        ) : (
          <Image
            src={beforeImage}
            alt={`${alt} - Before`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setBeforeFailed(true)}
          />
        )}
      </div>

      <div
        className="absolute top-0 bottom-0 w-1 cursor-ew-resize z-10 shadow-lg"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)', backgroundColor: 'var(--fg)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full shadow-lg flex items-center justify-center border-2"
          style={{ backgroundColor: 'var(--fg)', borderColor: 'var(--border)' }}
        >
          <div className="flex gap-1">
            <div className="w-0.5 h-3" style={{ backgroundColor: 'var(--bg)' }}></div>
            <div className="w-0.5 h-3" style={{ backgroundColor: 'var(--bg)' }}></div>
          </div>
        </div>
      </div>

      {showLabels && (
        <>
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded text-sm z-20" style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: 'var(--fg)' }}>
            Before
          </div>
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded text-sm z-20" style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: 'var(--fg)' }}>
            After
          </div>
        </>
      )}
    </div>
  );
}

interface BeforeAfterGridProps {
  cases: Array<{
    beforeImage: string;
    afterImage: string;
    alt?: string;
  }>;
  className?: string;
}

export function BeforeAfterGrid({ cases, className = '' }: BeforeAfterGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {cases.map((caseItem, index) => (
        <BeforeAfterSplit
          key={index}
          beforeImage={caseItem.beforeImage}
          afterImage={caseItem.afterImage}
          alt={caseItem.alt || `Case ${index + 1}`}
        />
      ))}
    </div>
  );
}
