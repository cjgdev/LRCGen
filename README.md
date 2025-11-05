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

### Deploy to Vercel (Recommended)

The easiest way to deploy is using Vercel:

1. **Option 1: Click the Deploy Button**
   - Click the "Deploy with Vercel" button above
   - Connect your GitHub account
   - Vercel will auto-detect settings and deploy

2. **Option 2: Vercel CLI**
   ```bash
   npm i -g vercel
   vercel
   ```

3. **Option 3: GitHub Integration**
   - Push to GitHub
   - Import project in Vercel dashboard
   - Auto-deploys on every push

### Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy the dist folder
npx netlify-cli deploy --prod --dir=dist
```

### Deploy to GitHub Pages

Use the included GitHub Actions workflow in `.github/workflows/deploy.yml`

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
