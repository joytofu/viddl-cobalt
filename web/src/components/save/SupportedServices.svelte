<script lang="ts">
    import { t } from "$lib/i18n/translations";
    import { getServerInfo } from "$lib/api/server-info";
    import cachedInfo from "$lib/state/server-info";

    import Skeleton from "$components/misc/Skeleton.svelte";
    import IconPlus from "@tabler/icons-svelte/IconPlus.svelte";

    let services: string[] = [];

    let popover: HTMLDivElement;

    $: expanded = false;
    $: loaded = false;
    $: renderPopover = false;

    const loadInfo = async () => {
        await getServerInfo();

        if ($cachedInfo) {
            loaded = true;
            services = $cachedInfo.info.cobalt.services;
        }
    };

    const popoverAction = async () => {
        expanded = !expanded;
        if (expanded && services.length === 0) {
            await loadInfo();
        }
        if (expanded) {
            popover.focus();
        }
    }

    const showPopover = async () => {
        const timeout = !renderPopover;
        renderPopover = true;

        // 10ms delay to let the popover render for the first time
        if (timeout) {
            setTimeout(popoverAction, 10);
        } else {
            await popoverAction();
        }
    };
</script>

<div id="supported-services" class:expanded>
    <button
        id="services-button"
        on:click={showPopover}
        aria-label={$t(`save.services.title_${expanded ? "hide" : "show"}`)}
    >
        <div class="expand-icon">
            <IconPlus />
        </div>
        <span class="title">{$t("save.services.title")}</span>
    </button>

    {#if renderPopover}
        <div id="services-popover">
            <div
                id="services-container"
                bind:this={popover}
                tabindex="-1"
                data-focus-ring-hidden
            >
                {#if loaded}
                    {#each services as service}
                        <div class="service-item">{service}</div>
                    {/each}
                {:else}
                    {#each { length: 17 } as _}
                        <Skeleton
                            class="elevated"
                            width={Math.random() * 44 + 50 + "px"}
                            height="24.5px"
                        />
                    {/each}
                {/if}
            </div>
            <div id="services-disclaimer" class="subtext">
                {$t("save.services.disclaimer")}
            </div>
        </div>
    {/if}
</div>

<style>
    .title {
        color: #046f34;
        font-size: 16px;
    }

    #supported-services {
        display: flex;
        position: relative;
        max-width: 400px;
        flex-direction: column;
        align-items: center;
        height: 35px;
    }

    #services-popover {
        display: flex;
        flex-direction: column;
        border-radius: 18px;
        background: var(--button);
        box-shadow:
            var(--button-box-shadow),
            0 0 10px 10px var(--popover-glow);

        position: relative;
        padding: 12px;
        gap: 6px;
        top: 6px;

        opacity: 0;
        transform: scale(0);
        transform-origin: top center;

        transition:
            transform 0.3s cubic-bezier(0.53, 0.05, 0.23, 1.15),
            opacity 0.25s cubic-bezier(0.53, 0.05, 0.23, 0.99);
    }

    .expanded #services-popover {
        transform: scale(1);
        opacity: 1;
    }

    #services-button {
        gap: 9px;
        padding: 7px 13px 7px 10px;
        justify-content: flex-start;
        border-radius: 18px;
        display: flex;
        flex-direction: row;
        font-size: 13px;
        font-weight: 500;
        background: none;
    }

    #services-button:not(:focus-visible) {
        box-shadow: none;
    }

    .expand-icon {
        height: 22px;
        width: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 18px;
        background: var(--button-elevated);
        padding: 0;
        box-shadow: none;
        transition: transform 0.2s;
    }

    #services-button:active .expand-icon {
        background: var(--button-elevated-hover);
    }

    @media (hover: hover) {
        #services-button:hover .expand-icon {
            background: var(--button-elevated-hover);
        }
    }

    .expand-icon :global(svg) {
        height: 18px;
        width: 18px;
        stroke-width: 2px;
        color: var(--secondary);
        will-change: transform;
    }

    .expanded .expand-icon {
        transform: rotate(45deg);
    }

    #services-container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 3px;
    }

    .service-item {
        display: flex;
        padding: 4px 8px;
        border-radius: calc(var(--border-radius) / 2);
        background: var(--button-elevated);
        font-size: 12.5px;
        font-weight: 500;
    }

    #services-disclaimer {
        padding: 0;
        user-select: none;
        -webkit-user-select: none;
    }

    .expanded #services-disclaimer {
        padding: 0;
        user-select: text;
        -webkit-user-select: text;
    }

    @media screen and (max-width: 535px) {
        .expand-icon {
            height: 21px;
            width: 21px;
        }

        .expand-icon :global(svg) {
            height: 16px;
            width: 16px;
        }
    }
</style>
