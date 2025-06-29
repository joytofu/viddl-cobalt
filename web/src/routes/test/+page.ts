// src/routes/test/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  console.log('--- ✅ RUNNING CLEAN TEST LOAD FUNCTION ---');
  return {
    message: 'If you can see this, SvelteKit is working.',
    timestamp: new Date().toISOString(),
  };
};