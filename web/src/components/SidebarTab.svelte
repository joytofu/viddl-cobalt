<script>
  // Add this import at the top of your script section
  import { page } from '$app/stores';
  // ... existing code
</script>

<!-- In your template, ensure you're using the $ prefix when accessing the store -->
{#if $page?.url?.pathname === '/some-path'}
  <!-- Your tab content -->
{/if}