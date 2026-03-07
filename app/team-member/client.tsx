"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, CheckCircle, MapPin, Scale, Users, Award, BookOpen, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import type { TeamMemberData } from "./data"

interface Props {
  data: TeamMemberData
}

export default function TeamMemberClient({ data }: Props) {
  const { hero, overview, highlights, expertise, credentials, leadership, cta } = data

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-white" id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={hero.imageSrc}
                  alt={hero.imageAlt}
                  width={600}
                  height={750}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
                />
              </div>
            </motion.div>

            {/* Attorney Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="text-sm font-montserrat font-medium tracking-widest uppercase text-gray-500 mb-4">
                {hero.label}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-none text-[#2A2C53] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                {hero.name}
              </h1>
              <div className="text-xl md:text-2xl font-light text-gray-600 mb-8 leading-tight">
                {hero.title}
              </div>

              <div className="bg-gray-50 p-6 border-l-4 border-[#2A2C53] mb-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm font-montserrat font-semibold uppercase tracking-wide text-[#2A2C53] mb-1">
                      {hero.stats.experience.label}
                    </div>
                    <div className="text-xl font-bold text-[#2A2C53]">{hero.stats.experience.value}</div>
                  </div>
                  <div>
                    <div className="text-sm font-montserrat font-semibold uppercase tracking-wide text-[#2A2C53] mb-1">
                      {hero.stats.jurisdictions.label}
                    </div>
                    <div className="text-xl font-bold text-[#2A2C53]">{hero.stats.jurisdictions.value}</div>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-[#2A2C53] hover:bg-[#2A2C53]/90 text-white font-montserrat font-semibold tracking-wide uppercase rounded-none"
                onClick={() => window.location.href = '/contact'}
              >
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2A2C53] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              {overview.sectionTitle}
            </h2>
            <div className="w-24 h-1 bg-[#2A2C53] mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {overview.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed text-gray-700 mb-6">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-[#2A2C53] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Key Highlights
              </h3>
              <div className="space-y-4">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-[#2A2C53] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
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
              {expertise.sectionTitle}
            </h2>
            <div className="w-24 h-1 bg-[#2A2C53] mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-8 rounded-lg"
          >
            {expertise.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-gray-700 mb-6 last:mb-0">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Credentials & Qualifications */}
      <section className="py-20 bg-[#2A2C53] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              {credentials.sectionTitle}
            </h2>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-xl text-white/90 max-w-4xl mx-auto">
              {credentials.description}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Licenses */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                Professional Licenses
              </h3>
              <div className="space-y-4">
                {credentials.licenses.map((license, index) => (
                  <motion.div
                    key={license}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 p-4 bg-white/10 rounded"
                  >
                    <MapPin className="h-5 w-5 text-white flex-shrink-0" />
                    <span className="text-lg font-medium">{license}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                Certifications & Training
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto bg-white/5 p-4 rounded">
                {credentials.certifications.map((cert, index) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 py-2"
                  >
                    <Scale className="h-4 w-4 text-white flex-shrink-0" />
                    <span className="text-white/90">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Note about availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="bg-white/10 p-6 rounded-lg max-w-4xl mx-auto">
              <p className="text-xl text-white/90 italic">
                <strong>Note:</strong> {credentials.note}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership & Community */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#2A2C53] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                {leadership.sectionTitle}
              </h2>

              <div className="space-y-6">
                {leadership.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-[#2A2C53] flex items-center justify-center rounded-full">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2A2C53]">{leadership.highlights.title}</h3>
                    <p className="text-gray-600">{leadership.highlights.subtitle}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {leadership.highlights.items.map((item, index) => {
                    const icons = [Award, BookOpen, Users]
                    const Icon = icons[index] || Award
                    return (
                      <div key={item} className="flex items-start space-x-3">
                        <Icon className="h-5 w-5 text-[#2A2C53] flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#2A2C53] mb-8 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              {cta.title}
            </h2>

            <div className="max-w-3xl mx-auto mb-12">
              {cta.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-xl text-gray-700 leading-relaxed mb-6">
                  {paragraph.includes('<strong>') ? (
                    <span dangerouslySetInnerHTML={{ __html: paragraph }} />
                  ) : (
                    paragraph
                  )}
                </p>
              ))}

              <div className="bg-[#2A2C53] text-white p-8 text-xl italic mb-8">
                "{cta.quote}"
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-[#2A2C53] hover:bg-[#2A2C53]/90 text-white font-montserrat font-semibold text-lg px-8 py-4 tracking-wide uppercase rounded-none"
                onClick={() => window.location.href = '/contact'}
              >
                {cta.buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="flex items-center space-x-2 text-[#2A2C53]">
                <Phone className="h-5 w-5" />
                <span className="font-semibold">{cta.phoneNumber}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
