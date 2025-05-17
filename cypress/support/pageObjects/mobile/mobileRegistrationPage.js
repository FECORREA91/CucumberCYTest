class MobileRegistrationPage {
  constructor() {
    this.currentCredentials = null;
  }

  elements = {
    mobileMenuButton: () => cy.get('.nav-toggle').first(),
    mobileAccountbutton: () => cy.xpath("//a[normalize-space()='Account']").first(),
    mobileCreateAccountOption: () => cy.xpath("//div[@id='store.links']//a[normalize-space()='Create an Account']").first(),
    firstNameInput: () => cy.xpath("//input[@id='firstname']").first(),
    lastNameInput: () => cy.xpath("//input[@id='lastname']").first(),
    emailInput: () => cy.xpath("//input[@id='email_address']").first(),
    passwordInput: () => cy.xpath("//input[@id='password']").first(),
    confirmPasswordInput: () => cy.xpath("//input[@id='password-confirmation']").first(),
    createAccountButton: () => cy.xpath("//button[@title='Create an Account']").first(),
    successMessage: () => cy.xpath("//div[contains(.,'Thank you for registering')]").first(),
    accountDashboard: () => cy.xpath("//div[@class='customer-menu']").first()
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
    this.elements.mobileMenuButton()
      .should('be.visible')
      .scrollIntoView({ 
        offset: { top: -50, left: 0 },
        duration: 500
      })
      .click({ force: true });
    return this;
  }

  tapCreateAccountOption() {
    this.elements.mobileAccountbutton()
      .should('be.visible')
      .scrollIntoView()
      .click({ force: true });
    
    cy.wait(500);
    
    this.elements.mobileCreateAccountOption()
      .should('be.visible')
      .click({ force: true });
    
    return this;
  }

  fillMobileRegistrationForm() {
    if (!this.currentCredentials) {
      this.generateCredentials();
    }

    this.elements.firstNameInput()
      .should('be.visible')
      .type('Mobile');
    
    this.elements.lastNameInput()
      .should('be.visible')
      .type('User');
    
    this.elements.emailInput()
      .should('be.visible')
      .type(this.currentCredentials.email);
    
    this.elements.passwordInput()
      .should('be.visible')
      .type(this.currentCredentials.password);
    
    this.elements.confirmPasswordInput()
      .should('be.visible')
      .type(this.currentCredentials.password);
    
    return this;
  }

  submitMobileRegistrationForm() {
    this.elements.createAccountButton()
      .should('be.visible')
      .and('not.be.disabled')
      .click();
    
    cy.url().should('include', 'customer/account'); // Verifica redirección
    return this;
  }
}

export default new MobileRegistrationPage();