class LoginPage {
  constructor() {
    this.credentials = {
      email: 'apcorreaf@gmail.com',
      password: 'byiADrG2Z.NsJyg'
    };
  }

  elements = {
    signInLink: () => cy.xpath("//div[@class='panel header']//a[contains(text(),'Sign In')]"),
    emailInput: () => cy.get('#email'),
    passwordInput: () => cy.get('#pass'),
    loginButton: () => cy.get('#send2'),
    errorMessage: () => cy.xpath("//div[@class='message-error error message']"),
    loggedin: () =>cy.xpath("//div[@class='panel header']//li[@class='greet welcome']"),
    accountDashboard: () => cy.get("div[class='panel header'] span[class='logged-in']")
  };

  navigate() {
    cy.visit("https://magento.softwaretestingboard.com/");
    return this;
  }

  clickSignInLink() {
    this.elements.signInLink().click();
    return this;
  }

  enterCredentials(email, password) {
    this.elements.emailInput().type(email);
    this.elements.passwordInput().type(password);
    return this;
  }

  clickLoginButton() {
    this.elements.loginButton().click();
    return this;
  }

  verifyAccount( expectedName ='Welcome, Fabian Correa!') {
  this.elements.loggedin().should('contain.text', expectedName);
  return this;
  }
}

const loginPageInstance = new LoginPage();
export default loginPageInstance;