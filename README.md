# rebass [IDEA]

A community-driven platform for sharing free audio samples, loops, MIDI, stems, and synth presets. Users can upload, tag, and preview assets; build and share packs; follow creators; like and download content; and discover new sounds through search, filters, and collections—all powered by a modern, social, creator-focused design.

## 🧩 PROJECT BREAKDOWN

### 🏗️ 1. Core Setup

**Goal:** Get the environment, routing, and infrastructure stable before feature work.
**Tasks:**

* [ ] Initialize monorepo (or single repo) structure — `/apps/web` (Svelte), `/apps/server` (Hono), `/packages/ui` (optional shared UI lib)
* [ ] Configure **Bun + Hono** server with hot reload
* [ ] Connect **Supabase** (auth, storage, db)
* [ ] Define `.env` structure (Supabase keys, API URLs)
* [ ] Set up basic **Hono routes** + middleware (auth check, error handler, CORS)
* [ ] Initialize **SvelteKit 5 app** with Tailwind + Shadcn-svelte + Iconify
* [ ] Add global layout, typography, and component theme

---

### 👥 2. Authentication & User System

**Goal:** User identity + profile editing fully functional.
**Tasks:**

* [ ] Set up **Supabase Auth** (email/password, OAuth optional)
* [ ] Implement signup, login, logout
* [ ] Create `/profile` route
* [ ] User profile model in Supabase:

  ```sql
  id (uuid)
  username
  email
  avatar_url
  bio
  urls (jsonb)
  created_at
  updated_at
  ```
* [ ] Implement “Edit Profile” form (username, bio, urls, avatar upload)
* [ ] Avatar upload → Supabase Storage (user-avatars/)
* [ ] Add “Delete Account” flow (soft delete or cascade delete)
* [ ] Auth middleware on backend routes

---

### 🗂️ 3. Asset System (Core Content)

**Goal:** Upload + manage individual audio assets.
**Tasks:**

* [ ] Supabase tables:

  ```sql
  assets (
    id uuid,
    user_id uuid (fk),
    name text,
    description text,
    tags text[],
    type enum('sample','loop','midi','stem','preset'),
    key text,
    scale text,
    tempo numeric,
    preview_url text,
    file_url text,
    created_at timestamp
  )
  ```
* [ ] Storage buckets:

  * `asset-previews/` (mp3 or ogg)
  * `assets/` (zip, wav, midi, etc)
* [ ] File upload UI (drag/drop)
* [ ] Metadata form (tags, tempo, key, etc)
* [ ] Create, update, delete asset
* [ ] Asset detail view (preview player + download button)
* [ ] Like / Unlike asset
* [ ] Report asset (reason, optional text)
* [ ] Search/filter assets (by tag, type, bpm, key)
* [ ] Pagination + infinite scroll for asset browsing

---

### 🎛️ 4. Collections & Packs

**Goal:** Group assets into “packs” and handle pack metadata.
**Tasks:**

* [ ] Supabase tables:

  ```sql
  asset_packs (
    id uuid,
    user_id uuid (fk),
    name text,
    description text,
    tags text[],
    artwork_url text,
    created_at timestamp
  )

  asset_pack_items (
    id uuid,
    pack_id uuid (fk),
    asset_id uuid (fk)
  )
  ```
* [ ] Pack creation form (upload artwork, add existing assets or upload new)
* [ ] Minimum of 5 assets validation
* [ ] Pack view page (displays all assets inside)
* [ ] Pack preview (plays random or selected asset)
* [ ] Like / Unlike / Report pack
* [ ] Download entire pack (zip server-side)
* [ ] Delete own packs

---

### ❤️ 5. Social Graph

**Goal:** Enable user discovery and interaction.
**Tasks:**

* [ ] Supabase tables:

  ```sql
  follows (
    follower_id uuid,
    following_id uuid
  )
  likes (
    user_id uuid,
    asset_id uuid nullable,
    pack_id uuid nullable
  )
  reports (
    user_id uuid,
    asset_id uuid nullable,
    pack_id uuid nullable,
    reason text
  )
  ```
* [ ] Follow / Unfollow logic + UI
* [ ] User profile pages (their assets + packs + liked)
* [ ] Like / Unlike integrated on list cards
* [ ] Feed: show assets from followed users

---

### 🔍 6. Discovery, Search, Browse

**Goal:** Find and explore content easily.
**Tasks:**

* [ ] Global search bar
* [ ] Search by name, tag, user, type
* [ ] Filter by type, genre, bpm, key, popularity, recency
* [ ] Sort by likes, date
* [ ] Browse “Trending”, “New”, “Top Packs”, “Top Creators”
* [ ] Pagination + lazy loading

---

### 🎧 7. Player & Preview System

**Goal:** Inline preview player across asset cards and pack pages.
**Tasks:**

* [ ] Lightweight audio player component (with progress bar + play/pause)
* [ ] Global “now playing” bar
* [ ] Auto-stop others when one is playing
* [ ] Preload / lazy-load previews

---

### 🧱 8. Moderation & Reporting

**Goal:** Handle reported content safely.
**Tasks:**

* [ ] `reports` table (as above)
* [ ] Admin dashboard (simple Hono endpoint for viewing reports)
* [ ] Email / webhook notification to admin on report
* [ ] Temporary disable asset until reviewed (soft flag)

---

### 🌐 9. Frontend Polish

**Goal:** Bring it to production quality.
**Tasks:**

* [ ] Global design system (colors, spacing, typography)
* [ ] Reusable components:

  * `AssetCard`, `PackCard`, `UserCard`, `AudioPlayer`, `TagList`, `UserAvatar`, `FollowButton`
* [ ] Responsive layout
* [ ] Skeleton loaders
* [ ] Empty states, error states, toast notifications

---

### 🚀 10. Deployment

**Goal:** Make it public-ready.
**Tasks:**

* [ ] Deploy frontend (Vercel / Netlify)
* [ ] Deploy backend (Bun + Hono → Fly.io or Railway)
* [ ] Configure Supabase policies for RLS
* [ ] Environment variables setup
* [ ] Run production tests (uploads, downloads, auth, likes)
* [ ] Monitor errors + analytics (Sentry, Posthog)

---

## 🧠 Suggested Missing Features

You’ll likely want these long-term (optional for MVP):

* [ ] **Comments** on assets/packs
* [ ] **Notifications** (likes, follows, new uploads)
* [ ] **User playlists / favorites**
* [ ] **Batch upload / drag-and-drop multiple assets**
* [ ] **Automatic preview generation** for uploaded WAV/AIFF (FFmpeg worker)
* [ ] **Admin dashboard** (ban users, delete assets)
* [ ] **Rate limiting** on upload/download/report
* [ ] **Invite-only / beta mode** toggle
