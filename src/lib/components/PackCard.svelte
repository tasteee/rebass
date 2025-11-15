<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from './ui/Card.svelte';
  import Button from './ui/Button.svelte';
  import type { Pack } from '$lib/types';

  let {
    pack
  }: {
    pack: Pack;
  } = $props();
</script>

<Card class="overflow-hidden hover:shadow-lg transition-shadow">
  <!-- Cover Image -->
  <div class="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
    {#if pack.coverImage}
      <img src={pack.coverImage} alt={pack.title} class="w-full h-full object-cover" />
    {:else}
      <div class="w-full h-full flex items-center justify-center">
        <Icon icon="mdi:package-variant" class="h-16 w-16 text-primary/50" />
      </div>
    {/if}
    
    <!-- Asset Count Badge -->
    <div class="absolute top-2 right-2 px-3 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
      {pack.assets.length} Assets
    </div>
  </div>

  <!-- Pack Info -->
  <div class="p-4">
    <h3 class="font-bold text-lg mb-1 line-clamp-1">{pack.title}</h3>
    
    <a href="/profile/{pack.creator.username}" class="text-sm text-muted-foreground hover:text-primary transition-colors mb-2 block">
      by {pack.creator.displayName}
      {#if pack.creator.verified}
        <Icon icon="mdi:check-decagram" class="inline h-3 w-3 text-primary" />
      {/if}
    </a>

    <p class="text-sm text-muted-foreground mb-3 line-clamp-2">{pack.description}</p>

    <!-- Tags -->
    <div class="flex flex-wrap gap-1 mb-3">
      {#each pack.tags.slice(0, 3) as tag}
        <span class="px-2 py-0.5 rounded-md bg-secondary text-xs text-secondary-foreground">
          #{tag}
        </span>
      {/each}
    </div>

    <!-- Stats & Actions -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3 text-sm text-muted-foreground">
        <span class="flex items-center gap-1">
          <Icon icon="mdi:heart" class="h-4 w-4" />
          {pack.likes}
        </span>
        <span class="flex items-center gap-1">
          <Icon icon="mdi:download" class="h-4 w-4" />
          {pack.downloads}
        </span>
      </div>
      <Button size="sm" variant="default">
        View Pack
      </Button>
    </div>
  </div>
</Card>
