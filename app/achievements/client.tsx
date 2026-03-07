"use client"

import { motion } from "framer-motion"
import { Scale, CheckCircle, Calendar, MapPin, Gavel, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { usePageTracking, useScrollTracking } from "@/lib/analytics-hooks"
import type { ResultsData } from "./data"

interface Props {
  data: ResultsData
}

export default function ResultsClient({ data }: Props) {
  const { hero, stats, featuredResults, additionalResults, testimonial, cta } = data

  // Track page view once on mount
  usePageTracking('Results', 'social_proof', 'results_page')
  
  // Track scroll depth milestones
  useScrollTracking()

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Editorial Results Overview */}
      <section className="relative pt-24 pb-16 bg-white overflow-hidden">
        {/* Background Line Art */}
        <div
          className="absolute top-0 right-0 w-3/5 h-3/5 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url('/img/amc-line-art-1.svg')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top right'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main content - two column layout */}
          <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
            {/* Left column - main content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-8"
            >
              <div className="text-sm font-montserrat font-medium tracking-widest uppercase text-gray-500 mb-6">
                Results
              </div>
              <h1 className="text-6xl md:text-8xl font-bold leading-none text-[#2A2C53] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                {hero.title}
              </h1>
              <div className="text-3xl md:text-4xl font-light text-gray-600 mb-8 leading-tight">
                {hero.subtitle}
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {hero.description}
              </p>
            </motion.div>

            {/* Right column - empty */}
            <div className="lg:col-span-4">
              {/* Empty space for future content or visual balance */}
            </div>
          </div>

          {/* Three boxes across the bottom */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 border-l-4 border-[#2A2C53]"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Scale className="h-6 w-6 text-[#2A2C53]" />
                <div>
                  <div className="text-sm font-montserrat font-semibold uppercase tracking-wide text-[#2A2C53] mb-1">
                    {stats.federal.label}
                  </div>
                  <div className="text-2xl font-bold text-[#2A2C53]">{stats.federal.title}</div>
                </div>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                {stats.federal.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 border-l-4 border-[#2A2C53]"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Gavel className="h-6 w-6 text-[#2A2C53]" />
                <div>
                  <div className="text-sm font-montserrat font-semibold uppercase tracking-wide text-[#2A2C53] mb-1">
                    {stats.state.label}
                  </div>
                  <div className="text-2xl font-bold text-[#2A2C53]">{stats.state.title}</div>
                </div>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                {stats.state.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 border-l-4 border-[#2A2C53]"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-6 w-6 text-[#2A2C53]" />
                <div>
                  <div className="text-sm font-montserrat font-semibold uppercase tracking-wide text-[#2A2C53] mb-1">
                    {stats.postConviction.label}
                  </div>
                  <div className="text-2xl font-bold text-[#2A2C53]">{stats.postConviction.title}</div>
                </div>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                {stats.postConviction.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Case Results */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {featuredResults.map((result, index) => (
              <div key={result.id} id={result.id} className="scroll-mt-24">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="grid lg:grid-cols-12 gap-12 items-center"
                >
                  {/* Case Details - Always on Left */}
                  <div className="lg:col-span-5">
                    <div className="bg-white p-8 border-l-4 border-[#2A2C53] shadow-lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <Gavel className="h-6 w-6 text-[#2A2C53]" />
                        <h3 className="text-2xl font-bold text-[#2A2C53]" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {result.title}
                        </h3>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div>
                          <span className="font-semibold text-gray-700">Charge: </span>
                          <span className="text-gray-600">{result.charge}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{result.jurisdiction}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{result.date}</span>
                        </div>
                      </div>

                      <div className="bg-red-50 p-4 rounded-lg mb-4">
                        <div className="font-semibold text-red-800 mb-2">Worst Case Scenario:</div>
                        <div className="text-red-700">{result.worstCase}</div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="font-semibold text-green-800 mb-2">Actual Results:</div>
                        <div className="text-green-700 font-medium">{result.actualResults}</div>
                      </div>
                    </div>
                  </div>

                  {/* Case Story - Always on Right */}
                  <div className="lg:col-span-7">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-bold text-[#2A2C53] mb-3">Arrested For:</h4>
                        <p className="text-gray-700 leading-relaxed">{result.arrestedFor}</p>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-[#2A2C53] mb-3">What Was Done:</h4>
                        <p className="text-gray-700 leading-relaxed">{result.whatWasDone}</p>
                      </div>

                      <div className="bg-[#2A2C53] text-white p-6 rounded-lg">
                        <h4 className="text-lg font-bold mb-3 flex items-center">
                          <Shield className="h-5 w-5 mr-2" />
                          Unique Approach:
                        </h4>
                        <p className="leading-relaxed">{result.uniqueApproach}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Horizontal Rule - Only show between cases, not after the last one */}
                {index < featuredResults.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center my-16"
                  >
                    <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-[#2A2C53] to-transparent opacity-30"></div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Results Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2A2C53] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              More Successful Outcomes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive view of our track record across federal and state courts
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalResults.map((result, index) => (
              <motion.div
                key={result.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 border-l-4 border-[#2A2C53] hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-[#2A2C53] mb-2">{result.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{result.charge}</p>
                  </div>
                  <span className="bg-[#2A2C53] text-white text-xs px-2 py-1 rounded">
                    {result.category}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-green-700">{result.result}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-[#2A2C53] text-white p-12 rounded-lg">
              <div className="text-6xl font-bold mb-6 opacity-20">"</div>
              <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                {testimonial.quote}
              </blockquote>
              <div className="text-lg font-medium">
                {testimonial.author}
              </div>
              <div className="text-white/70">
                {testimonial.title}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-purple-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              {cta.title}
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {cta.description}
            </p>
            <Button
              size="lg"
              className="bg-purple-accent-700 hover:bg-purple-accent-800 text-white font-semibold font-montserrat tracking-wide uppercase px-8 py-4 rounded-none"
              onClick={() => window.location.href = '/contact'}
            >
              {cta.buttonText}
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
