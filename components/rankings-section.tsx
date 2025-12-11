"use client"

import Link from "next/link"
import { ArrowRight, Loader2 } from "lucide-react"
import { JournalCard } from "@/components/journal-card"
import { useJournalData } from "@/hooks/use-journal-data"

export function RankingsSection() {
  const { journals, dictionary, isLoading } = useJournalData()

  // Sort by Impact Factor for top ranked
  const topRanked = [...journals]
    .filter((j) => j.OOIR_IF)
    .sort((a, b) => (b.OOIR_IF || 0) - (a.OOIR_IF || 0))
    .slice(0, 8)

  // Sort by citations for most cited
  const mostCited = [...journals]
    .filter((j) => j["OA_Cited By Count"])
    .sort((a, b) => (b["OA_Cited By Count"] || 0) - (a["OA_Cited By Count"] || 0))
    .slice(0, 8)

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={`skeleton-${index}`} className="p-5 rounded-xl bg-card border border-border animate-pulse">
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded w-1/4"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
            </div>
            <div className="pt-3 border-t border-border space-y-2">
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  if (isLoading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Top Ranked by Impact Factor - Loading */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">Top Ranked Journals</h2>
              <Link href="/the-list" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <LoadingSkeleton />
          </div>

          {/* Most Cited - Loading */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">Highest Citation Journals</h2>
              <Link href="/the-list" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <LoadingSkeleton />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Top Ranked by Impact Factor */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Top Ranked Journals</h2>
            <Link href="/the-list" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topRanked.map((journal, index) => (
              <JournalCard
                key={journal["OA_ISSN-L"] || `top-ranked-${index}`}
                journal={journal}
                showImpactFactor={true}
                dictionary={dictionary}
              />
            ))}
          </div>
        </div>

        {/* Most Cited */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Highest Citation Journals</h2>
            <Link href="/the-list" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mostCited.map((journal, index) => (
              <JournalCard
                key={journal["OA_ISSN-L"] || `most-cited-${index}`}
                journal={journal}
                showImpactFactor={false}
                dictionary={dictionary}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
