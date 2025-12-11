import Link from "next/link"
import { Sparkles, Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-6 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/owl.png" alt="FactorSphere" className="w-6 h-6 object-contain" />
          <span className="font-semibold text-foreground text-sm">FactorSphere</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Trusted</span>
          </div>
          <span>*.factorsphere.org</span>
          <a 
            href="https://www.dmca.com/Protection/Status.aspx?id=da19867b-343c-40eb-b11b-c4eebca09b06&refurl=https://factorsphere.org/"
            title="DMCA.com Protection Status"
            className="inline-flex items-center"
            target="_blank"
            rel="noopener"
          >
            <img 
              src="/dmca-notice.png" 
              alt="DMCA.com Protection Status" 
              className="h-6 w-auto"
            />
          </a>
        </div>

        <div className="text-xs text-muted-foreground">
          © 2025 FactorSphere™ • MIT License
        </div>
      </div>
      
      <script 
        src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js" 
        async
      />
    </footer>
  )
}
