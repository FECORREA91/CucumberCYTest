class RegistrationPage {
  constructor() {
    this.currentCredentials = null;
  }

  elements = {
    createAccountLink: () => cy.xpath("//div[@class='panel header']//a[normalize-space()='Create an Account']"),
    firstNameInput: () => cy.get('#firstname'),
    lastNameInput: () => cy.get('#lastname'),
    emailInput: () => cy.get('#email_address'),
    passwordInput: () => cy.get('#password'),
    confirmPasswordInput: () => cy.get('#password-confirmation'),
    createAccountButton: () => cy.xpath("//button[@title='Create an Account']"),
    successMessage: () => cy.xpath("//div[@class='message-success success message']"),
    accountDashboard: () => cy.xpath("//div[@class='panel header']//li[@class='greet welcome']")
  };

  navigate() {
    cy.visit("https://magento.softwaretestingboard.com/");
    return this;
  }

  generateCredentials() {
    const timestamp = Date.now();
    this.currentCredentials = {
      email: `testuser${timestamp}@example.com`,
      password: `Password${timestamp}`
    };
    return this.currentCredentials;
  }

  clickCreateAccountLink() {
    this.elements.createAccountLink().click();
    return this;
  }

  fillRegistrationForm(userData = {}) {
    if (!this.currentCredentials) {
      this.generateCredentials();
    }

    this.elements.firstNameInput().type(userData.firstName || 'Test');
    this.elements.lastNameInput().type(userData.lastName || 'User');
    this.elements.emailInput().type(this.currentCredentials.email);
    this.elements.passwordInput().type(this.currentCredentials.password);
    this.elements.confirmPasswordInput().type(this.currentCredentials.password);
    return this;
  }

  submitRegistrationForm() {
    this.elements.createAccountButton().click();
    return this;
  }
}

export default new RegistrationPage();