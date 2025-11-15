<script lang="ts">
  import Icon from '@iconify/svelte';
  import Button from './ui/Button.svelte';
  import { currentUser } from '$lib/stores';
</script>

<nav class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div class="container mx-auto flex h-16 items-center px-4">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-2 font-bold text-xl">
      <Icon icon="mdi:waveform" class="h-6 w-6 text-primary" />
      <span>SoundShare</span>
    </a>

    <!-- Search Bar -->
    <div class="flex-1 max-w-xl mx-8">
      <div class="relative">
        <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search samples, loops, packs..."
          class="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </div>

    <!-- Navigation Links -->
    <div class="flex items-center gap-6">
      <a href="/explore" class="text-sm font-medium hover:text-primary transition-colors">
        Explore
      </a>
      <a href="/packs" class="text-sm font-medium hover:text-primary transition-colors">
        Packs
      </a>
      <a href="/upload" class="text-sm font-medium hover:text-primary transition-colors">
        Upload
      </a>
    </div>

    <!-- User Actions -->
    <div class="flex items-center gap-2 ml-6">
      {#if $currentUser}
        <Button variant="ghost" size="icon">
          <Icon icon="mdi:bell-outline" class="h-5 w-5" />
        </Button>
        <a href="/profile/{$currentUser.username}">
          <img
            src={$currentUser.avatar}
            alt={$currentUser.displayName}
            class="h-8 w-8 rounded-full border-2 border-primary"
          />
        </a>
      {:else}
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
        <Button size="sm">
          Sign Up
        </Button>
      {/if}
    </div>
  </div>
</nav>
