# FactorSphere - Academic Journal Rankings

A community-driven academic journal ranking platform with transparent methodology and real-time updates.

## Deployment on Cloudflare Pages

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Cloudflare account

### Build and Export Commands

The project is configured for static export and can be deployed using:

```bash
npm run build && npm run export
```

This will:
1. Build the Next.js application with static export configuration
2. Generate static HTML files in the `out/` directory
3. Create optimized bundles for all pages

### Manual Deployment to Cloudflare Pages

1. **Build the project locally:**
   ```bash
   npm run build && npm run export
   ```

2. **Upload to Cloudflare Pages:**
   - Go to Cloudflare Dashboard > Pages
   - Create a new project > Upload assets
   - Drag and drop the contents of the `out/` directory
   - Set build settings (not needed for static sites)
   - Deploy

3. **Or use Wrangler CLI:**
   ```bash
   npx wrangler pages deploy out --project-name factorsphere
   ```

### Automatic Deployment (Git Integration)

1. Push your code to a Git repository (GitHub/GitLab)
2. In Cloudflare Pages, connect your repository
3. Set the build configuration:
   - **Build command:** `npm run build && npm run export`
   - **Build output directory:** `out`
   - **Node.js version:** `18` or higher

### Project Structure

- `out/` - Static build output (generated)
- `app/` - Next.js app router pages
- `components/` - React components
- `public/` - Static assets and data files
- `hooks/` - Custom React hooks for data fetching

### Configuration Details

The project uses Next.js static export mode with:
- `output: 'export'` in next.config.mjs
- `trailingSlash: true` for proper routing
- `distDir: 'out'` for build output
- Static generation for popular journal routes
- Client-side fallback for dynamic journal routes

### Data Files

- `public/factorsphere_data.json` - Journal database (8MB)
- `public/dictionary.csv` - Field definitions
- These files are included in the static build

### Environment Variables

No environment variables are required for static deployment.

### Performance Notes

- The build generates static pages for 5 popular journals
- Dynamic journal routes redirect to a fallback page
- All data is bundled into the static build
- Images are unoptimized for static compatibility
