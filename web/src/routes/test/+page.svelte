<!-- src/routes/test/+page.svelte -->
<script lang="ts">
  export let data;
</script>

<h1>Clean Route Test</h1>
<p>
  This page is completely isolated from the blog. Below is the data it received from its own load
  function.
</p>

<div style="background: #e0ffe0; border: 2px solid green; padding: 1rem;">
  <h2>Data Received:</h2>
  <pre>{JSON.stringify(data, null, 2)}</pre>
</div>