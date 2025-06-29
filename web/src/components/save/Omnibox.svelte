<script lang="ts">
    import env from "$lib/env";

    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";
    import { SvelteComponent, tick } from "svelte";

    import { t } from "$lib/i18n/translations";

    import dialogs from "$lib/state/dialogs";
    import { link } from "$lib/state/omnibox";
    import { updateSetting } from "$lib/state/settings";
    import { pasteLinkFromClipboard } from "$lib/clipboard";
    import { turnstileEnabled, turnstileSolved } from "$lib/state/turnstile";

    import type { Optional } from "$lib/types/generic";
    import type { DownloadModeOption } from "$lib/types/settings";

    import ClearButton from "$components/save/buttons/ClearButton.svelte";
    import DownloadButton from "$components/save/buttons/DownloadButton.svelte";

    import Switcher from "$components/buttons/Switcher.svelte";
    import OmniboxIcon from "$components/save/OmniboxIcon.svelte";
    import ActionButton from "$components/buttons/ActionButton.svelte";
    import SettingsButton from "$components/buttons/SettingsButton.svelte";

    import IconMute from "$components/icons/Mute.svelte";
    import IconMusic from "$components/icons/Music.svelte";
    import IconSparkles from "$components/icons/Sparkles.svelte";
    import IconClipboard from "$components/icons/Clipboard.svelte";

    import DownloaderHeader from './DownloaderHeader.svelte';

    let linkInput: Optional<HTMLInputElement>;
    let downloadButton: SvelteComponent;

    let isFocused = false;

    let isDisabled = false;
    let isLoading = false;

    export let title: string = "Vetra: Free Online Video & Audio Downloader";
    export let subtitle: string = "All Platforms, One Downloader. Save content from YouTube, TikTok, X, Instagram, Facebook & more!";

    $: isBotCheckOngoing = $turnstileEnabled && !$turnstileSolved;

    const validLink = (url: string) => {
        try {
            return /^https?\:/i.test(new URL(url).protocol);
        } catch {}
    };

    $: linkFromHash = $page.url.hash.replace("#", "") || "";
    $: linkFromQuery = (browser ? $page.url.searchParams.get("u") : 0) || "";

    $: if (linkFromHash || linkFromQuery) {
        if (validLink(linkFromHash)) {
            $link = linkFromHash;
        } else if (validLink(linkFromQuery)) {
            $link = linkFromQuery;
        }

        // clear hash and query to prevent bookmarking unwanted links
        goto("/", { replaceState: true });
    }

    const pasteClipboard = async () => {
        if ($dialogs.length > 0 || isDisabled || isLoading) {
            return;
        }

        const pastedData = await pasteLinkFromClipboard();
        if (!pastedData) return;

        const linkMatch = pastedData.match(/https?\:\/\/[^\s]+/g);

        if (linkMatch) {
            $link = linkMatch[0].split('，')[0];

            if (!isBotCheckOngoing) {
                await tick(); // wait for button to render
                downloadButton.download($link);
            }
        }
    };

    const changeDownloadMode = (mode: DownloadModeOption) => {
        updateSetting({ save: { downloadMode: mode } });
    };

    const handleKeydown = (e: KeyboardEvent) => {
        if (!linkInput || $dialogs.length > 0 || isDisabled || isLoading) {
            return;
        }

        if (e.metaKey || e.ctrlKey || e.key === "/") {
            linkInput.focus();
        }

        if (e.key === "Enter" && validLink($link) && isFocused) {
            downloadButton.download($link);
        }

        if (["Escape", "Clear"].includes(e.key) && isFocused) {
            $link = "";
        }

        if (e.target === linkInput) {
            return;
        }

        switch (e.key) {
            case "D":
                pasteClipboard();
                break;
            case "J":
                changeDownloadMode("auto");
                break;
            case "K":
                changeDownloadMode("audio");
                break;
            case "L":
                changeDownloadMode("mute");
                break;
            default:
                break;
        }
    };
</script>

<svelte:window on:keydown={handleKeydown} />
        <section class="downloader-section" style="margin-bottom:440px">
            <DownloaderHeader
                title={title}
                subtitle={subtitle}
            />
            <div id="omnibox">
            <div
                id="input-container"
                class:focused={isFocused}
                class:downloadable={validLink($link)}
            >
                <OmniboxIcon loading={isLoading || isBotCheckOngoing} />
                <input
                    id="link-area"
                    bind:value={$link}
                    bind:this={linkInput}
                    on:input={() => (isFocused = true)}
                    on:focus={() => (isFocused = true)}
                    on:blur={() => (isFocused = false)}
                    spellcheck="false"
                    autocomplete="off"
                    autocapitalize="off"
                    maxlength="512"
                    placeholder={$t("save.input.placeholder")}
                    aria-label={isBotCheckOngoing
                        ? $t("a11y.save.link_area.turnstile")
                        : $t("a11y.save.link_area")}
                    data-form-type="other"
                    disabled={isDisabled}
                />

                {#if $link && !isLoading}
                    <ClearButton click={() => ($link = "")} />
                {/if}
                {#if validLink($link)}
                    <DownloadButton
                        url={$link}
                        bind:this={downloadButton}
                        bind:disabled={isDisabled}
                        bind:loading={isLoading}
                    />
                {/if}
            </div>

            <div id="action-container">
                <Switcher>
                    <SettingsButton
                        settingContext="save"
                        settingId="downloadMode"
                        settingValue="auto"
                    >
                        <IconSparkles />
                        {$t("save.auto")}
                    </SettingsButton>
                    <SettingsButton
                        settingContext="save"
                        settingId="downloadMode"
                        settingValue="audio"
                    >
                        <IconMusic />
                        {$t("save.audio")}
                    </SettingsButton>
                    <SettingsButton
                        settingContext="save"
                        settingId="downloadMode"
                        settingValue="mute"
                    >
                        <IconMute />
                        {$t("save.mute")}
                    </SettingsButton>
                </Switcher>

                <ActionButton id="paste" click={pasteClipboard}>
                    <IconClipboard />
                    <span id="paste-desktop-text">{$t("save.paste")}</span>
                    <span id="paste-mobile-text">{$t("save.paste.long")}</span>
                </ActionButton>
            </div>
        </div>
        </section>

        <!-- <section class="content-section" id="how-to-use">
            <h2>How to Use Vetra Video Downloader</h2>
            <p>Downloading your favorite videos and audio is simple with Vetra. Follow these easy steps:</p>
            <ol>
                <li><strong>Copy the URL:</strong> Go to the platform (e.g., YouTube, Twitter, TikTok) and copy the link (URL) of the video or audio track you wish to download.</li>
                <li><strong>Paste the URL:</strong> Return to Vetra and paste the copied URL into the input field above.</li>
                <li><strong>Choose Format (Optional):</strong> Select your preferred format. 'Auto' tries to pick the best video, 'Audio' extracts the sound (e.g., MP3 from YouTube), and 'Mute' downloads video without sound.</li>
                <li><strong>Click Download:</strong> Hit the download button (arrow icon) and Vetra will process your request. Download links for available qualities and formats will appear shortly.</li>
            </ol>
        </section>

        <section class="content-section" id="supported-platforms">
            <h2>Download from All Your Favorite Platforms</h2>
            <p>Vetra aims to support a vast array of popular video and audio sharing websites. Here are some of the platforms you can download from:</p>
            <ul class="platform-list">
                <li><strong>YouTube:</strong> Download YouTube videos (MP4, various resolutions like 1080p, 720p), convert YouTube to MP3 (audio download), and save YouTube Shorts.</li>
                <li><strong>Twitter / X:</strong> Download videos and audio clips from Twitter (now X).</li>
                <li><strong>TikTok:</strong> Save TikTok videos, often without watermarks.</li>
                <li><strong>Instagram:</strong> Download Instagram videos, Reels, and IGTV. We also support downloading private Instagram videos (requires browser extension or specific steps).</li>
                <li><strong>Facebook:</strong> Easily download Facebook videos, including options for private Facebook video downloads.</li>
                <li><strong>Twitch:</strong> Save Twitch clips and VODs (Video on Demand).</li>
                <li><strong>Tumblr:</strong> Download videos hosted on Tumblr blogs.</li>
                <li><strong>SoundCloud:</strong> Download tracks from SoundCloud as MP3 files.</li>
                <li><strong>Bilibili:</strong> Download videos from Bilibili (哔哩哔哩).</li>
                <li><strong>Snapchat:</strong> Download Snapchat videos from Spotlight or shared links.</li>
                <li><strong>Reddit:</strong> Download videos embedded in Reddit posts, with or without sound.</li>
                <li><strong>Pinterest:</strong> Save video pins from Pinterest.</li>
                <li><strong>Vimeo:</strong> Download videos from Vimeo.</li>
                <li><strong>Ok.ru (Odnoklassniki):</strong> Download videos from ok.ru.</li>
                <li><strong>Rutube:</strong> Save videos from Rutube.</li>
                <li><strong>Streamable:</strong> Download videos from Streamable.</li>
                <li><strong>Loom:</strong> Save Loom video recordings.</li>
                <li><strong>Bluesky:</strong> Download videos from Bluesky Social posts.</li>
                <li><strong>Xiaohongshu (Little Red Book):</strong> Download videos from Xiaohongshu.</li>
                <li><em>And many more! If your site isn't listed, try it anyway – Vetra is always expanding.</em></li>
            </ul>
        </section>

        <section class="content-section" id="features">
            <h2>Why Choose Vetra? Features & Benefits</h2>
            <ul>
                <li><strong>Extensive Platform Support:</strong> Download content from dozens of popular social media and video hosting sites.</li>
                <li><strong>Versatile Downloads:</strong> Save videos in MP4 format or extract audio directly to MP3.</li>
                <li><strong>High-Quality Options:</strong> Access various resolutions, including HD (720p, 1080p) and sometimes 4K, depending on the source.</li>
                <li><strong>Completely Free:</strong> Vetra is free to use with no hidden costs or subscription fees.</li>
                <li><strong>User-Friendly Interface:</strong> Clean, simple, and intuitive design for a seamless experience.</li>
                <li><strong>No Software Installation:</strong> Download directly from your web browser. No need to install any apps or extensions (unless for specific private content).</li>
                <li><strong>Fast & Reliable:</strong> Optimized for quick processing and download speeds.</li>
                <li><strong>Safe & Secure (Our Commitment):</strong> We prioritize user privacy. We don't store your downloaded files or track your download history beyond what's necessary for site operation. (Ensure your privacy policy reflects this).</li>
            </ul>
        </section>

        <section class="content-section" id="faq">
            <h2>Frequently Asked Questions (FAQ)</h2>
            <dl class="faq-item">
                <dt>Q: How do I download YouTube videos to MP3 with Vetra?</dt>
                <dd>A: Paste the YouTube video URL into Vetra, select the 'Audio' option if it's not already selected, and click the download button. Vetra will act as a YouTube to MP3 converter and provide you with the MP3 download link.</dd>

                <dt>Q: Can I download YouTube Shorts?</dt>
                <dd>A: Yes, Vetra fully supports YouTube Shorts downloads. Just paste the URL of the YouTube Short into the input field.</dd>

                <dt>Q: Is it possible to download YouTube videos in 1080p?</dt>
                <dd>A: Yes, for most YouTube videos, Vetra provides options to download in 1080p (Full HD) and other available resolutions.</dd>

                <dt>Q: How can I download a video from Instagram or Facebook?</dt>
                <dd>A: Copy the link of the Instagram video/Reel or Facebook video, paste it into Vetra's input box, and click download. For private videos, specific instructions or a browser helper might be mentioned if supported.</dd>

                <dt>Q: Does Vetra support downloading X (formerly Twitter) audio or videos?</dt>
                <dd>A: Absolutely! Paste the link to the X post (Tweet) containing the video or audio, and Vetra will help you download it.</dd>

                <dt>Q: Can I download private Facebook or Instagram videos?</dt>
                <dd>A: Vetra may offer solutions for downloading private content from Facebook and Instagram, which might involve using a browser extension or following specific steps provided by our tool. Please check for any on-screen instructions when pasting such links. (Be clear about this capability).</dd>

                <dt>Q: Is Vetra free to use?</dt>
                <dd>A: Yes, Vetra is a completely free online video and audio downloader.</dd>

                <dt>Q: Do I need to install any software or browser extension?</dt>
                <dd>A: For most platforms, no software or extension is needed. You can download directly from your browser. For some specific features like downloading certain private content, a helper extension might be recommended, but it's usually optional for general use.</dd>
            </dl>
        </section> -->

        <footer class="footer">
            <p>© <span id="currentYear"></span> Vetra. All rights reserved (for the tool, not downloaded content).</p>
            <p>By continuing, you agree to our <a href="/terms" target="_blank">Terms and Conditions</a> and <a href="/privacy-policy" target="_blank">Privacy Policy</a>.</p>
            <p><strong>Disclaimer:</strong> Vetra is intended for downloading publicly available content or content for which you have the rights or permission to download. Please respect copyright laws and the terms of service of the platforms you are downloading from.</p>
        </footer>
    


<style>
    #omnibox {
        display: flex;
        flex-direction: column;
        max-width: 640px;
        width: 100%;
        gap: 8px;
    }

    #input-container {
        --input-padding: 10px;
        display: flex;
        box-shadow: 0 0 0 1.5px var(--input-border) inset;
        border-radius: var(--border-radius);
        padding: 0 var(--input-padding);
        align-items: center;
        gap: var(--input-padding);
        font-size: 14px;
        flex: 1;
    }

    #input-container.downloadable {
        padding-right: 0;
    }

    #input-container.downloadable:dir(rtl) {
        padding-right: var(--input-padding);
        padding-left: 0;
    }

    #input-container.focused {
        box-shadow: 0 0 0 1.5px var(--secondary) inset;
        outline: var(--secondary) 0.5px solid;
    }

    #input-container.focused :global(#input-icons svg) {
        stroke: var(--secondary);
    }

    #input-container.downloadable :global(#input-icons svg) {
        stroke: var(--secondary);
    }

    #link-area {
        display: flex;
        width: 100%;
        margin: 0;
        padding: var(--input-padding) 0;
        height: 18px;

        align-items: center;

        border: none;
        outline: none;
        background-color: transparent;
        color: var(--secondary);

        -webkit-tap-highlight-color: transparent;
        flex: 1;

        font-weight: 500;

        /* workaround for safari */
        font-size: inherit;
    }

    #link-area:focus-visible {
        box-shadow: unset !important;
    }

    #link-area::placeholder {
        color: var(--gray);
        /* fix for firefox */
        opacity: 1;
    }

    /* fix for safari */
    input:disabled {
        opacity: 1;
    }

    #action-container {
        display: flex;
        flex-direction: row;
    }

    #action-container {
        justify-content: space-between;
    }

    #paste-mobile-text {
        display: none;
    }

    #instance-label {
        font-size: 13px;
        color: var(--gray);
        font-weight: 500;
    }

    @media screen and (max-width: 440px) {
        #action-container {
            flex-direction: column;
            gap: 5px;
        }

        #action-container :global(.button) {
            width: 100%;
        }

        #paste-mobile-text {
            display: block;
        }

        #paste-desktop-text {
            display: none;
        }
    }
</style>
