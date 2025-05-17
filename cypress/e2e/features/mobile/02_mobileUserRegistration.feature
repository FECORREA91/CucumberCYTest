@mobile
Feature: Mobile User Registration
  As a new mobile customer
  I want to register on the Magento website from my phone
  So that I can make purchases easily

  Background:
    Given I navigate to the Magento homepage on mobile

  Scenario: Successful mobile user registration
    When I click on the mobile menu in registration
    And I tap on the "Create Account" option
    And I fill in the mobile registration form with valid details
    And I submit the mobile registration form
    Then I should see the mobile registration success message