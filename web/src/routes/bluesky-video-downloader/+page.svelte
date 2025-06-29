<script>
  import Omnibox from '$components/save/Omnibox.svelte';
</script>

<svelte:head>
  <title>Bluesky Video Downloader - Save Videos from Bluesky Social | Vetra</title>
  <meta name="description" content="The first and easiest way to download videos from Bluesky! Be among the first to save videos from the new social network. Our tool is free, secure, and downloads in MP4." />
</svelte:head>

<div class="page-container">
  <Omnibox title="Bluesky Video Downloader" subtitle="The simple, reliable tool to save videos from the decentralized social network, Bluesky. Paste a post link below to get the video file instantly."/>
</div>

<style>
  .page-container {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--padding);
  }
</style>