"use client"

import { useState } from "react"
import { Send, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"
import { getConsentText } from "@/site.config"
import { trackContactFormSubmit } from "@/lib/analytics"

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
  tcpaConsent: boolean
}

const INITIAL_FORM: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  tcpaConsent: false,
}

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM)
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }))
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
          ...form,
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

      trackContactFormSubmit("contact_page", form.message.length)
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
        className="border rounded-lg p-12 text-center"
        role="status"
        aria-live="polite"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <CheckCircle className="h-12 w-12 mx-auto mb-4" style={{ color: "var(--accent)" }} aria-hidden="true" />
        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}>
          Message Sent!
        </h3>
        <p style={{ color: "var(--fg-muted)" }}>
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm underline transition-opacity hover:opacity-80"
          style={{ color: "var(--accent)" }}
        >
          Send another message
        </button>
      </div>
    )
  }

  const inputClasses =
    "w-full bg-transparent border-b px-0 py-3 text-base transition-colors focus:outline-none"

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {status === "error" && (
        <div
          className="border rounded-lg p-4 flex items-start gap-3"
          role="alert"
          aria-live="assertive"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--accent)" }}
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }} aria-hidden="true" />
          <p className="text-sm" style={{ color: "var(--fg-muted)" }}>{errorMessage}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-8">
        <div>
          <label
            htmlFor="firstName"
            className="block text-xs tracking-[0.2em] uppercase mb-3"
            style={{ color: "var(--fg-muted)" }}
          >
            First Name <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={form.firstName}
            onChange={handleChange}
            className={inputClasses}
            style={{
              color: "var(--fg)",
              borderColor: "var(--border)",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-xs tracking-[0.2em] uppercase mb-3"
            style={{ color: "var(--fg-muted)" }}
          >
            Last Name <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={form.lastName}
            onChange={handleChange}
            className={inputClasses}
            style={{
              color: "var(--fg)",
              borderColor: "var(--border)",
            }}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        <div>
          <label
            htmlFor="email"
            className="block text-xs tracking-[0.2em] uppercase mb-3"
            style={{ color: "var(--fg-muted)" }}
          >
            Email <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className={inputClasses}
            style={{
              color: "var(--fg)",
              borderColor: "var(--border)",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-xs tracking-[0.2em] uppercase mb-3"
            style={{ color: "var(--fg-muted)" }}
          >
            Phone <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            className={inputClasses}
            style={{
              color: "var(--fg)",
              borderColor: "var(--border)",
            }}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-xs tracking-[0.2em] uppercase mb-3"
          style={{ color: "var(--fg-muted)" }}
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className={inputClasses}
          style={{
            color: "var(--fg)",
            borderColor: "var(--border)",
          }}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs tracking-[0.2em] uppercase mb-3"
          style={{ color: "var(--fg-muted)" }}
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full bg-transparent border-b px-0 py-3 text-base transition-colors focus:outline-none resize-vertical"
          style={{
            color: "var(--fg)",
            borderColor: "var(--border)",
          }}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="tcpaConsent"
          name="tcpaConsent"
          required
          checked={form.tcpaConsent}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded"
          style={{ accentColor: "var(--accent)" }}
          aria-describedby="tcpa-description"
        />
        <label
          htmlFor="tcpaConsent"
          className="text-sm leading-relaxed"
          id="tcpa-description"
          style={{ color: "var(--fg-muted)" }}
        >
          {getConsentText('tcpaFull')} <span style={{ color: "var(--accent)" }}>*</span>
        </label>
      </div>

      <MagneticButton>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center px-10 py-4 font-semibold text-sm uppercase tracking-wide rounded-full transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--accent-fg)",
          }}
        >
          {status === "submitting" ? (
            "Sending..."
          ) : (
            <>
              Send Message
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </MagneticButton>
    </form>
  )
}
