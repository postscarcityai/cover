"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Phone, Scale, Gavel, Shield, Zap, Globe, FileText, AlertTriangle, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { usePageTracking, useScrollTracking } from "@/lib/analytics-hooks"
import type { PracticeAreasData } from "./data"

interface Props {
  data: PracticeAreasData
}

// Map color names to Tailwind classes
const colorMap = {
  blue: { bg: 'bg-[#2A2C53]', border: 'border-[#2A2C53]', text: 'text-[#2A2C53]' },
  purple: { bg: 'bg-purple-600', border: 'border-purple-600', text: 'text-purple-600' },
  orange: { bg: 'bg-orange-600', border: 'border-orange-600', text: 'text-orange-600' },
  green: { bg: 'bg-green-600', border: 'border-green-600', text: 'text-green-600' },
  red: { bg: 'bg-red-600', border: 'border-red-600', text: 'text-red-600' },
  gray: { bg: 'bg-indigo-600', border: 'border-indigo-600', text: 'text-indigo-600' },
  yellow: { bg: 'bg-blue-700', border: 'border-blue-700', text: 'text-blue-700' }
}

// Map icon names to actual icon components
const iconComponents: Record<string, any> = {
  'ArrowRight': ArrowRight,
  'CheckCircle': CheckCircle,
  'Phone': Phone,
  'Scale': Scale,
  'Gavel': Gavel,
  'Shield': Shield,
  'Zap': Zap,
  'Globe': Globe,
  'FileText': FileText,
  'AlertTriangle': AlertTriangle,
  'Users': Users
}

export default function PracticeAreasClient({ data }: Props) {
  const { hero, stats, primaryServices, secondaryServices, additionalInfo } = data

  // Track page view once on mount
  usePageTracking('Services', 'service', 'services')

  // Track scroll depth milestones
  useScrollTracking()

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Editorial Hero Section */}
      <section className="relative pt-24 pb-16 bg-white overflow-hidden" id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Main headline - takes up most space */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8"
            >
              <div className="text-sm font-montserrat font-medium tracking-widest uppercase text-gray-500 mb-6">
                Our Services
              </div>
              <h1
                className="text-6xl md:text-8xl font-bold leading-none mb-8"
                style={{ color: 'var(--theme-primary)' }}
              >
                {hero.title[0]}
                <span className="block">{hero.title[1]}</span>
              </h1>
              <div className="text-3xl md:text-4xl font-light text-gray-600 mb-8 leading-tight">
                {hero.subtitle}
              </div>
            </motion.div>

            {/* Sidebar info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4 space-y-6"
            >
              <div
                className="bg-gray-50 p-6 border-l-4"
                style={{ borderColor: 'var(--theme-primary)' }}
              >
                <div
                  className="text-sm font-montserrat font-semibold uppercase tracking-wide mb-2"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  {stats.primary.label}
                </div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  {stats.primary.value}
                </div>
                <div className="text-sm text-gray-600">{stats.primary.subtext}</div>
              </div>

              <div
                className="bg-gray-50 p-6 border-l-4"
                style={{ borderColor: 'var(--theme-primary)' }}
              >
                <div
                  className="text-sm font-montserrat font-semibold uppercase tracking-wide mb-2"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  {stats.secondary.label}
                </div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  {stats.secondary.value}
                </div>
                <div className="text-sm text-gray-600">{stats.secondary.subtext}</div>
              </div>

              <Button
                variant={null as any}
                size="lg"
                className="w-full font-montserrat font-semibold tracking-wide uppercase rounded-none hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: 'var(--theme-primary-foreground)',
                }}
                onClick={() => window.location.href = '/contact'}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Primary Services Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-5xl md:text-6xl font-bold mb-8"
              style={{ color: 'var(--theme-primary)' }}
            >
              Core Services
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {primaryServices.introduction}
              </p>
              <div
                className="bg-gray-50 p-8 border-l-4 text-left"
                style={{ borderColor: 'var(--theme-primary)' }}
              >
                <p className="text-lg text-gray-700 italic">
                  "{primaryServices.quote}"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Primary Services Sections */}
      {primaryServices.sections.map((section, sectionIndex) => {
        const colors = colorMap[section.color as keyof typeof colorMap] || colorMap.blue
        const Icon = iconComponents[section.icon] || Scale
        const isEven = sectionIndex % 2 === 0
        const bgColor = isEven ? 'bg-gray-50' : 'bg-white'

        return (
          <section key={section.title} className={`py-16 ${bgColor}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-16 items-start">
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`lg:col-span-5 ${isEven ? '' : 'lg:order-2'}`}
                >
                  <div className="sticky top-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-16 h-16 ${colors.bg} flex items-center justify-center`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3
                        className="text-4xl font-bold"
                        style={{ color: 'var(--theme-primary)' }}
                      >
                        {section.title}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`lg:col-span-7 ${isEven ? '' : 'lg:order-1'}`}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    {section.areas.map((area, index) => (
                      <motion.div
                        key={area}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className={`flex items-center space-x-3 p-3 ${isEven ? 'bg-white' : 'bg-gray-50'} ${colors.border} border-l-4 hover:shadow-md transition-shadow`}
                      >
                        <CheckCircle className={`h-4 w-4 ${colors.text} flex-shrink-0`} />
                        <span className="text-gray-700 text-sm font-medium">{area}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Secondary Services Introduction */}
      <section
        className="py-20"
        style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-primary-foreground)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Additional Services
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl leading-relaxed mb-8 opacity-90">
                {secondaryServices.introduction}
              </p>
              <div
                className="bg-white/10 p-8 border-l-4 text-left"
                style={{ borderColor: 'var(--theme-primary-foreground)' }}
              >
                <p className="text-lg italic opacity-95">
                  "{secondaryServices.quote}"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Secondary Services Sections */}
      {secondaryServices.sections.map((section, sectionIndex) => {
        const colors = colorMap[section.color as keyof typeof colorMap] || colorMap.blue
        const Icon = iconComponents[section.icon] || Users
        const isEven = sectionIndex % 2 === 0
        const bgColor = isEven ? 'bg-white' : 'bg-gray-50'

        return (
          <section key={section.title} className={`py-16 ${bgColor}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-16 items-start">
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`lg:col-span-5 ${isEven ? '' : 'lg:order-2'}`}
                >
                  <div className="sticky top-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-16 h-16 ${colors.bg} flex items-center justify-center`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3
                        className="text-4xl font-bold"
                        style={{ color: 'var(--theme-primary)' }}
                      >
                        {section.title}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`lg:col-span-7 ${isEven ? '' : 'lg:order-1'}`}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    {section.areas.map((area, index) => (
                      <motion.div
                        key={area}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className={`flex items-center space-x-3 p-3 ${isEven ? 'bg-gray-50' : 'bg-white'} ${colors.border} border-l-4 hover:shadow-md transition-shadow`}
                      >
                        <CheckCircle className={`h-4 w-4 ${colors.text} flex-shrink-0`} />
                        <span className="text-gray-700 text-sm font-medium">{area}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Call to Action Section */}
      <section
        className="py-20"
        style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-primary-foreground)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              {additionalInfo.title}
            </h2>
            <p className="text-xl mb-8 leading-relaxed opacity-90">
              {additionalInfo.description}
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {additionalInfo.areas.slice(0, 3).map((area, index) => (
                <div key={index} className="bg-white/10 p-4 rounded">
                  <p className="font-medium">{area}</p>
                </div>
              ))}
            </div>
            <Button
              variant={null as any}
              size="lg"
              className="font-semibold font-montserrat tracking-wide uppercase px-8 py-4 rounded-none hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: 'var(--theme-primary-foreground)',
                color: 'var(--theme-primary)',
              }}
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}