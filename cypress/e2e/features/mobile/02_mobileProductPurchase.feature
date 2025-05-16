@mobile @quickCheckout
Feature: Quick Mobile Purchase
  As a mobile user with saved address
  I want to purchase quickly
  Without re-entering shipping information

  Scenario: Purchase jacket with default address
    When I complete the quick purchase flow
    Then I should see the order confirmation