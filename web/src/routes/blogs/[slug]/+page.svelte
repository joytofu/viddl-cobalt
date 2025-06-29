<!-- src/routes/blogs/[slug]/+page.svelte -->
<script lang="ts">
  import Markdown from 'svelte-markdown';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<div class="back-button-container">
    <a href="/blogs" class="back-button">
        <span class="arrow">←</span> Return
    </a>
</div>
<article class="blog-post">
  {#if data.post}
    <header class="post-header">
      <h1>{data.post.title}</h1>
      <div class="post-meta">
        <time datetime={data.post.date}>{data.post.date}</time>
        {#if data.post.tags}
          <div class="tags">
            {#each data.post.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        {/if}
      </div>
    </header>

    <div class="post-content">
      <Markdown source={data.post.content} />
    </div>

    <footer class="post-footer">
      <div class="post-divider"></div>
      <p>Thanks for reading.</p>
    </footer>
  {:else}
    <div class="error-state">
      <p>Sorry, unable to load post.</p>
    </div>
  {/if}
</article>

<style>
  :root {
    --primary-color: #2e7d32; /* 深绿色 - 主色调 */
    --primary-light: #e8f5e9; /* 浅绿色 - 背景色 */
    --primary-accent: #4caf50; /* 中绿色 - 强调色 */
    --primary-dark: #1b5e20; /* 墨绿色 - 深色文本 */
    --text-color: #333333; /* 主要文本颜色 */
    --text-light: #666666; /* 次要文本颜色 */
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    --radius: 8px;
  }

  .blog-post {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2.5rem;
    background-color: white;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    line-height: 1.8;
    color: var(--text-color);
  }

  /* 标题样式 */
  .post-header h1 {
    color: var(--primary-dark);
    font-size: 2.2rem;
    margin-bottom: 0.8rem;
    line-height: 1.3;
    position: relative;
    padding-bottom: 0.8rem;
  }

  .post-header h1::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 4px;
    background-color: var(--primary-accent);
    border-radius: 2px;
  }

  /* 元数据样式 */
  .post-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #f0f0f0;
    color: var(--text-light);
    font-size: 0.95rem;
  }

  .tags {
    display: flex;
    gap: 0.5rem;
  }

  .tag {
    background-color: var(--primary-light);
    color: var(--primary-color);
    padding: 0.2rem 0.6rem;
    border-radius: 20px;
    font-size: 0.85rem;
    transition: all 0.2s ease;
  }

  .tag:hover {
    background-color: var(--primary-accent);
    color: white;
  }

  /* 内容区域样式 */
  .post-content {
    font-size: 1.05rem;
  }

  .post-content h2, .post-content h3 {
    color: var(--primary-color);
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .post-content p {
    margin-bottom: 1.5rem;
  }

  .post-content a {
    color: var(--primary-accent);
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease;
  }

  .post-content a:hover {
    color: var(--primary-dark);
    border-bottom: 2px solid var(--primary-accent);
  }

  .post-content ul, .post-content ol {
    margin-left: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .post-content blockquote {
    border-left: 4px solid var(--primary-accent);
    padding-left: 1rem;
    margin-left: 0;
    margin-bottom: 1.5rem;
    color: var(--text-light);
    font-style: italic;
  }

  .post-content img {
    max-width: 100%;
    border-radius: var(--radius);
    margin: 1.5rem 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  /* 页脚样式 */
  .post-footer {
    margin-top: 3rem;
    padding-top: 1.5rem;
    color: var(--text-light);
    font-size: 0.95rem;
  }

  .post-divider {
    height: 1px;
    background-color: #f0f0f0;
    margin-bottom: 1rem;
    position: relative;
  }

  .post-divider::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 3px;
    background-color: var(--primary-accent);
    top: -1px;
    left: 0;
    border-radius: 2px;
  }

  /* 错误状态样式 */
  .error-state {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--text-light);
  }
  .back-button-container {
        margin: 1rem 1px;
    }

    .back-button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background-color:rgb(27, 99, 30);
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .back-button:hover {
        background-color:rgb(15, 70, 18);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .back-button .arrow {
        font-size: 1.2em;
    }

    .back-button:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

  @media (max-width: 768px) {
    .blog-post {
      padding: 1.5rem;
      margin: 1rem;
    }

    .post-header h1 {
      font-size: 1.8rem;
    }

    .post-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }
</style>
