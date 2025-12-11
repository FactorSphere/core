"use client"

import { useEffect, useState } from "react"

export function useScrollbarWidth() {
  const [scrollbarWidth, setScrollbarWidth] = useState(0)

  useEffect(() => {
    const measureScrollbar = () => {
      // Create a temporary element to measure scrollbar width
      const outer = document.createElement('div')
      outer.style.visibility = 'hidden'
      outer.style.overflow = 'scroll'
      document.body.appendChild(outer)

      const inner = document.createElement('div')
      outer.appendChild(inner)

      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
      outer.parentNode?.removeChild(outer)

      return scrollbarWidth
    }

    setScrollbarWidth(measureScrollbar())
  }, [])

  return scrollbarWidth
}
