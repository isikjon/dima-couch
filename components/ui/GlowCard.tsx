'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlowCardProps {
  children: ReactNode
  className?: string
  gold?: boolean
  glowColor?: string
}

export default function GlowCard({ children, className = '', gold = false, glowColor }: GlowCardProps) {
  const defaultGlow = gold ? 'rgba(201,168,76,0.2)' : glowColor ?? 'rgba(124,58,237,0.12)'
  const hoverGlow = gold ? 'rgba(201,168,76,0.35)' : glowColor?.replace(/[\d.]+\)$/, '0.25)') ?? 'rgba(124,58,237,0.22)'

  return (
    <motion.div
      className={`relative rounded-2xl border transition-colors duration-500 cursor-default overflow-hidden ${
        gold
          ? 'border-[#c9a84c]/20 bg-[rgba(201,168,76,0.04)]'
          : 'border-white/[0.07] bg-white/[0.025]'
      } backdrop-blur-sm ${className}`}
      whileHover={{
        scale: 1.02,
        borderColor: gold ? 'rgba(201,168,76,0.5)' : 'rgba(124,58,237,0.4)',
        boxShadow: `0 0 50px ${hoverGlow}, inset 0 0 30px ${defaultGlow.replace(/[\d.]+\)$/, '0.04)')}`,
        y: -4,
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Subtle inner gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${defaultGlow.replace(/[\d.]+\)$/, '0.06)')}, transparent 60%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
