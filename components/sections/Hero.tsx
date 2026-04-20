'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Button from '@/components/ui/Button'
import EditableText from '@/components/editor/EditableText'
import EditableLink from '@/components/editor/EditableLink'
import { useEdit } from '@/contexts/EditContext'

/* ─── individual letter reveal ─── */
function SplitText({
  text,
  className,
  delay = 0,
  gradient = false,
}: {
  text: string
  className?: string
  delay?: number
  gradient?: boolean
}) {
  const gradientStyle = gradient
    ? {
        background: 'linear-gradient(90deg, #c9a84c, #e8c870, #f5a623)',
        WebkitBackgroundClip: 'text' as const,
        WebkitTextFillColor: 'transparent' as const,
        backgroundClip: 'text' as const,
      }
    : {}

  return (
    <span
      className={`inline-block overflow-hidden ${className ?? ''}`}
      aria-label={text}
      style={gradientStyle}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{
            duration: 0.65,
            delay: delay + i * 0.035,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

/* ─── animated counter ─── */
function Counter({ value, delay }: { value: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {value}
    </motion.span>
  )
}

export default function Hero() {
  const { isEditing, getContent } = useEdit()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 25 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 25 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 40)
      mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 40)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [mouseX, mouseY])

  const line1a = getContent('hero.line1a', 'Думайте')
  const line1b = getContent('hero.line1b', 'иначе.')
  const line2a = getContent('hero.line2a', 'Действуйте')
  const line2b = getContent('hero.line2b', 'иначе.')

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* ── Aurora animated background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Animated aurora blobs */}
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, rgba(109,40,217,0.08) 40%, transparent 70%)',
            filter: 'blur(80px)',
            x: smoothX,
            y: smoothY,
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.20) 0%, rgba(180,120,40,0.07) 45%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
        <motion.div
          className="absolute top-[30%] right-[-5%] w-[40vw] h-[40vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(29,78,216,0.06) 50%, transparent 70%)',
            filter: 'blur(70px)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        <motion.div
          className="absolute top-[10%] right-[25%] w-[25vw] h-[25vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }}
          animate={{ y: [0, -30, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #c9a84c 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Animated horizontal scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), rgba(124,58,237,0.3), transparent)',
          }}
          initial={{ top: '-2px', opacity: 0 }}
          animate={{ top: ['0%', '100%'], opacity: [0, 0.6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: 2 }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: '70px' }}
          className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/[0.06]"
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]"
            animate={{
              opacity: [1, 0.2, 1],
              scale: [1, 1.6, 1],
              boxShadow: ['0 0 0px #c9a84c', '0 0 8px #c9a84c', '0 0 0px #c9a84c'],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <EditableText
            id="hero.badge"
            defaultValue="Личный коуч · Бизнес-коуч"
            className="text-[11px] font-medium tracking-[0.22em] text-[#c9a84c]/80 uppercase"
          />
        </motion.div>

        {/* Main headline */}
        <h1 className="font-display leading-[1.0] tracking-tight mb-6" style={{ letterSpacing: '-0.01em' }}>
          {isEditing ? (
            /* Edit mode: simple editable lines */
            <div className="space-y-2 text-center">
              <div className="flex items-baseline justify-center gap-4">
                <EditableText id="hero.line1a" defaultValue="Думайте" className="text-[#f0ece6] text-[clamp(36px,5.5vw,72px)]" tag="span" />
                <EditableText id="hero.line1b" defaultValue="иначе." tag="span"
                  className="italic text-[clamp(36px,5.5vw,72px)]"
                  style={{ background: 'linear-gradient(90deg, #c9a84c, #e8c870, #f5a623)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                />
              </div>
              <div className="flex items-baseline justify-center gap-4">
                <EditableText id="hero.line2a" defaultValue="Действуйте" className="text-[#f0ece6] text-[clamp(36px,5.5vw,72px)]" tag="span" />
                <EditableText id="hero.line2b" defaultValue="иначе." tag="span"
                  className="italic text-[clamp(36px,5.5vw,72px)]"
                  style={{ background: 'linear-gradient(90deg, #c9a84c, #e8c870, #f5a623)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                />
              </div>
            </div>
          ) : (
            /* Normal mode: animated split text */
            <>
              <div className="flex items-baseline justify-center gap-4 overflow-hidden mb-2">
                <SplitText text={line1a} className="text-[#f0ece6] text-[clamp(36px,5.5vw,72px)]" delay={0.25} />
                <SplitText text={line1b} className="italic text-[clamp(36px,5.5vw,72px)]" gradient delay={0.50} />
              </div>
              <div className="flex items-baseline justify-center gap-4 overflow-hidden">
                <SplitText text={line2a} className="text-[#f0ece6] text-[clamp(36px,5.5vw,72px)]" delay={0.75} />
                <SplitText text={line2b} className="italic text-[clamp(36px,5.5vw,72px)]" gradient delay={1.0} />
              </div>
            </>
          )}
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#6b6560] text-sm md:text-base max-w-md mx-auto leading-relaxed mb-8"
        >
          <EditableText
            id="hero.subtitle"
            defaultValue="Коучинг для тех, кто не ищет шаблонных ответов. Трансформация через честный разговор и нестандартное мышление."
            className="text-[#6b6560]"
          />
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
        >
          <EditableLink
            id="hero.cta.primary"
            defaultHref="#cta"
            defaultLabel="Начать путь"
          >
            {(label, href) => (
              <Button variant="primary" href={href}>
                {label}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            )}
          </EditableLink>

          <EditableLink
            id="hero.cta.secondary"
            defaultHref="#positioning"
            defaultLabel="Узнать подход"
          >
            {(label, href) => (
              <Button variant="ghost" href={href}>
                {label}
              </Button>
            )}
          </EditableLink>
        </motion.div>

        {/* Divider + Stats */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm h-px bg-gradient-to-r from-transparent via-[#c9a84c]/25 to-transparent mb-8"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.7 }}
          className="flex items-center justify-center gap-10 md:gap-16"
        >
          {[
            { value: '10+', label: 'лет практики', delay: 1.7 },
            { value: '200+', label: 'клиентов', delay: 1.85 },
            { value: '6', label: 'стран', delay: 2.0 },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-2xl md:text-3xl text-[#c9a84c] font-light">
                {isEditing ? (
                  <EditableText
                    id={`hero.stat.${i}.value`}
                    defaultValue={stat.value}
                  />
                ) : (
                  <Counter value={getContent(`hero.stat.${i}.value`, stat.value)} delay={stat.delay} />
                )}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: stat.delay + 0.2 }}
                className="text-[10px] text-[#6b6560] tracking-[0.2em] uppercase mt-0.5"
              >
                <EditableText
                  id={`hero.stat.${i}.label`}
                  defaultValue={stat.label}
                />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[#c9a84c]/60 via-[#7c3aed]/40 to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
