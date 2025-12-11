import Link from "next/link"
import { ArrowLeft, Sparkles, Shield, Database, Users, Globe, Heart, Mail, Github, Coffee } from "lucide-react"

export default function AboutPage() {
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

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <img src="/owl.png" alt="Owl" className="w-10 h-10" />
            <h1 className="text-3xl font-bold text-foreground">About FactorSphere</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Democratizing academic journal rankings through transparency and community.
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <div className="p-6 rounded-xl bg-card border border-border mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              FactorSphere is a community-driven platform dedicated to providing transparent, accessible academic
              journal rankings. We aggregate metrics from multiple trusted sources to help researchers make informed
              decisions about where to publish their work.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-card border border-border">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">
                End-to-end encrypted processing with no data retention beyond real-time compute.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <Database className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Comprehensive Data</h3>
              <p className="text-sm text-muted-foreground">
                Aggregated metrics from SCImago, OpenAlex, and other trusted academic sources.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Community Driven</h3>
              <p className="text-sm text-muted-foreground">
                Built by researchers, for researchers, with regular community-informed updates.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <Globe className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Global Coverage</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive database spanning all academic disciplines and regions worldwide.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Data Sources</h2>
            <p className="text-muted-foreground mb-4">Our rankings are compiled from multiple authoritative sources:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                - <strong className="text-foreground">SCImago Journal Rank (SJR)</strong> - Citation-based metrics
              </li>
              <li>
                - <strong className="text-foreground">OpenAlex</strong> - Open scholarly metadata
              </li>
              <li>
                - <strong className="text-foreground">OOIR Impact Factor</strong> - Calculated impact metrics
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Support Us
            </h2>
            <p className="text-muted-foreground mb-4">
              If you find FactorSphere helpful, consider Donating.
            </p>
            <a
              href="https://buymeacoffee.com/sameermann"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Coffee className="w-4 h-4" />
              Buy Me a Coffee            
            </a>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Contact Us
            </h2>
            <p className="text-muted-foreground mb-4">
              Have questions or feedback? Reach out to us via email.
            </p>
            <a
              href="mailto:sameer@factorsphere.org"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email Us
            </a>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Github className="w-5 h-5 text-primary" />
              Maintainers
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted border border-border">
                <img 
                  src="https://avatars.githubusercontent.com/u/80157245?v=4" 
                  alt="REXFEDEC" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-foreground">REXFEDEC</h3>
                  <p className="text-sm text-muted-foreground">Project Lead</p>
                  <a
                    href="https://github.com/REXFEDEC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors mt-1"
                  >
                    <Github className="w-3 h-3" />
                    GitHub Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
