<script>
    import { slide } from 'svelte/transition';

    export let showModal = false; // Prop to control visibility
    function toggle() {
        showModal = !showModal;
    }
</script>
{#if showModal}
    <div class="backdrop" on:click={toggle}></div>
    <div class="modal" transition:slide={{ y: 300, duration: 300 }}>
        <div class="close-button" on:click={toggle}>X</div>
        <div class="modal-content"> <!-- Container for scrollable content -->
            <slot></slot> <!-- Placeholder for custom content -->
        </div>
    </div>
{/if}

<style>
    .modal {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: white;
        border-top: 1px solid #ccc;
        padding: 20px;
        z-index: 1000;
        max-height: 60vh;
        display: flex;
        flex-direction: column;
    }

    .modal-content {
        overflow-y: auto; /* Enables vertical scrolling */
        flex-grow: 1; /* Allows the container to expand to fill available space */
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 20px;
        cursor: pointer;
        /* Additional styling as needed */
    }

    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }
</style>
