import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/google-analytics";
import { UTMPreserver } from "@/components/utm-preserver";
import { ThemeInjector } from "@/components/theme-injector";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { CookieConsentWrapper } from "@/components/cookie-consent-wrapper";
import { RouteAnnouncer } from "@/components/route-announcer";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { FloatingCTA } from "@/components/floating-cta";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { ScrollRevealInit } from "@/components/scroll-reveal";
import { Navigation } from "@/components/navigation";
import { siteConfig } from "@/site.config";
import { interTight, inter } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.seo.openGraph.siteName,
    type: "website",
    locale: siteConfig.seo.openGraph.locale,
    images: siteConfig.seo.openGraph.images,
  },
  twitter: {
    card: siteConfig.seo.twitter.cardType as "summary_large_image",
    site: siteConfig.seo.twitter.site,
    images: siteConfig.seo.openGraph.images.map((img) => img.url),
  },
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
        ${interTight.variable}
        ${inter.variable}
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
        <RouteAnnouncer />
        {siteConfig.announcement?.enabled && <AnnouncementBanner />}
        <ScrollRevealInit />
        <Navigation />
        <UTMPreserver />
        {/* Lenis smooths the real document scroll, so it needs no wrapper
            elements and imposes no transform. Nothing outside this provider
            has to move, and `position: fixed` on the nav above still resolves
            against the viewport. */}
        {siteConfig.features.smoothScroll ? (
          <SmoothScrollProvider lerp={0.1}>{children}</SmoothScrollProvider>
        ) : (
          children
        )}
        {siteConfig.features.cookieConsent && <CookieConsentWrapper />}
        {siteConfig.features.exitIntentPopup && <ExitIntentPopup />}
        {siteConfig.features.floatingCTA && <FloatingCTA />}
      </body>
    </html>
  );
}
