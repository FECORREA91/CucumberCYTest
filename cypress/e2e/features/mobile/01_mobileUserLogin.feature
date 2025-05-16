@mobile
Feature: Mobile User Login
  As a registered mobile user
  I want to login to the Magento website from my mobile device
  So that I can access my account on the go

  Background:
    Given I navigate to the Magento homepage on mobile

  Scenario: Successful mobile login with valid credentials
    When I click on the mobile menu
    And I tap on the "Sign In" option
    And I enter valid login credentials
    And I tap the login button
    Then I should see the mobile login success message

  Scenario: Failed mobile login with invalid credentials
    When I click on the mobile menu
    And I tap on the "Sign In" option
    And I enter invalid login credentials
    And I tap the login button
    Then I should see a mobile error message
    And I should not be logged in