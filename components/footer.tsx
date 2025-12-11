import Link from "next/link"
import { Sparkles, Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/owl.png" alt="FactorSphere" className="w-8 h-8 object-contain" />
          <span className="font-semibold text-foreground">FactorSphere</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Trusted Domain</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <span>*.factorsphere.org</span>
          </div>
          
          <a 
            href="https://www.dmca.com/Protection/Status.aspx?id=da19867b-343c-40eb-b11b-c4eebca09b06&refurl=https://factorsphere.org/"
            title="DMCA.com Protection Status"
            className="dmca-badge inline-flex items-center"
            target="_blank"
            rel="noopener"
          >
            <img 
              src="https://images.dmca.com/Badges/dmca_protected_sml_120ai.png?ID=da19867b-343c-40eb-b11b-c4eebca09b06" 
              alt="DMCA.com Protection Status" 
              className="h-8 w-auto"
            />
          </a>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>© 2025 FactorSphere™. All rights reserved.</p>
          <p className="mt-1">
            Licensed under the{" "}
            <a
              href="https://opensource.org/licenses/MIT"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground underline"
            >
              MIT License
            </a>
          </p>
        </div>
      </div>
      
      <script 
        src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js" 
        async
      />
    </footer>
  )
}
