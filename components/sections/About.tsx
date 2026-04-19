'use client'

import { motion } from 'framer-motion'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import EditableText from '@/components/editor/EditableText'
import PhotoUpload from '@/components/editor/PhotoUpload'

const stats = [
  { value: '10+', label: 'лет практики' },
  { value: '200+', label: 'клиентов' },
  { value: '6', label: 'стран' },
]

const traits = [
  'Работаю без скриптов',
  'Говорю неудобную правду',
  'Каждый маршрут — уникальный',
]

export default function About() {
  return (
    <section id="about" className="relative py-32 md:py-40 bg-[#050505] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <Reveal variant="fade">
          <div className="flex items-center gap-3 mb-16">
            <motion.span
              className="h-px bg-gradient-to-r from-[#c9a84c] to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '40px', display: 'inline-block' }}
            />
            <EditableText
              id="about.label"
              defaultValue="Обо мне"
              className="text-xs tracking-[0.25em] text-[#c9a84c]/60 uppercase"
            />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <Reveal variant="left" delay={0.1} duration={0.85}>
            <div className="space-y-8">
              <PhotoUpload id="about.main-photo" />

              <RevealGroup className="flex gap-8" stagger={0.12} delay={0.25}>
                {stats.map((stat, i) => (
                  <RevealItem key={i} variant="scale" duration={0.6}>
                    <div>
                      <EditableText
                        id={`about.stat.${i}.value`}
                        defaultValue={stat.value}
                        className="font-display text-3xl text-[#c9a84c] font-light"
                        tag="div"
                      />
                      <EditableText
                        id={`about.stat.${i}.label`}
                        defaultValue={stat.label}
                        className="text-xs text-[#6b6560] tracking-wider uppercase mt-0.5"
                        tag="div"
                      />
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal variant="up" delay={0.15}>
              <div>
                <EditableText
                  id="about.title.line1"
                  defaultValue="Дима — коуч,"
                  className="font-display text-[clamp(28px,4vw,52px)] text-[#f0ece6] leading-tight mb-2"
                  tag="h2"
                />
                <EditableText
                  id="about.title.line2"
                  defaultValue="который не работает по скрипту"
                  tag="h2"
                  className="font-display text-[clamp(28px,4vw,52px)] italic leading-tight"
                  style={{
                    background: 'linear-gradient(90deg, #c9a84c, #e8c870)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                />
              </div>
            </Reveal>

            <Reveal variant="up" delay={0.25}>
              <EditableText
                id="about.paragraph.1"
                defaultValue="Я начинал как обычный человек с обычными страхами. Путь к тому, что я делаю сейчас, был через провалы, переосмысление и честные разговоры с собой."
                className="text-[#6b6560] leading-relaxed"
                tag="p"
              />
            </Reveal>

            <Reveal variant="up" delay={0.32}>
              <EditableText
                id="about.paragraph.2"
                defaultValue="Сегодня я работаю с людьми, которые чувствуют: что-то не так, но не могут точно назвать что. Я помогаю это назвать — и сдвинуться с мёртвой точки в нужном направлении."
                className="text-[#6b6560] leading-relaxed"
                tag="p"
              />
            </Reveal>

            <RevealGroup className="space-y-3 pt-2" stagger={0.1} delay={0.35}>
              {traits.map((trait, i) => (
                <RevealItem key={i} variant="left" duration={0.6}>
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-[#c9a84c]" />
                    <EditableText
                      id={`about.trait.${i}`}
                      defaultValue={trait}
                      className="text-[#8a8075] text-sm"
                    />
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal variant="up" delay={0.5}>
              <div className="pt-4 pl-5 border-l border-[#c9a84c]/20">
                <EditableText
                  id="about.quote"
                  defaultValue="«Изменения начинаются там, где заканчивается комфортная история о себе.»"
                  className="font-display text-xl italic text-[#c9a84c]/80 leading-relaxed"
                  tag="p"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
