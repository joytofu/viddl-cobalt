import { Buffer } from 'buffer';
  import matter from 'gray-matter';
  import type { Load } from '@sveltejs/kit';

  // Buffer polyfill for browser environment
  if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
  }

  export const load: Load = async () => {
    // Load all blog posts from changelogs directory
    const blogPosts = import.meta.glob('/src/routes/blogs/posts/*.md', {
      eager: true,
      query: '?raw',
      import: 'default'
    });

    // Process and sort posts by date (newest first)
    const posts = Object.entries(blogPosts)
      .map(([path, content]) => {
        const { data: frontmatter } = matter(content as string);
        const slug = path.split('/').pop()?.replace('.md', '') || '';

        return {
          slug,
          title: frontmatter.title || 'Untitled',
          date: frontmatter.date || new Date().toISOString(),
          summary: frontmatter.summary || 'No summary available',
          tags: frontmatter.tags || []
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return { posts };
  };