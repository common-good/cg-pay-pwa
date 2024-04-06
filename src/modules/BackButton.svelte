<script>
    import BackIcon from "svelte-material-icons/ChevronLeft.svelte"
    import u from "#utils.js";
</script>


<style lang='stylus'>
  .btn {
    height 100px;
    width 100px;
  }

  .btn.top-left {
    position: absolute;
    top: 2px;
    left: 0.5px;
    transform: scale(0.58);
  }
</style>



<button data-testid="btn-nav" class="btn top-left" aria-label="Menu" on:click={u.goBack}>
    <BackIcon width={'100%'} height={'100%'} />
</button>