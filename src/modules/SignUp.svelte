<script>
  import st from'#store.js'
  import u from '#utils.js'
  import cgLogo from '#modules/assets/cg-logo-300.png?webp'
  import StepsLeft from "#modules/StepsLeft.svelte";

  import BackIcon from "svelte-material-icons/ChevronLeft.svelte"

  let personalCredentials = { fullName: '', email: '', phone: ''}
  let companyCredentials = { companyType: '', fullName: '', email: '', phone: ''}
  let statusMsg = ''
  let accountType = 'personal'; // Default to personal account

  function showEr(msg) { u.alert(msg); statusMsg = '' }

  const handleSubmit = () => {
        // Handle form submission logic here
        // console.log({routingNumber, bankAccount, refills, targetBalance, minTransfer, saveWeekly});
        u.go('sign-up-country');
    };

  // handle pop up hint
  let showNameHint = false;
  let showEmailHint = false;

  // Function to display the name hint
  function handleNameFocus() {
    showNameHint = true;
    showEmailHint = false; // Ensure the email hint is hidden
  }
  // Function to display the email hint
  function handleEmailFocus() {
    showNameHint = false; // Ensure the name hint is hidden
    showEmailHint = true;
  }

  // Function to hide all hints when input is not focused
  function handleBlur() {
    showNameHint = false;
    showEmailHint = false;
  }

  let showConfirmationDialogue = true;

  function handleDecision(decision) {
    if (decision === 'yes') {
      u.go('sign-up-company'); // Navigate to the agreement page
    }
    showConfirmationDialogue = false; // This will close the dialogue in either case
  }
</script>

<svelte:head>
  <title>CGPay - Sign Up</title>
</svelte:head>

<section class="page card" id="sign-up">

  <StepsLeft remaining={9} />
  <button data-testid="btn-nav" class="btn top-left" aria-label="Menu" on:click={u.goBack}>
    <BackIcon width={'100%'} height={'100%'} />
  </button>


  <header>
    <img src= { cgLogo } alt='Common Good Logo' />
    <h1>CGPay{ u.realData() ? '' : ' DEMO' }</h1>
  </header>

  <div class='content'>
    <h2>Sign Up - Personal Account</h2>


    <form on:submit|preventDefault={handleSubmit}>
      <div class="left-align" style="margin-bottom: 10px;">
        <i><b>Already have a Common Good account?<a class="signup inline-link" data-testid="lnk-signup" on:click={() => {u.go("sign-in")}} target="_blank">Sign In</a></b></i>
      </div>
      <div class="left-align" style="margin-bottom: 20px;">
        <i><b>Need a company account?<a class="signup inline-link" data-testid="lnk-signup-company" on:click={() => {u.go("sign-up-company")}}> Sign up for a company account</a></b></i>
      </div>
      <div class="input-container">
        <input data-testid="input-fullname" name="name" type="text" placeholder="Your Full Name" autocomplete="off" autocapitalize="off" bind:value={personalCredentials.fullName} required on:focus={handleNameFocus} on:blur={handleBlur}/>
        {#if showNameHint}
          <div class="floating-box">
            Your full name, properly capitalized, as you would like it to appear to other members and member companies.
          </div>
        {/if}
      </div>

      <input data-testid="input-phone" name="phone" type="text" placeholder="Your phone number" autocomplete="off" autocapitalize="off" bind:value={personalCredentials.phone} required />

      <div class="input-container">
        <input data-testid="input-email" name="email" type="text" placeholder="Email" autocomplete="off" autocapitalize="off" bind:value={personalCredentials.email} required on:focus={handleEmailFocus} on:blur={handleBlur}/>
        {#if showEmailHint}
          <div class="floating-box">
            Type carefully. All emails from the system will be sent to this address. It will not be made public, but will be viewable by accounts you transact with (you can choose greater privacy by clicking "Advanced" on the Preferences Settings page).
          </div>
        {/if}
      </div>
      <button data-testid="btn-signin" type="submit">Next</button>
    </form>

  {#if showConfirmationDialogue}
    <div class="overlay">
      <div class="confirmation-dialogue">
        <p><b>You are currently signing up for a <span style="color: red;">personal account</span>. Would you like to sign up for a <span style="color: red;">company account</span> instead?</b></p><br />
        <button on:click={() => handleDecision('yes')}>Yes</button>
        <button on:click={() => handleDecision('no')}>No</button>
      </div>
    </div>
  {/if}
  </div>
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

  .btn
    height 100px
    width 100px

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
      width: 80vw; /* Use viewport width for size */
      height: 80vh; /* Use viewport height for size */
      max-width: none; /* Remove max width limit */
      max-height: none; /* Remove max height limit */
    }
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

  .input-container {
    position: relative; /* Establishes a positioning context */
    display: inline-block; /* Or 'block', depending on your layout */
    width: 100%; /* Ensures the container takes the full width */
  }

  .floating-box {
    position: absolute;
    top: 100%; /* Positions the box right below the input */
    left: 0;
    width: 100%; /* Makes the box as wide as the container/input */
    background-color: #f9f9f9;
    border: 1px solid #d3d3d3;
    z-index: 100;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: -16px; /* Adds a small space between the input and the box */
  }

  .radio-input {
    display: none; /* Hide the default radio button */
  }

  /* Custom Radio Button Style */
  .radio-label {
    display: inline-block;
    padding: 5px 20px;
    margin: 5px;
    background: #f0f0f0;
    border: 2px solid transparent;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  /* Style for Checked State */
  .radio-input:checked + .radio-label {
    background: #6200ea;
    color: white;
    border-color: #6200ea;
  }

  @keyframes fadeIn {
    from {
          opacity: 0;
    }
    to {
          opacity: 1;
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050; /* Ensure this value is higher than Cropper's z-index */
    animation: fadeIn 0.5s ease-out;
  }

  .confirmation-dialogue {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1051; /* This ensures the dialogue is above the overlay */
    margin: 20px; /* This centers the dialogue in the overlay */
  }
</style>
