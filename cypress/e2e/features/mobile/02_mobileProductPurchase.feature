@mobile
Feature: Mobile Product Purchase
  As a logged in mobile user
  I want to purchase a product from my mobile device
  So that I can shop conveniently

  Background:
    Given I am logged in to my Magento account on mobile

  Scenario: Complete mobile product purchase
    When I open the mobile menu
    And I select "Men" category
    And I choose "Jackets"
    And I select size "M" and color "Red" mobile option
    And I set quantity to "1" mobile
    And I add the product to my cart mobile
    And I proceed to mobile checkout
    Then I should see the mobile checkout page
    And I proceed to next step mobile option
    And I place the order mobile option
    Then I should see the mobile order confirmation
    And I should see my mobile order number