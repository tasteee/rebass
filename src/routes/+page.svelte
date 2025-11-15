<script lang="ts">
  import Icon from '@iconify/svelte';
  import AudioAssetCard from '$lib/components/AudioAssetCard.svelte';
  import PackCard from '$lib/components/PackCard.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { mockAssets, mockPacks } from '$lib/data';

  let activeTab = $state('assets');
  let selectedType = $state('all');

  const filteredAssets = $derived(
    selectedType === 'all' 
      ? mockAssets 
      : mockAssets.filter(a => a.type === selectedType)
  );
</script>

<div class="container mx-auto px-4 py-8">
  <!-- Hero Section -->
  <section class="mb-12 text-center py-12">
    <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
      Discover & Share Audio
    </h1>
    <p class="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
      A community-driven platform for free audio samples, loops, MIDI, stems, and synth presets
    </p>
    <div class="flex gap-4 justify-center">
      <Button size="lg">
        <Icon icon="mdi:upload" class="h-5 w-5" />
        Upload Your Sounds
      </Button>
      <Button size="lg" variant="outline">
        <Icon icon="mdi:compass-outline" class="h-5 w-5" />
        Explore
      </Button>
    </div>
  </section>

  <!-- Tabs -->
  <div class="flex gap-4 mb-6 border-b">
    <button
      class="px-4 py-2 -mb-px border-b-2 transition-colors {activeTab === 'assets' ? 'border-primary text-primary font-medium' : 'border-transparent text-muted-foreground hover:text-foreground'}"
      onclick={() => activeTab = 'assets'}
    >
      <Icon icon="mdi:waveform" class="inline h-5 w-5 mr-2" />
      Assets
    </button>
    <button
      class="px-4 py-2 -mb-px border-b-2 transition-colors {activeTab === 'packs' ? 'border-primary text-primary font-medium' : 'border-transparent text-muted-foreground hover:text-foreground'}"
      onclick={() => activeTab = 'packs'}
    >
      <Icon icon="mdi:package-variant" class="inline h-5 w-5 mr-2" />
      Packs
    </button>
  </div>

  {#if activeTab === 'assets'}
    <!-- Asset Type Filter -->
    <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
      <Button
        variant={selectedType === 'all' ? 'default' : 'outline'}
        size="sm"
        onclick={() => selectedType = 'all'}
      >
        All
      </Button>
      <Button
        variant={selectedType === 'sample' ? 'default' : 'outline'}
        size="sm"
        onclick={() => selectedType = 'sample'}
      >
        <Icon icon="mdi:waveform" class="h-4 w-4" />
        Samples
      </Button>
      <Button
        variant={selectedType === 'loop' ? 'default' : 'outline'}
        size="sm"
        onclick={() => selectedType = 'loop'}
      >
        <Icon icon="mdi:sync" class="h-4 w-4" />
        Loops
      </Button>
      <Button
        variant={selectedType === 'midi' ? 'default' : 'outline'}
        size="sm"
        onclick={() => selectedType = 'midi'}
      >
        <Icon icon="mdi:piano" class="h-4 w-4" />
        MIDI
      </Button>
      <Button
        variant={selectedType === 'stem' ? 'default' : 'outline'}
        size="sm"
        onclick={() => selectedType = 'stem'}
      >
        <Icon icon="mdi:layers" class="h-4 w-4" />
        Stems
      </Button>
      <Button
        variant={selectedType === 'preset' ? 'default' : 'outline'}
        size="sm"
        onclick={() => selectedType = 'preset'}
      >
        <Icon icon="mdi:tune" class="h-4 w-4" />
        Presets
      </Button>
    </div>

    <!-- Assets Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {#each filteredAssets as asset (asset.id)}
        <AudioAssetCard {asset} />
      {/each}
    </div>
  {:else}
    <!-- Packs Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each mockPacks as pack (pack.id)}
        <PackCard {pack} />
      {/each}
    </div>
  {/if}
</div>

<!-- Footer -->
<footer class="border-t mt-16 py-8">
  <div class="container mx-auto px-4 text-center text-sm text-muted-foreground">
    <p>SoundShare - Community Audio Sharing Platform</p>
    <p class="mt-2">Built with Svelte 5, Tailwind CSS, and ❤️</p>
  </div>
</footer>
