'use client'

import { motion } from 'framer-motion'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import EditableText from '@/components/editor/EditableText'

const audience = [
  { num: '01', title: 'Предприниматели', desc: 'Которые растут быстро, но чувствуют, что сами становятся ограничением.' },
  { num: '02', title: 'Публичные люди', desc: 'Спикеры, эксперты, лидеры мнений — кому важен образ и то, что за ним.' },
  { num: '03', title: 'Команды и лидеры', desc: 'Когда нужно синхронизировать видение и вытащить лучшее из каждого.' },
  { num: '04', title: 'Стартаперы', desc: 'На этапе, когда хаос нужно превратить в стратегию, а идею — в движение.' },
  { num: '05', title: 'Творческие специалисты', desc: 'Дизайнеры, художники, режиссёры — кому нужна ясность без потери чутья.' },
  { num: '06', title: 'Руководители в переходе', desc: 'Смена роли, рынка или парадигмы. Момент, когда старые карты не работают.' },
]

export default function ForWhom() {
  return (
    <section
      id="for-whom"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #050505 0%, #090807 50%, #050505 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <Reveal variant="fade">
          <div className="flex items-center gap-3 mb-6">
            <motion.span
              className="h-px bg-gradient-to-r from-[#c9a84c] to-[#7c3aed]"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '40px', display: 'inline-block' }}
            />
            <EditableText id="forwhom.label" defaultValue="Аудитория" className="text-xs tracking-[0.25em] text-[#c9a84c]/60 uppercase" />
          </div>
        </Reveal>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <Reveal variant="up" delay={0.05}>
            <h2 className="font-display text-[clamp(32px,5vw,64px)] text-[#f0ece6] leading-tight">
              <EditableText id="forwhom.title.line1" defaultValue="Для кого" />
              <br />
              <EditableText
                id="forwhom.title.line2"
                defaultValue="это создано"
                className="italic"
                tag="span"
                style={{ background: 'linear-gradient(90deg, #c9a84c, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              />
            </h2>
          </Reveal>
          <Reveal variant="right" delay={0.15}>
            <EditableText
              id="forwhom.subtitle"
              defaultValue="Работаю с людьми, которые готовы к настоящей работе — не к комфортным ответам."
              className="text-[#6b6560] max-w-xs text-sm leading-relaxed"
              tag="p"
            />
          </Reveal>
        </div>

        {/* Audience list with individual stagger */}
        <RevealGroup className="divide-y divide-white/[0.05]" stagger={0.09} delay={0.05} amount={0.05}>
          {audience.map((item, i) => (
            <RevealItem key={i} variant="left" duration={0.75}>
              <motion.div
                className="group flex items-start gap-6 py-7 cursor-default -mx-4 px-4 rounded-xl"
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)', x: 4 }}
                transition={{ duration: 0.25 }}
              >
                <span className="font-display text-2xl md:text-3xl text-[#c9a84c]/25 group-hover:text-[#c9a84c]/70 transition-colors duration-300 flex-shrink-0 w-12 leading-none">
                  <EditableText id={`forwhom.item.${i}.num`} defaultValue={item.num} />
                </span>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                  <h3 className="font-display text-2xl md:text-3xl text-[#f0ece6] group-hover:text-[#e8d5a0] transition-colors duration-300 flex-shrink-0">
                    <EditableText id={`forwhom.item.${i}.title`} defaultValue={item.title} />
                  </h3>
                  <p className="text-[#6b6560] text-sm leading-relaxed group-hover:text-[#8a8075] transition-colors duration-300">
                    <EditableText id={`forwhom.item.${i}.desc`} defaultValue={item.desc} />
                  </p>
                </div>
                <div className="hidden sm:flex w-6 h-6 items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#c9a84c] group-hover:translate-x-0 translate-x-[-4px]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
