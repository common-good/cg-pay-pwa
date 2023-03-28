import { Given, When, Then } from '@cucumber/cucumber'
import t from '../support/support.js'
import w from '../support/world.js'
import { assert, expect } from 'chai'

Given('I use {string} on an {string} device', async function (browser, sys) { await t.setUA(browser, sys) })
Given('this {string}:', async function (k, rows) { await t.setThese(k, rows, true) })
Given('these {string}:', async function (k, rows) { await t.setThese(k, rows) })

When('I run the app', async function () { await t.visit('') })
When('I visit {string}', async function (site) { await t.visit(site) })
When('I click {string}', async function(testId) { await w.page.click(t.sel(testId)) })
When('I scan {string}', async function (qr) { await t.putv('qr', qr); await t.visit('charge') })
When('the input {string} is not empty', async function (inputId) { await t.input(inputId)})

Then('? I am on page {string}', async function (page) { await t.onPage(page) })
Then('? I see installation instructions for {string}', async function (testId) { await t.see(testId + '-instructions') })
Then('? I see {string}', async function (testId) { await t.see(testId) })
Then('? I see {string} is {string}', async function (testId, want) { await t.seeIs(testId, want) })
Then('? I see this error message: {string}', async function (msg) { await t.seeIs('messageText', msg, true) })
Then('? I see this confirmation message: {string}', async function (msg) { await t.seeIs('messageText', msg, true) })
