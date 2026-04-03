"use client"

import { useState, useCallback } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"
import { BECOME_CLIENT_COUNTRIES } from "@/lib/become-client-countries"
import { getConsentText } from "@/site.config"

const MAX_MESSAGE = 500

export interface BecomeClientLeadFormProps {
  /** Prefix for input ids (avoid duplicates on page) */
  idPrefix?: string
}

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  jobTitle: string
  country: string
  companyName: string
  message: string
  marketingConsent: boolean
}

const empty: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  jobTitle: "",
  country: "",
  companyName: "",
  message: "",
  marketingConsent: false,
}

const labelClass = "mb-1.5 block text-xs font-medium tracking-wide text-neutral-900"
const fieldClass =
  "w-full border border-black/15 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 transition-shadow focus:border-black/35 focus:outline-none focus:ring-2 focus:ring-black/10"

export function BecomeClientLeadForm({ idPrefix = "bc" }: BecomeClientLeadFormProps) {
  const [form, setForm] = useState<FormState>(empty)
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const onField = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target
      const checked = (e.target as HTMLInputElement).checked
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    },
    []
  )

  const onMessage = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value
    if (v.length <= MAX_MESSAGE) setForm((prev) => ({ ...prev, message: v }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: "Become a Client",
          message: form.message.trim() || undefined,
          tcpaConsent: form.marketingConsent,
          jobTitle: form.jobTitle.trim(),
          country: form.country,
          companyName: form.companyName.trim(),
          utmSource: typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("utm_source") : null,
          utmMedium: typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("utm_medium") : null,
          utmCampaign: typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("utm_campaign") : null,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus("error")
        setErrorMessage(data.error || "Something went sideways. Try again or reach us by email.")
        return
      }
      setStatus("success")
      setForm(empty)
    } catch {
      setStatus("error")
      setErrorMessage("Network hiccup — check your connection and give it another shot.")
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-sm border p-8 text-center"
        style={{
          backgroundColor: "var(--become-client-card)",
          borderColor: "var(--become-client-card-border)",
        }}
        role="status"
        aria-live="polite"
      >
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: "color-mix(in srgb, var(--become-client-cta-bg) 38%, transparent)" }}
        >
          <CheckCircle className="h-7 w-7" style={{ color: "var(--become-client-cta-fg)" }} aria-hidden />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-neutral-900">Thanks — we&apos;re on it.</h3>
        <p className="mb-6 text-sm leading-relaxed text-neutral-600">
          We&apos;ll follow up shortly. Watch your inbox (and spam folder, just in case).
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-neutral-900 underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-900"
        >
          Send another request
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm border p-6 sm:p-8 md:p-10"
      style={{
        backgroundColor: "var(--become-client-card)",
        borderColor: "var(--become-client-card-border)",
        backdropFilter: "blur(12px)",
      }}
    >
      {status === "error" && (
        <div
          className="mb-6 flex gap-3 rounded-sm border border-amber-700/35 bg-amber-500/10 p-4"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-800" aria-hidden />
          <p className="text-sm text-amber-950">{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-4">
        <div>
          <label htmlFor={`${idPrefix}-fn`} className={labelClass}>
            First name <span className="text-red-700">*</span>
          </label>
          <input
            id={`${idPrefix}-fn`}
            name="firstName"
            required
            autoComplete="given-name"
            value={form.firstName}
            onChange={onField}
            className={fieldClass}
            placeholder="First name"
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-ln`} className={labelClass}>
            Last name <span className="text-red-700">*</span>
          </label>
          <input
            id={`${idPrefix}-ln`}
            name="lastName"
            required
            autoComplete="family-name"
            value={form.lastName}
            onChange={onField}
            className={fieldClass}
            placeholder="Last name"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={`${idPrefix}-email`} className={labelClass}>
          Business email <span className="text-red-700">*</span>
        </label>
        <input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={onField}
          className={fieldClass}
          placeholder="you@company.com"
        />
      </div>

      <div className="mt-5">
        <label htmlFor={`${idPrefix}-phone`} className={labelClass}>
          Business phone <span className="text-red-700">*</span>
        </label>
        <input
          id={`${idPrefix}-phone`}
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          value={form.phone}
          onChange={onField}
          className={fieldClass}
          placeholder="Phone number"
        />
      </div>

      <div className="mt-5">
        <label htmlFor={`${idPrefix}-title`} className={labelClass}>
          Job title <span className="text-red-700">*</span>
        </label>
        <input
          id={`${idPrefix}-title`}
          name="jobTitle"
          required
          autoComplete="organization-title"
          value={form.jobTitle}
          onChange={onField}
          className={fieldClass}
          placeholder="Your role"
        />
      </div>

      <div className="mt-5">
        <label htmlFor={`${idPrefix}-country`} className={labelClass}>
          Country <span className="text-red-700">*</span>
        </label>
        <select
          id={`${idPrefix}-country`}
          name="country"
          required
          value={form.country}
          onChange={onField}
          className={`${fieldClass} appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          }}
        >
          <option value="">Select country</option>
          {BECOME_CLIENT_COUNTRIES.map((c) => (
            <option key={c.value} value={c.label}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor={`${idPrefix}-co`} className={labelClass}>
          Company name <span className="text-red-700">*</span>
        </label>
        <input
          id={`${idPrefix}-co`}
          name="companyName"
          required
          autoComplete="organization"
          value={form.companyName}
          onChange={onField}
          className={fieldClass}
          placeholder="Company"
        />
      </div>

      <div className="mt-5">
        <label htmlFor={`${idPrefix}-msg`} className={labelClass}>
          How can we help you?{" "}
          <span className="font-normal text-neutral-500">({MAX_MESSAGE} characters max)</span>
        </label>
        <div className="relative">
          <textarea
            id={`${idPrefix}-msg`}
            name="message"
            rows={5}
            value={form.message}
            onChange={onMessage}
            className={`${fieldClass} resize-y min-h-[120px] pb-8`}
            placeholder="Tell us about your goals, timeline, or questions."
          />
          <span
            className="pointer-events-none absolute bottom-2 right-3 text-xs tabular-nums text-neutral-400"
            aria-live="polite"
          >
            {form.message.length}/{MAX_MESSAGE}
          </span>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <input
          id={`${idPrefix}-consent`}
          name="marketingConsent"
          type="checkbox"
          required
          checked={form.marketingConsent}
          onChange={onField}
          className="mt-1 h-4 w-4 flex-shrink-0 rounded-sm border border-black/25"
          style={{ accentColor: "var(--become-client-cta-fg)" }}
          aria-describedby={`${idPrefix}-consent-desc`}
        />
        <label htmlFor={`${idPrefix}-consent`} className="text-xs leading-relaxed text-neutral-600" id={`${idPrefix}-consent-desc`}>
          {getConsentText("tcpaFull")} <span className="text-red-700">*</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 w-full py-3.5 text-sm font-bold uppercase tracking-[0.12em] transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          backgroundColor: "var(--become-client-cta-bg)",
          color: "var(--become-client-cta-fg)",
        }}
      >
        {status === "submitting" ? "Sending…" : "Get started"}
      </button>
    </form>
  )
}
