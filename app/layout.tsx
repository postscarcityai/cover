import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/google-analytics";
import { UTMPreserver } from "@/components/utm-preserver";
import { ThemeInjector } from "@/components/theme-injector";
import { ScrollSmoother } from "@/components/scroll-smoother";
import { siteConfig } from "@/site.config";
import {
  playfairDisplay,
  montserrat,
} from "@/lib/fonts";

export const metadata: Metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.description,
  icons: {
    icon: [
      { url: '/img/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/img/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/img/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/img/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/img/favicon.ico',
    apple: '/img/apple-touch-icon.png',
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
    "logo": `${siteConfig.url}/img/logo.svg`,
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
        ${playfairDisplay.variable}
        ${montserrat.variable}
      `}
    >
      <head>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans overflow-x-hidden">
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
        {siteConfig.features.smoothScroll && (
          <ScrollSmoother 
            smooth={0.08}
            speed={1}
            ease="power2.out"
            normalizeScroll={true}
            effects={true}
          />
        )}
        <UTMPreserver />
        {siteConfig.features.smoothScroll ? (
          <div id="smooth-wrapper" className="overflow-x-hidden">
            <div id="smooth-content" className="overflow-x-hidden">
              {children}
            </div>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
