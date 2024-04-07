<script>
    import { slide } from 'svelte/transition';

    export let showModal = false; // Prop to control visibility
    function toggleModal() {
        showModal = !showModal;
    }
</script>

{#if showModal}
    <div class="backdrop" on:click={toggleModal}></div>
    <div class="modal" transition:slide={{ y: 300, duration: 300 }}>
        <div class="close-button" on:click={toggleModal}>X</div>

        <slot></slot> <!-- This is the placeholder for custom content -->
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
