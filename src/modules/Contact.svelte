<script>
  import st from'#store.js'
  import u from '#utils.js'
  import cgLogo from '#modules/assets/cg-logo-300.png?webp'

  let contactInfo = {
    yourName: '',
    email: '',
    password: '',
    phone: '',
  };
  let statusMsg = '';

  let showNameHint = false;
  let showPasswordHint = false;

  // Function to display the name hint
  function handleNameFocus() {
    showNameHint = true;
    showPasswordHint = false;
  }
  // Function to display the password hint
  function handlePasswordFocus() {
    showPasswordHint = true;
    showNameHint = false;
  }

  // Function to hide all hints when input is not focused
  function handleBlur() {
    showPasswordHint = false;
    showNameHint = false;
  }

  async function submitContactInfo() {
  //   TODO
  }
</script>

<svelte:head>
  <title>CGPay - Contact Information</title>
</svelte:head>

<section class="page card" id="contact-info">
  <header>
    <img src= { cgLogo } alt='Common Good Logo' />
    <h1>CGPay{ u.realData() ? '' : ' DEMO' }</h1>
  </header>



  <div class='content'>
    <h2>Contact Information</h2>
    <form on:submit|preventDefault={submitContactInfo}>
      <div class="input-container">
        <input type="text" placeholder="Your Name" bind:value={contactInfo.yourName} on:focus={handleNameFocus} on:blur={handleBlur} required />
        {#if showNameHint}
          <div class="floating-box">
            The <b>FULL NAME</b> you use most of the time, properly capitalized!
          </div>
        {/if}
      </div>

      <div class="input-container">
      <input type="email" placeholder="Email" bind:value={contactInfo.email}  required />
      </div>

      <div class="input-container">
      <input type="password" placeholder="Password" bind:value={contactInfo.password}  on:focus={handlePasswordFocus} on:blur={handleBlur} required />
      {#if showPasswordHint}
        <div class="floating-box">
          Required for changing email address
        </div>
      {/if}
      </div>

      <div class="input-container">
      <input type="tel" placeholder="Phone" bind:value={contactInfo.phone} required />
      </div>

      <div class="input-container">
      <button type="submit" onclick="location.href='mailing-address'">Next</button>
      <p class="status">{statusMsg}</p>
      </div>
    </form>
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

  button
    cgButton()
    margin-bottom $s2

  form
    display flex
    flex-direction column

  h2
    margin-bottom $s0

  header
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

  .input-container
    position relative /* Establishes a positioning context */
    display inline-block /* Or 'block', depending on your layout */
    width 100% /* Ensures the container takes the full width */

  .floating-box
    position absolute
    top 100% /* Positions the box right below the input */
    left 0
    width 100% /* Makes the box as wide as the container/input */
    background-color #f9f9f9
    border 1px solid #d3d3d3
    z-index 100
    padding 10px
    border-radius 5px
    box-shadow 0 2px 4px rgba(0, 0, 0, 0.1)
    margin-top -16px /* Adds a small space between the input and the box */

</style>
