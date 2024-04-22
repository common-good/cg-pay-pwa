<script>
  import { onMount } from 'svelte';
  import u from '#utils.js'; // Utility functions for API calls and validations
  import StepsLeft from './StepsLeft.svelte';

  import BackIcon from "svelte-material-icons/ChevronLeft.svelte"
  import cgLogo from '#modules/assets/cg-logo-300.png?webp'
  import constants from "#constants.js";
  import SlidingModal from "#modules/SlidingModal.svelte";
  import HelpBoxIcon from "svelte-material-icons/HelpBox.svelte"

  let donation = {
    giftLevel: '',
    period: '',
    honored: '',
    honoring: '',
  };
  let statusMsg = '';
  let donationOptions = []; // To be filled with available donation options

  let isCompany = false; // TODO
  let recurOnly = ': monthly, quarterly, or yearly';
  let replaces = ''; // TODO
  let amountTip = isCompany ? '' : 'The most common amounts chosen are $50 and $25.';
  let special = ''; // TODO

  let showModal = true; // This variable controls the visibility of the modal



  const GIFT_LEVELS = [
      { value: 2500, label: 'Slate .... $2,500'},
      { value: 1000, label: 'Glass .... $1,000'},
      { value: 500, label: 'Iron ....... $500'},
      { value: 250, label: 'Oak ........ $250'},
      { value: 100, label: 'Two Bricks . $100'},
      { value: 50, label: 'One Brick ... $50'},
      { value: 25, label: 'Half Brick .. $25'},
      { value: -1, label: 'Water ... (other)'},
  ];


  const contentMap = {
      default: `<p>Thank you for considering partnering with us to create a Common Good Economy, by making a tax-deductible donation.</p>
            <br/>

            <p>Most members choose to donate: monthly, quarterly, or yearly. </p>
            <p>To donate an amount not listed (including ZERO), choose "Water" (and fill in the amount).</p><p><b class="loud">            <br/>
            NOTE: This is a donation, not a deposit.</b> Thank you for your support!</p>`,
      why: `<p>We are very grateful for any donation you choose to make.</p>
  <p><b>99% member-supported.</b> So why don't we offer a one-time donation option during the sign-up process? We're in
      a bit of a Catch-22. We are funded almost entirely by individual donations. Foundations typically do not
      understand the importance of community-level <i>participatory</i> economic democracy. So our viability as an
      organization depends on a reliable stream of donations from individuals and local businesses. Almost all such
      donations come from our members.</p>
  <p><b>Success threshold.</b> We were fortunate to receive some substantial initial donations to carry us through
      several years. But we need to scale up to about 4,500 members in the next dozen months or so, to reach financial
      sustainability.</p>
  <p><b>The cost of asking.</b> Of course, if you make a one-time donation, we could call you in about a year, to ask
      for another donation. But times have changed. People are overwhelmed with funding appeals, emails, and phone
      calls. So fund appeals cost a huge amount of staff time. That feels wasteful to us and actually costs more than it
      brings in. So, alas, with regret, we force you to make the choice far in advance — during the short time we have
      your attention.</p>
  <p><b>Your options.</b> Please do not let this keep you from signing up! <span class="loud">If you choose a recurring donation, you can change it (or end it) at any time</span> —
      just sign in and click "Donate" at the bottom of any page. Or choose a zero donation now by selecting "Other" and
      typing a "0" in the box.</p>
  <p>As always, we welcome your comments and suggestions. If you can think of a better way to handle this, please let us
      know. And thank you for participating in Common Good!</p>`,
  }
  ;

  let modalContent = contentMap.default;

  function toggleModal(key) {
      modalContent = contentMap[key];
      console.log(modalContent);
      showModal = !showModal;
  }


  const PERIODS = [
      'yearly',
      'quarterly',
      'monthly',
      'weekly',
      'daily',
  ]

  async function submitDonation() {
    statusMsg = 'Processing your donation...';
    try {
      const res = await u.postRequest('/donate', donation); // Simulate an API call to submit the donation
      statusMsg = 'Thank you for your donation!';
    } catch (err) {
      console.error(err);
      statusMsg = 'Failed to process your donation. Please try again.';
    }
  }

  // Fetch donation options on component mount
  onMount(async () => {
    try {
      // Simulate fetching donation options
      donationOptions = await u.getRequest('/donationOptions');
    } catch (err) {
      console.error(err);
      statusMsg = 'Failed to load donation options.';
    }
  });

  async function submitForm() {
      //   TODO
      u.go('fund');
  }
</script>

<svelte:head>
  <title>Donate</title>
</svelte:head>

<section class="page card" id="donate">


    <div class="progress-container">
        <div class="progress-bar" style="width: 77%"></div>
    </div>

    <header style=" align-items: left" >
        <button data-testid="btn-nav" class="back-button" aria-label="Go back" on:click={u.goBack} >
            <BackIcon width={'100%'} height={'100%'} color={'gray'}/>
        </button>
        <img src="{cgLogo}" alt="Common Good Logo" style="margin-top: -50px">
        <h1 style="margin-top: -50px">CGPay{u.realData() ? '' : ' DEMO'}</h1>
    </header>

  <div class='content'>
      <h2>
          <div class="text-with-icon">
              <span>Make a Donation</span>
              <span class="show-note-link" on:click={() => toggleModal('default')}>
                  <HelpBoxIcon />
                </span>
          </div>

      </h2>


    <form on:submit|preventDefault={submitDonation}>
        <SlidingModal bind:showModal>
            <div>{@html modalContent}</div>
        </SlidingModal>

        <p><span on:click={() => u.go("donation-why")} class="link">Why no option for a one-time donation?</span></p>

        <div class="input-container">
          <select bind:value={donation.giftLevel}>
            <option value="" disabled>Donation</option>
            {#each GIFT_LEVELS as {value, label}}
                <option value={value}>{label}</option>
            {/each}
          </select>
        </div>

        <div class="input-container">
            <select style="margin-top: 5px" bind:value={donation.period}>
                <option value="" disabled>When</option>
                {#each PERIODS as value}
                    <option value={value}>{value}</option>
                {/each}
            </select>
        </div>

        <div class="input-container">
            <select style="margin-top: 5px" bind:value={donation.honored}>
                <option value="">Honoring (Optional)</option>
                <option value="honor">In honor of</option>
                <option value="memory">In memory of</option>
            </select>
            {#if donation.honored}
                <input type="text" id="honoring" bind:value={donation.honoring} required />
            {/if}
        </div>
    </form>
  </div>
<button type="submit" on:click={submitForm}>Next</button>
<button type="button" on:click={submitForm} style="background-color: gray; border-color: gray">Skip for now</button>
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
    margin-top: 5rem;
    contentCentered()
    margin-bottom 3rem;

  img
    width 75px
    margin 0 $s2 0 0

  .card {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $c-blue-light;
    box-shadow: 2px 2px 4px $c-gray-dark;
    border-radius: 2%;
    padding: $s1;
    position: relative; /* Make this a positioning context for the button */
    justify-content: space-between; /* Positions children at start and end of container */
  }

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

  .loud
    background-color yellow

  .input-container
    position relative /* Establishes a positioning context */
    display inline-block /* Or 'block', depending on your layout */
    width 100% /* Ensures the container takes the full width */

  .back-button {
      position: absolute;
      cursor: pointer; /* Makes it clear the icon is clickable */
      padding: 5px 10px; /* Padding around the text or icon for better touch */
      width: 10%;
      top: 55px;
      left: 15px;
      border: none; /* No border for a cleaner look */
      background-color: transparent; /* Transparent background */
      font-size: 10px; /* Larger font size for visibility */
      transform: scale(0.8);
      color: green;
  }
  .progress-container {
      position: absolute;
      width: 100%;
      height: 4px; /* Adjust thickness of the progress bar */
      background-color: #ddd; /* Background color of the progress bar */
      top: 0;
      left: 0;
      z-index: 1000; /* Ensures it stays on top of other content */
  }

  .progress-bar {
      height: 100%;
      background-color: mediumblue; /* Color of the progress */
  }

  .link {
    color: blue;
    cursor: pointer;
    text-decoration: underline;
  }

  .show-note-link {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
  }

  .text-with-icon {
    display: flex;
    align-items: center; /* This ensures the icon and text are aligned at their centers */
    gap: 0.5rem; /* Optional: adds some space between the icon and the text */
  }
</style>
