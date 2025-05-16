class MobileLoginPage {
  constructor() {
    this.credentials = {
      email: 'apcorreaf@gmail.com',
      password: 'byiADrG2Z.NsJyg'
    };
  }

  elements = {
    mobileMenuButton: () => cy.get('button[data-action="toggle-nav"]'),
    mobileAccountbutton: ()=>cy.get('div[aria-controls="store.menu"]'),
    mobileSignInOption: () => cy.get('a[href="#store.links"]'),
    emailInput: () => cy.get('#email'),
    passwordInput: () => cy.get('#pass'),
    loginButton: () => cy.get('#send2'),
    errorMessage: () => cy.get('.message-error').first(),
    successMessage: () => cy.get('.greet.welcome').first(),
    accountDashboard: () => cy.get('.customer-menu').first()
  };

  navigate() {
    cy.viewport('iphone-6');
    cy.visit("https://magento.softwaretestingboard.com/");
    return this;
  }

  openMobileMenu() {
    this.elements.mobileMenuButton().click();
    return this;
  }

  tapSignInOption() {
    this.elements.mobileAccountbutton().click();
    this.elements.mobileSignInOption().click();
    return this;
  }

  enterCredentials(email, password) {
    this.elements.emailInput().type(email);
    this.elements.passwordInput().type(password);
    return this;
  }

  tapLoginButton() {
    this.elements.loginButton().click();
    return this;
  }

  verifyMobileLoginSuccess() {
    this.elements.successMessage().should('be.visible');
    return this;
  }
}

export default new MobileLoginPage();