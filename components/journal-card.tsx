"use client"

import { useRouter } from "next/navigation"
import { TrendingUp, Quote, BarChart3, Clock } from "lucide-react"
import type { Journal } from "@/hooks/use-journal-data"

interface JournalCardProps {
  journal: Journal
  showImpactFactor?: boolean
  dictionary?: Record<string, { full: string; short: string }>
}

export function JournalCard({ journal, showImpactFactor = true, dictionary = {} }: JournalCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/journal/${encodeURIComponent(journal["OA_ISSN-L"])}`)
  }

  return (
    <div
      onClick={handleClick}
      className="group p-5 rounded-xl bg-card border border-border hover:glow-border transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 break-words mb-3">
        {journal["OA_Journal Name"]}
      </h3>

      <div className="space-y-2 text-sm text-muted-foreground mb-4 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wide shrink-0">ISSN:</span>
          <span className="truncate">{journal["OA_ISSN-L"]}</span>
        </div>
        <div className="line-clamp-1 break-all">{journal.SCIMAGO_Categories || "N/A"}</div>
      </div>

      <div className="flex items-center gap-4 pt-3 border-t border-border">
        {showImpactFactor ? (
          <div className="flex items-center gap-1.5 text-primary" title="Impact Factor">
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">IF: {journal.OOIR_IF?.toFixed(2) || "N/A"}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-muted-foreground" title="Citations">
            <Quote className="w-4 h-4" />
            <span className="font-medium">{journal["OA_Cited By Count"]?.toLocaleString() || "N/A"}</span>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-muted-foreground" title="H-Index">
          <BarChart3 className="w-4 h-4" />
          <span>{journal["SCIMAGO_H index"] || "N/A"}</span>
        </div>
      </div>

      {journal.SCIMAGO_Coverage && (
        <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground" title="Coverage">
          <Clock className="w-3 h-3" />
          <span>{journal.SCIMAGO_Coverage}</span>
        </div>
      )}
    </div>
  )
}
