declare module 'svelte-markdown' {
  import type { SvelteComponent } from 'svelte';

  interface SvelteMarkdownProps {
    source: string;
    [key: string]: any;
  }

  export default class SvelteMarkdown extends SvelteComponent<SvelteMarkdownProps> {}
}