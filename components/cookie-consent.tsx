"use client";

import { useEffect, useState } from 'react';
import { X, Cookie } from 'lucide-react';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function resetCookieConsent(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cookie_consent');
    localStorage.removeItem('cookie_consent_timestamp');
    window.dispatchEvent(new CustomEvent('showCookieConsent'));
  }
}

export function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isCalifornia, setIsCalifornia] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent !== null) {
      const handleShowConsent = () => {
        checkUserLocation().then((location) => {
          setIsCalifornia(location.isCalifornia || location.isEU);
          setIsVisible(true);
        });
      };
      window.addEventListener('showCookieConsent', handleShowConsent);
      return () => window.removeEventListener('showCookieConsent', handleShowConsent);
    }

    checkUserLocation().then((location) => {
      setIsCalifornia(location.isCalifornia || location.isEU);
      setIsVisible(true);
    });
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('cookie_consent_timestamp', new Date().toISOString());
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    localStorage.setItem('cookie_consent_timestamp', new Date().toISOString());
    setIsVisible(false);
    onDecline();
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[9999] border-t-2 shadow-2xl p-4 md:p-6 transition-transform duration-300 ease-in-out"
      style={{
        backgroundColor: 'var(--surface)',
        borderTopColor: 'var(--accent)',
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        visibility: isVisible ? 'visible' : 'hidden'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-shrink-0">
            <Cookie
              className="w-8 h-8 md:w-10 md:h-10"
              style={{ color: 'var(--accent)' }}
              aria-hidden="true"
            />
          </div>

          <div className="flex-1">
            <h3
              className="font-semibold text-lg md:text-xl mb-2"
              style={{
                color: 'var(--accent)',
                fontFamily: 'var(--font-body)'
              }}
            >
              {isCalifornia
                ? 'California Privacy Rights - Cookie Consent'
                : 'Cookie Consent'
              }
            </h3>
            <p
              className="text-sm md:text-base leading-relaxed mb-4"
              style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-body)' }}
            >
              We use cookies and similar technologies to improve your experience, analyze site usage, and assist with marketing efforts.
              {isCalifornia && (
                <>
                  {' '}As a California resident, you have the right to opt out of the sale or sharing of your personal information.
                  <a
                    href="/privacy-policy#ccpa-rights"
                    className="font-semibold underline ml-1"
                    style={{ color: 'var(--accent)' }}
                  >
                    Learn more about your CCPA rights
                  </a>.
                </>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAccept}
                className="px-6 py-3 font-semibold text-sm uppercase tracking-wide rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--accent-fg, #ffffff)',
                  outlineColor: 'var(--accent)'
                }}
              >
                Accept All Cookies
              </button>
              <button
                onClick={handleDecline}
                className="px-6 py-3 font-semibold text-sm uppercase tracking-wide rounded-sm border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                  backgroundColor: 'transparent',
                  outlineColor: 'var(--accent)'
                }}
              >
                Decline Non-Essential
              </button>
              <a
                href="/privacy-policy"
                className="px-6 py-3 font-semibold text-sm text-center md:text-left underline hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-sm"
                style={{
                  color: 'var(--accent)',
                  outlineColor: 'var(--accent)'
                }}
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <button
            onClick={handleDecline}
            className="flex-shrink-0 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-[var(--muted)]"
            aria-label="Close cookie consent"
            style={{ outlineColor: 'var(--accent)' }}
          >
            <X className="w-5 h-5" aria-hidden="true" style={{ color: 'var(--fg-muted)' }} />
          </button>
        </div>
      </div>
    </div>
  );
}

async function checkUserLocation(): Promise<{ isCalifornia: boolean; isEU: boolean }> {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      return { isCalifornia: false, isEU: false };
    }

    const data = await response.json();
    const isCalifornia = data.region_code === 'CA' || data.region === 'California';
    const euCountries = [
      'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
      'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
      'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
    ];
    const isEU = euCountries.includes(data.country_code);

    return { isCalifornia, isEU };
  } catch (error) {
    console.error('[Cookie Consent] Location check failed:', error);
    return { isCalifornia: true, isEU: false };
  }
}
