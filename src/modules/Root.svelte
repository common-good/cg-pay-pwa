<script>
  import { Router } from 'svelte-router-spa'
  import { onMount } from 'svelte'
  import st from'#store.js'
  import u from '#utils.js'
  import c from '#constants.js'

  import IdentityVerification from "#modules/IdentityVerification.svelte";
  import Empty from '#modules/_Empty.svelte' // for testing
  import AddToHomeScreen from '#modules/AddToHomeScreen.svelte'
  import Contact from '#modules/Contact.svelte'
  import MailingAddress from '#modules/MailingAddress.svelte'
  import PhysicalAddress from '#modules/PhysicalAddress.svelte'
  import Prefs from '#modules/Prefs.svelte'
  import Donate from '#modules/Donate.svelte'
  import Home from '#modules/Home.svelte'
  import TxStart from '#modules/TxStart.svelte'
  import Tx from '#modules/Tx.svelte'
  import Txs from '#modules/Txs.svelte'
  import LinkAccount from '#modules/LinkAccount.svelte'
  import Scan from '#modules/Scan.svelte'
  import SignIn from '#modules/SignIn.svelte'
  import SignUpCompany from '#modules/SignUpCompany.svelte'
  import Comment from '#modules/Comment.svelte'
  import Settings from '#modules/Settings.svelte'
  import LayoutIntro from '#modules/LayoutIntro.svelte'
  import Layout from '#modules/Layout.svelte'
  import SignUp from '#modules/SignUp.svelte'
  import Fund from '#modules/Fund.svelte'
  import ConfirmSSN from '#modules/ConfirmSSN.svelte'
  import ResetPassword from "#modules/ResetPassword.svelte"
  import PhotoID from "#modules/PhotoID.svelte"
  import SignUpCountry from '#modules/SignUpCountry.svelte'
  import Agreement from "#modules/Agreement.svelte";

  st.fromTester().then() // we must check for tester instructions before doing anything

  function timeOut() {
    st.fromTester().then()
    st.resetNetwork()
    setTimeout(timeOut, c.networkTimeoutMs)
    if ($st.timeout && !st.setTimeout()) u.go('home')
  }

  function onlyIf(condition, elseGoTo) { return { guard: condition, redirect: elseGoTo } }

  function route(name, component, condition, elseGoTo, layout = Layout) {
    return { name: name, component: component, layout: layout, onlyIf: onlyIf(condition, elseGoTo) }
  }

  function needSignin() { return u.empty($st.choices) && !st.linked() }
  function needLink() { return !u.empty($st.choices) && !st.linked() }
  function gotIntent() { return $st.intent !== null }

  const routes = [
    route('/empty', Empty, true, null, LayoutIntro), // for testing
    route('/', AddToHomeScreen, u.addableToHome, '/sign-in', LayoutIntro),
    route('/sign-in', SignIn, needSignin, '/link-account', LayoutIntro),
    route('/contact', Contact, true, null, LayoutIntro),
    route('/mailing-address', MailingAddress, true, null, LayoutIntro),
      route('/physical-address', PhysicalAddress, true, null, LayoutIntro),
    route('/prefs', Prefs, true, null, LayoutIntro),
    route('/donate', Donate , true, null, LayoutIntro),
    route('/link-account', LinkAccount, needLink, '/home', LayoutIntro),
    route('/home', Home, st.linked, '/'),
    route('/scan', Scan, st.linked, '/'),
    route('/tx', Tx, gotIntent, '/'),
    route('/tx-start', TxStart, gotIntent, '/'),
    route('txs', Txs),
    route('/comment', Comment, st.linked, '/'),
    route('/settings', Settings, () => !u.empty($st.choices), '/' ),
    route('/sign-up', SignUp, true, '/sign-in', LayoutIntro),
    route('/fund', Fund, true, '/sign-in', LayoutIntro),
    route('/ssn', ConfirmSSN, true, '/sign-in', LayoutIntro),
    route('/reset-password', ResetPassword, true, '/sign-in', LayoutIntro),
    route('/photo', PhotoID, true, '/sign-in', LayoutIntro),
    route('/sign-up-country', SignUpCountry, true, '/sign-in', LayoutIntro),
    route('/sign-up-company', SignUpCompany, true, '/sign-in', LayoutIntro),
    route('/verify-identity', IdentityVerification, true, '/sign-in', LayoutIntro),
    route('/agreement', Agreement, true, '/sign-in', LayoutIntro),
  ]

  onMount(async () => {
    addEventListener('offline', () => { st.setOnline(false) })
    addEventListener('online', () => { st.setOnline(true) })
    timeOut()
  })

</script>

<Router { routes } />
