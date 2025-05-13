Feature: Product Purchase
  As a logged in user
  I want to purchase a product
  So that I can receive the item

  Background:
    Given I am logged in to my Magento account

  Scenario: Add product to cart and proceed to checkout
    When I navigate to the "Men" category
    And I select a product from the list
    And I add the product to my cart
    And I proceed to checkout
    Then I should see the checkout page
    And I should see the product in my order summary