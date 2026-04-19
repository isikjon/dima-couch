'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from 'react'

const STORAGE_KEY = 'coachdim_content'

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

type SeoPayload = {
  title: string
  description: string
  keywords: string
  canonical: string
  robots: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogType: string
  twitterCard: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
}

const DEFAULT_SEO: SeoPayload = {
  title: 'Дима — Коуч нового мышления',
  description:
    'Коучинг для тех, кто не ищет шаблонных ответов. Трансформация через честный разговор и нестандартное мышление.',
  keywords: 'коуч, коучинг, бизнес-коуч, личный коуч, трансформация, мышление',
  canonical: '',
  robots: 'index, follow',
  ogTitle: 'Дима — Коуч нового мышления',
  ogDescription:
    'Коучинг для тех, кто не ищет шаблонных ответов. Трансформация через честный разговор и нестандартное мышление.',
  ogImage: '',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Дима — Коуч нового мышления',
  twitterDescription:
    'Коучинг для тех, кто не ищет шаблонных ответов. Трансформация через честный разговор и нестандартное мышление.',
  twitterImage: '',
}

interface EditContextType {
  isReady: boolean
  isAdmin: boolean
  isEditing: boolean
  saveState: SaveState
  seo: SeoPayload
  toggleEditing: () => void
  getContent: (id: string, fallback: string) => string
  setContent: (id: string, value: string) => void
  getLink: (id: string, fallback: { href: string; label: string }) => { href: string; label: string }
  setLink: (id: string, value: { href: string; label: string }) => void
  getPhoto: (id: string) => string | null
  setPhoto: (id: string, url: string) => void
  uploadPhoto: (id: string, file: File) => Promise<{ ok: boolean; path?: string; error?: string }>
  resetAll: () => void
  refreshSeo: () => Promise<void>
}

const EditContext = createContext<EditContextType | null>(null)

async function fetchCmsJson(url: string, init?: RequestInit) {
  try {
    const res = await fetch(url, {
      credentials: 'same-origin',
      ...init,
    })

    const contentType = res.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) return null

    const payload = await res.json()
    if (!res.ok || !payload?.ok) return null

    return payload
  } catch {
    return null
  }
}

function upsertMeta(
  selector: string,
  attrs: Record<string, string>,
  content: string,
) {
  if (typeof document === 'undefined' || !content) return

  let el = document.head.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    Object.entries(attrs).forEach(([key, value]) => el?.setAttribute(key, value))
    document.head.appendChild(el)
  }

  el.setAttribute('content', content)
}

function applySeoToDocument(seo: SeoPayload) {
  if (typeof document === 'undefined') return

  if (seo.title) document.title = seo.title

  upsertMeta('meta[name="description"]', { name: 'description' }, seo.description)
  upsertMeta('meta[name="keywords"]', { name: 'keywords' }, seo.keywords)
  upsertMeta('meta[name="robots"]', { name: 'robots' }, seo.robots)

  upsertMeta('meta[property="og:title"]', { property: 'og:title' }, seo.ogTitle || seo.title)
  upsertMeta(
    'meta[property="og:description"]',
    { property: 'og:description' },
    seo.ogDescription || seo.description,
  )
  upsertMeta('meta[property="og:type"]', { property: 'og:type' }, seo.ogType || 'website')
  upsertMeta('meta[property="og:image"]', { property: 'og:image' }, seo.ogImage)

  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, seo.twitterCard)
  upsertMeta(
    'meta[name="twitter:title"]',
    { name: 'twitter:title' },
    seo.twitterTitle || seo.ogTitle || seo.title,
  )
  upsertMeta(
    'meta[name="twitter:description"]',
    { name: 'twitter:description' },
    seo.twitterDescription || seo.ogDescription || seo.description,
  )
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, seo.twitterImage || seo.ogImage)

  if (seo.canonical) {
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = seo.canonical
  }
}

function readLocalStore(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed ? parsed : {}
  } catch {
    return {}
  }
}

function writeLocalStore(store: Record<string, string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {}
}

export function EditProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [store, setStore] = useState<Record<string, string>>({})
  const [seo, setSeo] = useState<SeoPayload>(DEFAULT_SEO)

  const storeRef = useRef<Record<string, string>>({})
  const isAdminRef = useRef(false)

  useEffect(() => {
    storeRef.current = store
  }, [store])

  useEffect(() => {
    isAdminRef.current = isAdmin
  }, [isAdmin])

  const persistContent = useCallback(async (next: Record<string, string>) => {
    setStore(next)
    writeLocalStore(next)

    if (!isAdminRef.current) return

    setSaveState('saving')
    const payload = await fetchCmsJson('/admin/api/content.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entries: next }),
    })

    if (payload?.entries && typeof payload.entries === 'object') {
      setStore(payload.entries as Record<string, string>)
      writeLocalStore(payload.entries as Record<string, string>)
      setSaveState('saved')
      window.setTimeout(() => setSaveState('idle'), 1200)
      return
    }

    setSaveState('error')
  }, [])

  const refreshSeo = useCallback(async () => {
    const payload = await fetchCmsJson('/admin/api/seo.php')
    if (payload?.seo && typeof payload.seo === 'object') {
      setSeo((prev) => ({ ...prev, ...(payload.seo as SeoPayload) }))
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const bootstrap = async () => {
      const local = readLocalStore()
      if (!cancelled) {
        setStore(local)
      }

      const [statusPayload, contentPayload, seoPayload] = await Promise.all([
        fetchCmsJson('/admin/api/status.php'),
        fetchCmsJson('/admin/api/content.php'),
        fetchCmsJson('/admin/api/seo.php'),
      ])

      if (cancelled) return

      const admin = Boolean(statusPayload?.authenticated)
      setIsAdmin(admin)

      if (contentPayload?.entries && typeof contentPayload.entries === 'object') {
        const remoteEntries = contentPayload.entries as Record<string, string>
        setStore(remoteEntries)
        writeLocalStore(remoteEntries)
      }

      if (seoPayload?.seo && typeof seoPayload.seo === 'object') {
        setSeo((prev) => ({ ...prev, ...(seoPayload.seo as SeoPayload) }))
      }

      setIsReady(true)
    }

    bootstrap()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!isReady) return
    applySeoToDocument(seo)
  }, [seo, isReady])

  const getContent = useCallback(
    (id: string, fallback: string) => store[`text:${id}`] ?? fallback,
    [store],
  )

  const setContent = useCallback(
    (id: string, value: string) => {
      const next = { ...storeRef.current, [`text:${id}`]: value }
      void persistContent(next)
    },
    [persistContent],
  )

  const getLink = useCallback(
    (id: string, fallback: { href: string; label: string }) => {
      const raw = store[`link:${id}`]
      if (!raw) return fallback

      try {
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed.href === 'string' && typeof parsed.label === 'string') {
          return parsed
        }
      } catch {}

      return fallback
    },
    [store],
  )

  const setLink = useCallback(
    (id: string, value: { href: string; label: string }) => {
      const next = { ...storeRef.current, [`link:${id}`]: JSON.stringify(value) }
      void persistContent(next)
    },
    [persistContent],
  )

  const getPhoto = useCallback((id: string) => store[`photo:${id}`] ?? null, [store])

  const setPhoto = useCallback(
    (id: string, url: string) => {
      const next = { ...storeRef.current, [`photo:${id}`]: url }
      void persistContent(next)
    },
    [persistContent],
  )

  const uploadPhoto = useCallback(
    async (id: string, file: File) => {
      if (!isAdminRef.current) {
        return { ok: false, error: 'not_admin' }
      }

      setSaveState('saving')
      const form = new FormData()
      form.append('id', id)
      form.append('photo', file)

      const payload = await fetchCmsJson('/admin/api/upload.php', {
        method: 'POST',
        body: form,
      })

      if (!payload?.path || typeof payload.path !== 'string') {
        setSaveState('error')
        return { ok: false, error: 'upload_failed' }
      }

      const path = payload.path
      const next = { ...storeRef.current, [`photo:${id}`]: path }
      setStore(next)
      writeLocalStore(next)
      setSaveState('saved')
      window.setTimeout(() => setSaveState('idle'), 1200)

      return { ok: true, path }
    },
    [],
  )

  const resetAll = useCallback(() => {
    void persistContent({})
  }, [persistContent])

  const toggleEditing = useCallback(() => {
    setIsEditing((value) => !value)
  }, [])

  return (
    <EditContext.Provider
      value={{
        isReady,
        isAdmin,
        isEditing,
        saveState,
        seo,
        toggleEditing,
        getContent,
        setContent,
        getLink,
        setLink,
        getPhoto,
        setPhoto,
        uploadPhoto,
        resetAll,
        refreshSeo,
      }}
    >
      {children}
    </EditContext.Provider>
  )
}

export function useEdit() {
  const ctx = useContext(EditContext)
  if (!ctx) throw new Error('useEdit must be used inside EditProvider')
  return ctx
}
