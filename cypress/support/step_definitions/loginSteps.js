const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const LoginPage = require("../pageObjects/loginPage").default;

When('I click on the "Sign In" link', () => {
  LoginPage.clickSignInLink();
});

When('I enter valid login credentials', () => {
  LoginPage.enterCredentials(LoginPage.credentials.email, LoginPage.credentials.password);
});

When('I enter invalid login credentials', () => {
  LoginPage.enterCredentials('apcorreaf@gmail.com', 'byiADrG2Z.NsJy');
});

When('I click the login button', () => {
  LoginPage.clickLoginButton();
});

Then('I should see my account dashboard', () => {
  LoginPage.elements.verifyAccount().should('be.visible');
});

Then('I should see an error message', () => {
  LoginPage.elements.errorMessage().should('be.visible');
});

Then('I should not be logged in', () => {
  LoginPage.elements.accountDashboard().should('not.exist');
});