"use client"

import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

const articles = [
  {
    title: "How We Built a National Lead Engine That Runs on a Mac Mini",
    description: "The Moon project — local AI inference, recursive summarization, and 1,800+ enriched leads with zero cloud cost.",
    status: "Coming Soon",
  },
  {
    title: "OpenClaw: The AI Operating System for Small Teams",
    description: "What an AI agent actually does when it runs your operations 24/7.",
    status: "Coming Soon",
  },
  {
    title: "Cover: A Marketing Site Platform That Actually Ships Fast",
    description: "Why we built Cover, how it works, and what it means for our clients.",
    status: "Coming Soon",
  },
  {
    title: "Local AI Inference With Qwen2.5-7B and Ollama",
    description: "Running production AI workloads on consumer hardware. What works, what doesn't, and why it matters.",
    status: "Coming Soon",
  },
  {
    title: "The Qualis Intelligence Portal: Building for High-Stakes Decisions",
    description: "Lessons from building a real-time intelligence system for defense technology.",
    status: "Coming Soon",
  },
  {
    title: "What 60 Vibe Jam Sessions Taught Us About AI Adoption",
    description: "The people who transformed weren't the ones who watched — they were the ones who built.",
    status: "Coming Soon",
  },
  {
    title: "Morning Intel: Automated Legal Research That Runs Before You Wake Up",
    description: "How we built a daily intelligence briefing from DoJ and FBI feeds for a federal defense attorney.",
    status: "Coming Soon",
  },
  {
    title: "Why We Open Source Everything",
    description: "Cover, Forge, Close, Recon — all MIT licensed. Here's why.",
    status: "Coming Soon",
  },
]

export default function ArticlesPage() {
  return (
    <div className="min-h-screen">
      
      <main id="main-content">
        <SubpageHero
          eyebrow="Articles"
          title="From the Field"
          description="Deep dives into the systems we build, the tools we use, and the lessons we've learned building AI infrastructure for real businesses."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Articles" },
          ]}
        />

        <SubpageSection>
          <div className="grid gap-8">
            {articles.map((article) => (
              <div
                key={article.title}
                className="p-8 rounded-lg border transition-all"
                style={{
                  borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)",
                  backgroundColor: "var(--surface)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h3
                      className="text-xl md:text-2xl font-bold"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
                    >
                      {article.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed max-w-2xl"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {article.description}
                    </p>
                  </div>
                  <span
                    className="shrink-0 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)",
                      color: "var(--accent)",
                    }}
                  >
                    {article.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SubpageSection>
      </main>
      <Footer />
    </div>
  )
}
