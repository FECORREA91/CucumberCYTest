class LoginPage {
  constructor() {
    this.credentials = {
      email: 'apcorreaf@gmail.com',
      password: 'byiADrG2Z.NsJyg'
    };
  }

  elements = {
    signInLink: () => cy.get("div[class='panel header'] li[data-label='or'] a"),
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
    this.elements.signInLink().should('be.visible').click({ force: true });
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
  return this.elements.loggedin().should('contain.text', expectedName);
  }
}

const loginPageInstance = new LoginPage();
export default loginPageInstance;