'use client'

import { motion } from 'framer-motion'
import { buttonHover, buttonTap, cardTilt, createRipple } from '@/lib/animations'
import { ReactNode, ButtonHTMLAttributes } from 'react'

// Enhanced Button with all effects
interface PolishedButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>,
  'onAnimationStart' | 'onAnimationEnd' | 'onDragStart' | 'onDragEnd' | 'onDrag'
> {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: ReactNode
  className?: string
}

export function PolishedButton({
  variant = 'primary',
  children,
  className = '',
  onClick,
  ...props
}: PolishedButtonProps) {
  const baseStyles = 'relative overflow-hidden font-semibold rounded-xl px-6 py-3 transition-all cursor-pointer'

  const variants = {
    primary: 'bg-snc-yellow text-snc-dark hover:shadow-glow-lg',
    secondary: 'bg-snc-dark text-white hover:bg-snc-dark-2 hover:shadow-glow',
    ghost: 'bg-transparent border-2 border-snc-yellow text-snc-yellow hover:bg-snc-yellow/10'
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e)
    onClick?.(e)
  }

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={buttonHover}
      whileTap={buttonTap}
      onClick={handleClick}
      {...props}
    >
      {children}
    </motion.button>
  )
}

// 3D Tilt Card
interface TiltCardProps {
  children: ReactNode
  className?: string
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
  return (
    <motion.div
      className={`bg-white rounded-2xl p-6 shadow-lg ${className}`}
      whileHover={cardTilt}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

// Skeleton Loader
export function Skeleton({ className = '', width = 'w-full', height = 'h-4' }: {
  className?: string
  width?: string
  height?: string
}) {
  return (
    <div className={`skeleton rounded ${width} ${height} ${className}`} />
  )
}

// Skeleton Card
export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <Skeleton width="w-12" height="h-12" className="rounded-full mb-4" />
      <Skeleton width="w-3/4" height="h-6" className="mb-3" />
      <Skeleton width="w-full" height="h-4" className="mb-2" />
      <Skeleton width="w-5/6" height="h-4" />
    </div>
  )
}

// Animated Link
interface AnimatedLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export function AnimatedLink({ href, children, className = '' }: AnimatedLinkProps) {
  return (
    <motion.a
      href={href}
      className={`inline-block ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  )
}

// Enhanced Input with floating label
interface EnhancedInputProps {
  label: string
  type?: string
  placeholder?: string
  className?: string
}

export function EnhancedInput({
  label,
  type = 'text',
  placeholder = ' ',
  className = ''
}: EnhancedInputProps) {
  return (
    <div className="input-group">
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all ${className}`}
      />
      <label>{label}</label>
    </div>
  )
}

// Page Wrapper with transition
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
