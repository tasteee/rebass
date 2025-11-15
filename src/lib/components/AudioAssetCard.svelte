<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from './ui/Card.svelte';
  import Button from './ui/Button.svelte';
  import type { AudioAsset } from '$lib/types';
  import { likedAssets, currentlyPlaying } from '$lib/stores';
  import { cn } from '$lib/utils';

  let {
    asset
  }: {
    asset: AudioAsset;
  } = $props();

  let isLiked = $derived($likedAssets.has(asset.id));
  let isPlaying = $derived($currentlyPlaying?.id === asset.id);

  function toggleLike() {
    likedAssets.update(likes => {
      const newLikes = new Set(likes);
      if (newLikes.has(asset.id)) {
        newLikes.delete(asset.id);
      } else {
        newLikes.add(asset.id);
      }
      return newLikes;
    });
  }

  function togglePlay() {
    if (isPlaying) {
      currentlyPlaying.set(null);
    } else {
      currentlyPlaying.set(asset);
    }
  }

  const typeColors = {
    sample: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    loop: 'bg-green-500/10 text-green-500 border-green-500/20',
    midi: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    stem: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    preset: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  };

  const typeIcons = {
    sample: 'mdi:waveform',
    loop: 'mdi:sync',
    midi: 'mdi:piano',
    stem: 'mdi:layers',
    preset: 'mdi:tune',
  };
</script>

<Card class="overflow-hidden hover:shadow-lg transition-shadow">
  <!-- Waveform / Preview Area -->
  <div class="relative h-32 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group cursor-pointer" onclick={togglePlay}>
    <!-- Play Button Overlay -->
    <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
      <Button size="icon" variant="ghost" class="h-16 w-16 rounded-full bg-primary/90 hover:bg-primary text-white">
        {#if isPlaying}
          <Icon icon="mdi:pause" class="h-8 w-8" />
        {:else}
          <Icon icon="mdi:play" class="h-8 w-8" />
        {/if}
      </Button>
    </div>

    <!-- Waveform visualization placeholder -->
    <div class="w-full h-full flex items-center px-4">
      {#each Array(50) as _, i}
        <div 
          class="flex-1 bg-primary/30 mx-px rounded-full transition-all group-hover:bg-primary/50"
          style="height: {Math.random() * 80 + 20}%"
        ></div>
      {/each}
    </div>

    <!-- Type Badge -->
    <div class={cn('absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-medium border backdrop-blur-sm', typeColors[asset.type])}>
      <Icon icon={typeIcons[asset.type]} class="inline h-3 w-3 mr-1" />
      {asset.type.toUpperCase()}
    </div>
  </div>

  <!-- Asset Info -->
  <div class="p-4">
    <div class="flex items-start justify-between mb-2">
      <div class="flex-1">
        <h3 class="font-semibold text-sm mb-1 line-clamp-1">{asset.title}</h3>
        <a href="/profile/{asset.creator.username}" class="text-xs text-muted-foreground hover:text-primary transition-colors">
          {asset.creator.displayName}
          {#if asset.creator.verified}
            <Icon icon="mdi:check-decagram" class="inline h-3 w-3 text-primary" />
          {/if}
        </a>
      </div>
    </div>

    <!-- Metadata -->
    {#if asset.bpm || asset.key}
      <div class="flex gap-2 mb-3 text-xs text-muted-foreground">
        {#if asset.bpm}
          <span class="flex items-center gap-1">
            <Icon icon="mdi:metronome" class="h-3 w-3" />
            {asset.bpm} BPM
          </span>
        {/if}
        {#if asset.key}
          <span class="flex items-center gap-1">
            <Icon icon="mdi:music-note" class="h-3 w-3" />
            {asset.key}
          </span>
        {/if}
        {#if asset.duration}
          <span class="flex items-center gap-1">
            <Icon icon="mdi:clock-outline" class="h-3 w-3" />
            {asset.duration}s
          </span>
        {/if}
      </div>
    {/if}

    <!-- Tags -->
    <div class="flex flex-wrap gap-1 mb-3">
      {#each asset.tags.slice(0, 3) as tag}
        <span class="px-2 py-0.5 rounded-md bg-secondary text-xs text-secondary-foreground">
          #{tag}
        </span>
      {/each}
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3 text-sm text-muted-foreground">
        <button onclick={toggleLike} class="flex items-center gap-1 hover:text-primary transition-colors">
          <Icon icon={isLiked ? 'mdi:heart' : 'mdi:heart-outline'} class={cn('h-4 w-4', isLiked && 'text-red-500')} />
          <span>{asset.likes}</span>
        </button>
        <span class="flex items-center gap-1">
          <Icon icon="mdi:download" class="h-4 w-4" />
          {asset.downloads}
        </span>
      </div>
      <Button size="sm" variant="outline">
        <Icon icon="mdi:download" class="h-4 w-4" />
        Download
      </Button>
    </div>
  </div>
</Card>
