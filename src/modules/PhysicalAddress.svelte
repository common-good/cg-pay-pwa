<script>
  import st from'#store.js'
  import u from '#utils.js'
  import cgLogo from '#modules/assets/cg-logo-300.png?webp'

  let physicalAddress = {
    streetAddress: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    rentOrOwn: '',
    howLongYears: '',
    howLongMonths: '',
  };
  let statusMsg = '';

  async function submitPhysicalAddress() {
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
    <h2>Physical Address</h2>

    <form on:submit|preventDefault={submitPhysicalAddress}>
      <fieldset>
        <div class="input-container">
          <input type="text" id="street" placeholder="Street Address" bind:value={physicalAddress.streetAddress} required />
        </div>
        <div class="input-container">
          <input type="text" id="city" placeholder="City" bind:value={physicalAddress.city} required />
        </div>

        <div class="input-container">
          <select id="state" bind:value={physicalAddress.state}>
            <option value="" disabled>State</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>

        </div>

        <div class="input-container">
          <select id="country" style="margin-top: 10px" bind:value={physicalAddress.country} required>
            <option value="" disabled>Country</option>
            <option value="US">United States</option>
          </select>
        </div>

        <label>Rent or Own:</label>
        <select id="country" bind:value={physicalAddress.rentOrOwn} required>
          <option value="RENT">Rent</option>
          <option value="OWN">Own</option>
        </select>

        <label for="howlong">How long have you been at your current address (roughly):</label>
        <input type="number" id="years" name="years" placeholder="Years" bind:value={physicalAddress.howLongYears} required />
        <input type="number" id="months" name="months" placeholder="Months" bind:value={physicalAddress.howLongMonths} required />
      </fieldset>
      <button type="submit" onclick="location.href='prefs'">Next</button>
      <p class="status">{statusMsg}</p>
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

</style>
