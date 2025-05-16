@desktop
Feature: User Registration
  As a new customer
  I want to register on the Magento website
  So that I can make purchases

  Background:
    Given I navigate to the Magento homepage

  Scenario: Successful user registration
    When I click on the "Create an Account" link
    And I fill in the registration form with valid details
    And I submit the registration form
    Then I should see the registration success dashboard
    And I should see my account dashboard