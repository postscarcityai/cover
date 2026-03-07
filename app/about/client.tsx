"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, MapPin, Scale, Target, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { usePageTracking, useScrollTracking } from "@/lib/analytics-hooks"
import type { OurFirmData } from "./data"

interface Props {
  data: OurFirmData
}

// Icon mapping - client-side only
const iconMap = {
  Scale,
  Target,
  Shield
}

export default function OurFirmClient({ data }: Props) {
  const { hero, stats, introduction, mission, coreValues, practiceAreas, stateLicenses, federalJurisdictions, cta } = data

  // Track page view once on mount
  usePageTracking('About', 'about', 'about_page')

  // Track scroll depth milestones
  useScrollTracking()

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Editorial Hero Section */}
      <section className="relative pt-24 pb-16 bg-white overflow-hidden" id="main-content">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Main headline - takes up most space */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8"
            >
              <div className="text-sm font-montserrat font-medium tracking-widest uppercase text-gray-500 mb-6">
                {hero.subtitle}
              </div>
              <h1
                className="text-6xl md:text-8xl font-bold leading-none mb-8"
                style={{ color: 'var(--theme-primary)' }}
              >
                {hero.title}
              </h1>
              <div className="text-3xl md:text-4xl font-light text-gray-600 mb-8 leading-tight">
                {hero.location}
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
                  {stats.experience.label}
                </div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  {stats.experience.value}
                </div>
                <div className="text-sm text-gray-600">{stats.experience.subtext}</div>
              </div>

              <div
                className="bg-gray-50 p-6 border-l-4"
                style={{ borderColor: 'var(--theme-primary)' }}
              >
                <div
                  className="text-sm font-montserrat font-semibold uppercase tracking-wide mb-2"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  {stats.jurisdictions.label}
                </div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  {stats.jurisdictions.value}
                </div>
                <div className="text-sm text-gray-600">{stats.jurisdictions.subtext}</div>
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

      {/* Introduction Paragraph */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl leading-relaxed text-gray-700"
          >
            {introduction}
          </motion.p>
        </div>
      </section>




      {/* Mission Statement - Editorial Style */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <h2
                className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
                style={{ color: 'var(--theme-primary)' }}
              >
                {mission.heading}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-6"
            >
              {mission.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <div
                className="p-6 italic text-lg"
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: 'var(--theme-primary-foreground)',
                }}
              >
                "{mission.quote}"
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values - Magazine Layout */}
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
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: 'var(--theme-primary)' }}
            >
              Our Core Values
            </h2>
            <div
              className="w-24 h-1 mx-auto"
              style={{ backgroundColor: 'var(--theme-primary)' }}
            ></div>
          </motion.div>

          <div className="space-y-16">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-12 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                <div className={`lg:col-span-2 ${index % 2 === 1 ? 'lg:col-start-11' : ''}`}>
                  <div
                    className="w-24 h-24 flex items-center justify-center mx-auto lg:mx-0"
                    style={{ backgroundColor: 'var(--theme-primary)' }}
                  >
                    {(() => {
                      const Icon = iconMap[value.iconName]
                      return <Icon className="h-12 w-12" style={{ color: 'var(--theme-primary-foreground)' }} />
                    })()}
                  </div>
                </div>

                <div className={`lg:col-span-10 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <h3
                    className="text-3xl font-bold mb-4"
                    style={{ color: 'var(--theme-primary)' }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Services & Locations - Two Column Editorial */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Service Areas */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-4xl font-bold mb-8"
                style={{ color: 'var(--theme-primary)' }}
              >
                Our Services
              </h2>
              <div className="space-y-4">
                {practiceAreas.map((area, index) => (
                  <motion.div
                    key={area}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4 p-4 border-l-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    style={{ borderColor: 'var(--theme-primary)' }}
                    tabIndex={-1}
                  >
                    <CheckCircle
                      className="h-6 w-6 flex-shrink-0"
                      style={{ color: 'var(--theme-primary)' }}
                    />
                    <span
                      className="font-medium text-lg"
                      style={{ color: 'var(--theme-primary)' }}
                    >
                      {area}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Service Locations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-4xl font-bold mb-8"
                style={{ color: 'var(--theme-primary)' }}
              >
                Where We Serve
              </h2>

              {stateLicenses.length > 0 && (
                <div className="mb-12">
                  <h3
                    className="text-2xl font-bold mb-6"
                    style={{ color: 'var(--theme-primary)' }}
                  >
                    Primary Locations
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {stateLicenses.map((state, index) => (
                      <motion.div
                        key={state}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded"
                        tabIndex={-1}
                      >
                        <MapPin
                          className="h-5 w-5"
                          style={{ color: 'var(--theme-primary)' }}
                        />
                        <span className="font-medium text-gray-700">{state}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {federalJurisdictions.length > 0 && (
                <div>
                  <h3
                    className="text-2xl font-bold mb-6"
                    style={{ color: 'var(--theme-primary)' }}
                  >
                    Additional Coverage
                  </h3>
                  <div className="space-y-2 max-h-80 overflow-y-auto bg-gray-50 p-4 rounded">
                    {federalJurisdictions.map((jurisdiction, index) => (
                      <motion.div
                        key={jurisdiction}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3 py-2"
                        tabIndex={-1}
                      >
                        <CheckCircle
                          className="h-4 w-4 flex-shrink-0"
                          style={{ color: 'var(--theme-primary)' }}
                        />
                        <span className="text-gray-700 text-sm">{jurisdiction}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA - Editorial Style */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
              style={{ color: 'var(--theme-primary)' }}
            >
              {cta.heading}
            </h2>

            <div className="max-w-3xl mx-auto mb-12">
              {cta.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-xl text-gray-700 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}

              <div
                className="p-8 text-xl italic mb-8"
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: 'var(--theme-primary-foreground)',
                }}
              >
                "{cta.quote}"
              </div>
            </div>

            <Button
              variant={null as any}
              size="lg"
              className="font-montserrat font-semibold text-lg px-8 py-4 tracking-wide uppercase rounded-none hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: 'var(--theme-primary)',
                color: 'var(--theme-primary-foreground)',
              }}
              onClick={() => window.location.href = '/contact'}
            >
              {cta.buttonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
