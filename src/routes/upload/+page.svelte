<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';

  let title = $state('');
  let description = $state('');
  let assetType = $state('sample');
  let bpm = $state('');
  let key = $state('');
  let tags = $state('');
  let file = $state<File | null>(null);
  let isDragging = $state(false);

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    isDragging = true;
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      file = files[0];
    }
  }

  function handleFileInput(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      file = target.files[0];
    }
  }

  function handleSubmit() {
    console.log('Uploading asset:', {
      title,
      description,
      assetType,
      bpm,
      key,
      tags: tags.split(',').map(t => t.trim()),
      file,
    });
    alert('Upload simulated! This is a demo application.');
  }
</script>

<div class="container mx-auto px-4 py-8 max-w-4xl">
  <div class="mb-8">
    <h1 class="text-4xl font-bold mb-2">Upload Audio Asset</h1>
    <p class="text-muted-foreground">Share your sounds with the community</p>
  </div>

  <Card class="p-6">
    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-6">
      <!-- File Upload Area -->
      <div>
        <label class="text-sm font-medium mb-2 block">Audio File</label>
        <div
          class="border-2 border-dashed rounded-lg p-8 text-center transition-colors {isDragging ? 'border-primary bg-primary/5' : 'border-border'}"
          ondragover={handleDragOver}
          ondragleave={handleDragLeave}
          ondrop={handleDrop}
        >
          {#if file}
            <div class="flex items-center justify-center gap-4">
              <Icon icon="mdi:file-music" class="h-12 w-12 text-primary" />
              <div class="text-left">
                <p class="font-medium">{file.name}</p>
                <p class="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onclick={() => file = null}
              >
                <Icon icon="mdi:close" class="h-5 w-5" />
              </Button>
            </div>
          {:else}
            <Icon icon="mdi:cloud-upload" class="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p class="text-lg font-medium mb-2">Drop your audio file here</p>
            <p class="text-sm text-muted-foreground mb-4">or click to browse</p>
            <input
              type="file"
              accept="audio/*,.mid,.midi,.fxp"
              onchange={handleFileInput}
              class="hidden"
              id="file-input"
            />
            <Button type="button" variant="outline" onclick={() => document.getElementById('file-input')?.click()}>
              Select File
            </Button>
          {/if}
        </div>
      </div>

      <!-- Asset Type -->
      <div>
        <label class="text-sm font-medium mb-2 block">Asset Type</label>
        <select
          bind:value={assetType}
          class="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="sample">Sample</option>
          <option value="loop">Loop</option>
          <option value="midi">MIDI</option>
          <option value="stem">Stem</option>
          <option value="preset">Preset</option>
        </select>
      </div>

      <!-- Title -->
      <div>
        <label for="title" class="text-sm font-medium mb-2 block">Title</label>
        <Input id="title" bind:value={title} placeholder="e.g., Heavy Kick Sample" required />
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="text-sm font-medium mb-2 block">Description</label>
        <textarea
          id="description"
          bind:value={description}
          rows="3"
          placeholder="Describe your audio asset..."
          class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        ></textarea>
      </div>

      <!-- Metadata Row -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="bpm" class="text-sm font-medium mb-2 block">BPM (Optional)</label>
          <Input id="bpm" type="number" bind:value={bpm} placeholder="e.g., 128" />
        </div>
        <div>
          <label for="key" class="text-sm font-medium mb-2 block">Key (Optional)</label>
          <Input id="key" bind:value={key} placeholder="e.g., C, Am, F#" />
        </div>
      </div>

      <!-- Tags -->
      <div>
        <label for="tags" class="text-sm font-medium mb-2 block">Tags</label>
        <Input id="tags" bind:value={tags} placeholder="e.g., trap, kick, 808, hip-hop (comma-separated)" />
        <p class="text-xs text-muted-foreground mt-1">Separate multiple tags with commas</p>
      </div>

      <!-- Submit Button -->
      <div class="flex gap-3 pt-4">
        <Button type="submit" size="lg" class="flex-1">
          <Icon icon="mdi:upload" class="h-5 w-5" />
          Upload Asset
        </Button>
        <Button type="button" variant="outline" size="lg">
          Cancel
        </Button>
      </div>
    </form>
  </Card>

  <!-- Upload Tips -->
  <Card class="p-6 mt-6">
    <h3 class="font-semibold mb-3 flex items-center gap-2">
      <Icon icon="mdi:lightbulb-outline" class="h-5 w-5 text-primary" />
      Upload Tips
    </h3>
    <ul class="space-y-2 text-sm text-muted-foreground">
      <li>• Supported formats: WAV, MP3, FLAC, OGG, MIDI, FXP</li>
      <li>• Maximum file size: 100 MB</li>
      <li>• Use descriptive titles and tags to help others discover your sounds</li>
      <li>• Include BPM and key information for loops and samples</li>
      <li>• Only upload content you own or have permission to share</li>
    </ul>
  </Card>
</div>
