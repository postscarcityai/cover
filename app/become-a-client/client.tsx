"use client"

import { usePageTracking } from "@/lib/analytics-hooks"
import { BecomeClientLeadForm } from "@/components/become-client-lead-form"
import { TransitionLink } from "@/components/transition-link"
import { siteConfig } from "@/site.config"

export default function BecomeAClientClient() {
  usePageTracking("Become a Client", "become_a_client", "become_client_page")

  const phoneDigits = siteConfig.contact.phone.replace(/[^\d+]/g, "")
  const phoneHref = `tel:${phoneDigits}`

  const mainPadTop = "calc(var(--banner-height, 0px) + 4rem)"

  return (
    <main
      id="main-content"
      className="min-h-[100dvh]"
      style={{
        paddingTop: mainPadTop,
        background: `linear-gradient(145deg, var(--become-client-panel-a) 0%, var(--become-client-panel-b) 42%, var(--become-client-panel-c) 100%)`,
      }}
    >
      <div className="px-4 pb-20 pt-10 sm:px-6 md:px-12 lg:px-16 xl:px-24 md:pb-28 md:pt-14">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 lg:items-start">
          <header className="max-w-lg text-white lg:pt-2">
            <h1
              className="font-heading text-3xl font-light leading-tight tracking-tight sm:text-4xl md:text-5xl"
            >
              Become a client
            </h1>
            <div
              className="mt-5 h-1 w-14 rounded-sm bg-black"
              aria-hidden
            />
            <p className="mt-8 text-sm leading-relaxed text-white/80 sm:text-base">
              Tell us who you are and what you&apos;re building. We&apos;ll route you to the right person and follow up fast.
            </p>

            <div className="mt-10 space-y-8 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Americas</p>
                <a
                  href={phoneHref}
                  className="mt-2 block text-lg font-medium text-white transition-opacity hover:opacity-85"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Email</p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="mt-2 block break-all text-white/90 underline-offset-4 transition-opacity hover:opacity-85"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Already in touch?</p>
                <TransitionLink
                  href="/contact"
                  className="mt-2 inline-block text-white underline underline-offset-4 transition-opacity hover:opacity-85"
                >
                  Book a call or visit the contact page
                </TransitionLink>
              </div>
            </div>
          </header>

          <div className="relative">
            <BecomeClientLeadForm idPrefix="bac" />
          </div>
        </div>
      </div>
    </main>
  )
}
