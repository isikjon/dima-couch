'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  onClick?: () => void
  href?: string
  className?: string
}

export default function Button({ children, variant = 'primary', onClick, href, className = '' }: ButtonProps) {
  const base = 'relative inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer select-none rounded-full'

  const styles = {
    primary: `${base} bg-[#c9a84c] text-[#050505] hover:bg-[#d9b85c] shadow-[0_0_30px_rgba(201,168,76,0.25)] hover:shadow-[0_0_50px_rgba(201,168,76,0.4)]`,
    ghost: `${base} border border-white/[0.15] text-[#f0ece6] hover:border-[#c9a84c]/50 hover:text-[#c9a84c] hover:bg-[#c9a84c]/[0.05]`,
  }

  const content = (
    <motion.span
      className={`${styles[variant]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return <a href={href}>{content}</a>
  }

  return content
}
