const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const MobileProductPage = require("../pageObjects/mobile/mobileProductPage").default;

When('I complete the quick purchase flow', () => {
  MobileProductPage.quickPurchase();
});

Then('I should see the order confirmation', () => {
  MobileProductPage.verifyOrderSuccess();
});