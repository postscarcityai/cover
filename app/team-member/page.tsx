import type { Metadata } from "next"
import TeamMemberClient from "./client"
import { teamMemberData } from "./data"
import { siteConfig } from "@/site.config"

export const metadata: Metadata = {
  title: `${siteConfig.business.founder.name} - ${siteConfig.business.founder.title} | ${siteConfig.name}`,
  description: siteConfig.teamMember?.metaDescription || `Learn more about ${siteConfig.business.founder.name}, ${siteConfig.business.founder.title} at ${siteConfig.name}. Serving clients across ${siteConfig.business.serviceAreas.join(", ")}.`,
  keywords: siteConfig.teamMember?.keywords || [
    siteConfig.business.founder.name,
    siteConfig.business.founder.title,
    ...siteConfig.business.expertise
  ],
  alternates: {
    canonical: `${siteConfig.url}/team-member`
  },
  openGraph: {
    title: `${siteConfig.business.founder.name} - ${siteConfig.business.founder.title}`,
    description: siteConfig.teamMember?.metaDescription || `Professional profile of ${siteConfig.business.founder.name} at ${siteConfig.name}.`,
    url: `${siteConfig.url}/team-member`,
    siteName: siteConfig.seo.openGraph.siteName,
    type: "profile",
    images: siteConfig.seo.openGraph.images
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.business.founder.name} - ${siteConfig.business.founder.title}`,
    description: siteConfig.teamMember?.metaDescription || `Professional profile of ${siteConfig.business.founder.name}.`,
  }
}

export default function TeamMemberPage() {
  // Person schema for team member
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/team-member#person`,
    "name": siteConfig.business.founder.name,
    "jobTitle": siteConfig.business.founder.title,
    "description": siteConfig.teamMember?.personDescription || `${siteConfig.business.founder.name} is a recognized professional at ${siteConfig.name}.`,
    "url": `${siteConfig.url}/team-member`,
    "image": siteConfig.teamMember?.imageSrc || "/img/team-member-placeholder.png",
    "worksFor": {
      "@type": siteConfig.business.type,
      "@id": siteConfig.url,
      "name": siteConfig.name
    },
    "knowsAbout": siteConfig.business.expertise,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.contact.address.street,
      "addressLocality": siteConfig.contact.address.city,
      "addressRegion": siteConfig.contact.address.state,
      "postalCode": siteConfig.contact.address.zip,
      "addressCountry": siteConfig.contact.address.country
    },
    "areaServed": siteConfig.business.serviceAreas.map(area => ({
      "@type": "State",
      "name": area
    }))
  };

  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(teamMemberData.breadcrumbSchema)
        }}
      />

      {/* Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema)
        }}
      />

      <TeamMemberClient data={teamMemberData} />
    </>
  )
}
