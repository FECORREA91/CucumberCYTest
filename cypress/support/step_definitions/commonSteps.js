const { Given } = require("@badeball/cypress-cucumber-preprocessor");
const LoginPage = require("../../support/pageObjects/loginPage").default;

Given("I navigate to the Magento homepage", () => {
  LoginPage.navigate();
});
/*
Given("I am logged in to my Magento account", () => {
  LoginPage.navigate();
  LoginPage.clickSignInLink();
  LoginPage.enterCredentials(LoginPage.credentials.email, loginPage.credentials.password);
  LoginPage.clickLoginButton();
  LoginPage.elements.accountDashboard().should("be.visible");
});

*/