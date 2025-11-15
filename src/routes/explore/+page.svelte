<script lang="ts">
  import Icon from '@iconify/svelte';
  import AudioAssetCard from '$lib/components/AudioAssetCard.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { mockAssets } from '$lib/data';

  let searchQuery = $state('');
  let selectedTags = $state<string[]>([]);
  let sortBy = $state('popular');

  // Get all unique tags
  const allTags = $derived(
    Array.from(new Set(mockAssets.flatMap(a => a.tags)))
  );

  // Filter and sort assets
  const filteredAssets = $derived(
    mockAssets
      .filter(asset => {
        const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            asset.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTags = selectedTags.length === 0 || 
                          selectedTags.some(tag => asset.tags.includes(tag));
        return matchesSearch && matchesTags;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.downloads - a.downloads;
        if (sortBy === 'likes') return b.likes - a.likes;
        if (sortBy === 'recent') return b.createdAt.getTime() - a.createdAt.getTime();
        return 0;
      })
  );

  function toggleTag(tag: string) {
    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter(t => t !== tag);
    } else {
      selectedTags = [...selectedTags, tag];
    }
  }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="mb-8">
    <h1 class="text-4xl font-bold mb-2">Explore Sounds</h1>
    <p class="text-muted-foreground">Discover amazing audio assets from the community</p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <!-- Filters Sidebar -->
    <aside class="lg:col-span-1">
      <div class="sticky top-4 space-y-6">
        <!-- Search -->
        <div>
          <label class="text-sm font-medium mb-2 block">Search</label>
          <Input bind:value={searchQuery} placeholder="Search assets..." />
        </div>

        <!-- Sort -->
        <div>
          <label class="text-sm font-medium mb-2 block">Sort By</label>
          <select
            bind:value={sortBy}
            class="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="popular">Most Popular</option>
            <option value="likes">Most Liked</option>
            <option value="recent">Most Recent</option>
          </select>
        </div>

        <!-- Tags Filter -->
        <div>
          <label class="text-sm font-medium mb-2 block">Filter by Tags</label>
          <div class="flex flex-wrap gap-2">
            {#each allTags as tag}
              <button
                onclick={() => toggleTag(tag)}
                class="px-3 py-1 rounded-md text-xs transition-colors {selectedTags.includes(tag) ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}"
              >
                #{tag}
              </button>
            {/each}
          </div>
        </div>

        {#if selectedTags.length > 0}
          <Button variant="outline" size="sm" onclick={() => selectedTags = []}>
            Clear Filters
          </Button>
        {/if}
      </div>
    </aside>

    <!-- Results -->
    <div class="lg:col-span-3">
      <div class="flex items-center justify-between mb-4">
        <p class="text-sm text-muted-foreground">
          {filteredAssets.length} assets found
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {#each filteredAssets as asset (asset.id)}
          <AudioAssetCard {asset} />
        {/each}
      </div>

      {#if filteredAssets.length === 0}
        <div class="text-center py-12">
          <Icon icon="mdi:folder-open-outline" class="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 class="text-lg font-medium mb-2">No assets found</h3>
          <p class="text-muted-foreground">Try adjusting your filters or search query</p>
        </div>
      {/if}
    </div>
  </div>
</div>
