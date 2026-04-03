"use client"

import { useState } from "react"
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"
import { getConsentText } from "@/site.config"

interface ContactConversionFormData {
  name: string
  email: string
  phone: string
  message: string
  tcpaConsent: boolean
}

const INITIAL_FORM: ContactConversionFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
  tcpaConsent: false,
}

export function ContactConversionForm() {
  const [form, setForm] = useState<ContactConversionFormData>(INITIAL_FORM)
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setErrorMessage("")

    const parts = form.name.trim().split(/\s+/)
    const firstName = parts[0] || ""
    const lastName = parts.slice(1).join(" ") || ""

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: form.email,
          phone: form.phone,
          subject: "Contact Form",
          message: form.message,
          tcpaConsent: form.tcpaConsent,
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
        className="rounded-2xl p-10 md:p-12 text-center"
        role="status"
        aria-live="polite"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "color-mix(in srgb, var(--accent) 20%, transparent)" }}
        >
          <CheckCircle className="h-8 w-8" style={{ color: "var(--accent)" }} aria-hidden="true" />
        </div>
        <h3
          className="text-2xl font-light mb-2"
          style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
        >
          You&apos;re all set!
        </h3>
        <p className="text-base mb-6" style={{ color: "var(--fg-muted)" }}>
          We&apos;ll be in touch within 24 hours. Check your inbox and keep your phone handy.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-medium underline transition-opacity hover:opacity-80"
          style={{ color: "var(--accent)" }}
        >
          Send another message
        </button>
      </div>
    )
  }

  const inputClasses =
    "w-full px-4 py-4 rounded-xl text-base transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
  const inputStyle = {
    backgroundColor: "var(--muted)",
    color: "var(--fg)",
    border: "1px solid var(--border)",
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "error" && (
        <div
          className="rounded-xl p-4 flex items-start gap-3"
          role="alert"
          aria-live="assertive"
          style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)", borderColor: "var(--accent)" }}
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }} aria-hidden="true" />
          <p className="text-sm" style={{ color: "var(--fg)" }}>
            {errorMessage}
          </p>
        </div>
      )}

      <div>
        <label htmlFor="conv-name" className="sr-only">
          Full Name
        </label>
        <input
          type="text"
          id="conv-name"
          name="name"
          required
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className={inputClasses}
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="conv-email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          id="conv-email"
          name="email"
          required
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          className={inputClasses}
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="conv-phone" className="sr-only">
          Phone
        </label>
        <input
          type="tel"
          id="conv-phone"
          name="phone"
          required
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
          className={inputClasses}
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="conv-message" className="sr-only">
          Message
        </label>
        <textarea
          id="conv-message"
          name="message"
          rows={4}
          placeholder="How can we help?"
          value={form.message}
          onChange={handleChange}
          className={`${inputClasses} resize-none`}
          style={inputStyle}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="conv-tcpa"
          name="tcpaConsent"
          required
          checked={form.tcpaConsent}
          onChange={handleChange}
          className="mt-1.5 h-4 w-4 rounded flex-shrink-0"
          style={{ accentColor: "var(--accent)" }}
          aria-describedby="conv-tcpa-desc"
        />
        <label
          htmlFor="conv-tcpa"
          className="text-xs leading-relaxed"
          id="conv-tcpa-desc"
          style={{ color: "var(--fg-muted)" }}
        >
          {getConsentText("tcpaFull")} <span style={{ color: "var(--accent)" }}>*</span>
        </label>
      </div>

      <MagneticButton>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full inline-flex items-center justify-center px-8 py-5 font-semibold text-base tracking-wide rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
        >
          {status === "submitting" ? (
            "Sending..."
          ) : (
            <>
              Get My Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </MagneticButton>
    </form>
  )
}
