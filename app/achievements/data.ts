import { siteConfig } from "@/site.config"

export interface ResultStat {
  value: string
  label: string
  suffix?: string
}

export interface FeaturedResult {
  id: string
  category: string
  title: string
  description: string
  paragraphs: string[]
}

export interface OutcomeCard {
  title: string
}

export interface ResultsData {
  hero: {
    title: string
    subtitle: string
    description: string
  }
  stats: ResultStat[]
  statement: {
    eyebrow: string
    statement: string
    detail: string
  }
  featuredResults: FeaturedResult[]
  moreOutcomes: {
    eyebrow: string
    title: string
    featured: Array<{
      title: string
      ctaText: string
      ctaHref: string
    }>
    grid: OutcomeCard[]
  }
  testimonial: {
    quote: string
    author: string
    role: string
  }
  cta: {
    title: string
    description: string
    buttonText: string
  }
}

export const resultsData: ResultsData = {
  hero: {
    title: "Results that speak for themselves",
    subtitle: "Results",
    description:
      "Every engagement is measured against one question: did it move the numbers that matter? Here is a look at the outcomes we have delivered for the people and teams we work with.",
  },
  stats: [
    { value: "60", label: "Average reduction in onboarding time", suffix: "%" },
    { value: "3", label: "New markets our clients scaled into last year", suffix: "x" },
    { value: "95", label: "Of clients renew or refer within the first year", suffix: "%" },
  ],
  statement: {
    eyebrow: "The proof",
    statement:
      "We don't ask you to take our word for it. We ask you to look at what happened after we showed up.",
    detail:
      "From first conversation to final handoff, every project below started with a hard problem and ended with a number the client could point to.",
  },
  featuredResults: [
    {
      id: "onboarding-overhaul",
      category: "Operations",
      title: "Cut onboarding time by 60% for a growing services firm",
      description:
        "A fast-growing firm was losing new hires to a six-week onboarding slog that left teams stretched and clients waiting.",
      paragraphs: [
        "We mapped every step of their intake process, cut the redundant approvals, and rebuilt the first two weeks around hands-on work instead of paperwork. Templates, checklists, and a single source of truth replaced a maze of email threads.",
        "Within one quarter, average time-to-productive dropped from six weeks to under three — and new-hire retention at the 90-day mark climbed to its highest level in company history.",
      ],
    },
    {
      id: "market-expansion",
      category: "Growth",
      title: "Scaled one regional brand into three new markets in a year",
      description:
        "A regional business with a loyal local following wanted to expand — but every previous attempt had stalled on logistics and brand consistency.",
      paragraphs: [
        "We built a repeatable launch playbook: local partnership criteria, a pricing model that flexed by market, and a marketing calendar the team could run without outside help.",
        "Twelve months later the brand was live in three new markets, each one breaking even ahead of projection, with the original location posting its best year to date.",
      ],
    },
    {
      id: "retention-turnaround",
      category: "Client Success",
      title: "Turned a 20% churn problem into a 95% renewal rate",
      description:
        "A subscription business was watching one in five customers walk away every year — and couldn't say why.",
      paragraphs: [
        "We dug into the data and found the pattern: customers who didn't see value in the first 30 days almost never renewed. So we rebuilt the first month — proactive check-ins, clear milestones, and an early-win roadmap for every new account.",
        "Churn fell quarter over quarter. Within a year, renewals hit 95% and referrals became the single largest source of new business.",
      ],
    },
  ],
  moreOutcomes: {
    eyebrow: "Track record",
    title: "More outcomes we're proud of",
    featured: [
      {
        title: "See how we\nget there",
        ctaText: "Our services",
        ctaHref: "/services",
      },
      {
        title: "Ready for results\nlike these?",
        ctaText: "Start a conversation",
        ctaHref: "/contact",
      },
    ],
    grid: [
      { title: "Doubled qualified leads in two quarters" },
      { title: "Reduced operating costs by 30% without layoffs" },
      { title: "Launched a new revenue line in 90 days" },
    ],
  },
  testimonial: {
    quote:
      "Results speak louder than promises. When the stakes are high, you want a team with a track record of turning hard problems into wins you can measure.",
    author: siteConfig.business.founder.name,
    role: siteConfig.business.founder.title,
  },
  cta: {
    title: "Your goals could be our next success story",
    description:
      "Every result on this page started with a single conversation. Tell us where you want to be, and we'll show you how we can help you get there.",
    buttonText: "Get in Touch",
  },
}
