'use client'

import { motion } from 'framer-motion'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import EditableText from '@/components/editor/EditableText'

const reasons = [
  { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>), title: 'Без шаблонов', desc: 'Никаких типовых сценариев. Каждая работа — уникальный маршрут под конкретного человека.', accent: '#c9a84c', glow: 'rgba(201,168,76,0.12)' },
  { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>), title: 'Практический результат', desc: 'Не теория, не рефлексия ради рефлексии. Реальные изменения в мышлении и действиях.', accent: '#7c3aed', glow: 'rgba(124,58,237,0.12)' },
  { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>), title: 'Системный подход', desc: 'Работаем не с симптомами, а с корнями. Долгосрочный эффект, а не быстрое облегчение.', accent: '#2563eb', glow: 'rgba(37,99,235,0.12)' },
  { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>), title: 'Конфиденциальность', desc: 'Полная приватность. Всё, что происходит в сессии, остаётся между нами.', accent: '#f59e0b', glow: 'rgba(245,158,11,0.12)' },
  { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>), title: 'Гибкий формат', desc: 'Онлайн или офлайн. Разовые сессии или длительное сопровождение. Всё под вашу жизнь.', accent: '#10b981', glow: 'rgba(16,185,129,0.12)' },
  { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>), title: 'Честная обратная связь', desc: 'Говорю то, что думаю, а не то, что хочется услышать. Иногда это неудобно. Всегда — полезно.', accent: '#ec4899', glow: 'rgba(236,72,153,0.12)' },
]

export default function WhyMe() {
  return (
    <section
      id="why-me"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #07070d 50%, #050505 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)', filter: 'blur(80px)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Reveal variant="fade">
          <div className="flex items-center gap-3 mb-6">
            <motion.span
              className="h-px bg-gradient-to-r from-[#c9a84c] to-[#ec4899]"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '40px', display: 'inline-block' }}
            />
            <EditableText id="whyme.label" defaultValue="Преимущества" className="text-xs tracking-[0.25em] text-[#c9a84c]/70 uppercase" />
          </div>
        </Reveal>

        <Reveal variant="up" delay={0.1}>
          <h2 className="font-display text-[clamp(32px,5vw,60px)] text-[#f0ece6] leading-tight mb-16">
            <EditableText id="whyme.title.line1" defaultValue="Почему выбирают" />
            <br />
            <EditableText
              id="whyme.title.line2"
              defaultValue="именно меня"
              className="italic"
              tag="span"
              style={{ background: 'linear-gradient(90deg, #c9a84c, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            />
          </h2>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.1} delay={0.05}>
          {reasons.map((reason, i) => (
            <RevealItem key={i} variant={i % 2 === 0 ? 'up' : 'scale'} duration={0.75}>
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm p-7 group overflow-hidden cursor-default h-full"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at top left, ${reason.glow}, transparent 65%)` }} />
                <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${reason.accent}, transparent)` }} />
                <div className="relative z-10">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-5 transition-all duration-300"
                    style={{ background: reason.glow.replace('0.12', '0.10'), color: reason.accent, border: `1px solid ${reason.accent}25` }}>
                    {reason.icon}
                  </div>
                  <h3 className="font-display text-xl text-[#f0ece6] mb-2 group-hover:text-[#f5efe0] transition-colors duration-300">
                    <EditableText id={`whyme.reason.${i}.title`} defaultValue={reason.title} />
                  </h3>
                  <p className="text-[#6b6560] text-sm leading-relaxed group-hover:text-[#8a8075] transition-colors duration-300">
                    <EditableText id={`whyme.reason.${i}.desc`} defaultValue={reason.desc} />
                  </p>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
