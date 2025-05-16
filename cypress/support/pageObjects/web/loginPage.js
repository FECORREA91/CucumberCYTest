class LoginPage {
  constructor() {
    this.credentials = {
      email: 'apcorreaf@gmail.com',
      password: 'byiADrG2Z.NsJyg'
    };
  }

  elements = {
    signInLink: () => cy.contains('a', 'Sign In').eq(0),
    emailInput: () => cy.get('#email'),
    passwordInput: () => cy.get('#pass'),
    loginButton: () => cy.get('#send2'),
    errorMessage: () => cy.get('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]'),
    loggedin: () =>cy.contains('span', 'Welcome, Fabian Correa!').eq(0),
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