@all @a @pay
Feature: Pay
  As an individual
  I can pay another CGPay user for a specified amount 
  So that funds are deducted from my account and added to theirs.

Background:
  * I am signed in as "Bea"

Rule: Personal account members have the ability to show a QR code to pay other members

Scenario: I have a personal account linked to my device and can show my QR code to pay vendors
  When I run the app
  Then ? I see "qr"

Scenario: A user shows their QR code offline
  Given we are offline
  When I run the app
  Then ? I see "qr"
