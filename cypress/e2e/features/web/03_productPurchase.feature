Feature: Product Purchase
  As a logged in user
  I want to purchase a product
  So that I can receive the item

  Background:
    Given I am logged in to my Magento account

  Scenario: Complete product purchase from selection to confirmation
    # Selección del producto
    When I navigate to the "Men" category
    And I select "Teton Pullover Hoodie" from the list
    And I select size "M" and color "Red"
    And I set quantity to "2"
    And I add the product to my cart
    
    # Checkout
    And I proceed to checkout
    Then I should see the checkout page
    
    # Información de envío
    When I fill shipping information:
      | Company  | Address          | City      | State/Province | ZIP       | Phone       |
      | MyComp   | 123 Main Street  | New York  | New York        | 10001     | 5551234567  |
       
    # Confirmación
    And I proceed to next step
    And I place the order
    Then I should see the order confirmation page
    And I should see my order number