class MobileProductPage {
  elements = {
    mobileMenuButton: () => cy.get('.nav-toggle'),
    mobileMenuCategory: () => cy.xpath("//a[@id='ui-id-5']"),
    mobileMenuProduct: () => cy.xpath("//a[@id='ui-id-19']//span[contains(text(),'Jackets')]"),
    productItem: () => cy.xpath("//a[normalize-space()='Montana Wind Jacket']"),
    sizeOption: () => cy.xpath("//div[@id='option-label-size-143-item-170']"),
    colorOption: () => cy.xpath("//div[@id='option-label-color-93-item-58']"),
    quantityInput: () => cy.get('#qty'),
    addToCartButton: () => cy.contains('button', 'Add to Cart').first(),
    cartIcon: () => cy.get('.showcart'),
    proceedToCheckoutButton: () => cy.contains('button', 'Proceed to Checkout').first(),
    checkoutPageTitle: () => cy.contains('h1', 'Checkout'),
    nextButton: () => cy.contains('button', 'Next').first(),
    placeOrderButton: () => cy.xpath("//button[@title='Place Order']"),
    orderSuccessMessage: () => cy.contains('span', 'Thank you for your purchase!'),
    orderNumber: () => cy.get('.order-number').first()
  };

  openMobileMenu() {
    this.elements.mobileMenuButton().click({force: true});
    return this;
  }

  selectMobileCategory(category) {
    this.elements.mobileMenuCategory().click();
    this.elements.mobileMenuProduct().click();
    return this;
  }

  selectProduct(productName) {
    this.elements.productItem(productName).click();
    return this;
  }

  selectSize(size) {
    this.elements.sizeOption(size).click();
    return this;
  }

  selectColor(color) {
    this.elements.colorOption(color).click();
    return this;
  }

  setQuantity(quantity) {
    this.elements.quantityInput().clear().type(quantity);
    return this;
  }

  addToCart() {
    this.elements.addToCartButton().click();
    return this;
  }

  proceedToMobileCheckout() {
    this.elements.cartIcon().click();
    this.elements.proceedToCheckoutButton().click();
    return this;
  }
  proceedToMobileNextStep() {
    this.elements.nextButton()
      .should('be.visible')
      .scrollIntoView({ 
        easing: 'linear',
        duration: 1000, 
        offset: { top: -50, left: 0 } 
      })
      .click({ force: true }); 
    return this;
  }

  placeOrder() {
    this.elements.placeOrderButton().click();
    return this;
  }
}

export default new MobileProductPage();