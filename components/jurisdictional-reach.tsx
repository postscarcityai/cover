"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps"
import { MapPin } from 'lucide-react'
import { siteConfig } from "@/site.config"

interface ServiceLocation {
  name: string
  code: string
}

interface ServicePoint {
  name: string
  coordinates: [number, number]
  state: string
}

interface JurisdictionalReachProps {
  className?: string
}

// US TopoJSON URL that actually works
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

export function JurisdictionalReach({ className = "" }: JurisdictionalReachProps) {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [themeColor, setThemeColor] = useState("#E87722")

  // Get theme color from CSS variable
  useEffect(() => {
    const color = getComputedStyle(document.documentElement).getPropertyValue('--theme-primary').trim()
    if (color) {
      setThemeColor(color)
    }
  }, [])

  // Service areas from config - customize for each client
  const serviceStates: ServiceLocation[] = siteConfig.serviceLocations?.states || [
    { name: "California", code: "CA" },
    { name: "Texas", code: "TX" },
    { name: "New York", code: "NY" },
    { name: "Florida", code: "FL" }
  ]

  const servicePoints: ServicePoint[] = siteConfig.serviceLocations?.points || []

  const serviceStateCodes = serviceStates.map(state => state.code)

  return (
    <section className={`py-20 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: 'var(--theme-primary)' }}
            >
              {siteConfig.serviceLocations?.title || "Our Service Areas"}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {siteConfig.serviceLocations?.description || "We proudly serve clients across multiple regions."}
            </p>

            {/* All Service Locations as Pills */}
            <div className="mb-8">
              <h3
                className="text-xl font-semibold mb-6"
                style={{ color: 'var(--theme-primary)' }}
              >
                {siteConfig.serviceLocations?.subtitle || "Where We Serve"}
              </h3>

              {/* States Section */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-600 mb-3 uppercase tracking-wide">
                  Service States
                </h4>
                <div className="flex flex-wrap gap-2">
                  {serviceStates.map((state, index) => (
                <motion.div
                      key={state.code}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200 ${
                        selectedState === state.code
                          ? 'ring-2 ring-offset-2'
                          : 'hover:opacity-90'
                      }`}
                      style={{
                        backgroundColor: selectedState === state.code ? '#16a34a' : 'var(--theme-primary)',
                        color: 'var(--theme-primary-foreground)',
                        ringColor: selectedState === state.code ? '#16a34a' : undefined
                      }}
                      onClick={() => setSelectedState(selectedState === state.code ? null : state.code)}
                      tabIndex={-1}
                    >
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{state.name}</span>
                      </span>
                    </motion.div>
                  ))}
                </div>
                  </div>

              {/* Service Points Section */}
              {servicePoints.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-3 uppercase tracking-wide">
                    Key Locations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {servicePoints.map((point, index) => (
                      <motion.div
                        key={point.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.02 }}
                        viewport={{ once: true }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-200 ${
                          selectedPoint === point.name
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setSelectedPoint(selectedPoint === point.name ? null : point.name)}
                        tabIndex={-1}
                      >
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span>{point.name}</span>
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="p-6 rounded-lg shadow-lg"
              style={{ backgroundColor: 'var(--theme-primary)' }}
            >
              <h3
                className="text-lg font-semibold mb-4 text-center"
                style={{ color: 'var(--theme-primary-foreground)' }}
              >
                {siteConfig.serviceLocations?.mapTitle || "Service Coverage Map"}
              </h3>
              <div className="bg-white rounded-lg p-4">
                <div className="w-full" style={{ maxHeight: '500px' }}>
                  <ComposableMap
                    projection="geoAlbersUsa"
                    projectionConfig={{
                      scale: 1000,
                    }}
                    width={800}
                    height={500}
                    className="w-full h-full"
                  >
                    <Geographies geography={geoUrl}>
                      {({ geographies }) => {
                        // Sort geographies to render licensed states last (on top)
                        const sortedGeographies = [...geographies].sort((a, b) => {
                          const aStateName = a.properties?.NAME || a.properties?.name || ""
                          const bStateName = b.properties?.NAME || b.properties?.name || ""
                          
                          // Map state names to codes dynamically
                          const getStateCode = (name: string) => {
                            const stateMap: Record<string, string> = {
                              "California": "CA", "Texas": "TX", "New York": "NY", "Florida": "FL",
                              "Illinois": "IL", "Pennsylvania": "PA", "Ohio": "OH", "Georgia": "GA",
                              "North Carolina": "NC", "Michigan": "MI", "New Jersey": "NJ",
                              "District of Columbia": "DC", "Washington, D.C.": "DC"
                            }
                            return stateMap[name] || null
                          }

                          const aStateCode = getStateCode(aStateName)
                          const bStateCode = getStateCode(bStateName)

                          const aIsService = aStateCode !== null && serviceStateCodes.includes(aStateCode)
                          const bIsService = bStateCode !== null && serviceStateCodes.includes(bStateCode)

                          // Selected state comes last (highest)
                          if (aStateCode === selectedState) return 1
                          if (bStateCode === selectedState) return -1

                          // Service states come after non-service states
                          if (aIsService && !bIsService) return 1
                          if (!aIsService && bIsService) return -1
                          
                          return 0
                        })
                        
                        return sortedGeographies.map((geo) => {
                          // Map state names to codes - check multiple possible property names
                          const stateName = geo.properties?.NAME || geo.properties?.name || ""

                          // Use the same getStateCode function
                          const getStateCode = (name: string) => {
                            const stateMap: Record<string, string> = {
                              "California": "CA", "Texas": "TX", "New York": "NY", "Florida": "FL",
                              "Illinois": "IL", "Pennsylvania": "PA", "Ohio": "OH", "Georgia": "GA",
                              "North Carolina": "NC", "Michigan": "MI", "New Jersey": "NJ",
                              "District of Columbia": "DC", "Washington, D.C.": "DC"
                            }
                            return stateMap[name] || null
                          }

                          const stateCode = getStateCode(stateName)
                          const isServiceState = stateCode !== null && serviceStateCodes.includes(stateCode)
                          const isSelected = stateCode !== null && selectedState === stateCode

                          return (
                            <g key={geo.rsmKey}>
                              <Geography
                                geography={geo}
                                onClick={() => {
                                  if (isServiceState) {
                                    setSelectedState(selectedState === stateCode ? null : stateCode)
                                  }
                                }}
                                tabIndex={-1}
                                style={{
                                  default: {
                                    fill: isSelected ? "#16a34a" : (isServiceState ? themeColor : "#F5F5F5"),
                                    stroke: themeColor,
                                    strokeWidth: 0.5,
                                    outline: "none",
                                    cursor: isServiceState ? "pointer" : "default",
                                  },
                                  hover: {
                                    fill: isSelected ? "#16a34a" : (isServiceState ? themeColor : "#F5F5F5"),
                                    stroke: themeColor,
                                    strokeWidth: 1,
                                    outline: "none",
                                    cursor: isServiceState ? "pointer" : "default",
                                  },
                                  pressed: {
                                    fill: isSelected ? "#16a34a" : (isServiceState ? themeColor : "#F5F5F5"),
                                    stroke: themeColor,
                                    strokeWidth: 1,
                                    outline: "none",
                                  },
                                }}
                              />

                            </g>
                          )
                        })
                      }}
                    </Geographies>
                    
                    {/* State Labels for Selected States */}
                    {selectedState && (
                      <Marker
                        coordinates={(() => {
                          const statePositions: Record<string, [number, number]> = {
                            "CA": [-119.5, 37], "TX": [-99, 31], "NY": [-75, 43], "FL": [-82, 27.5],
                            "IL": [-89, 40], "PA": [-77.5, 41], "OH": [-82.5, 40.5], "GA": [-83.5, 32.5],
                            "NC": [-79.5, 35.5], "MI": [-85, 44.5], "NJ": [-74.5, 40.2], "DC": [-77, 38.9]
                          }
                          return statePositions[selectedState] || [0, 0]
                        })()}
                      >
                        <text
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-sm font-semibold fill-white"
                          style={{
                            pointerEvents: "none",
                            textShadow: "0 0 3px #16a34a, 0 0 3px #16a34a, 0 0 3px #16a34a"
                          }}
                        >
                          {serviceStates.find(s => s.code === selectedState)?.name || ""}
                        </text>
                      </Marker>
                    )}

                    {/* Service Point Markers */}
                    {servicePoints.map((point) => (
                      <Marker
                        key={point.name}
                        coordinates={point.coordinates}
                        onClick={() => setSelectedPoint(selectedPoint === point.name ? null : point.name)}
                        tabIndex={-1}
                      >
                        <circle
                          r={selectedPoint === point.name ? 6 : 4}
                          fill={selectedPoint === point.name ? "#16a34a" : themeColor}
                          stroke="#ffffff"
                          strokeWidth={2}
                          className="cursor-pointer transition-all duration-200"
                        />
                        {selectedPoint === point.name && (
                          <text
                            textAnchor="middle"
                            y={-15}
                            className="text-sm font-semibold fill-[#16a34a]"
                            style={{
                              pointerEvents: "none",
                              textShadow: "0 0 3px white, 0 0 3px white, 0 0 3px white"
                            }}
                          >
                            {point.name}
                          </text>
                        )}
                      </Marker>
                    ))}
                  </ComposableMap>
                </div>
                
                {/* Map Legend */}
                <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: themeColor }}
                    ></div>
                    <span className="text-gray-700">Service States</span>
                  </div>
                  {servicePoints.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full border-2 border-white"
                        style={{ backgroundColor: themeColor }}
                      ></div>
                      <span className="text-gray-700">Key Locations</span>
                    </div>
                  )}
                </div>

                {/* Service Area Caption */}
                {siteConfig.serviceLocations?.caption && (
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 italic">
                      {siteConfig.serviceLocations.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
