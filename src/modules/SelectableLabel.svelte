<script>
    import Select from 'svelte-select';
    export let items = [];
    export let selectedLabel = '';
    export let placeholder = '';

    let selectedItem = null;
    let isFocused = false;

    $: if (selectedItem && selectedItem.label) {
        selectedLabel = selectedItem.label;
    }

    function handleSelectionChange(item) {
        selectedItem = item;
    }

    function handleFocus() {
        isFocused = true;
    }

    function handleBlur(event) {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            isFocused = false;
        }
    }

    $: containerStyles = isFocused ? "position: relative; z-index: 1000;" : "";
</script>

<div on:focusout={handleBlur} on:focusin={handleFocus} tabindex="-1">
    <Select
            bind:value={selectedItem}
            on:change={handleSelectionChange}
            showChevron="true"
            {items}
            {placeholder}
            {containerStyles}
            getOptionLabel={(option) => option.label}
    />
</div>