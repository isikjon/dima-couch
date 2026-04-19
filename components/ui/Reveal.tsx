'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'

const easeExp = [0.16, 1, 0.3, 1]

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade' | 'blur'

interface RevealProps extends Omit<MotionProps, 'children'> {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
  duration?: number
  className?: string
  as?: 'div' | 'span' | 'li' | 'p' | 'h2' | 'h3'
  amount?: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const variants: Record<RevealVariant, { hidden: any; visible: any }> = {
  up: {
    hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  down: {
    hidden: { opacity: 0, y: -40, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  left: {
    hidden: { opacity: 0, x: -60, filter: 'blur(6px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  right: {
    hidden: { opacity: 0, x: 60, filter: 'blur(6px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.88, filter: 'blur(6px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(16px)', scale: 0.96 },
    visible: { opacity: 1, filter: 'blur(0px)', scale: 1 },
  },
}

export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.75,
  className,
  as = 'div',
  amount = 0.15,
  ...rest
}: RevealProps) {
  const Tag = motion[as] as typeof motion.div

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: variants[variant].hidden,
        visible: {
          ...variants[variant].visible,
          transition: {
            duration,
            delay,
            ease: easeExp,
          },
        },
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ── Staggered group — wraps children and staggers their reveal ── */
interface RevealGroupProps {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  as?: 'div' | 'ul' | 'section'
  amount?: number
}

export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  delay = 0,
  as = 'div',
  amount = 0.1,
}: RevealGroupProps) {
  const Tag = motion[as] as typeof motion.div

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </Tag>
  )
}

/* ── Single item to use INSIDE RevealGroup ── */
interface RevealItemProps {
  children: ReactNode
  className?: string
  variant?: RevealVariant
  duration?: number
  as?: 'div' | 'span' | 'li' | 'p' | 'h2' | 'h3'
}

export function RevealItem({
  children,
  className,
  variant = 'up',
  duration = 0.7,
  as = 'div',
}: RevealItemProps) {
  const Tag = motion[as] as typeof motion.div

  return (
    <Tag
      className={className}
      variants={{
        hidden: variants[variant].hidden,
        visible: {
          ...variants[variant].visible,
          transition: { duration, ease: easeExp },
        },
      }}
    >
      {children}
    </Tag>
  )
}
