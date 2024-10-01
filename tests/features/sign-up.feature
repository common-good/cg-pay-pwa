@all @signup
  Feature: Sign Up
    Allow vendor or individual to create a cg account

Rule: User presented with initial sign up page to enter name and contact info

Scenario: User visits sign up page
  When I run the app
  And ? I see "lnk-signup"
  Then I click "lnk-signup"
  Then ? I see "input-fullname"
  And ? I see "input-email"
  And ? I see "btn-signin"

@signup-success
Scenario: User successfully enters personal information
  Given I am on page "sign-up"
  Then I input "Ruphis Anderson" as "fullname"
  And I input "000-000-0000" as "phone"
  And I input "ruphis@anderson.com" as "email"
  Then I click "btn-signin"
  Then ? I am on page "country-select"
