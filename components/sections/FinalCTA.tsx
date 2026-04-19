'use client'

import { motion } from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import EditableText from '@/components/editor/EditableText'
import EditableLink from '@/components/editor/EditableLink'

export default function FinalCTA() {
  return (
    <section id="cta" className="relative py-40 md:py-56 overflow-hidden bg-[#050505]">
      {/* Multi-color aurora */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full"
          style={{ background: 'conic-gradient(from 0deg, rgba(201,168,76,0.12), rgba(124,58,237,0.10), rgba(37,99,235,0.10), rgba(201,168,76,0.12))', filter: 'blur(100px)' }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 65%)', filter: 'blur(60px)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Label */}
        <Reveal variant="down" delay={0}>
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className="w-8 h-px bg-gradient-to-r from-[#c9a84c] to-transparent" />
            <motion.span className="w-2 h-2 rounded-full bg-[#c9a84c]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }} />
            <EditableText
              id="finalcta.label"
              defaultValue="Следующий шаг"
              className="text-xs tracking-[0.25em] text-[#c9a84c]/60 uppercase"
            />
            <motion.span className="w-2 h-2 rounded-full bg-[#7c3aed]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
            <span className="w-8 h-px bg-gradient-to-l from-[#7c3aed] to-transparent" />
          </div>
        </Reveal>

        {/* Heading */}
        <Reveal variant="blur" delay={0.1} duration={1.0}>
          <h2 className="font-display text-[clamp(40px,7.5vw,90px)] leading-[0.9] mb-8">
            <EditableText id="finalcta.title.line1" defaultValue="Готовы начать" className="text-[#f0ece6]" tag="span" />
            <br />
            <EditableText
              id="finalcta.title.line2"
              defaultValue="разговор?"
              tag="span"
              className="italic"
              style={{
              background: 'linear-gradient(90deg, #c9a84c, #e8c870, #7c3aed, #c9a84c)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmerText 4s linear infinite',
              }}
            />
          </h2>
        </Reveal>

        <style>{`@keyframes shimmerText { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }`}</style>

        <Reveal variant="up" delay={0.25}>
          <EditableText
            id="finalcta.subtitle"
            defaultValue="Первый шаг — самый важный. Напишите мне, и мы найдём формат, который подходит именно вам."
            className="text-[#6b6560] text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-12"
            tag="p"
          />
        </Reveal>

        <Reveal variant="up" delay={0.35}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <EditableLink id="finalcta.button.telegram" defaultHref="https://t.me/coachdim" defaultLabel="Написать в Telegram">
              {(label, href) => (
                <Button variant="primary" href={href} className="!px-8 !py-4 !text-base !rounded-2xl">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.013 9.488c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.876.733z"/>
                  </svg>
                  {label}
                </Button>
              )}
            </EditableLink>
            <EditableLink id="finalcta.button.email" defaultHref="mailto:coach@dima.ru" defaultLabel="Написать email">
              {(label, href) => (
                <Button variant="ghost" href={href}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  {label}
                </Button>
              )}
            </EditableLink>
          </div>
        </Reveal>

        <Reveal variant="fade" delay={0.5}>
          <div className="flex items-center justify-center gap-6 text-[#6b6560]/40 text-xs flex-wrap">
            <EditableText id="finalcta.meta.1" defaultValue="Ответ в течение 24 часов" tag="span" />
            <span className="w-1 h-1 rounded-full bg-current" />
            <EditableText id="finalcta.meta.2" defaultValue="Конфиденциально" tag="span" />
            <span className="w-1 h-1 rounded-full bg-current" />
            <EditableText id="finalcta.meta.3" defaultValue="Без обязательств" tag="span" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
