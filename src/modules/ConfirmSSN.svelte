<script>
  import u from '#utils.js';
  import st from '#store.js';
  import cgLogo from '#modules/assets/cg-logo-300.png?webp';

  let credentials = {
    ssn: ''
  };
  let statusMsg = '';

  async function signIn() {
    statusMsg = 'Finding your account(s)...';
    try {
      // replace with FUND url
      const res = await u.postRequest('fund', credentials);
      st.setAcctChoices(res.accounts);
      st.setCorrupt(null); // retry any failed (corrupt) transactions
      if (res.accounts.length > 1) {
        u.go('link-account');
      } else {
        // Skip /link-account and use individual account settings
        st.setMe(res.accounts[0]);
        st.setShowDash(true);
        st.setPayOk(true);
        st.setAllowShow(true);
        u.go('home');
      }
    } catch (er) {
      st.resetNetwork();
      if (u.isTimeout(er) || !$st.online) {
        showEr(
          'The server is unavailable. Check your internet connection and try again.',
        );
      } else if (er.message == 403) {
        // forbidden
        showEr(
          'That account is not completely set up. Sign back in at CommonGood.earth to complete it.',
        );
      } else {
        console.log(er);
        // consider better error handling strat here
        showEr(er);
      }
    }
  }

  function setCustomMessage(event) {
    event.target.setCustomValidity('Please enter your SSN using numbers only');
    // Reset the custom validation message after the input changes, to ensure it's re-evaluated
    event.target.oninput = () => event.target.setCustomValidity('');
  }

  const handleFundSubmit = () => {
    // Handle form submission logic here
    // console.log({routingNumber, bankAccount, refills, targetBalance, minTransfer, saveWeekly});
  };
</script>

<svelte:head>
  <title>CGPay - Fund</title>
</svelte:head>

<section class="page card" id="fund">
  <header>
    <button class="back-button" on:click={u.goBack}></button>
    <img src={cgLogo} alt="Common Good Logo" />
    <h1>CGPay{u.realData() ? '' : ' DEMO'}</h1>
  </header>

  <div class="content">
    <h2>Confirm Your SSN</h2>

    <div class="left-align">
      <p>
        Our 3rd party service was unable to verify your ssn automatically. Please type it again (carefully) in case there was a typo.
      </p>
    </div>
    <form on:submit|preventDefault={handleFundSubmit}>
      <input
        data-testid="input-identifier"
        name="account-id"
        type="text"
        placeholder="Your social security number"
        autocomplete="off"
        pattern="\d*"
        on:invalid={setCustomMessage}
        bind:value={credentials.ssn}
        required
      />

      <small>Required by the IRS if you accept more than $600 a year in Common Good payments.</small>


      <button data-testid="btn-connect" type="submit">Submit</button>
    </form>
  </div>
</section>

<style lang="stylus">
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
