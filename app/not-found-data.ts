export const notFoundData = {
  hero: {
    eyebrow: "Page Not Found",
    title: "Looks like this page took a detour.",
    description:
      "The page you're looking for doesn't exist or may have moved. No worries — let's get you back on track.",
    align: "left" as const,
    size: "compact" as const,
    primaryCta: {
      label: "Go Home",
      href: "/",
    },
    secondaryCta: {
      label: "Contact Us",
      href: "/contact",
    },
  },
  section: {
    eyebrow: "Or find what you need",
  },
  navLinks: [
    { label: "Services", description: "See what we offer", href: "/services", icon: "Briefcase" },
    { label: "About", description: "Learn about our team", href: "/about", icon: "Users" },
    { label: "Blog", description: "Read our latest insights", href: "/blog", icon: "BookOpen" },
    { label: "Contact", description: "Get in touch with us", href: "/contact", icon: "Mail" },
  ] as const,
}
