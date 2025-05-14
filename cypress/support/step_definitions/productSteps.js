
const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const productPage = require("../pageObjects/productPage").default; 

When('I navigate to the "Men" category', () => {
  productPage.navigateToMenCategory();
});

When('I select {string} from the list', (productName) => {
  productPage.selectProduct(productName);
});

When('I select size {string} and color {string}', (size, color) => {
  productPage.selectSize(size);
  productPage.selectColor(color);
});

When('I set quantity to {string}', (quantity) => {
  productPage.setQuantity(quantity);
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

When('I fill shipping information:', (dataTable) => {
  const data = dataTable.hashes()[0];
  productPage.fillShippingInfo(
    data.Company,
    data.Address,
    data.City,
    data['State/Province'],
    data.ZIP,
    data.Phone
  );
});

When('I proceed to next step', () => {
  productPage.proceedToNextStep();
});

When('I place the order', () => {
  productPage.placeOrder();
});

Then('I should see the order confirmation page', () => {
  productPage.verifyOrderConfirmation();
});

Then('I should see my order number', () => {
  productPage.verifyOrderNumber();
});