import { test, expect } from '@playwright/test'

import createLinkAccountScreen from '../link-account/link-account.screen.js'
import createPayScreen from '../pay/pay.screen.js'
import createRoutes from '../routes.js'
import createSignInScreen from '../sign-in/sign-in.screen.js'

// --------------------------------------------
// As a vendor,
// I can sign in with my personal CG account,
// so that I can subsequently link the app to a business account
// and use it to charge customers.

test('I can sign in with my personal CG account.', async ({ browser, context, page }) => {
  // --------------------------------------------
  // Set up mock API endpoints.

  const routes = createRoutes({ page })

  routes.accounts.get
    .withQueryParams({ identifier: 'invalid@email.com', password: 'invalid' })
    .respondsWith(404)

  routes.accounts.get
    .withQueryParams({ identifier: 'valid@email.com', password: 'valid' })
    .respondsWith(200, {
      token: 'valid-token'
    })

  routes.accounts.get
    .withQueryParams({ token: 'valid-token' })
    .respondsWith(200)

  // --------------------------------------------

  const linkAccount = createLinkAccountScreen(page)
  const pay = createPayScreen(page)
  const signIn = createSignInScreen(page)

  // --------------------------------------------
  // When not signed in, I see the sign in screen.

  await pay.visit()
  await expect(signIn.element('root')).toBeVisible()

  // --------------------------------------------
  // When I submit invalid credentials, I see an error message.

  await signIn.with({ identifier: 'invalid@email.com', password: 'invalid' })
  await expect(signIn.element('errorMessage')).toContainText(`couldn't find`)

  // --------------------------------------------
  // When I submit valid credentials, I am directed to the next step.

  await signIn.with({ identifier: 'valid@email.com', password: 'valid' })
  await expect(signIn.element('root')).not.toBeVisible()
  await expect(linkAccount.element('root')).toBeVisible()

  // --------------------------------------------
  // I stay signed in with a valid token.

  await pay.visit()
  await expect(signIn.element('root')).not.toBeVisible()
  await expect(linkAccount.element('root')).toBeVisible()

  // --------------------------------------------
  // I am signed out with an invalid token.

  // Set up invalid token context:
  // - Change the token in local storage to an invalid token.
  const storageState = await context.storageState()
  const invalidTokenState = { ...storageState }

  invalidTokenState.origins[0].localStorage
    .find(item => item.name = 'cg.pay.account')
    .value = JSON.stringify({ account: { token: 'invalid-token' } })

  const invalidTokenPage = await browser.newPage({
    storageState: invalidTokenState
  })

  // - Mock the API request to respond to the invalid token.
  const invalidTokenRoutes = createRoutes({ page: invalidTokenPage })

  invalidTokenRoutes.accounts.get
    .withQueryParams({ token: 'invalid-token' })
    .respondsWith(404)

  const payInvalidToken = createPayScreen(invalidTokenPage)
  const signInInvalidToken = createSignInScreen(invalidTokenPage)

  // - Confirm that I am signed out.
  await payInvalidToken.visit()
  await expect(payInvalidToken.element('root')).not.toBeVisible()
  await expect(signInInvalidToken.element('root')).toBeVisible()
})
