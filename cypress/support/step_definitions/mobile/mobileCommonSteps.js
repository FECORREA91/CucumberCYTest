const { Given } = require("@badeball/cypress-cucumber-preprocessor");
const MobileLoginPage = require("../../../support/pageObjects/mobile/mobileLoginPage").default;

Given("I navigate to the Magento homepage on mobile", () => {
  MobileLoginPage.navigate();
});

Given("I am logged in to my Magento account on mobile", () => {
  MobileLoginPage.navigate()
    .openMobileMenu()
    .tapSignInOption()
    .enterCredentials(MobileLoginPage.credentials.email, MobileLoginPage.credentials.password)
    .tapLoginButton();
  MobileLoginPage.verifyMobileLoginSuccess();
});