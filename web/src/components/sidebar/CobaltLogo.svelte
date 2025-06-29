<script>
    import IconCobalt from "$components/icons/Cobalt.svelte";
</script>

<div id="cobalt-logo">
    <img src="/favicon.png"  width="100%" height="100%" alt="Vetra logo"/>
    
</div>

<style>
    #cobalt-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: calc(var(--padding) * 2);

        /* accommodate space for scaling animation */
        padding-bottom: calc(var(--padding) * 2 - var(--sidebar-inner-padding));
    }

    @media screen and (max-width: 535px) {
        #cobalt-logo {
            display: none;
        }
    }
</style>
