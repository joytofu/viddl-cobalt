import { writable } from 'svelte/store';
import { loadTranslations as internalLoad } from './translations';

export const locale = writable('en'); // Default locale

export async function loadTranslations(lang: string, pathname: string) {
    await internalLoad(lang, pathname);
}