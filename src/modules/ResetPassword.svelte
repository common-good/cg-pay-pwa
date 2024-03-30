<script>
    import st from'#store.js'
    import u from '#utils.js'
    import cgLogo from '#modules/assets/cg-logo-300.png?webp'

    let credentials = { account: ''}
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
    <title>CGPay - Reset Password</title>
</svelte:head>

<section class="page card" id="reset-password">
    <header>
        <button class="back-button" on:click={u.goBack}></button>
        <img src= { cgLogo } alt='Common Good Logo' />
        <h1>CGPay{ u.realData() ? '' : ' DEMO' }</h1>
    </header>

    <div class='content'>
        <h2>Request New Password</h2>
        <form on:submit|preventDefault={signIn}>
            <small>Your account ID or email address</small>
            <input data-testid="input-identifier" name="account-id" type="text" placeholder="Account" autocomplete="off" autocapitalize="off" bind:value={ credentials.account } required />
            <button data-testid="btn-signin" type="submit">Submit</button>
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
