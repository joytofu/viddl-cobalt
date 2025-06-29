<script lang="ts">
  import { page } from '$app/stores';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let name = '';
  let email = '';
  let subject = '';
  let message = '';
  let isSubmitting = false;
  let submissionStatus: 'idle' | 'success' | 'error' = 'idle';

  function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    // 简单表单验证
    if (!name || !email || !subject || !message) {
      alert('Please fill in all required fields');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    isSubmitting = true;
    submissionStatus = 'idle';

    try {
      // 这里添加实际提交逻辑，目前使用模拟提交
      await new Promise(resolve => setTimeout(resolve, 1500));
      submissionStatus = 'success';
      // 重置表单
      name = email = subject = message = '';
    } catch (error) {
      submissionStatus = 'error';
      console.error('Submission failed:', error);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="contact-container">
    <div class="green-accent-bar"></div>
    <h1>Contact Us</h1>

    {#if submissionStatus === 'success'}
        <div class="success-message">
            <h2>✉️ Message Sent Successfully!</h2>
            <p>Thank you for contacting us. We'll get back to you soon.</p>
        </div>
    {:else if submissionStatus === 'error'}
        <div class="error-message">
            <h2>❌ Submission Failed</h2>
            <p>There was an error sending your message. Please try again later.</p>
        </div>
    {:else}
        <form on:submit={handleSubmit} class="contact-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" bind:value={name} required disabled={isSubmitting} />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" bind:value={email} required disabled={isSubmitting} />
                </div>
            </div>
            <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" id="subject" bind:value={subject} required disabled={isSubmitting} />
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" bind:value={message} required disabled={isSubmitting} rows={5}></textarea>
            </div>
            <button type="submit" disabled={isSubmitting} class="submit-button">
                {isSubmitting ? 'Sending...' : 'Submit Message'}
            </button>
        </form>
    {/if}
</div>

<style>
    .contact-container {
        max-width: 1200px; /* 大幅增加最大宽度 */
        margin: 2rem auto;
        padding: 2.5rem;
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        position: relative;
        overflow: hidden;
    }

    /* 顶部绿色装饰条 */
    .green-accent-bar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 5px;
        background: linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%);
    }

    h1 {
        color: #2D3748;
        font-size: 2rem;
        margin-bottom: 2rem;
        position: relative;
        padding-bottom: 1rem;
    }

    h1::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 60px;
        height: 4px;
        background-color: #4CAF50;
        border-radius: 2px;
    }

    .contact-form {
        display: grid;
        gap: 1.8rem;
    }

    /* 新增：双列布局 */
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.8rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    label {
        font-weight: 500;
        color: #4A5568;
        font-size: 0.95rem;
        transition: all 0.3s ease;
    }

    input, textarea {
        padding: 0.9rem 1.2rem;
        border: 1px solid #E2E8F0;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.3s ease;
        background-color: #FAFAFA;
    }

    input:focus, textarea:focus {
        outline: none;
        border-color: #4CAF50;
        /* 绿色主题焦点效果 */
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.15);
        background-color: white;
    }

    textarea {
        resize: vertical;
        min-height: 120px;
    }

    .submit-button {
        /* 绿色渐变背景 */
        background: linear-gradient(135deg, #4CAF50 0%, #388E3C 100%);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 1rem 1.5rem;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 14px rgba(76, 175, 80, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .submit-button:hover:not(:disabled) {
        /* 深绿色渐变悬停效果 */
        background: linear-gradient(135deg, #388E3C 0%, #2E7D32 100%);
        transform: translateY(-3px);
        box-shadow: 0 6px 18px rgba(76, 175, 80, 0.4);
    }

    .submit-button:active:not(:disabled) {
        transform: translateY(-1px);
    }

    .submit-button:disabled {
        background-color: #A5D6A7;
        cursor: not-allowed;
        box-shadow: none;
    }

    .success-message {
        background-color: #E8F5E9;
        color: #2E7D32;
        padding: 1.5rem;
        border-radius: 8px;
        margin-top: 1rem;
        border-left: 4px solid #4CAF50;
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.1);
    }

    .error-message {
        background-color: #FFEBEE;
        color: #C62828;
        padding: 1.5rem;
        border-radius: 8px;
        margin-top: 1rem;
        border-left: 4px solid #D32F2F;
        box-shadow: 0 4px 12px rgba(211, 47, 47, 0.1);
    }

    @media (max-width: 768px) {
        .contact-container {
            padding: 1.8rem;
            margin: 1rem;
            max-width: calc(100% - 2rem); /* 移动端自适应宽度 */
        }

        /* 移动端恢复单列布局 */
        .form-row {
            grid-template-columns: 1fr;
        }

        h1 {
            font-size: 1.75rem;
        }
    }
</style>

