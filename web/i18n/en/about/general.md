<script lang="ts">
    import { t } from "$lib/i18n/translations";
    import { partners, contacts, docs } from "$lib/env";

    import SectionHeading from "$components/misc/SectionHeading.svelte";
</script>

<section id="summary">
<SectionHeading
    title="About Us"
    sectionId="summary"
/>

We built Vetra with a simple goal in mind: to make downloading your favorite videos and audio from across the web as easy and accessible as possible. In today's digital landscape, content lives on many different platforms, and we believe you should have the ability to enjoy that content offline, on your own terms.
</section>

<section id="mission">
<SectionHeading
    title="Our Mission"
    sectionId="mission"
/>

Our mission is to provide a reliable, fast, and user-friendly solution for downloading videos and converting them to MP3s from a wide range of popular platforms. We understand the need to save content for offline viewing, create personal music libraries, or simply archive important videos.
</section>

<section id="offer">
<SectionHeading
    title="What We Offer"
    sectionId="offer"
/>

Vetra is a versatile web-based tool that supports downloading from numerous platforms, including: YouTube, Meta(Facebook), X(Twitter), TikTok, Instagram, Reddit, Tumblr, Twitch, Vimeo, Xiaohongshu(RedNote), Snapchat, Pinterest, Bilibili, SoundCloud, Loom, Bluesky, etc.

Whether you need a high-definition video file or just the audio track, our tool is designed to handle your needs efficiently.
</section>

<section id="choose">
<SectionHeading
    title="Why Choose Vetra"
    sectionId="choose"
/>

- Multi-Platform Support: Download from all your favorite sites with one tool.
- Easy to Use: Our intuitive interface makes downloading a breeze – just paste the link and go!
- Fast Downloads: We strive to provide quick and efficient download speeds.
- High-Quality Output: Get your videos and MP3s in the best available quality.
- No Software Installation: Access our tool directly from your web browser on any device.
- Free to Use: Enjoy the core functionality of our downloader without any cost.
  
</section>

<section id="privacy">
<SectionHeading
    title="Leading Privacy"
    sectionId="privacy"
/>

All requests to the backend are anonymous and all information about tunnels is encrypted.
We have a strict zero log policy and don't track *anything* about individual people.

When a request needs additional processing, cobalt processes files on-the-fly.
It's done by tunneling processed parts directly to the client, without ever saving anything to disk.
This method is used when the source service provides video and audio channels as separate files.

Additionally, you can [enable forced tunneling](/settings/privacy#tunnel) to protect your privacy.
When enabled, Vetra will tunnel all downloaded files.
No one will know where you download something from, even your network provider.
</section>

