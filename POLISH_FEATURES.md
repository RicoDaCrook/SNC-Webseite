# 🎨 Polish & Micro-Interactions - Usage Guide

Alle implementierten Features und wie man sie verwendet.

---

## 1️⃣ BUTTON HOVER EFFECTS

### Verwendung der PolishedButton Component:

```tsx
import { PolishedButton } from '@/components/PolishedUI'

// Primary Button (gelb)
<PolishedButton variant="primary">
  Jetzt anrufen
</PolishedButton>

// Secondary Button (dunkel)
<PolishedButton variant="secondary">
  Mehr erfahren
</PolishedButton>

// Ghost Button (transparent mit Border)
<PolishedButton variant="ghost">
  Abbrechen
</PolishedButton>
```

**Features:**
- ✅ Scale 1.05 bei Hover
- ✅ Ripple Effect bei Click
- ✅ Shadow-Glow beim Hover
- ✅ Smooth Transitions

---

## 2️⃣ CARD TILT (3D-Effekt)

### TiltCard Component:

```tsx
import { TiltCard } from '@/components/PolishedUI'

<TiltCard>
  <h3>Überschrift</h3>
  <p>Inhalt der Karte</p>
</TiltCard>
```

**Features:**
- ✅ rotateX: 2
- ✅ rotateY: 2
- ✅ scale: 1.02
- ✅ preserve-3d

---

## 3️⃣ PAGE TRANSITIONS

### PageTransition Wrapper:

```tsx
import { PageTransition } from '@/components/PolishedUI'

export default function MyPage() {
  return (
    <PageTransition>
      <div>Seiteninhalt</div>
    </PageTransition>
  )
}
```

**Features:**
- ✅ Fade In/Out
- ✅ Slide Up/Down
- ✅ 300ms Duration

---

## 4️⃣ LOADING SKELETONS

### Skeleton Components:

```tsx
import { Skeleton, SkeletonCard } from '@/components/PolishedUI'

// Einzelnes Skeleton
<Skeleton width="w-full" height="h-4" />

// Komplette Skeleton Card
<SkeletonCard />
```

**Features:**
- ✅ Pulse Animation
- ✅ Shimmer Effect
- ✅ Customizable Width/Height

---

## 5️⃣ TOAST NOTIFICATIONS

### useToast Hook:

```tsx
'use client'

import { useToast } from '@/components/Toast'

export default function MyComponent() {
  const { showToast } = useToast()

  const handleSuccess = () => {
    showToast('success', 'Erfolgreich gespeichert!', 3000)
  }

  const handleError = () => {
    showToast('error', 'Fehler beim Speichern!', 3000)
  }

  const handleInfo = () => {
    showToast('info', 'Information für Sie', 3000)
  }

  return (
    <div>
      <button onClick={handleSuccess}>Success Toast</button>
      <button onClick={handleError}>Error Toast</button>
      <button onClick={handleInfo}>Info Toast</button>
    </div>
  )
}
```

**Features:**
- ✅ Success/Error/Info Types
- ✅ Auto-dismiss nach X Sekunden
- ✅ Progress Bar
- ✅ Slide-In Animation von rechts oben
- ✅ Icon Animation (rotate)

---

## 6️⃣ ANIMATED ICONS

### Verwendung mit Animation Utilities:

```tsx
import { motion } from 'framer-motion'
import { Phone, Mail, Download, CheckCircle } from 'lucide-react'
import { iconAnimations } from '@/lib/animations'

// Phone Icon - Schütteln bei Hover
<motion.div whileHover={iconAnimations.phone}>
  <Phone className="w-6 h-6" />
</motion.div>

// Mail Icon - Bounce bei Hover
<motion.div whileHover={iconAnimations.mail}>
  <Mail className="w-6 h-6" />
</motion.div>

// Download Icon - Rauf/Runter bei Hover
<motion.div whileHover={iconAnimations.download}>
  <Download className="w-6 h-6" />
</motion.div>

// Check Icon - Rotate bei Hover
<motion.div whileHover={iconAnimations.check}>
  <CheckCircle className="w-6 h-6" />
</motion.div>
```

---

## 7️⃣ SMOOTH SCROLL

**Automatisch aktiv!** Alle Anchor-Links scrollen smooth:

```tsx
<a href="#prozess">Zum Prozess</a>
<a href="#kontakt">Zum Kontakt</a>
```

CSS in `globals.css`:
```css
html {
  scroll-behavior: smooth;
}
```

---

## 8️⃣ INPUT FOCUS EFFECTS

### Normale Inputs (automatisch):

Alle `input`, `textarea`, `select` bekommen automatisch:
- ✅ Border-Glow bei Focus (gelb)
- ✅ Smooth Transition

### Enhanced Input mit Floating Label:

```tsx
import { EnhancedInput } from '@/components/PolishedUI'

<EnhancedInput
  label="Ihre E-Mail"
  type="email"
  placeholder=" "
/>
```

**Features:**
- ✅ Label bewegt sich nach oben bei Focus
- ✅ Border-Glow
- ✅ Placeholder fade-in

---

## 🎯 UTILITY FUNCTIONS

### Animation Utilities (`lib/animations.ts`):

```tsx
import {
  buttonHover,
  buttonTap,
  cardTilt,
  createRipple,
  fadeIn,
  slideUp,
  staggerContainer
} from '@/lib/animations'

// Verwendung mit framer-motion
<motion.div
  whileHover={buttonHover}
  whileTap={buttonTap}
>
  Button
</motion.div>
```

### CSS Classes in `globals.css`:

```tsx
// Shadow Glow
<button className="shadow-glow">Button</button>
<button className="shadow-glow-lg">Button Large Glow</button>

// Skeleton
<div className="skeleton w-full h-4 rounded" />

// Ripple Container
<button className="relative overflow-hidden" onClick={createRipple}>
  Click me
</button>
```

---

## 📋 VOLLSTÄNDIGE FEATURE-LISTE:

✅ Button Hover Effects (Scale, Glow, Ripple)
✅ Card Tilt 3D Effects
✅ Page Transitions (Fade, Slide)
✅ Loading Skeletons (Pulse, Shimmer)
✅ Toast Notifications (Success/Error/Info)
✅ Animated Icons (Phone, Mail, Download, Check)
✅ Smooth Scroll (Anchor Links)
✅ Input Focus Effects (Border-Glow, Floating Labels)
✅ Custom Scrollbar (gelber Thumb bei Hover)
✅ Ripple Effects bei Button Clicks

---

## 🚀 ALLE FEATURES AKTIV!

Alle Features sind **global** auf allen Seiten verfügbar:
- Homepage (/)
- Rechner (/rechner)
- Über SNC (/ueber-snc)
- FAQ (/faq)
- Alle weiteren Seiten

---

## 📁 DATEIEN:

- `src/lib/animations.ts` - Animation Utilities
- `src/components/Toast.tsx` - Toast System
- `src/components/PolishedUI.tsx` - Polished Components
- `src/components/LayoutClient.tsx` - Layout mit ToastProvider
- `src/app/globals.css` - CSS Utilities
- `POLISH_FEATURES.md` - Diese Dokumentation

---

## 💡 BEISPIEL - Komplette Verwendung:

```tsx
'use client'

import { PageTransition } from '@/components/PolishedUI'
import { PolishedButton } from '@/components/PolishedUI'
import { TiltCard } from '@/components/PolishedUI'
import { useToast } from '@/components/Toast'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { iconAnimations } from '@/lib/animations'

export default function ExamplePage() {
  const { showToast } = useToast()

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1>Beispiel Seite</h1>

        {/* Tilt Card */}
        <TiltCard>
          <h2>3D Card</h2>
          <p>Hover über mich für Tilt-Effekt!</p>
        </TiltCard>

        {/* Polished Button */}
        <PolishedButton
          variant="primary"
          onClick={() => showToast('success', 'Button geklickt!')}
        >
          <motion.span whileHover={iconAnimations.phone}>
            <Phone className="w-5 h-5 inline mr-2" />
          </motion.span>
          Anrufen
        </PolishedButton>

        {/* Enhanced Input */}
        <EnhancedInput label="Ihre E-Mail" type="email" />
      </div>
    </PageTransition>
  )
}
```

Fertig! Alle Micro-Interactions sind implementiert und ready-to-use! 🎉
