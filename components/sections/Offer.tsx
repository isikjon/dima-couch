'use client'

import { motion } from 'framer-motion'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import GlowOrb from '@/components/ui/GlowOrb'
import EditableText from '@/components/editor/EditableText'
import EditableLink from '@/components/editor/EditableLink'

const includes = [
  'Диагностика текущей ситуации',
  'Определение ключевого запроса',
  'Первые инструменты и практики',
  'Ясность — что делать дальше',
]

export default function Offer() {
  return (
    <section id="offer" className="relative py-32 md:py-40 overflow-hidden bg-[#050505]">
      <GlowOrb size={700} color="rgba(201,168,76,0.06)" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" duration={9} />

      <div className="max-w-6xl mx-auto px-6">
        <Reveal variant="scale" duration={0.9}>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-3xl" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.3) 0%, rgba(201,168,76,0.05) 40%, rgba(124,58,237,0.15) 100%)', padding: '1px' }}>
              <div className="absolute inset-[1px] rounded-3xl bg-[#0a0908]" />
            </div>

            <div className="relative rounded-3xl border border-[#c9a84c]/20 bg-gradient-to-br from-[rgba(201,168,76,0.06)] via-[#0a0908] to-[#050505] p-10 md:p-16">
              {/* Badge */}
              <Reveal variant="down" delay={0.1}>
                <div className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full bg-[#c9a84c]/[0.08] border border-[#c9a84c]/20">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]"
                    animate={{ opacity: [1, 0.15, 1], scale: [1, 1.8, 1], boxShadow: ['0 0 0px #c9a84c', '0 0 10px #c9a84c', '0 0 0px #c9a84c'] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <EditableText
                    id="offer.badge"
                    defaultValue="Спецпредложение"
                    className="text-xs tracking-[0.2em] text-[#c9a84c] uppercase font-medium"
                  />
                </div>
              </Reveal>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left */}
                <div>
                  <Reveal variant="up" delay={0.15}>
                    <h2 className="font-display text-[clamp(36px,5vw,60px)] text-[#f0ece6] leading-[1.0] mb-4">
                      <EditableText id="offer.title.line1" defaultValue="Пробная сессия —" />
                      <br />
                      <EditableText id="offer.title.line2" defaultValue="60 минут" className="italic text-[#c9a84c]" tag="span" />
                    </h2>
                  </Reveal>
                  <Reveal variant="up" delay={0.25}>
                    <EditableText
                      id="offer.subtitle"
                      defaultValue="Первый шаг без лишних обязательств. Мы определим ваш ключевой запрос, обозначим точки роста и вы получите конкретные инструменты — уже на этой сессии."
                      className="text-[#6b6560] leading-relaxed mb-8 text-sm md:text-base"
                      tag="p"
                    />
                  </Reveal>
                  <Reveal variant="up" delay={0.35}>
                    <EditableLink id="offer.cta" defaultHref="#cta" defaultLabel="Записаться сейчас">
                      {(label, href) => (
                        <Button variant="primary" href={href}>
                          {label}
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Button>
                      )}
                    </EditableLink>
                  </Reveal>
                </div>

                {/* Right: includes */}
                <Reveal variant="right" delay={0.2}>
                  <div className="space-y-4">
                    <EditableText
                      id="offer.includes.title"
                      defaultValue="Что входит"
                      className="text-xs tracking-[0.2em] text-[#c9a84c]/60 uppercase mb-6"
                      tag="div"
                    />
                    <RevealGroup stagger={0.1} delay={0.3}>
                      {includes.map((item, i) => (
                        <RevealItem key={i} variant="left" duration={0.6}>
                          <div className="flex items-center gap-4 group py-1">
                            <div className="w-5 h-5 rounded-full border border-[#c9a84c]/30 flex items-center justify-center flex-shrink-0 group-hover:border-[#c9a84c] group-hover:bg-[#c9a84c]/10 transition-all duration-300">
                              <svg className="w-2.5 h-2.5 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            </div>
                            <EditableText
                              id={`offer.includes.${i}`}
                              defaultValue={item}
                              className="text-[#8a8075] text-sm group-hover:text-[#f0ece6] transition-colors duration-200"
                              tag="span"
                            />
                          </div>
                        </RevealItem>
                      ))}
                    </RevealGroup>
                    <div className="pt-6 mt-4 border-t border-white/[0.06]">
                      <EditableText
                        id="offer.format"
                        defaultValue="Формат: онлайн или офлайн · Москва / удалённо"
                        className="text-xs text-[#6b6560]"
                        tag="div"
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
