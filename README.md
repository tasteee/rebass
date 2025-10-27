# SoundShare - Community Audio Sharing Platform

A modern, community-driven platform for sharing free audio samples, loops, MIDI, stems, and synth presets. Built with Svelte 5, Tailwind CSS, and shadcn-svelte components.

![Homepage Screenshot](https://github.com/user-attachments/assets/38e1ee75-ef6c-4bb0-bc4e-4db4058da3ef)

## Features

### Core Functionality
- **Audio Asset Management**: Upload, tag, and preview audio samples, loops, MIDI files, stems, and synth presets
- **Pack System**: Create and share curated collections of audio assets
- **Social Features**: Follow creators, like content, and download assets
- **Discovery**: Search, filter by tags, and explore content through multiple views
- **User Profiles**: View creator profiles with their assets and packs

### Asset Types Supported
- 🎵 **Samples**: One-shot audio samples (kicks, snares, etc.)
- 🔄 **Loops**: Repeating audio patterns
- 🎹 **MIDI**: MIDI files with chord progressions and melodies
- 🎚️ **Stems**: Individual instrument tracks
- 🎛️ **Presets**: Synthesizer and effect presets

## Screenshots

### Explore Page
![Explore Page](https://github.com/user-attachments/assets/f99966e1-7b89-4f88-a14d-bd983d1b8c89)

### Upload Page
![Upload Page](https://github.com/user-attachments/assets/e4913cc9-cf44-4880-8dea-25ba42b076ec)

### Packs Page
![Packs Page](https://github.com/user-attachments/assets/a6a52c97-f0a8-45a0-a99b-2e21d465cfb0)

### Profile Page
![Profile Page](https://github.com/user-attachments/assets/9b405738-21ab-43ec-802d-3a16a3694a37)

## Tech Stack

- **Framework**: Svelte 5 (latest) with SvelteKit
- **Styling**: Tailwind CSS v3
- **Icons**: @iconify/svelte
- **UI Components**: Custom components inspired by shadcn-svelte
- **Language**: TypeScript
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.svelte
│   │   │   ├── Card.svelte
│   │   │   └── Input.svelte
│   │   ├── AudioAssetCard.svelte
│   │   ├── PackCard.svelte
│   │   └── Navigation.svelte
│   ├── data.ts              # Mock data for development
│   ├── stores.ts            # Svelte stores for state management
│   ├── types.ts             # TypeScript type definitions
│   └── utils.ts             # Utility functions
├── routes/
│   ├── +layout.svelte       # Root layout
│   ├── +page.svelte         # Home page
│   ├── explore/             # Browse and filter assets
│   ├── packs/               # View sound packs
│   ├── upload/              # Upload new assets
│   └── profile/[username]/  # User profiles
└── app.css                  # Global styles and Tailwind imports
```

## Pages

### Home (`/`)
- Hero section with call-to-action
- Tabbed view for Assets and Packs
- Filter by asset type (All, Samples, Loops, MIDI, Stems, Presets)
- Grid display of audio assets

### Explore (`/explore`)
- Advanced search and filtering
- Sort by popularity, likes, or recency
- Filter by multiple tags
- Sidebar navigation

### Packs (`/packs`)
- Featured pack showcase
- Grid of all available packs
- Pack creation button

### Upload (`/upload`)
- Drag-and-drop file upload
- Asset metadata form (title, description, BPM, key, tags)
- Asset type selection
- Upload guidelines

### Profile (`/profile/:username`)
- User information and stats
- Tabbed view of user's assets and packs
- Follow/unfollow functionality

## Key Features Implementation

### State Management
Uses Svelte 5's runes (`$state`, `$derived`) and Svelte stores for:
- Current user authentication
- Currently playing audio
- Liked assets
- Following relationships
- Search and filter state

### Mock Data
The application includes comprehensive mock data in `src/lib/data.ts`:
- 3 mock users with different roles
- 8 diverse audio assets
- 3 curated packs

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactions
- Optimized for desktop, tablet, and mobile

### Type Safety
Full TypeScript support with defined interfaces for:
- User
- AudioAsset
- Pack
- Collection

## Styling

The application uses a custom design system built on Tailwind CSS with:
- CSS variables for theming
- Dark mode support (structure in place)
- Custom color palette focused on purple/primary accent
- Consistent spacing and typography
- Smooth transitions and hover effects

## Future Enhancements

Potential features for future development:
- Real audio playback with Web Audio API
- Actual file upload to cloud storage
- User authentication and authorization
- Real-time collaboration features
- Waveform visualization
- Audio effects and processing
- Comments and discussions
- Download history tracking
- Advanced analytics

## Development

```bash
# Run type checking
npm run check

# Run in watch mode
npm run check:watch

# Build the project
npm run build
```

## License

MIT

## Credits

Built with ❤️ using Svelte 5 and Tailwind CSS
