<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  const posts = data.posts
</script>

<section class="blog-list-container">
  <div class="blog-header">
    <h1>Blog Posts</h1>
    <p class="subtitle">Latest updates and announcements</p>
    <div class="header-divider"></div>
  </div>

  {#if posts.length > 0}
    <div class="posts-grid">
      {#each posts as post}
        <article class="post-card">
          <div class="post-date">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <h2 class="post-title">
            <a href={`/blogs/${post.slug}`} target="_blank">{post.title}</a>
          </h2>
          <p class="post-summary">{post.summary}</p>
          {#if post.tags.length > 0}
            <div class="post-tags">
              {#each post.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
          {/if}
          <a href={`/blogs/${post.slug}`} class="read-more">Read More →</a>
        </article>
      {/each}
    </div>
  {:else}
    <div class="no-posts">
      <p>No blog posts found.</p>
    </div>
  {/if}
</section>

<style>
  :root {
    --primary-color: #2e7d32; /* Deep green */
    --primary-light: #e8f5e9; /* Light green background */
    --primary-accent: #4caf50; /* Medium green */
    --primary-dark: #1b5e20; /* Dark green */
    --text-color: #333333; /* Main text color */
    --text-light: #666666; /* Secondary text color */
    --white: #ffffff; /* White background */
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    --radius: 8px;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 2rem;
  }

  .blog-list-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-lg);
  }

  .blog-header {
    text-align: center;
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid #eee;
  }

  .blog-header h1 {
    color: var(--primary-dark);
    font-size: 2.5rem;
    margin-bottom: var(--spacing-sm);
  }

  .subtitle {
    color: var(--text-light);
    font-size: 1.1rem;
    margin-top: 0;
  }

  .header-divider {
    width: 80px;
    height: 4px;
    background-color: var(--primary-accent);
    border-radius: 2px;
    margin: var(--spacing-md) auto 0;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-lg);
  }

  .post-card {
    background-color: var(--white);
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    padding: var(--spacing-lg);
  }

  .post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .post-date {
    color: var(--primary-color);
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: var(--spacing-sm);
  }

  .post-title {
    margin: 0 0 var(--spacing-md) 0;
    font-size: 1.5rem;
    line-height: 1.3;
  }

  .post-title a {
    color: var(--text-color);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .post-title a:hover {
    color: var(--primary-accent);
  }

  .post-summary {
    color: var(--text-light);
    margin-bottom: var(--spacing-md);
    line-height: 1.6;
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: var(--spacing-md);
  }

  .tag {
    background-color: var(--primary-light);
    color: var(--primary-color);
    padding: 0.2rem 0.6rem;
    border-radius: 20px;
    font-size: 0.8rem;
  }

  .read-more {
    display: inline-block;
    color: var(--primary-accent);
    font-weight: 500;
    text-decoration: none;
    margin-top: var(--spacing-sm);
    transition: color 0.2s ease;
  }

  .read-more:hover {
    color: var(--primary-dark);
  }

  .no-posts {
    text-align: center;
    padding: var(--spacing-lg);
    color: var(--text-light);
  }

  @media (max-width: 768px) {
    .blog-list-container {
      padding: var(--spacing-md);
    }

    .posts-grid {
      grid-template-columns: 1fr;
    }

    .blog-header h1 {
      font-size: 2rem;
    }
  }
</style>