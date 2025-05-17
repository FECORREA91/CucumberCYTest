const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const MobileLoginPage = require("../../../support/pageObjects/mobile/mobileLoginPage").default;

When('I click on the mobile menu in login', () => {
  MobileLoginPage.openMobileMenu();
});

When('I tap on the "Sign In" option', () => {
  MobileLoginPage.tapSignInOption();
});

When('I enter credentials successful', () => {
  MobileLoginPage.enterCredentials(MobileLoginPage.credentials.email, MobileLoginPage.credentials.password);
});

When('I enter invalid login credentials on mobile', () => {
  MobileLoginPage.enterCredentials('invalid@example.com', 'wrongpassword');
});

When('I tap the login button', () => {
  MobileLoginPage.tapLoginButton();
});

Then('I should see the mobile login success message', () => {
  MobileLoginPage.verifyMobileLoginSuccess();
});

Then('I should see a mobile error message', () => {
  MobileLoginPage.elements.errorMessage().should('be.visible');
});

Then('I should not be logged on mobile', () => {
  MobileLoginPage.verifyNotLoggedIn();
});