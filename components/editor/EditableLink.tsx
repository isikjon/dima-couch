'use client'

import { useState, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useEdit } from '@/contexts/EditContext'
import LinkModal from './LinkModal'

interface EditableLinkProps {
  id: string
  defaultHref: string
  defaultLabel: string
  children: (label: string, href: string) => ReactNode
  className?: string
}

export default function EditableLink({
  id,
  defaultHref,
  defaultLabel,
  children,
  className = '',
}: EditableLinkProps) {
  const { isEditing, getLink, setLink } = useEdit()
  const [modalOpen, setModalOpen] = useState(false)

  const link = getLink(id, { href: defaultHref, label: defaultLabel })

  if (!isEditing) {
    return <>{children(link.label, link.href)}</>
  }

  return (
    <>
      <div className={`relative group/editlink inline-block ${className}`}>
        {/* Render the button/link visually */}
        <div className="pointer-events-none">
          {children(link.label, link.href)}
        </div>

        {/* Edit overlay */}
        <motion.button
          onClick={() => setModalOpen(true)}
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-[#c9a84c]/20 border border-[#c9a84c]/50 cursor-pointer opacity-0 group-hover/editlink:opacity-100 transition-opacity duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          title="Редактировать ссылку"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          <span className="ml-1.5 text-[#c9a84c] text-xs font-medium">Изменить</span>
        </motion.button>
      </div>

      <LinkModal
        open={modalOpen}
        label={link.label}
        href={link.href}
        onSave={(label, href) => setLink(id, { label, href })}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
