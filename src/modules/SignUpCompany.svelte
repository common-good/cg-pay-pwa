<script>
    import u from "#utils.js";
    import cgLogo from '#modules/assets/cg-logo-300.png?webp'
    import StepsLeft from './StepsLeft.svelte';

    import BackIcon from "svelte-material-icons/ChevronLeft.svelte"
    import Switch from './Switch.svelte'
    import SelectableLabel from '#modules/SelectableLabel.svelte';

    let companyCredentials = { companyType: '', fullName: '', legalName:'', email: '',
        postalCode: '', companyPhone: '', selling: '', federalID: '', sellCredit: 'Yes', foundedDate: ''}


    let focusState = {
        fullName: false,
        legalName: false,
        email: false,
        postalCode: false,
        companyPhone: false,
        selling: false,
        federalID: false,
    };

    let showModal = true; // This variable controls the visibility of the modal


    let items = [
        {value:1, label: 'Sole Proprietor'},
        {value:2, label: 'Partnership'},
        {value:3, label: 'LLC'},
        {value:4, label: 'Private Corporation'},
        {value:5, label: 'Publicly-Traded Corporation'},
        {value:6, label: 'Nonprofit'},
        {value:7, label: 'Government'},
        {value:8, label: 'Co-Operative'},
        {value:9, label: 'Unincorporated Association or Club'},
        {value:10, label: 'Estate'},
        {value:11, label: 'Trust'},
        {value:12, label: 'Custodian'},
    ]




    function handleFocus(fieldName) {
        Object.keys(focusState).forEach(key => focusState[key] = false);
        focusState[fieldName] = true;
    }

    function handleBlur(fieldName) {
        focusState[fieldName] = false;
    }

    // This function toggles the visibility state of the modal
    function toggleModal() {
        showModal = !showModal;
    }


    function handleDateChange(event) {
        companyCredentials.foundedDate = event.target.value;
    }

    const handleFormSubmit = () => {
        companyCredentials.sellCredit = companyCredentials.sellCredit === "Yes" ? "true" : "false";
        u.go('agreement');
    };
</script>

<svelte:head>
    <title>CGPay - Fund</title>
</svelte:head>

<section class="page card" id="fund">
    <StepsLeft remaining={1} />
    <button data-testid="btn-nav" class="btn top-left" aria-label="Menu" on:click={u.goBack}>
        <BackIcon width={'100%'} height={'100%'} />
    </button>

    <header>

        <img src= { cgLogo } alt='Common Good Logo' />
        <h1>CGPay{ u.realData() ? '' : ' DEMO' }</h1>
    </header>

    <div class='content'>
        <h2>
            Company Sign Up
        </h2>

        <div class="left-align">
        </div>

        <div class="left-align" style="margin-bottom: 20px;">
            <i><b>Need a personal account?<a class="signup inline-link" data-testid="lnk-signup-company" on:click={() => {u.go("sign-up")}}> Sign up for a personal account</a></b></i>
        </div>

        <form on:submit|preventDefault={handleFormSubmit}>
            <div class="input-container">
                <input type="text"
                       placeholder="Company Name"
                       autocomplete="off"
                       bind:value={companyCredentials.fullName}
                       required
                       on:focus={() => handleFocus('fullName')}
                       on:blur={() => handleBlur('fullName')}
                />
                {#if focusState.fullName}
                    <div class="floating-box">The company's full name</div>
                {/if}
            </div>

            <div class="input-container">
                <input type="text"
                       placeholder="Legal Name"
                       autocomplete="off"
                       bind:value={companyCredentials.legalName}
                       required
                       on:focus={() => handleFocus('legalName')}
                       on:blur={() => handleBlur('legalName')}
                />
                {#if focusState.legalName}
                    <div class="floating-box">Company legal name</div>
                {/if}
            </div>

            <div class="input-container">
                <input type="text"
                       placeholder="Email"
                       autocomplete="off"
                       bind:value={companyCredentials.email}
                       required
                       on:focus={() => handleFocus('email')}
                       on:blur={() => handleBlur('email')}
                />
                {#if focusState.email}
                    <div class="floating-box"><b>Type carefully!</b>
                        All emails from the system will be sent to this address.
                        It will not be made public, but will be viewable by accounts you transact with.</div>
                {/if}
            </div>

            <div class="input-container">
                <input type="text"
                       placeholder="Postal Code"
                       autocomplete="off"
                       bind:value={companyCredentials.postalCode}
                       required
                       on:focus={() => handleFocus('postalCode')}
                       on:blur={() => handleBlur('postalCode')}
                />
                {#if focusState.postalCode}
                    <div class="floating-box">Physical location postal code</div>
                {/if}
            </div>

            <div class="input-container">
                <input type="text"
                       placeholder="Company Phone"
                       autocomplete="off"
                       bind:value={companyCredentials.companyPhone}
                       required
                       on:focus={() => handleFocus('companyPhone')}
                       on:blur={() => handleBlur('companyPhone')}
                />
                {#if focusState.companyPhone}
                    <div class="floating-box">Company phone number</div>
                {/if}
            </div>

            <div class="input-container">
                <input type="text"
                       placeholder="Selling"
                       autocomplete="off"
                       bind:value={companyCredentials.selling}
                       required
                       on:focus={() => handleFocus('selling')}
                       on:blur={() => handleBlur('selling')}
                />
                {#if focusState.selling}
                    <div class="floating-box">Enter a <b>VERY SHORT</b> transaction description (for example "food") for when you make a sale.
                        This will appear in the description of the transaction for both you and the customer (for example "$20 for food on 04/21/2024")</div>
                {/if}
            </div>

            <div class="input-container">
                <input type="text"
                       placeholder="Federal ID"
                       autocomplete="off"
                       pattern="\d*"
                       bind:value={companyCredentials.federalID}
                       required
                       on:focus={() => handleFocus('federalID')}
                       on:blur={() => handleBlur('federalID')}
                />
                {#if focusState.federalID}
                    <div class="floating-box">Enter a <b>VERY SHORT</b> transaction description (for example "food") for when you make a sale.
                        This will appear in the description of the transaction for both you and the customer (for example "$20 for food on 04/21/2024")</div>
                {/if}
            </div>

            <div class="container">
                <p>Please select your company's legal structure:</p>
                <SelectableLabel placeholder="Account Type"
                                 {items}
                                 bind:selectedLabel={companyCredentials.companyType}
                />
            </div>

            <div class="container">
                <p>When did this company begin, approximately?</p>
                <input type="date" bind:value={companyCredentials.foundedDate} on:change={handleDateChange} required>
            </div>

            <div class="container">
                <p>Do you want to accept customer cash in exchange for your Common Good credit <span style="color: blue;">(recommended)</span>?</p>
                <Switch bind:value={companyCredentials.sellCredit} label="" design="multi" options={['No', 'Yes']} fontSize={16}/>
            </div>

            <button data-testid="btn-connect" type="submit">Next</button>
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

  .left-align p {
    margin-bottom: 1rem; /* Adds space between paragraphs */
  }

  button[data-testid="btn-connect"] {
    margin-top: 20px;
  }

  .container {
    margin-bottom: 20px;
  }
  .container p {
    margin-bottom: 10px;
  }
  .container input,
  .container select,
  .container .switch {
    margin-bottom: 10px;
    width: 100%;
  }
  .container .switch {
    padding: 5px 0;
  }
  .container > *:last-child {
    margin-bottom: 0;
  }

  .input-container {
    position: relative;
    display: inline-block;
    width: 100%;
  }


  .floating-box
    position absolute
    top 100%
    left 0
    width 100%
    background-color #f9f9f9
    border 1px solid #d3d3d3
    z-index 100
    padding 10px
    border-radius 5px
    box-shadow 0 2px 4px rgba(0, 0, 0, 0.1)
    margin-top -16px


</style>
