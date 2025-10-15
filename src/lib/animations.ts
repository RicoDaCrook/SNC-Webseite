import { Variants } from 'framer-motion'

// Button Hover Animation
export const buttonHover = {
  scale: 1.05,
  transition: { type: 'spring', stiffness: 400, damping: 10 }
}

export const buttonTap = {
  scale: 0.95
}

// Card Tilt 3D Effect
export const cardTilt = {
  rotateX: 2,
  rotateY: 2,
  scale: 1.02,
  transition: { type: 'spring', stiffness: 300 }
}

// Page Transition Variants
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
}

// Fade In Animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

// Slide Up Animation
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

// Stagger Container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Icon Animations
export const iconAnimations = {
  phone: {
    rotate: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 }
  },
  mail: {
    y: [0, -5, 0],
    transition: { duration: 0.3, repeat: 2 }
  },
  download: {
    y: [0, 5, 0],
    transition: { duration: 0.5, repeat: 2 }
  },
  check: {
    rotate: [0, 360],
    transition: { duration: 0.5 }
  }
}

// Ripple Effect for Buttons
export function createRipple(event: React.MouseEvent<HTMLElement>) {
  const button = event.currentTarget
  const circle = document.createElement('span')
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2

  const rect = button.getBoundingClientRect()
  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - rect.left - radius}px`
  circle.style.top = `${event.clientY - rect.top - radius}px`
  circle.classList.add('ripple')

  const ripple = button.getElementsByClassName('ripple')[0]
  if (ripple) {
    ripple.remove()
  }

  button.appendChild(circle)
}

// Skeleton Pulse Animation
export const skeletonPulse = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'easeInOut'
    }
  }
}
