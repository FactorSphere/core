import { HeroBento } from "@/components/hero-bento"
import { RankingsSection } from "@/components/rankings-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroBento />
      <RankingsSection />
    </div>
  )
}
