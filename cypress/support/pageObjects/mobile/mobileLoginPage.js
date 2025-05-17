class MobileLoginPage {
  constructor() {
    this.credentials = {
      email: 'apcorreaf@gmail.com',
      password: 'byiADrG2Z.NsJyg'
    };
  }

  elements = {
    mobileMenuButton: () => cy.get('.nav-toggle').first(),
    mobileAccountbutton: () => cy.xpath("//a[normalize-space()='Account']").first(),
    mobileSignInOption: () => cy.xpath("//div[@id='store.links']//a[contains(text(),'Sign In')]").first(),
    emailInput: () => cy.get('#email').first(),
    passwordInput: () => cy.get('#pass').first(),
    loginButton: () => cy.get('#send2').first(),
    errorMessage: () => cy.get('.message-error').first(),
    successMessage: () => cy.get('div.message').first(),
    accountDashboard: () => cy.xpath("//div[@class='message-error error message']").first()
  };

  navigate() {
    cy.viewport('iphone-6');
    cy.visit("https://magento.softwaretestingboard.com/");
    return this;
  }

  openMobileMenu() {
    this.elements.mobileMenuButton()
      .should('be.visible')
      .scrollIntoView({ 
        offset: { top: -50, left: 0 },
        duration: 500
      })
      .click({ force: true });
    return this;
  }

  tapSignInOption() {
    this.elements.mobileAccountbutton().should('be.visible').click();
    this.elements.mobileSignInOption().should('be.visible').click();
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

  verifyNotLoggedIn() {
    this.elements.accountDashboard().should('not.exist');
    return this;
  }
}

export default new MobileLoginPage();