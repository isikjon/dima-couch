'use client'

import { EditProvider } from '@/contexts/EditContext'
import EditToolbar from '@/components/editor/EditToolbar'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <EditProvider>
      {children}
      <EditToolbar />
    </EditProvider>
  )
}
