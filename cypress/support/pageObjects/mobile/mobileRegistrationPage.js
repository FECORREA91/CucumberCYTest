class MobileRegistrationPage {
  constructor() {
    this.currentCredentials = null;
  }

  elements = {
    mobileMenuButton: () => cy.get('button[data-action="toggle-nav"]'),
    mobileAccountbutton: ()=>cy.get('div[aria-controls="store.menu"]'),
    mobileCreateAccountOption: () => cy.get('a[href="#store.links"]'),
    firstNameInput: () => cy.get('#firstname'),
    lastNameInput: () => cy.get('#lastname'),
    emailInput: () => cy.get('#email_address'),
    passwordInput: () => cy.get('#password'),
    confirmPasswordInput: () => cy.get('#password-confirmation'),
    createAccountButton: () => cy.contains('button', 'Create an Account').first(),
    successMessage: () => cy.contains('div', 'Thank you for registering').first(),
    accountDashboard: () => cy.get('.customer-menu').first()
  };

  navigate() {
    cy.viewport('iphone-6');
    cy.visit("https://magento.softwaretestingboard.com/");
    return this;
  }

  generateCredentials() {
    const timestamp = Date.now();
    this.currentCredentials = {
      email: `mobileuser${timestamp}@example.com`,
      password: `MobilePass${timestamp}`
    };
    return this.currentCredentials;
  }

  openMobileMenu() {
    this.elements.mobileMenuButton().click();
    return this;
  }

  tapCreateAccountOption() {
    this.elements.mobileCreateAccountOption().click();
    this.elements.mobileCreateAccountOption().click();
    return this;
  }

  fillMobileRegistrationForm() {
    if (!this.currentCredentials) {
      this.generateCredentials();
    }

    this.elements.firstNameInput().type('Mobile');
    this.elements.lastNameInput().type('User');
    this.elements.emailInput().type(this.currentCredentials.email);
    this.elements.passwordInput().type(this.currentCredentials.password);
    this.elements.confirmPasswordInput().type(this.currentCredentials.password);
    return this;
  }

  submitMobileRegistrationForm() {
    this.elements.createAccountButton().click();
    return this;
  }
}

export default new MobileRegistrationPage();