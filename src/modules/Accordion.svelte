<script>
    export let open = false;
    import { slide } from 'svelte/transition';

    function handleClick(event) {
        event.preventDefault();
        event.stopPropagation(); // Stop the event from bubbling up
        open = !open;
    }

</script>

<div class="accordion">
    <div class="header">
        <div class="text">
            <slot name="head"></slot>
        </div>

        <button class="button" style="margin-left: 5px" on:click={handleClick}>
            {open ? '-' : '+'}
        </button>
    </div>
    {#if open}
        <div class="details" transition:slide>
            <slot name="details">
            </slot>
        </div>
    {/if}
</div>

<style>
    div.accordion {
        margin: 1rem 0;
    }

    div.header {
        display:flex;
        width:100%;
    }

    div.header .text {
        flex: 1;
        margin-right: 5px;
    }

    div.details {
        background-color: #cecece;
        padding:1rem;
    }

    .header .button {
        cursor: pointer; /* Changes the cursor to a pointer to indicate clickability */
        padding: 8px 16px; /* Adds some padding for better sizing */
        background-color: #f0f0f0; /* A light grey background */
        border: 1px solid #dcdcdc; /* A subtle border */
        border-radius: 4px; /* Rounded corners */
        transition: background-color 0.3s, transform 0.2s; /* Smooth transitions for feedback */
    }

    .header .button:hover {
        background-color: #e0e0e0; /* Darker shade on hover */
        transform: scale(1.05); /* Slightly larger on hover */
    }

    .header .button:active {
        transform: scale(0.95); /* Slightly smaller when clicked */
    }
</style>
