'use client'

import { motion } from 'framer-motion'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import EditableText from '@/components/editor/EditableText'

const pillars = [
  {
    number: '01',
    title: 'Честность',
    text: 'Я говорю то, что думаю. Без лишних слов, без ложного позитива. Только то, что поможет двигаться вперёд.',
    accent: 'rgba(201,168,76,0.8)',
    glow: 'rgba(201,168,76,0.08)',
  },
  {
    number: '02',
    title: 'Нестандартность',
    text: 'Шаблонные методики не работают с нестандартными людьми. Каждый путь — уникальный.',
    accent: 'rgba(124,58,237,0.8)',
    glow: 'rgba(124,58,237,0.08)',
  },
  {
    number: '03',
    title: 'Результат',
    text: 'Не процесс ради процесса. Конкретные изменения в мышлении, решениях и действиях.',
    accent: 'rgba(37,99,235,0.8)',
    glow: 'rgba(37,99,235,0.08)',
  },
]

export default function Positioning() {
  return (
    <section
      id="positioning"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #07070d 50%, #050505 100%)' }}
    >
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute top-0 left-[-20%] w-[60vw] h-[60vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%)', filter: 'blur(80px)' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-[-10%] w-[50vw] h-[50vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)', filter: 'blur(80px)' }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Label */}
        <Reveal variant="fade" delay={0}>
          <div className="flex items-center gap-3 mb-16">
            <motion.span
              className="h-px bg-gradient-to-r from-[#c9a84c] to-[#7c3aed]"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{ width: '40px', display: 'inline-block' }}
            />
            <EditableText id="positioning.label" defaultValue="Подход" className="text-xs tracking-[0.25em] text-[#c9a84c]/70 uppercase" />
          </div>
        </Reveal>

        {/* Manifesto */}
        <Reveal variant="up" delay={0.1}>
          <h2 className="font-display text-[clamp(36px,6.5vw,80px)] leading-[0.95] text-[#f0ece6] tracking-tight max-w-4xl mb-6">
            <EditableText id="positioning.title.line1" defaultValue="Не коучинг." />
            {' '}
            <EditableText
              id="positioning.title.line2"
              defaultValue="Трансформация."
              className="italic"
              tag="span"
              style={{ background: 'linear-gradient(90deg, #c9a84c, #e8c870, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            />
          </h2>
          <motion.div
            className="h-px max-w-2xl mb-16"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            style={{ background: 'linear-gradient(to right, #c9a84c, #7c3aed, transparent)' }}
          />
        </Reveal>

        <Reveal variant="up" delay={0.2}>
          <EditableText
            id="positioning.subtitle"
            defaultValue="Большинство коучей дают готовые ответы на чужие вопросы. Я помогаю задать правильные вопросы — свои собственные. Потому что именно они меняют направление."
            className="text-[#6b6560] text-base md:text-lg max-w-2xl leading-relaxed mb-20"
            tag="p"
          />
        </Reveal>

        {/* Three pillars with stagger */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0" stagger={0.15} delay={0.1}>
          {pillars.map((pillar, i) => (
            <RevealItem key={i} variant="up" duration={0.8}
              className={`relative py-10 md:py-0 group ${i < 2 ? 'md:pr-12 md:border-r md:border-white/[0.06]' : ''} ${i > 0 ? 'md:pl-12' : ''} ${i < 2 ? 'border-b border-white/[0.06] md:border-b-0' : ''}`}
            >
              <div
                className="font-display text-6xl font-light mb-4 leading-none"
                style={{ background: `linear-gradient(135deg, ${pillar.accent}, transparent)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                <EditableText id={`positioning.pillar.${i}.number`} defaultValue={pillar.number} />
              </div>
              <motion.div
                className="w-8 h-0.5 mb-5 rounded-full"
                style={{ background: `linear-gradient(90deg, ${pillar.accent}, transparent)` }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 + 0.4 }}
              />
              <h3 className="font-display text-2xl md:text-3xl text-[#f0ece6] mb-4 italic group-hover:text-[#e8d5a0] transition-colors duration-300">
                <EditableText id={`positioning.pillar.${i}.title`} defaultValue={pillar.title} />
              </h3>
              <p className="text-[#6b6560] text-sm leading-relaxed group-hover:text-[#8a8075] transition-colors duration-300">
                <EditableText id={`positioning.pillar.${i}.text`} defaultValue={pillar.text} />
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  )
}
