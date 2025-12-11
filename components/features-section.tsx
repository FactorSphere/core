import { Shield, Database, Users, Globe } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Secure",
    description: "Secure, end-to-end encrypted processing with no data retention beyond real-time compute.",
  },
  {
    icon: Database,
    title: "Comprehensive Data",
    description: "Aggregated metrics from multiple trusted sources for informed decisions.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Powered by researchers, for researchers, with opportune updates.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Comprehensive journal database spanning all academic disciplines worldwide.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-card border border-border hover:glow-border transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
