'use client'

import dynamic from 'next/dynamic'
import { ScrollProgress, BackToTop } from './InteractiveFeatures'
import { ToastProvider } from './Toast'

// Dynamic imports for non-critical components (improves initial load)
const ExitIntentPopup = dynamic(() => import('./ExitIntentPopup'), {
  ssr: false,
  loading: () => null
})

const CookieBanner = dynamic(() => import('./CookieBanner'), {
  ssr: false,
  loading: () => null
})

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Main Content */}
      {children}

      {/* Interactive Features - Loaded dynamically */}
      <ExitIntentPopup />
      <CookieBanner />
      <BackToTop />
    </ToastProvider>
  )
}
