"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, TrendingUp, Quote, BarChart3, FileText, BookOpen, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useJournalById } from "@/hooks/use-journal-data"

interface JournalPageProps {
  params: Promise<{ id: string }>
}

export default function JournalDetailPage({ params }: JournalPageProps) {
  const { id } = use(params)
  const decodedId = decodeURIComponent(id)
  const { journal, isLoading } = useJournalById(decodedId)
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null)

  useEffect(() => {
    if (journal?.OA_Homepage) {
      try {
        const url = new URL(journal.OA_Homepage)
        setFaviconUrl(`https://www.google.com/s2/favicons?domain=${url.hostname}&sz=32`)
      } catch {
        setFaviconUrl(null)
      }
    }
  }, [journal])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading journal details...</div>
      </div>
    )
  }

  if (!journal) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-foreground mb-2">Journal Not Found</h1>
            <p className="text-muted-foreground">The requested journal could not be found.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-start gap-4 mb-4">
            {faviconUrl && <img src={faviconUrl || "/placeholder.svg"} alt="" className="w-8 h-8 rounded" />}
            <div>
              <h1 className="text-3xl font-bold text-foreground">{journal["OA_Journal Name"]}</h1>
              <p className="text-muted-foreground mt-1">ISSN: {journal["OA_ISSN-L"]}</p>
              <p className="text-muted-foreground">{journal.OA_Publisher}</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">SJR Score</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{journal.SCIMAGO_SJR?.toLocaleString() || "N/A"}</div>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Quote className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">Citations</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {journal["OA_Cited By Count"]?.toLocaleString() || "N/A"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">H-Index</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{journal["SCIMAGO_H index"] || "N/A"}</div>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-xs uppercase tracking-wide">Impact Factor</span>
            </div>
            <div className="text-2xl font-bold text-primary">{journal.OOIR_IF?.toFixed(2) || "N/A"}</div>
          </div>
        </div>

        {/* Publication Metrics */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <div className="p-6 rounded-xl bg-card border border-border overflow-hidden">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Publication Metrics
            </h2>
            <dl className="space-y-3">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground shrink-0">Recent Documents (2024)</dt>
                <dd className="font-medium text-foreground text-right">
                  {journal["SCIMAGO_Total Docs. (2024)"] || "N/A"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground shrink-0">Documents (3 years)</dt>
                <dd className="font-medium text-foreground text-right">
                  {journal["SCIMAGO_Total Docs. (3years)"] || "N/A"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground shrink-0">Citations/Doc (2 years)</dt>
                <dd className="font-medium text-foreground text-right">
                  {journal["SCIMAGO_Citations / Doc. (2years)"] || "N/A"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground shrink-0">References/Doc</dt>
                <dd className="font-medium text-foreground text-right">{journal["SCIMAGO_Ref. / Doc."] || "N/A"}</dd>
              </div>
            </dl>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border overflow-hidden">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Categories & Disciplines
            </h2>
            <div className="space-y-4">
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">SCImago Categories</h3>
                <p className="text-foreground break-words text-sm leading-relaxed">
                  {journal.SCIMAGO_Categories || "N/A"}
                </p>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Disciplines</h3>
                <p className="text-foreground break-words text-sm leading-relaxed">{journal.OA_Discipline || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="p-6 rounded-xl bg-card border border-border mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Additional Information
          </h2>
          <dl className="grid sm:grid-cols-3 gap-4">
            <div>
              <dt className="text-sm text-muted-foreground mb-1">Country</dt>
              <dd className="font-medium text-foreground">{journal.SCIMAGO_Country || "N/A"}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground mb-1">Region</dt>
              <dd className="font-medium text-foreground">{journal.SCIMAGO_Region || "N/A"}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground mb-1">Coverage Years</dt>
              <dd className="font-medium text-foreground">{journal.SCIMAGO_Coverage || "N/A"}</dd>
            </div>
          </dl>

          {journal.OA_Homepage && (
            <div className="mt-6 pt-6 border-t border-border">
              <Button asChild className="gap-2">
                <a href={journal.OA_Homepage} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Visit Journal Website
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
