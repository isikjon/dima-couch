'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import EditableText from '@/components/editor/EditableText'
import EditableLink from '@/components/editor/EditableLink'

const links = [
  { label: 'Подход', href: '#positioning' },
  { label: 'Услуги', href: '#services' },
  { label: 'Обо мне', href: '#about' },
  { label: 'Контакты', href: '#cta' },
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="w-full max-w-6xl mx-4 mt-4 pointer-events-auto">
        <motion.div
          className="flex items-center justify-between px-6 py-3.5 rounded-2xl border border-white/[0.08]"
          style={{
            backgroundColor: useTransform(bgOpacity, (v) => `rgba(5,5,5,${v * 0.85})`),
            backdropFilter: 'blur(24px)',
          }}
        >
          {/* Logo */}
          <a href="#" className="font-display text-xl font-semibold tracking-[0.12em] text-[#f0ece6] uppercase cursor-pointer">
            <EditableText id="nav.logo" defaultValue="Дима" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link, index) => (
              <EditableLink
                key={link.href}
                id={`nav.desktop.${index}`}
                defaultHref={link.href}
                defaultLabel={link.label}
              >
                {(label, href) => (
                  <a
                    href={href}
                    className="text-sm text-[#6b6560] hover:text-[#f0ece6] transition-colors duration-200 tracking-wide cursor-pointer"
                  >
                    {label}
                  </a>
                )}
              </EditableLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <EditableLink id="nav.desktop.cta" defaultHref="#cta" defaultLabel="Начать">
              {(label, href) => (
                <Button variant="primary" href={href} className="!py-2.5 !px-5 !text-xs !rounded-xl">
                  {label}
                </Button>
              )}
            </EditableLink>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
          >
            <motion.span
              className="block w-5 h-px bg-[#f0ece6]"
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
            />
            <motion.span
              className="block w-5 h-px bg-[#f0ece6]"
              animate={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <motion.span
              className="block w-5 h-px bg-[#f0ece6]"
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
            />
          </button>
        </motion.div>

        {/* Mobile menu */}
        <motion.div
          className="md:hidden mt-2 rounded-2xl border border-white/[0.08] overflow-hidden"
          style={{ backgroundColor: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(24px)' }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: mobileOpen ? 'auto' : 0, opacity: mobileOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col p-4 gap-1">
            {links.map((link, index) => (
              <EditableLink
                key={link.href}
                id={`nav.mobile.${index}`}
                defaultHref={link.href}
                defaultLabel={link.label}
              >
                {(label, href) => (
                  <a
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm text-[#6b6560] hover:text-[#f0ece6] hover:bg-white/[0.04] rounded-xl transition-all duration-200 cursor-pointer"
                  >
                    {label}
                  </a>
                )}
              </EditableLink>
            ))}
            <div className="pt-2 px-4">
              <EditableLink id="nav.mobile.cta" defaultHref="#cta" defaultLabel="Начать">
                {(label, href) => (
                  <Button variant="primary" href={href} className="!w-full !justify-center !py-2.5 !text-xs !rounded-xl">
                    {label}
                  </Button>
                )}
              </EditableLink>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}
