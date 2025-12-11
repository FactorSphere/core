"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchModal } from "@/components/search-modal"

export function HeroSection() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          {/* Logo icon */}
          <div className="mb-8 flex justify-center">
            <img src="/owl.png" alt="FactorSphere" className="w-20 h-20 object-contain" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance mb-6">
            Welcome to FactorSphere
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
            Democratizing academic journal rankings through transparency and community.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setSearchOpen(true)}
              className="h-12 px-8 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground glow-blue"
            >
              <Search className="w-5 h-5 mr-2" />
              Find Journals
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base font-medium border-border hover:bg-muted bg-transparent"
            >
              <Link href="/recommend">
                <Sparkles className="w-5 h-5 mr-2" />
                AI Journal Recommender
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
