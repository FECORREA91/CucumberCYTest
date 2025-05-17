const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const MobileRegistrationPage = require("../../../support/pageObjects/mobile/mobileRegistrationPage").default;

When('I click on the mobile menu in registration', () => {
  MobileRegistrationPage.openMobileMenu();
});

When('I tap on the "Create Account" option', () => {
  MobileRegistrationPage.tapCreateAccountOption();
});

When('I fill in the mobile registration form with valid details', () => {
  MobileRegistrationPage.fillMobileRegistrationForm();
});

When('I submit the mobile registration form', () => {
  MobileRegistrationPage.submitMobileRegistrationForm();
});

Then('I should see the mobile registration success message', () => {
  MobileRegistrationPage.elements.successMessage().should('be.visible');
});

Then('I should see my mobile account dashboard', () => {
  MobileRegistrationPage.elements.accountDashboard().should('be.visible');
});