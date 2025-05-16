const { Given } = require("@badeball/cypress-cucumber-preprocessor");
const MobileLoginPage = require("../../support/pageObjects/mobile/mobileLoginPage").default;

Given("I navigate to the Magento homepage on mobile", () => {
  MobileLoginPage.navigate();
});

Given("I am logged in to my Magento account on mobile", () => {
  MobileLoginPage.navigate();
  MobileLoginPage.openMobileMenu();
  MobileLoginPage.tapSignInOption();
  MobileLoginPage.enterCredentials(MobileLoginPage.credentials.email, MobileLoginPage.credentials.password);
  MobileLoginPage.tapLoginButton();
  MobileLoginPage.elements.successMessage().should("be.visible");
});