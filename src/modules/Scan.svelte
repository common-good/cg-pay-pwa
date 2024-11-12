<script>
  import {Html5Qrcode} from 'html5-qrcode'
  import {onDestroy, onMount} from 'svelte'
  import st from'#store.js'
  import u from '#utils.js'
  import cgLogo from '#modules/assets/cg-logo-300-noR.png?webp'

  // --------------------------------------------

  let isLoading = true;
  let action;
  let scanner;

  switch($st.intent) {
    case 'charge':
      action = $st.selfServe ? 'Pay' : 'Charge'
      break
    case 'scanIn':
      action = "Scan In"
      break
    default:
      action = $st.intent
  }

  onMount(async () => {
    if (!$st.intent) u.goEr(u.crash('scan with no intent'))

    if (!u.testing()) try { // don't activate camera when testing (works whether or not headless)
      scanner = new Html5Qrcode('scanner');
      const scannerConfig = { fps: 1, qrbox: { width: 250, height: 250 } };
      const onScanSuccess = (decodedText, decodedResult) => {
        if (scanner) scanner.stop();
        scanner = null;
        st.setQr(decodedText)
        u.go($st.intent === 'scanIn' ? 'home' : 'tx')
      };
      const onError = () => {
        // ignore "parse" errors -- no valid QR yet (keep scanning)
      }

      scanner.start(
        { facingMode: $st.frontCamera ? 'user' : 'environment' },
        scannerConfig,
        onScanSuccess,
        onError
      ).then(() => {
        isLoading = false;
      }).catch(() => {
        scanner = null;
        isLoading = false;
        u.goEr('Error accessing camera.');
      });
    } catch(er) {
      scanner = null;
       u.goEr(er.message)
    }
  });

  onDestroy(() => {
    if (scanner) scanner.stop();
  });
</script>

<svelte:head>
  <title>CGPay - Scan QR Code</title>
</svelte:head>

<section class="page" id="scan">
  <div class='top'>
    <h1 class="page-title">Scan to {action}</h1>
    {#if isLoading}
      <div class='loading'>
        <img class='logo' src= { cgLogo } alt="Common Good logo" />
        <p>Loading Camera...</p>
      </div>
    {/if}
    <div id='scanner'></div>
  </div>
</section>

<style lang='stylus'>
  h1
    text-transform capitalize
    
  .loading
    font-style italic
    height 250px
    contentCentered(column)

  .logo
    width: 80px
    margin-bottom $s4
    animation spin 2s linear infinite

  .top
    text-align center

  @keyframes spin 
    0% 
      transform: rotate(0deg)
    100% 
      transform: rotate(360deg)

  /* Needed to show QR Camera */
  #scanner
    :global(video)
      width auto !important
</style>
