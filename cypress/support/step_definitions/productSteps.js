const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const productPage  = require("../pageObjects/productPage").default; 

When('I navigate to the "Men" category', () => {
  productPage.navigateToMenCategory();
});

When('I select a product from the list', () => {
  productPage.selectFirstProduct();
});

When('I add the product to my cart', () => {
  productPage.addToCart();
});

When('I proceed to checkout', () => {
  productPage.proceedToCheckout();
});

Then('I should see the checkout page', () => {
  productPage.elements.checkoutPageTitle().should('be.visible');
});

Then('I should see the product in my order summary', () => {
  productPage.elements.orderSummary().should('be.visible');
});