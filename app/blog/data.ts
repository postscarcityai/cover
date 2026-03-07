export const blogData = {
  hero: {
    eyebrow: "Insights & Updates",
    title: "Our Blog",
    description:
      "Stay informed with the latest news, insights, and expert perspectives on the topics that matter most.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Blog" },
    ] as const,
  },
  searchPlaceholder: "Search articles, topics, or keywords...",
  featuredSection: {
    eyebrow: "Featured",
    title: "Featured Articles",
    description:
      "Expert insights and in-depth analysis on the topics that matter most",
  },
  latestSection: {
    eyebrow: "Latest",
    title: "Recent Posts",
    description: "Stay up to date with our latest articles and insights",
  },
  noResults: {
    titleTemplate: 'No articles found matching "{query}"',
    subtitle: "Try searching for different keywords or browse all articles.",
  },
}
