'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEdit } from '@/contexts/EditContext'
import Image from 'next/image'

interface PhotoUploadProps {
  id: string
  className?: string
}

export default function PhotoUpload({ id, className = '' }: PhotoUploadProps) {
  const { isEditing, getPhoto, setPhoto, uploadPhoto } = useEdit()
  const photo = getPhoto(id)

  const inputRef = useRef<HTMLInputElement>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const viewSrc = useMemo(() => preview || photo || '', [preview, photo])

  useEffect(() => {
    return () => {
      if (preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const openModal = () => {
    setError('')
    setSelectedFile(null)
    setPreview('')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedFile(null)
    setError('')
    if (preview.startsWith('blob:')) URL.revokeObjectURL(preview)
    setPreview('')
  }

  const handlePick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Можно загрузить только изображение')
      return
    }

    if (preview.startsWith('blob:')) URL.revokeObjectURL(preview)

    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
    setError('')
  }

  const handleSave = async () => {
    if (!selectedFile) {
      setError('Сначала выберите файл')
      return
    }

    setLoading(true)
    setError('')

    const result = await uploadPhoto(id, selectedFile)

    setLoading(false)

    if (!result.ok || !result.path) {
      setError('Не удалось загрузить фото')
      return
    }

    setPhoto(id, result.path)
    closeModal()
  }

  const handleRemove = () => {
    setPhoto(id, '')
    closeModal()
  }

  return (
    <>
      <div className={`relative aspect-[4/5] max-w-xs rounded-2xl overflow-hidden border border-white/[0.08] ${className}`}>
        {photo ? (
          <Image src={photo} alt="Profile photo" fill className="object-cover" unoptimized />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1510] via-[#0d0b08] to-[#050505]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-20 h-20 rounded-full border border-[#c9a84c]/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-10 h-10 text-[#c9a84c]/30">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <span className="text-xs text-[#6b6560]/50 tracking-widest uppercase">Фото</span>
            </div>
          </>
        )}

        <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-[#c9a84c]/30 rounded-tl-lg pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-[#c9a84c]/30 rounded-br-lg pointer-events-none" />

        {isEditing && (
          <motion.button
            type="button"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-200"
            onClick={openModal}
            whileHover={{ opacity: 1 }}
          >
            <div className="w-12 h-12 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/50 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth={1.5} className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              {photo ? 'Изменить фото' : 'Загрузить фото'}
            </span>
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[250]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            <motion.div
              className="fixed top-1/2 left-1/2 z-[251] w-[92vw] max-w-md"
              initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-[#0d0d0d] border border-white/[0.10] rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display text-lg text-[#f0ece6]">Редактировать фото</h3>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6b6560] hover:text-[#f0ece6] hover:bg-white/[0.06] transition-all cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-[#050505] p-3 mb-4">
                  <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden border border-white/[0.06]">
                    {viewSrc ? (
                      <Image src={viewSrc} alt="Preview" fill className="object-cover" unoptimized />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-[#6b6560] uppercase tracking-widest">
                        Нет фото
                      </div>
                    )}
                  </div>
                </div>

                <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handlePick} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="py-3 rounded-xl border border-white/[0.10] text-[#f0ece6] text-sm hover:border-[#c9a84c]/50 transition-all"
                  >
                    Выбрать файл
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={loading}
                    className="py-3 rounded-xl bg-[#c9a84c] text-[#050505] text-sm font-medium hover:bg-[#d9b85c] disabled:opacity-60 transition-all"
                  >
                    {loading ? 'Загружаем...' : 'Сохранить фото'}
                  </button>
                </div>

                {photo && (
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="w-full mt-3 py-2.5 rounded-xl border border-red-500/40 text-red-400 text-sm hover:bg-red-500/10 transition-all"
                  >
                    Удалить фото
                  </button>
                )}

                {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
