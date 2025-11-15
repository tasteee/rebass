<script lang="ts">
  import Icon from '@iconify/svelte';
  import PackCard from '$lib/components/PackCard.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { mockPacks } from '$lib/data';
</script>

<div class="container mx-auto px-4 py-8">
  <!-- Header -->
  <div class="flex items-center justify-between mb-8">
    <div>
      <h1 class="text-4xl font-bold mb-2">Sound Packs</h1>
      <p class="text-muted-foreground">Curated collections of audio assets</p>
    </div>
    <Button>
      <Icon icon="mdi:plus" class="h-5 w-5" />
      Create Pack
    </Button>
  </div>

  <!-- Featured Pack -->
  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-4">Featured Pack</h2>
    {#if mockPacks[0]}
      <div class="relative rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20 p-8">
        <div class="relative z-10 max-w-2xl">
          <div class="flex items-center gap-2 mb-2">
            <span class="px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm font-medium">
              Featured
            </span>
          </div>
          <h3 class="text-3xl font-bold mb-2">{mockPacks[0].title}</h3>
          <p class="text-lg text-muted-foreground mb-4">{mockPacks[0].description}</p>
          <div class="flex items-center gap-4 text-sm mb-6">
            <span class="flex items-center gap-1">
              <Icon icon="mdi:file-music-outline" class="h-5 w-5" />
              {mockPacks[0].assets.length} Assets
            </span>
            <span class="flex items-center gap-1">
              <Icon icon="mdi:heart" class="h-5 w-5" />
              {mockPacks[0].likes} Likes
            </span>
            <span class="flex items-center gap-1">
              <Icon icon="mdi:download" class="h-5 w-5" />
              {mockPacks[0].downloads} Downloads
            </span>
          </div>
          <div class="flex gap-3">
            <Button size="lg">
              <Icon icon="mdi:download" class="h-5 w-5" />
              Download Pack
            </Button>
            <Button size="lg" variant="outline">
              View Details
            </Button>
          </div>
        </div>
        <div class="absolute inset-0 opacity-10">
          <Icon icon="mdi:package-variant" class="h-full w-auto text-primary" />
        </div>
      </div>
    {/if}
  </section>

  <!-- All Packs -->
  <section>
    <h2 class="text-2xl font-bold mb-6">All Packs</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each mockPacks as pack (pack.id)}
        <PackCard {pack} />
      {/each}
    </div>
  </section>
</div>
