# LRC Editor

A modern, web-based LRC (lyrics) generation tool built with React, TypeScript, and WaveSurfer.js. Create synchronized lyrics for your music with a clean, intuitive interface and powerful keyboard shortcuts.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cjgdev/LRCGen)

> 🚀 **Live Demo**: Coming soon after deployment!

## Features

- 🎵 **Audio Waveform Visualization** - Real-time waveform rendering with WaveSurfer.js
- ⌨️ **Keyboard Shortcuts** - Professional workflow with comprehensive shortcuts
- 📝 **Live Lyrics Editing** - Inline editing with auto-sync to playback position
- 🎯 **Timestamp Marking** - Press Enter to mark lyrics at current playback position
- 💾 **Import/Export** - Load existing LRC files or plain text, export to standard LRC format
- 🎨 **Modern UI** - Clean interface built with Mantine components
- 📱 **Responsive** - Works on desktop and mobile browsers
- 🚀 **Fast & Lightweight** - ~180KB gzipped bundle, client-side processing

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Keyboard Shortcuts

- `Space/K` - Play/Pause | `J/L` - Skip ±10s | `←/→` - Skip ±5s
- `Enter` - Mark timestamp | `Cmd/Ctrl+S` - Export LRC | `?` - Show all shortcuts
- `Cmd/Ctrl+Z` - Undo | `Cmd/Ctrl+Shift+Z` - Redo

## Deployment

### Automatic Deployment with GitHub Actions (Recommended)

This project includes a GitHub Actions workflow for **automatic deployment to Vercel** on every push.

#### Setup CI/CD (One-Time)

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com) and sign up
   - Connect your GitHub account

2. **Get Your Vercel Tokens**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login and link project
   vercel login
   vercel link
   ```

   This creates a `.vercel/project.json` file with your IDs.

3. **Get Vercel Token**
   - Go to: https://vercel.com/account/tokens
   - Click "Create Token"
   - Name it "GitHub Actions"
   - Copy the token

4. **Add GitHub Secrets**

   Go to your GitHub repo → Settings → Secrets and variables → Actions

   Add these three secrets:

   | Secret Name | Value | Where to Find |
   |-------------|-------|---------------|
   | `VERCEL_TOKEN` | Your token | From step 3 |
   | `VERCEL_ORG_ID` | org_xxx | From `.vercel/project.json` |
   | `VERCEL_PROJECT_ID` | prj_xxx | From `.vercel/project.json` |

5. **Done!** 🎉

   Now every push automatically:
   - ✅ Builds your project
   - ✅ Runs tests (if any)
   - ✅ Deploys to Vercel
   - ✅ Comments PR with preview URL

#### How It Works

- **Push to `main`** → Production deployment
- **Push to feature branch** → Preview deployment
- **Pull Request** → Preview deployment + comment with URL

#### Workflow Features

✅ Automatic dependency caching
✅ Build artifact optimization
✅ PR preview deployments
✅ Production deployments on main
✅ Deployment status in GitHub UI

---

### Manual Deployment Options

#### Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy the dist folder
npx netlify-cli deploy --prod --dir=dist
```

#### One-Click Deploy Button

Click the "Deploy with Vercel" button at the top of this README for instant deployment.

## Tech Stack

- **React 19** + **TypeScript 5** - Modern frontend
- **Vite 7** - Lightning-fast build tool
- **WaveSurfer.js 7** - Audio waveform visualization
- **Mantine 7** - UI component library
- **Zustand** - Lightweight state management

## Features Overview

### Phase 1: Foundation ✅
- Audio playback with waveform visualization
- Lyrics editing with real-time sync
- Keyboard shortcuts system
- File import/export (LRC, TXT, audio)

### Phase 2: Advanced Synchronization ✅
- Binary search for optimal performance
- Visual waveform markers for timestamps
- Batch timestamp editing
- Full undo/redo (50 levels)

### Phase 3: Polish & Productivity ✅
- Waveform zoom controls
- Auto-save every 30 seconds
- Onboarding for new users
- Loading skeletons
- Mobile-responsive design

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## License

MIT License - See LICENSE file for details

## Contributing

Contributions welcome! Please open an issue or PR.
