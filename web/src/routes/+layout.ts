export const prerender = true;
export const ssr = true;
import { Buffer } from 'buffer'; 
import { browser } from '$app/environment';
import { get } from 'svelte/store';
import type { Load } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { loadTranslations, defaultLocale } from '$lib/i18n/translations';

if (browser) {
  window.Buffer = Buffer;
}

export const load: LayoutLoad = async ({ url }) => {
    const { pathname } = url;

    let preferredLocale = defaultLocale;

    if (browser) {
        preferredLocale = get((await import('$lib/i18n/locale')).default);
    }

    await loadTranslations(preferredLocale, pathname);
    return {};
}
