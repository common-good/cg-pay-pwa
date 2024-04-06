<script>
    export let remaining = 0; // Number of remaining forms, passed as a prop
</script>

<div class="remaining-forms">
    Steps: {remaining}/9
</div>

<style>
    .remaining-forms {
        padding: 10px;
        background-color: #f0f0f0; /* Light gray background */
        border-radius: 10px;
        text-align: center;
        /* Additional styling as needed */
    }
</style>