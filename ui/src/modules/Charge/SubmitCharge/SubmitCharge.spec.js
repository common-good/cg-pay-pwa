import SubmitCharge from './SubmitCharge.svelte'

// --------------------------------------------

describe('SubmitCharge', () => {
  it('renders', () => {
    const props = { otherAccount: {}, photo: {}, tx: {}, limit: null }
    render(SubmitCharge, props)
  })
})
