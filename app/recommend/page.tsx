"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Sparkles, Send, ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useJournalData, type Journal } from "@/hooks/use-journal-data"

interface AIMatch {
  SCIMAGO_Title_clean: string
  score: number
  OOIR_IF?: number
}

export default function RecommendPage() {
  const router = useRouter()
  const { journals } = useJournalData()
  const [abstract, setAbstract] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Array<{ match: AIMatch; journal: Journal | null }>>([])
  const [rawResults, setRawResults] = useState<string>("")
  const [showRaw, setShowRaw] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Find journal in database - matches original logic
  const findJournalInDatabase = (aiMatch: AIMatch): Journal | null => {
    if (!aiMatch || !aiMatch.SCIMAGO_Title_clean) return null

    const cleanJournalName = aiMatch.SCIMAGO_Title_clean.toLowerCase().trim()

    return (
      journals.find((journal) => {
        // First try exact match with SCIMAGO clean title
        if (journal.SCIMAGO_Title_clean && journal.SCIMAGO_Title_clean.toLowerCase() === cleanJournalName) {
          return true
        }

        // Fallback to partial match if exact match fails
        if (journal["OA_Journal Name"] && journal["OA_Journal Name"].toLowerCase().includes(cleanJournalName)) {
          return true
        }

        return false
      }) || null
    )
  }

  const handleSubmit = async () => {
    if (!abstract.trim()) {
      setError("Please enter an abstract first.")
      return
    }

    setLoading(true)
    setError(null)
    setResults([])
    setRawResults("")

    try {
      const response = await fetch("https://backend.factorsphere.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ abstract }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setRawResults(JSON.stringify(result, null, 2))

      // Handle both array and object with matches property
      const matches: AIMatch[] = Array.isArray(result) ? result : result.matches || []

      const processedResults = matches.map((match) => ({
        match,
        journal: findJournalInDatabase(match),
      }))

      setResults(processedResults)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong"
      setError(`Something went wrong: ${message}`)
      setRawResults(`Error: ${message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleJournalClick = (issn: string) => {
    window.open(`/journal?id=${encodeURIComponent(issn)}`, '_blank')
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

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">AI Journal Recommender</h1>
              <p className="text-muted-foreground">Find the perfect journal for your research</p>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="p-6 rounded-xl bg-card border border-border mb-8">
          <label htmlFor="abstract" className="block text-sm font-medium text-foreground mb-3">
            Paste your abstract below
          </label>
          <Textarea
            id="abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            placeholder="Enter your research abstract here to get personalized journal recommendations..."
            className="min-h-[200px] bg-muted border-border resize-none"
          />
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">{abstract.length} characters</p>
            <Button onClick={handleSubmit} disabled={loading || !abstract.trim()} className="gap-2">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Get Recommendations
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive mb-8">
            {error}
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-foreground">Recommended Journals</h2>
            {results.map(({ match, journal }, index) => {
              if (!journal) return null

              const scorePercentage = (match.score * 100).toFixed(1)
              const impactFactor = match.OOIR_IF
                ? match.OOIR_IF.toFixed(2)
                : journal.OOIR_IF
                  ? journal.OOIR_IF.toFixed(2)
                  : "N/A"
              const categories = journal.SCIMAGO_Categories
                ? journal.SCIMAGO_Categories.split(";").slice(0, 3).join(", ")
                : "N/A"

              return (
                <div
                  key={index}
                  onClick={() => journal["OA_ISSN-L"] && handleJournalClick(journal["OA_ISSN-L"])}
                  className="p-5 rounded-xl bg-card border border-border hover:glow-border transition-all cursor-pointer"
                >
                  <h3 className="font-semibold text-foreground mb-3">{journal["OA_Journal Name"]}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Impact Factor:</span>
                      <span className="ml-2 font-medium text-primary">{impactFactor}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Match Score:</span>
                      <span className="ml-2 font-medium text-foreground">{scorePercentage}%</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <span className="font-medium">Fields:</span> {categories}...
                  </div>
                </div>
              )
            })}

            {results.every((r) => !r.journal) && (
              <div className="text-center py-8 text-muted-foreground">
                Found recommendations but no matching journals in our database.
              </div>
            )}
          </div>
        )}

        {/* Raw Results Toggle */}
        {rawResults && (
          <div className="rounded-xl bg-card border border-border overflow-hidden">
            <button
              onClick={() => setShowRaw(!showRaw)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors"
            >
              <span className="text-sm font-medium text-muted-foreground">{showRaw ? "Hide" : "Show"} AI Response</span>
              {showRaw ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            {showRaw && (
              <pre className="p-4 text-xs text-muted-foreground overflow-x-auto border-t border-border bg-muted/50">
                {rawResults}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
