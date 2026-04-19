'use client'

import { useEdit } from '@/contexts/EditContext'
import { useRef, useEffect, ElementType, HTMLAttributes } from 'react'

interface EditableTextProps extends HTMLAttributes<HTMLElement> {
  id: string
  defaultValue: string
  tag?: ElementType
  className?: string
}

export default function EditableText({
  id,
  defaultValue,
  tag: Tag = 'span',
  className = '',
  ...rest
}: EditableTextProps) {
  const { isEditing, getContent, setContent } = useEdit()
  const ref = useRef<HTMLElement>(null)
  const value = getContent(id, defaultValue)

  useEffect(() => {
    if (ref.current && isEditing) {
      ref.current.textContent = value
    }
  }, [isEditing]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!isEditing) {
    return (
      <Tag className={className} {...rest}>
        {value}
      </Tag>
    )
  }

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      contentEditable
      suppressContentEditableWarning
      className={`${className} outline-dashed outline-1 outline-[#c9a84c]/40 outline-offset-2 cursor-text focus:outline-[#c9a84c]/80 focus:outline-2 rounded-sm transition-all`}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const text = e.currentTarget.textContent ?? ''
        setContent(id, text)
      }}
      {...rest}
    >
      {value}
    </Tag>
  )
}
