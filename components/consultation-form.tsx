"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"
import { getConsentText } from "@/site.config"
import { trackContactFormSubmit } from "@/lib/analytics"

interface ConsultationFormData {
  name: string
  email: string
  phone: string
  message: string
}

const INITIAL_FORM: ConsultationFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
}

interface ConsultationFormProps {
  className?: string
  title?: string
  description?: string
  buttonText?: string
}

export function ConsultationForm({
  className = "",
  title = "Get in Touch",
  description = "Send us a quick message and we'll get back to you within 24 hours.",
  buttonText = "Send Inquiry",
}: ConsultationFormProps) {
  const [form, setForm] = useState<ConsultationFormData>(INITIAL_FORM)
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.name.split(" ")[0],
          lastName: form.name.split(" ").slice(1).join(" "),
          email: form.email,
          phone: form.phone,
          message: form.message,
          subject: "Quick Inquiry",
          tcpaConsent: true,
          utmSource: new URLSearchParams(window.location.search).get("utm_source"),
          utmMedium: new URLSearchParams(window.location.search).get("utm_medium"),
          utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign"),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus("error")
        setErrorMessage(data.error || "Something went wrong. Please try again.")
        return
      }

      trackContactFormSubmit("consultation_form", form.message.length)
      setStatus("success")
      setForm(INITIAL_FORM)
    } catch {
      setStatus("error")
      setErrorMessage("Network hiccup! Check your connection and give it another shot.")
    }
  }

  if (status === "success") {
    return (
      <div
        className={`border rounded-lg p-12 text-center ${className}`}
        role="status"
        aria-live="polite"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <CheckCircle className="h-10 w-10 mx-auto mb-4" style={{ color: "var(--accent)" }} />
        <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}>
          We&apos;ll be in touch!
        </h3>
        <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
          Expect to hear from us within 24 hours.
        </p>
      </div>
    )
  }

  const inputClasses = "w-full bg-transparent border-b px-0 py-3 text-base transition-colors focus:outline-none"

  return (
    <div className={className}>
      {title && (
        <h3
          className="text-2xl md:text-3xl font-bold mb-3"
          style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
        >
          {title}
        </h3>
      )}
      {description && (
        <p className="text-base mb-8" style={{ color: "var(--fg-muted)" }}>
          {description}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {status === "error" && (
          <div
            className="border rounded-lg p-4 flex items-start gap-3"
            role="alert"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--accent)" }}
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
            <p className="text-sm" style={{ color: "var(--fg-muted)" }}>{errorMessage}</p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="consult-name"
              className="block text-xs tracking-[0.2em] uppercase mb-3"
              style={{ color: "var(--fg-muted)" }}
            >
              Name <span style={{ color: "var(--accent)" }}>*</span>
            </label>
            <input
              type="text"
              id="consult-name"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className={inputClasses}
              style={{ color: "var(--fg)", borderColor: "var(--border)" }}
            />
          </div>
          <div>
            <label
              htmlFor="consult-email"
              className="block text-xs tracking-[0.2em] uppercase mb-3"
              style={{ color: "var(--fg-muted)" }}
            >
              Email <span style={{ color: "var(--accent)" }}>*</span>
            </label>
            <input
              type="email"
              id="consult-email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className={inputClasses}
              style={{ color: "var(--fg)", borderColor: "var(--border)" }}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="consult-phone"
            className="block text-xs tracking-[0.2em] uppercase mb-3"
            style={{ color: "var(--fg-muted)" }}
          >
            Phone
          </label>
          <input
            type="tel"
            id="consult-phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={inputClasses}
            style={{ color: "var(--fg)", borderColor: "var(--border)" }}
          />
        </div>

        <div>
          <label
            htmlFor="consult-message"
            className="block text-xs tracking-[0.2em] uppercase mb-3"
            style={{ color: "var(--fg-muted)" }}
          >
            Message
          </label>
          <textarea
            id="consult-message"
            name="message"
            rows={3}
            value={form.message}
            onChange={handleChange}
            className="w-full bg-transparent border-b px-0 py-3 text-base transition-colors focus:outline-none resize-vertical"
            style={{ color: "var(--fg)", borderColor: "var(--border)" }}
          />
        </div>

        <p className="text-xs leading-relaxed" style={{ color: "var(--fg-muted)", opacity: 0.6 }}>
          {getConsentText('tcpaShort')}
        </p>

        <MagneticButton>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center px-10 py-4 font-semibold text-sm uppercase tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
          >
            {status === "submitting" ? "Sending..." : (
              <>
                {buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </MagneticButton>
      </form>
    </div>
  )
}
