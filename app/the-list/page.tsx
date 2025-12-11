"use client"

import { useMemo, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useJournalData } from "@/hooks/use-journal-data"
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll"
import { Loader2 } from "lucide-react"

const JOURNALS_PER_PAGE = 50

export default function TheListPage() {
  const router = useRouter()
  const { journals } = useJournalData()
  const [displayedCount, setDisplayedCount] = useState(JOURNALS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)

  const sortedJournals = useMemo(() => {
    return [...journals]
      .filter((j) => j.OOIR_IF)
      .sort((a, b) => (b.OOIR_IF || 0) - (a.OOIR_IF || 0))
  }, [journals])

  const displayedJournals = useMemo(() => {
    return sortedJournals.slice(0, displayedCount)
  }, [sortedJournals, displayedCount])

  const hasMore = displayedJournals.length < sortedJournals.length

  const handleJournalClick = useCallback((issn: string) => {
    router.push(`/journal/${encodeURIComponent(issn)}`)
  }, [router])

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return
    
    setIsLoading(true)
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + JOURNALS_PER_PAGE, sortedJournals.length))
      setIsLoading(false)
    }, 300) // Small delay to show loading state
  }, [isLoading, hasMore, sortedJournals.length])

  const { triggerRef } = useInfiniteScroll({
    hasMore,
    loadMore,
    threshold: 0.8,
    rootMargin: "200px"
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">The List</h1>
            <p className="text-muted-foreground mt-1">
              Complete journal rankings by impact factor ({sortedJournals.length} journals)
            </p>
            <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Note:</span> More entries load automatically as you scroll. 
                The scroll progress bar may feel unintuitive since the page length increases dynamically.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {displayedJournals.map((journal, index) => (
            <div
              key={journal["OA_ISSN-L"] || `list-${index}`}
              onClick={() => handleJournalClick(journal["OA_ISSN-L"])}
              className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:glow-border transition-all cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center font-bold text-lg text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                {index + 1}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {journal["OA_Journal Name"]}
                </h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span>{journal.OA_Publisher}</span>
                  <span className="truncate">{journal.SCIMAGO_Categories || "N/A"}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-right">
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">IF*</div>
                  <div className="font-semibold text-primary">{journal.OOIR_IF?.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Citations</div>
                  <div className="font-medium text-foreground">{journal["OA_Cited By Count"]?.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading indicator and trigger */}
        <div ref={triggerRef} className="py-4">
          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading more journals...
            </div>
          )}
          {!hasMore && displayedJournals.length > 0 && (
            <div className="text-center text-muted-foreground">
              Showing all {sortedJournals.length} journals
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
