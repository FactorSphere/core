"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useJournalData } from "@/hooks/use-journal-data"

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const router = useRouter()
  const { journals, fields } = useJournalData()
  const [query, setQuery] = useState("")
  const [fieldFilter, setFieldFilter] = useState("All Fields")
  const [sortBy, setSortBy] = useState("impact")
  const [results, setResults] = useState<typeof journals>([])

  const handleSearch = useCallback(() => {
    const filtered = journals
      .filter((journal) => {
        const matchQuery =
          journal["OA_Journal Name"]?.toLowerCase().includes(query.toLowerCase()) ||
          journal["OA_ISSN-L"]?.includes(query) ||
          journal.SCIMAGO_Categories?.toLowerCase().includes(query.toLowerCase())
        const matchField = fieldFilter === "All Fields" || journal.SCIMAGO_Categories?.includes(fieldFilter)
        return matchQuery && matchField
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "impact":
            return (b.SCIMAGO_SJR || 0) - (a.SCIMAGO_SJR || 0)
          case "name":
            return (a["OA_Journal Name"] || "").localeCompare(b["OA_Journal Name"] || "")
          case "recent":
            return (b["SCIMAGO_Total Docs. (2024)"] || 0) - (a["SCIMAGO_Total Docs. (2024)"] || 0)
          default:
            return 0
        }
      })
      .slice(0, 20)

    setResults(filtered)
  }, [journals, query, fieldFilter, sortBy])

  useEffect(() => {
    if (open) {
      handleSearch()
    }
  }, [open, handleSearch])

  const handleJournalClick = (issn: string) => {
    onOpenChange(false)
    router.push(`/journal?id=${encodeURIComponent(issn)}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Search Journals</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by journal name, field, or ISSN..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-muted border-border"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={fieldFilter} onValueChange={setFieldFilter}>
              <SelectTrigger className="flex-1 min-w-[150px] bg-muted border-border">
                <SelectValue placeholder="All Fields" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Fields">All Fields</SelectItem>
                {fields.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44 bg-muted border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="impact">Sort by Impact</SelectItem>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="recent">Sort by Recent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
            {results.length > 0 ? (
              results.map((journal) => (
                <button
                  key={journal["OA_ISSN-L"] || `search-${journal["OA_Journal Name"] || Math.random()}`}
                  onClick={() => handleJournalClick(journal["OA_ISSN-L"])}
                  className="w-full text-left p-4 rounded-lg bg-card hover:bg-muted border border-border transition-all hover:glow-border"
                >
                  <h3 className="font-medium text-foreground break-words line-clamp-2">{journal["OA_Journal Name"]}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                    <span className="shrink-0">SJR: {journal.SCIMAGO_SJR || "N/A"}</span>
                    <span className="line-clamp-1 break-all min-w-0">
                      {journal.SCIMAGO_Categories || journal.OA_Discipline || "N/A"}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">No Matching journals found</div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
