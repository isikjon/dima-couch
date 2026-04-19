'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface LinkModalProps {
  open: boolean
  label: string
  href: string
  onSave: (label: string, href: string) => void
  onClose: () => void
}

export default function LinkModal({ open, label, href, onSave, onClose }: LinkModalProps) {
  const [editLabel, setEditLabel] = useState(label)
  const [editHref, setEditHref] = useState(href)

  useEffect(() => {
    setEditLabel(label)
    setEditHref(href)
  }, [label, href, open])

  const handleSave = () => {
    onSave(editLabel, editHref)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-[201] w-full max-w-md"
            initial={{ opacity: 0, scale: 0.92, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.92, x: '-50%', y: '-50%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-[#0d0d0d] border border-white/[0.10] rounded-2xl p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg text-[#f0ece6]">Редактировать ссылку</h3>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6b6560] hover:text-[#f0ece6] hover:bg-white/[0.06] transition-all cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Label */}
                <div>
                  <label className="block text-xs tracking-[0.15em] text-[#6b6560] uppercase mb-2">Текст кнопки</label>
                  <input
                    type="text"
                    value={editLabel}
                    onChange={e => setEditLabel(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[#f0ece6] text-sm placeholder-[#6b6560] focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                    placeholder="Текст кнопки"
                  />
                </div>

                {/* URL */}
                <div>
                  <label className="block text-xs tracking-[0.15em] text-[#6b6560] uppercase mb-2">Ссылка (URL)</label>
                  <input
                    type="text"
                    value={editHref}
                    onChange={e => setEditHref(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[#f0ece6] text-sm placeholder-[#6b6560] focus:outline-none focus:border-[#c9a84c]/50 transition-colors font-mono"
                    placeholder="https://... или #section"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border border-white/[0.08] text-[#6b6560] text-sm hover:border-white/[0.15] hover:text-[#f0ece6] transition-all cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 rounded-xl bg-[#c9a84c] text-[#050505] text-sm font-medium hover:bg-[#d9b85c] transition-all cursor-pointer"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
