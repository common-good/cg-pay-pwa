<script>
  import st from'#store.js'
  import u from '#utils.js'
  import cgLogo from '#modules/assets/cg-logo-300.png?webp'


  let credentials = { fullName: '', email: '', phone: '', zip: '', country: '' }
  let statusMsg = ''

  function showEr(msg) { u.alert(msg); statusMsg = '' }

  async function signIn() {
    statusMsg = 'Finding your account(s)...'
    try {
      const res = await u.postRequest('accounts', credentials)
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
        showEr('We could not find an account with that information. Please try again.')
      }
    }
  }
</script>

<svelte:head>
  <title>CGPay - Sign Up</title>
</svelte:head>

<section class="page card" id="sign-up">
  <header>
    <img src= { cgLogo } alt='Common Good Logo' />
    <h1>CGPay{ u.realData() ? '' : ' DEMO' }</h1>
  </header>

  <div class='content'>
    <h2>Sign Up </h2>

  <div class="left-align">
      If you already have a Common Good account,<a class="signup inline-link" data-testid="lnk-signup" href="/sign-in" target="_blank">Sign In.</a>
  </div>
  <div class="left-align">
      Did you want to open a COMPANY account instead?
  </div>
   
    <form on:submit|preventDefault={signIn}>
      <input data-testid="input-identifier" name="account-id" type="text" placeholder="Your Full Name" autocomplete="off" autocapitalize="off" bind:value={ credentials.identifier } required />
      <small>Your full name, properly capitalized, as you would like it to appear to other members and member companies.</small>
      <input data-testid="input-identifier" name="account-id" type="text" placeholder="Your phone number" autocomplete="off" autocapitalize="off" bind:value={ credentials.identifier } required />
      <input data-testid="input-identifier" name="account-id" type="text" placeholder="Email" autocomplete="off" autocapitalize="off" bind:value={ credentials.identifier } required />
      <small>Type carefully. All emails from the system will be sent to this address. It will not be made public, but will be viewable by accounts you transact with (you can choose greater privacy by clicking "Advanced" on the Preferences Settings page).</small>
      <label for="full-name">Postal Code: </label>
      <input data-testid="input-identifier" name="account-id" type="text" placeholder="Physical location postal code" autocomplete="off" autocapitalize="off" bind:value={ credentials.identifier } required />
      <button data-testid="btn-signin" type="submit">Sign Up</button>
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

</style>
