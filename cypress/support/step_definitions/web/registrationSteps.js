const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const registrationPage = require("../../../support/pageObjects/web/registrationPage").default; 

When('I click on the "Create an Account" link', () => {
  registrationPage.clickCreateAccountLink();
});

When('I fill in the registration form with valid details', () => {
  registrationPage.fillRegistrationForm();
});

When('I submit the registration form', () => {
  registrationPage.submitRegistrationForm();
});

Then('I should see the registration success dashboard', () => {
  registrationPage.elements.accountDashboard().should('be.visible');
});

Then('I should see my account dashboard', () => {
  registrationPage.elements.successMessage().should('be.visible');
});