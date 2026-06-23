import { useMemo } from 'react'
import type { SiteContent } from '../admin/types'
import { DEFAULT_CONTENT, CONTENT_KEY } from '../admin/store'

export function useContent(): SiteContent {
  return useMemo(() => {
    try {
      const saved = localStorage.getItem(CONTENT_KEY)
      if (!saved) return DEFAULT_CONTENT
      return { ...DEFAULT_CONTENT, ...JSON.parse(saved) }
    } catch {
      return DEFAULT_CONTENT
    }
  }, [])
}
