<script>
  import st from '#store.js'
  import u from '#utils.js'
  import cgLogo from '#modules/assets/cg-logo-300.png?webp'

  import BackIcon from "svelte-material-icons/ChevronLeft.svelte"
  import {onMount} from "svelte";

  let personalCredentials = { fullName: '', email: '', phone: ''}
  let statusMsg = ''
  let accountType = 'personal'; // Default to personal account

  let cameFromBack = st.getNavigatedFromBack();

  onMount(() => {
    st.setNavigatedFromBack(false);
  });

  let emailExists = false;

  function showEr(msg) { u.alert(msg); statusMsg = '' }

  const handleSubmit = () => {
    if (personalCredentials.email === "exists@gmail.com") {
      emailExists = true;
    } else {
      u.go('sign-up-country');
    }
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

  let showConfirmationDialogue = false;

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

<section class="page card" id="sign-up" in:u.slideEnter={{ direction: cameFromBack ? 'right' : 'left' }}>

  <div class="progress-container">
    <div class="progress-bar" style="width: 11%"></div>
  </div>

  <header style=" align-items: left" >
    <button data-testid="btn-nav" class="back-button" aria-label="Go back" on:click={u.goBack} >
      <BackIcon width={'100%'} height={'100%'} color={'gray'}/>
    </button>
    <img src="{cgLogo}" alt="Common Good Logo" style="margin-top: -50px">
    <h1 style="margin-top: -50px">CGPay{u.realData() ? '' : ' DEMO'}</h1>
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
        <input data-testid="input-fullname" name="name" type="text" autocomplete="off" autocapitalize="off" bind:value={personalCredentials.fullName} required on:focus={handleNameFocus} on:blur={handleBlur}/>
        <span class="floating-label">Your full name</span>
        {#if showNameHint}
          <div class="floating-box">
            Your full name, properly capitalized, as you would like it to appear to other members and member companies.
          </div>
        {/if}
      </div>

      <div class="input-container">
        <input data-testid="input-phone" name="phone" type="text" autocomplete="off" autocapitalize="off" bind:value={personalCredentials.phone} required />
        <span class="floating-label">Phone number</span>
      </div>

      <div class="input-container">
        <input data-testid="input-email" name="email" type="email" placeholder=" " autocomplete="off" autocapitalize="off" bind:value={personalCredentials.email} required on:focus={handleEmailFocus} on:blur={handleBlur}/>
        <span class="floating-label">Email</span>
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

  {#if emailExists}
    <div class="overlay">
      <div class="confirmation-dialogue">
        <p><strong>Your email is already associated with an existing account. Would you like to sign in instead?</strong></p><br />
        <button on:click={() => u.go("sign-in")}>Yes, Sign In</button>
        <button on:click={() => {emailExists = false}}>No, I will try a different email</button>
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

  input {
    padding-top: 1rem;
    padding-bottom: 0.25rem;
  }

  input:focus ~ .floating-label,
  input:not(:focus):valid ~ .floating-label{
    top: 0px;
    left: 12px;
    bottom: 0px;
    font-size: 10px;
  }

  .input-container input[type="email"]:focus ~ .floating-label,
  .input-container input[type="email"]:not(:placeholder-shown) ~ .floating-label {
    top: 0px;
    left: 12px;
    font-size: 10px;
    color: #333; /* Change color or any other property specifically for email inputs */
  }


  .floating-label {
    position: absolute;
    pointer-events: none;
    left: 12px;
    top: 12px;
    color: gray;
    transition: 0.2s ease all;
  }

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

  /* Container for the progress bar, stretching across the top */
  .progress-container {
    position: absolute;
    width: 100%;
    height: 4px; /* Adjust thickness of the progress bar */
    background-color: #ddd; /* Background color of the progress bar */
    top: 0;
    left: 0;
    z-index: 1000; /* Ensures it stays on top of other content */
  }

  /* The actual progress bar */
  .progress-bar {
    height: 100%;
    background-color: mediumblue; /* Color of the progress */
  }


</style>
