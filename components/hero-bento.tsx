"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ArrowRight, Database, TrendingUp, BarChart3, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchModal } from "@/components/search-modal"

export function HeroBento() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left side - Hero content */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <img src="/owl.png" alt="FactorSphere" className="w-16 h-16 object-contain" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
              FactorSphere
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              Search 4,000+ academic journals by impact factor, citations, and field-specific rankings.
            </p>

            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                onClick={() => setSearchOpen(true)}
                className="h-12 px-6 text-base font-medium w-full sm:w-auto"
              >
                <Search className="w-5 h-5 mr-2" />
                Search Journals
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-6 text-base font-medium text-foreground hover:text-foreground w-full sm:w-auto"
              >
                <Link href="/recommend">
                  AI Journal Recommender
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                size="lg"
                className="h-12 px-6 text-base font-medium w-full sm:w-auto"
              >
                <Link href="https://lander.factorsphere.org" target="_blank" rel="noopener noreferrer">
                  New here? Introduction
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right side - Stats/CTA */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-card border border-border">
              <Database className="w-8 h-8 text-primary mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">4,000+</div>
              <div className="text-sm text-muted-foreground">Academic Journals</div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <TrendingUp className="w-8 h-8 text-primary mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Research Fields</div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <BarChart3 className="w-8 h-8 text-primary mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">SJR</div>
              <div className="text-sm text-muted-foreground">SCImago Rankings</div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <Target className="w-8 h-8 text-primary mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">IF</div>
              <div className="text-sm text-muted-foreground">Impact Factors</div>
            </div>
          </div>
        </div>
      </section>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
