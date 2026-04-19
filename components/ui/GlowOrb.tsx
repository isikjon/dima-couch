'use client'

import { motion } from 'framer-motion'

interface GlowOrbProps {
  size?: number
  color?: string
  className?: string
  duration?: number
  delay?: number
}

export default function GlowOrb({
  size = 400,
  color = 'rgba(201,168,76,0.12)',
  className = '',
  duration = 7,
  delay = 0,
}: GlowOrbProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={`absolute rounded-full pointer-events-none select-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(40px)',
      }}
      animate={{ y: [0, -30, 0], scale: [1, 1.06, 1] }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
        delay,
      }}
    />
  )
}
