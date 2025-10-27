<script lang="ts">
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
  import AudioAssetCard from '$lib/components/AudioAssetCard.svelte';
  import PackCard from '$lib/components/PackCard.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { mockUsers, mockAssets, mockPacks } from '$lib/data';
  import { followingUsers, currentUser } from '$lib/stores';

  const username = $derived($page.params.username);
  const user = $derived(mockUsers.find(u => u.username === username));
  const userAssets = $derived(mockAssets.filter(a => a.creator.username === username));
  const userPacks = $derived(mockPacks.filter(p => p.creator.username === username));
  
  let isFollowing = $derived($followingUsers.has(user?.id || ''));
  let isOwnProfile = $derived($currentUser?.username === username);

  let activeTab = $state('assets');

  function toggleFollow() {
    if (!user) return;
    followingUsers.update(following => {
      const newFollowing = new Set(following);
      if (newFollowing.has(user.id)) {
        newFollowing.delete(user.id);
      } else {
        newFollowing.add(user.id);
      }
      return newFollowing;
    });
  }
</script>

{#if user}
  <div class="border-b bg-gradient-to-br from-primary/5 to-purple-500/5">
    <div class="container mx-auto px-4 py-12">
      <div class="flex items-start gap-6">
        <!-- Avatar -->
        <img
          src={user.avatar}
          alt={user.displayName}
          class="w-32 h-32 rounded-full border-4 border-primary shadow-lg"
        />

        <!-- Profile Info -->
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <h1 class="text-3xl font-bold">{user.displayName}</h1>
            {#if user.verified}
              <Icon icon="mdi:check-decagram" class="h-6 w-6 text-primary" />
            {/if}
          </div>
          <p class="text-muted-foreground mb-4">@{user.username}</p>
          
          {#if user.bio}
            <p class="text-lg mb-4 max-w-2xl">{user.bio}</p>
          {/if}

          <!-- Stats -->
          <div class="flex items-center gap-6 mb-4 text-sm">
            <div>
              <span class="font-bold">{userAssets.length}</span>
              <span class="text-muted-foreground"> Assets</span>
            </div>
            <div>
              <span class="font-bold">{user.followers}</span>
              <span class="text-muted-foreground"> Followers</span>
            </div>
            <div>
              <span class="font-bold">{user.following}</span>
              <span class="text-muted-foreground"> Following</span>
            </div>
          </div>

          <!-- Actions -->
          {#if !isOwnProfile}
            <Button onclick={toggleFollow}>
              <Icon icon={isFollowing ? 'mdi:check' : 'mdi:plus'} class="h-5 w-5" />
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          {:else}
            <Button variant="outline">
              <Icon icon="mdi:pencil" class="h-5 w-5" />
              Edit Profile
            </Button>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <div class="container mx-auto px-4 py-8">
    <!-- Tabs -->
    <div class="flex gap-4 mb-6 border-b">
      <button
        class="px-4 py-2 -mb-px border-b-2 transition-colors {activeTab === 'assets' ? 'border-primary text-primary font-medium' : 'border-transparent text-muted-foreground hover:text-foreground'}"
        onclick={() => activeTab = 'assets'}
      >
        <Icon icon="mdi:waveform" class="inline h-5 w-5 mr-2" />
        Assets ({userAssets.length})
      </button>
      <button
        class="px-4 py-2 -mb-px border-b-2 transition-colors {activeTab === 'packs' ? 'border-primary text-primary font-medium' : 'border-transparent text-muted-foreground hover:text-foreground'}"
        onclick={() => activeTab = 'packs'}
      >
        <Icon icon="mdi:package-variant" class="inline h-5 w-5 mr-2" />
        Packs ({userPacks.length})
      </button>
    </div>

    {#if activeTab === 'assets'}
      {#if userAssets.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {#each userAssets as asset (asset.id)}
            <AudioAssetCard {asset} />
          {/each}
        </div>
      {:else}
        <div class="text-center py-12">
          <Icon icon="mdi:music-note-off-outline" class="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 class="text-lg font-medium mb-2">No assets yet</h3>
          <p class="text-muted-foreground">This user hasn't uploaded any assets</p>
        </div>
      {/if}
    {:else}
      {#if userPacks.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each userPacks as pack (pack.id)}
            <PackCard {pack} />
          {/each}
        </div>
      {:else}
        <div class="text-center py-12">
          <Icon icon="mdi:package-variant-closed" class="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 class="text-lg font-medium mb-2">No packs yet</h3>
          <p class="text-muted-foreground">This user hasn't created any packs</p>
        </div>
      {/if}
    {/if}
  </div>
{:else}
  <div class="container mx-auto px-4 py-16 text-center">
    <Icon icon="mdi:account-off-outline" class="h-16 w-16 mx-auto text-muted-foreground mb-4" />
    <h1 class="text-2xl font-bold mb-2">User not found</h1>
    <p class="text-muted-foreground">The user @{username} doesn't exist</p>
  </div>
{/if}
