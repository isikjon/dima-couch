'use client'

import { motion } from 'framer-motion'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import GlowOrb from '@/components/ui/GlowOrb'
import EditableText from '@/components/editor/EditableText'

const services = [
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>),
    title: 'Индивидуальные сессии',
    desc: 'Глубокая личная работа с вашим мышлением, блоками и стратегией. Один на один — без лишних глаз.',
    tag: 'Личная работа',
    accent: '#c9a84c',
    glow: 'rgba(201,168,76,0.15)',
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>),
    title: 'Корпоративные форматы',
    desc: 'Командные сессии, воркшопы и корпоративные мероприятия. Работа с коллективной динамикой и культурой.',
    tag: 'Команды',
    accent: '#7c3aed',
    glow: 'rgba(124,58,237,0.15)',
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>),
    title: 'Подготовка к событию',
    desc: 'Выступление, переговоры, запуск проекта, важный разговор. Подготовка к моментам, которые решают всё.',
    tag: 'Быстрый результат',
    accent: '#2563eb',
    glow: 'rgba(37,99,235,0.15)',
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>),
    title: 'Стратегическое сопровождение',
    desc: 'Партнёрство на период трансформации: смена роли, масштабирование, личный ребрендинг.',
    tag: 'Долгосрочно',
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.15)',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #06060a 50%, #050505 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <GlowOrb size={500} color="rgba(37,99,235,0.08)" className="bottom-[-100px] right-[-100px]" duration={12} />
        <GlowOrb size={400} color="rgba(124,58,237,0.06)" className="top-[20%] left-[-80px]" duration={9} delay={2} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <Reveal variant="fade">
          <div className="flex items-center gap-3 mb-6">
            <motion.span
              className="h-px bg-gradient-to-r from-[#7c3aed] to-[#c9a84c]"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{ width: '40px', display: 'inline-block' }}
            />
            <EditableText id="services.label" defaultValue="Форматы работы" className="text-xs tracking-[0.25em] text-[#c9a84c]/70 uppercase" />
          </div>
        </Reveal>

        <Reveal variant="up" delay={0.1}>
          <h2 className="font-display text-[clamp(32px,5vw,60px)] text-[#f0ece6] leading-tight mb-4">
            <EditableText id="services.title.line1" defaultValue="Как мы можем" />
            <br />
            <EditableText
              id="services.title.line2"
              defaultValue="работать вместе"
              className="italic"
              tag="span"
              style={{ background: 'linear-gradient(90deg, #c9a84c, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            />
          </h2>
        </Reveal>

        <Reveal variant="up" delay={0.2}>
          <EditableText
            id="services.subtitle"
            defaultValue="Разные форматы для разных задач. Выбирайте то, что подходит именно сейчас."
            className="text-[#6b6560] max-w-lg mb-16 leading-relaxed"
            tag="p"
          />
        </Reveal>

        {/* Cards with stagger */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-4" stagger={0.13} delay={0.05}>
          {services.map((service, i) => (
            <RevealItem key={i} variant="scale" duration={0.8}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm p-8 group overflow-hidden cursor-default h-full"
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at top left, ${service.glow}, transparent 60%)` }}
                />
                <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)` }} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{ background: service.glow.replace('0.15', '0.12'), color: service.accent, border: `1px solid ${service.accent}22` }}>
                      {service.icon}
                    </div>
                    <span className="text-[10px] tracking-[0.18em] uppercase px-3 py-1 rounded-full border"
                      style={{ color: service.accent, borderColor: `${service.accent}30`, background: service.glow.replace('0.15', '0.06') }}>
                      <EditableText id={`services.card.${i}.tag`} defaultValue={service.tag} />
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-[#f0ece6] mb-3 group-hover:text-[#f5efe0] transition-colors duration-300">
                    <EditableText id={`services.card.${i}.title`} defaultValue={service.title} />
                  </h3>
                  <p className="text-[#6b6560] text-sm leading-relaxed mb-6">
                    <EditableText id={`services.card.${i}.desc`} defaultValue={service.desc} />
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs tracking-wide group-hover:translate-x-1 transition-transform duration-200" style={{ color: service.accent }}>
                      <EditableText id={`services.card.${i}.more`} defaultValue="Подробнее" />
                    </span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke={service.accent} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
