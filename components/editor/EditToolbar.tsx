'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEdit } from '@/contexts/EditContext'
import { useState } from 'react'

export default function EditToolbar() {
  const { isAdmin, isEditing, toggleEditing, resetAll, saveState } = useEdit()
  const [confirmReset, setConfirmReset] = useState(false)

  if (!isAdmin) return null

  const handleReset = () => {
    if (confirmReset) {
      resetAll()
      setConfirmReset(false)
      return
    }

    setConfirmReset(true)
    setTimeout(() => setConfirmReset(false), 3000)
  }

  const statusLabel = {
    idle: 'Готово к редактированию',
    saving: 'Сохраняем...',
    saved: 'Сохранено',
    error: 'Ошибка сохранения',
  }[saveState]

  const statusClass = {
    idle: 'text-[#6b6560]',
    saving: 'text-[#c9a84c]',
    saved: 'text-emerald-400',
    error: 'text-red-400',
  }[saveState]

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[100] flex items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
    >
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="flex items-center gap-2"
          >
            <div className="px-4 py-2.5 rounded-2xl bg-[#0d0d0d]/95 border border-white/[0.08] backdrop-blur-xl">
              <p className="text-[11px] tracking-wide">
                <span className={`${statusClass}`}>{statusLabel}</span>
              </p>
            </div>

            <motion.button
              onClick={handleReset}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-medium tracking-wide cursor-pointer transition-all duration-200 backdrop-blur-xl ${
                confirmReset
                  ? 'bg-red-500/20 border-red-500/50 text-red-400'
                  : 'bg-[#0d0d0d]/95 border-white/[0.08] text-[#6b6560] hover:text-[#f0ece6] hover:border-white/[0.15]'
              }`}
              whileTap={{ scale: 0.96 }}
            >
              {confirmReset ? 'Подтвердить сброс' : 'Сбросить всё'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleEditing}
        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl border text-sm font-medium cursor-pointer transition-all duration-300 backdrop-blur-xl shadow-lg ${
          isEditing
            ? 'bg-[#c9a84c] border-[#c9a84c] text-[#050505] shadow-[0_0_30px_rgba(201,168,76,0.3)]'
            : 'bg-[#0d0d0d]/95 border-white/[0.10] text-[#f0ece6] hover:border-[#c9a84c]/40 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)]'
        }`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {isEditing ? (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Выйти из редактирования
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
            </svg>
            Редактировать сайт
          </>
        )}
      </motion.button>
    </motion.div>
  )
}
