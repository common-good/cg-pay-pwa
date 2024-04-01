<script>
    import u from "#utils.js";
    import st from'#store.js'
    import cgLogo from '#modules/assets/cg-logo-300.png?webp'
    import checkHint from '#modules/assets/check-hint.png'
    import { slide } from 'svelte/transition';
    import {onMount} from "svelte";

    let credentials = { routingNumber: '', bankAccount: '', refills: false}
    let statusMsg = ''
    let showHint = false; // Controls the visibility of the hint image
    let showModal = false;
    let showDetails = false;

    function toggleDetails() {
        showDetails = !showDetails;
    }

    onMount(() => {
        showModal = true; // Automatically show the modal when the component mounts
    });

    function toggleModal() {
        showModal = !showModal;
    }
    async function signIn() {
        statusMsg = 'Finding your account(s)...'
        try {
            // replace with FUND url
            const res = await u.postRequest('fund', credentials)
            st.setAcctChoices(res.accounts)
            st.setCorrupt(null) // retry any failed (corrupt) transactions
            if (res.accounts.length > 1) {
                u.go('link-account')
            } else {
                // Skip /link-account and use individual account settings
                st.setMe(res.accounts[0])
                st.setShowDash(true)
                st.setPayOk(true)
                st.setAllowShow(true)
                u.go('home')
            }
        } catch (er) {
            st.resetNetwork()
            if (u.isTimeout(er) || !$st.online) {
                showEr('The server is unavailable. Check your internet connection and try again.')
            } else if (er.message == 403) { // forbidden
                showEr('That account is not completely set up. Sign back in at CommonGood.earth to complete it.')
            } else {
                console.log(er)
                // consider better error handling strat here
                showEr(er)
            }
        }
    }

    const handleFundSubmit = () => {
        // Handle form submission logic here
        // console.log({routingNumber, bankAccount, refills, targetBalance, minTransfer, saveWeekly});
        u.go('ssn');
    };

    function setCustomMessage(event) {
        // Check which input field triggered the event and set a custom message accordingly
        if (event.target.name === 'routing-id') {
            event.target.setCustomValidity('Please enter your routing number using numbers only');
        } else if (event.target.name === 'account-id') {
            event.target.setCustomValidity('Please enter your bank account number using numbers only');
        }

        // Reset the custom validation message after the input changes, to ensure it's re-evaluated
        event.target.oninput = () => event.target.setCustomValidity('');
    }
    const toggleHint = () => {
        event.stopPropagation(); // Prevent the click from being detected by clickOutside
        showHint = !showHint;
    };

    const closeHint = () => {
        showHint = false;
    };

</script>

<svelte:head>
    <title>CGPay - Fund</title>
</svelte:head>

<section class="page card" id="fund">
    <header>
        <button class="back-button" on:click={u.goBack}></button>
        <img src= { cgLogo } alt='Common Good Logo' />
        <h1>CGPay{ u.realData() ? '' : ' DEMO' }</h1>
    </header>

    <div class='content'>
        <h2>Connect a Checking Account </h2>

        <div class="left-align">
            <p><span class="show-note-link" on:click={toggleModal}>What is this?</span></p>
        </div>

        {#if showModal}
            <div class="backdrop" on:click={toggleModal}></div>
            <div class="modal" transition:slide={{ y: 300, duration: 300 }}>
                <div class="close-button" on:click={toggleModal}>X</div>
                <p>You will need a way to get funds in and/or out of your Common Good account, so you will probably want to connect a bank account.<br><br>
                    <b>NOTE:</b> Funds are transferred only at your explicit request or when you approve an invoice, overspend your Common Good balance, or choose automatic refills. See our
                    <a href="https://CommonGood.earth/about-us/privacy-and-security?region=NEW" tabindex="-1" target="_blank" rel="noreferrer noopener">Privacy and Security Policy</a> for how your information is protected.</p>
            </div>
        {/if}
        <form on:submit|preventDefault={handleFundSubmit}>
            <small>Type carefully your bank's routing number (check to be sure it's correct!). <a href="javascript:void(0);" on:click|stopPropagation={toggleHint} class="help-link">Need help finding your routing info?</a></small>
            {#if showHint}
                <div class="overlay" on:click={closeHint}>
                    <img src={checkHint} alt="Hint image showing where to find the routing number on a check" class="hint-image">
                </div>
            {/if}
            <input data-testid="input-identifier" name="routing-id" type="text" placeholder="Routing" autocomplete="off" pattern="\d*" on:invalid={setCustomMessage} bind:value={credentials.routingNumber} required />
            <small>Type carefully your account number.</small>
            <input data-testid="input-identifier" name="account-id" type="text" placeholder="Account" autocomplete="off" pattern="\d*" on:invalid={setCustomMessage} bind:value={credentials.bankAccount} required />
            <div>
                <label for="refills">Refill your Common Good Account automatically?<span class="why-link" on:click={toggleDetails}>(Why should I enable this?)</span></label>
                <select bind:value="{credentials.refills}" id="refills">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                {#if showDetails}
                    <div class="details">
                        <small><i>*Consider enabling automatic refills for your Common Good Account to maintain your balance above a specified threshold. We kindly suggest opting out of this feature if you tend to bounce checks.</i></small>
                    </div>
                {/if}
            </div>
            <button data-testid="btn-connect" type="submit">Connect</button>
        </form>
</section>

<style lang='stylus'>
    a
        padding 0 $s-1
        color $c-blue
        text-decoration underline
        text-underline-offset 1px
        margin-bottom $s-2
        width fit-content
        &.signup
          margin-bottom $s1

    button
        cgButton()
        margin-bottom $s2

    form
        display flex
        flex-direction column

    h2
        margin-bottom $s0

    header
        margin-top: $s5;
        contentCentered()
        margin-bottom $s5

    img
        width 75px
        margin 0 $s2 0 0

    .card
        height 100%
        display flex
        flex-direction column
        align-items center
        background $c-blue-light
        box-shadow: 2px 2px 4px $c-gray-dark
        border-radius: 2%
        padding $s1

    .content
        width 100%
        height 100%
        display flex
        flex-direction column
        align-items center

    .status
        height 24px
        font-style italic
        letter-spacing 0.0125rem
        text-align center
    
    .left-align p {
        margin-bottom: 1rem; /* Adds space between paragraphs */
    }

    button[data-testid="btn-connect"] {
        margin-top: 20px;
    }

    .overlay {
      position: fixed; /* Use fixed positioning to cover the whole screen */
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
      display: flex;
      align-items: center; /* Center the image vertically */
      justify-content: center; /* Center the image horizontally */
      z-index: 1000; /* Ensure the overlay is above other content */
    }

    .hint-image {
      max-width: 90%; /* Increase the max width to allow the image to be larger */
      max-height: 90%; /* Increase the max height to allow the image to be larger */
      margin: auto; /* Center the image */
      object-fit: contain; /* This will ensure that the image's aspect ratio is preserved */
    }
    @media (min-width: 768px) {
      .hint-image {
        width: 600px; /* Fixed width for larger screens */
        height: 400px; /* Fixed height for larger screens */
      }
    }

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

    .show-note-link {
      cursor: pointer;
      color: blue;
      text-decoration: underline;
    }

    .why-link {
      cursor: pointer;
      color: blue;
      text-decoration: underline;
      margin-left: 5px;
    }

    .details {
      margin-top: 10px;
    }

    .back-button {
      position: absolute;
      top: 20px;
      left: 20px;
      width: 50px;
      height: 50px;

      border: none;
      cursor: pointer;
      background-image: url('/src/modules/assets/back-arrow.png'); /* Adjusted path */

      background-color: transparent;
      background-size: 30px 30px; /* Size of the arrow image */
      background-position: center; /* Center the background image */
      background-repeat: no-repeat; /* Prevent the image from repeating */
    }
</style>
