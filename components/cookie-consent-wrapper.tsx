"use client";

import { CookieConsent } from "./cookie-consent";

export function CookieConsentWrapper() {
  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const handleDecline = () => {
    // Analytics remain disabled
  };

  return <CookieConsent onAccept={handleAccept} onDecline={handleDecline} />;
}
