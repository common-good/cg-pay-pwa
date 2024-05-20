<script>
    import { onMount } from 'svelte';
    import u from '#utils.js'; // Utility functions for API calls and validations

    import BackIcon from "svelte-material-icons/ChevronLeft.svelte"
    import cgLogo from '#modules/assets/cg-logo-300.png?webp'

</script>


<section class="page card" id="donate">
    <header style=" align-items: left" >
        <button data-testid="btn-nav" class="back-button" aria-label="Go back" on:click={u.goBack} >
            <BackIcon width={'100%'} height={'100%'} color={'gray'}/>
        </button>
        <img src="{cgLogo}" alt="Common Good Logo" style="margin-top: -50px">
        <h1 style="margin-top: -50px">CGPay{u.realData() ? '' : ' DEMO'}</h1>
    </header>

    <div class='content'>
        <p>We are very grateful for any donation you choose to make.</p><br />
        <p><b>99% member-supported.</b> So why don't we offer a one-time donation option during the sign-up process? We're in
            a bit of a Catch-22. We are funded almost entirely by individual donations. Foundations typically do not
            understand the importance of community-level <i>participatory</i> economic democracy. So our viability as an
            organization depends on a reliable stream of donations from individuals and local businesses. Almost all such
            donations come from our members.</p><br />
        <p><b>Success threshold.</b> We were fortunate to receive some substantial initial donations to carry us through
            several years. But we need to scale up to about 4,500 members in the next dozen months or so, to reach financial
            sustainability.</p><br />
        <p><b>The cost of asking.</b> Of course, if you make a one-time donation, we could call you in about a year, to ask
            for another donation. But times have changed. People are overwhelmed with funding appeals, emails, and phone
            calls. So fund appeals cost a huge amount of staff time. That feels wasteful to us and actually costs more than it
            brings in. So, alas, with regret, we force you to make the choice far in advance — during the short time we have
            your attention.</p><br />
        <p><b>Your options.</b> Please do not let this keep you from signing up! <span class="loud">If you choose a recurring donation, you can change it (or end it) at any time</span> —
            just sign in and click "Donate" at the bottom of any page. Or choose a zero donation now by selecting "Other" and
            typing a "0" in the box.</p><br />
        <p>As always, we welcome your comments and suggestions. If you can think of a better way to handle this, please let us
            know. And thank you for participating in Common Good!</p><br />
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


  h2
    margin-bottom $s0

  header
    margin-top: 5rem;
    contentCentered()
    margin-bottom 3rem;


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
    margin-bottom 10px

  .status
    height 24px
    font-style italic
    letter-spacing 0.0125rem
    text-align center

  .loud
    background-color yellow

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

  header
    margin-top: 5rem;
    contentCentered()
    margin-bottom 3rem;

  img
    width 75px
    margin 0 $s2 0 0


</style>
