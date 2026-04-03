import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/google-analytics";
import { UTMPreserver } from "@/components/utm-preserver";
import { ThemeInjector } from "@/components/theme-injector";
import { ScrollSmoother } from "@/components/scroll-smoother";
import { CookieConsentWrapper } from "@/components/cookie-consent-wrapper";
import { RouteAnnouncer } from "@/components/route-announcer";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { FloatingCTA } from "@/components/floating-cta";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { ScrollRevealInit } from "@/components/scroll-reveal"
import { TransitionProvider } from "@/components/transition-context";
import { PageTransition } from "@/components/page-transition";
import { CustomCursor } from "@/components/custom-cursor";
import { Navigation } from "@/components/navigation";
import { siteConfig } from "@/site.config";
import { jetbrainsMono, instrumentSerif } from "@/lib/fonts";

export const metadata: Metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Consolidated comprehensive Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": siteConfig.business.type,
    "@id": siteConfig.url,
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/logo.svg`,
    "description": siteConfig.description,
    "foundingDate": siteConfig.business.foundedYear,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "paymentAccepted": siteConfig.business.paymentMethods.join(", "),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.contact.address.street,
      "addressLocality": siteConfig.contact.address.city,
      "addressRegion": siteConfig.contact.address.state,
      "postalCode": siteConfig.contact.address.zip,
      "addressCountry": siteConfig.contact.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.business.coordinates.latitude,
      "longitude": siteConfig.business.coordinates.longitude
    },
    "hasMap": `https://maps.google.com/?q=${encodeURIComponent(`${siteConfig.contact.address.street}, ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state} ${siteConfig.contact.address.zip}`)}`,
    ...(siteConfig.business.openingHours.enabled && siteConfig.business.openingHours.is24_7 ? {
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    } : {}),
    "areaServed": siteConfig.business.serviceAreas.map(area => ({
      "@type": "State",
      "name": area
    })),
    "knowsAbout": siteConfig.business.expertise,
    "founder": {
      "@type": "Person",
      "name": siteConfig.business.founder.name,
      "jobTitle": siteConfig.business.founder.title
    },
    "sameAs": Object.values(siteConfig.social).filter(Boolean)
  };

  return (
    <html
      lang="en"
      className={`
        overflow-x-hidden
        ${jetbrainsMono.variable}
        ${instrumentSerif.variable}
      `}
    >
      <head>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans overflow-x-hidden bg-[var(--bg)] text-[var(--fg)]">
        {/* Skip Links - Hidden until focused */}
        <div className="skip-links">
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <a href="#navigation" className="skip-link">
            Skip to navigation
          </a>
          <a href="#footer" className="skip-link">
            Skip to contact information
          </a>
        </div>
        <ThemeInjector />
        <CustomCursor />
        <RouteAnnouncer />
        {siteConfig.announcement?.enabled && <AnnouncementBanner />}
        <ScrollRevealInit />
        {siteConfig.features.smoothScroll && (
          <ScrollSmoother
            smooth={1.2}
            speed={1}
            normalizeScroll={false}
            effects={true}
          />
        )}
        <UTMPreserver />
        <TransitionProvider>
          <Navigation />
          {siteConfig.features.smoothScroll ? (
            <div id="smooth-wrapper" className="overflow-x-hidden">
              <div id="smooth-content" className="overflow-x-hidden">
                <PageTransition>{children}</PageTransition>
              </div>
            </div>
          ) : (
            <PageTransition>{children}</PageTransition>
          )}
        </TransitionProvider>
        {siteConfig.features.cookieConsent && <CookieConsentWrapper />}
        {siteConfig.features.exitIntentPopup && <ExitIntentPopup />}
        {siteConfig.features.floatingCTA && <FloatingCTA />}
      </body>
    </html>
  );
}
