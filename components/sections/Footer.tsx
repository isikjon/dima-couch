'use client'

import EditableText from '@/components/editor/EditableText'
import EditableLink from '@/components/editor/EditableLink'

const footerLinks = [
  { label: 'Подход', href: '#positioning' },
  { label: 'Услуги', href: '#services' },
  { label: 'Для кого', href: '#for-whom' },
  { label: 'Обо мне', href: '#about' },
  { label: 'Контакты', href: '#cta' },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="font-display text-2xl font-semibold tracking-[0.12em] text-[#f0ece6] uppercase">
              <EditableText id="footer.brand" defaultValue="ДИМ" />
            </div>
            <EditableText
              id="footer.brand.subtitle"
              defaultValue="Коуч для тех, кто не ищет шаблонных ответов."
              className="text-[#6b6560] text-sm leading-relaxed max-w-[220px]"
              tag="p"
            />
          </div>

          {/* Navigation */}
          <div>
            <EditableText
              id="footer.nav.title"
              defaultValue="Навигация"
              className="text-xs tracking-[0.2em] text-[#6b6560]/60 uppercase mb-5"
              tag="div"
            />
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link, index) => (
                <EditableLink
                  key={link.href}
                  id={`footer.nav.${index}`}
                  defaultHref={link.href}
                  defaultLabel={link.label}
                >
                  {(label, href) => (
                    <a
                      href={href}
                      className="text-[#6b6560] hover:text-[#f0ece6] transition-colors duration-200 text-sm cursor-pointer"
                    >
                      {label}
                    </a>
                  )}
                </EditableLink>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <EditableText
              id="footer.contacts.title"
              defaultValue="Связь"
              className="text-xs tracking-[0.2em] text-[#6b6560]/60 uppercase mb-5"
              tag="div"
            />
            <div className="flex flex-col gap-3">
              <EditableLink id="footer.contact.telegram" defaultHref="https://t.me/coachdim" defaultLabel="Telegram">
                {(label, href) => (
                  <a
                    href={href}
                    className="flex items-center gap-3 text-[#6b6560] hover:text-[#c9a84c] transition-colors duration-200 text-sm cursor-pointer group"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.013 9.488c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.876.733z"/>
                    </svg>
                    {label}
                  </a>
                )}
              </EditableLink>
              <EditableLink id="footer.contact.email" defaultHref="mailto:coach@dima.ru" defaultLabel="coach@dima.ru">
                {(label, href) => (
                  <a
                    href={href}
                    className="flex items-center gap-3 text-[#6b6560] hover:text-[#c9a84c] transition-colors duration-200 text-sm cursor-pointer group"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    {label}
                  </a>
                )}
              </EditableLink>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <EditableText
            id="footer.bottom.left"
            defaultValue="© 2026 Коуч ДИМ. Все права защищены."
            className="text-[#6b6560]/50 text-xs"
            tag="span"
          />
          <EditableText
            id="footer.bottom.right"
            defaultValue="Трансформация начинается с разговора."
            className="text-[#6b6560]/30 text-xs"
            tag="span"
          />
        </div>
      </div>
    </footer>
  )
}
