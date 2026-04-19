'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { staggerContainer } from '@/lib/motion'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  delay?: number
  style?: React.CSSProperties
}

export default function SectionWrapper({ children, className = '', id, delay = 0, style }: SectionWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      style={style}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.section>
  )
}
