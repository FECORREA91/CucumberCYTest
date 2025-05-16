const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const MobileLoginPage = require("../pageObjects/mobile/mobileLoginPage").default;

When('I click on the mobile menu', () => {
  MobileLoginPage.openMobileMenu();
});

When('I tap on the "Sign In" option', () => {
  MobileLoginPage.tapSignInOption();
});

When('I enter valid login credentials', () => {
  MobileLoginPage.enterCredentials(MobileLoginPage.credentials.email, MobileLoginPage.credentials.password);
});

When('I enter invalid login credentials', () => {
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

Then('I should not be logged in', () => {
  MobileLoginPage.elements.accountDashboard().should('not.exist');
});