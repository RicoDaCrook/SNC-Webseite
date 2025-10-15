'use client'

import { useEffect } from 'react'
import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric.rating)
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      // You can send to your analytics service here
      // Example: window.gtag?.('event', metric.name, { value: metric.value })

      // For now, we'll use console.log for tracking
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      })

      // Could send to analytics endpoint
      // fetch('/api/analytics', { method: 'POST', body })

      // Visual indicator for good/needs-improvement/poor
      if (metric.rating === 'poor') {
        console.warn(`⚠️ [Web Vitals] ${metric.name}: ${metric.value} (POOR)`)
      } else if (metric.rating === 'needs-improvement') {
        console.warn(`⚡ [Web Vitals] ${metric.name}: ${metric.value} (NEEDS IMPROVEMENT)`)
      } else {
        console.log(`✅ [Web Vitals] ${metric.name}: ${metric.value} (GOOD)`)
      }
    }
  })

  return null
}

// Performance monitoring component that can be used in layout
export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor performance marks
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Log navigation timing
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = window.performance.timing
          const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
          const connectTime = perfData.responseEnd - perfData.requestStart
          const renderTime = perfData.domComplete - perfData.domLoading

          console.log('📊 Performance Metrics:')
          console.log(`  Page Load Time: ${pageLoadTime}ms`)
          console.log(`  Server Response: ${connectTime}ms`)
          console.log(`  DOM Render: ${renderTime}ms`)

          // Check Core Web Vitals thresholds
          if (pageLoadTime > 2500) {
            console.warn('⚠️ Page load time exceeds 2.5s target')
          }
        }, 0)
      })
    }
  }, [])

  return null
}
