"use client"

import { useEffect, useRef, useCallback } from "react"

interface UseInfiniteScrollProps {
  hasMore: boolean
  loadMore: () => void
  threshold?: number
  rootMargin?: string
}

export function useInfiniteScroll({
  hasMore,
  loadMore,
  threshold = 0.8,
  rootMargin = "100px"
}: UseInfiniteScrollProps) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const triggerRef = useRef<HTMLDivElement | null>(null)

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && hasMore) {
        loadMore()
      }
    },
    [hasMore, loadMore]
  )

  useEffect(() => {
    if (!triggerRef.current) return

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold,
      rootMargin
    })

    observerRef.current.observe(triggerRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleObserver, threshold, rootMargin])

  return { triggerRef }
}
