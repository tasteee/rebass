<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>SoundShare - Community Audio Sharing Platform</title>
	<meta name="description" content="Share and discover free audio samples, loops, MIDI, stems, and synth presets" />
</svelte:head>

<div class="min-h-screen bg-background">
	<Navigation />
	<main>
		{@render children?.()}
	</main>
</div>
