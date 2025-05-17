const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const MobileProductPage = require("../../../support/pageObjects/mobile/mobileProductPage").default;

When('I open the mobile menu', () => {
  MobileProductPage.openMobileMenu();
});

When('I select {string} category', (category) => {
  MobileProductPage.selectMobileCategory(category);
});

When('I choose {string}', (productName) => {
  MobileProductPage.selectProduct(productName);
});

When('I select size {string} and color {string} mobile option', (size, color) => {
  MobileProductPage.selectSize(size);
  MobileProductPage.selectColor(color);
});

When('I set quantity to {string} mobile', (quantity) => {
  MobileProductPage.setQuantity(quantity);
});

When('I add the product to my cart mobile', () => {
  MobileProductPage.addToCart();
});

// Corregido: cambia productPage por MobileProductPage
When('I proceed to next step mobile option', () => {
  MobileProductPage.proceedToMobileNextStep();
});

When('I proceed to mobile checkout', () => {
  MobileProductPage.proceedToMobileCheckout();
});

Then('I should see the mobile checkout page', () => {
  MobileProductPage.elements.checkoutPageTitle().should('be.visible');
});

// Corregido: elimina el .click() adicional
When('I proceed to next step mobile', () => {
  MobileProductPage.proceedToMobileNextStep();
});

When('I place the order mobile option', () => {
  MobileProductPage.placeOrder();
});

Then('I should see the mobile order confirmation', () => {
  MobileProductPage.elements.orderSuccessMessage().should('be.visible');
});

Then('I should see my mobile order number', () => {
  MobileProductPage.elements.orderNumber().should('be.visible');
});