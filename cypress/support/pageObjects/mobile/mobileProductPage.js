class MobileProductPage {
  elements = {
    mobileMenuButton: () => cy.get('.nav-toggle').first(),
    mobileMenuCategory: () => cy.xpath("//a[@id='ui-id-5']").first(),
    mobileMenuProduct: () => cy.xpath("//a[@id='ui-id-19']//span[contains(text(),'Jackets')]").first(),
    productItem: () => cy.xpath("//strong[@class='product name product-item-name']//a[@class='product-item-link'][normalize-space()='Montana Wind Jacket']").first(),
    sizeOption: () => cy.xpath("//div[@id='option-label-size-143-item-170']").first(),
    colorOption: () => cy.xpath("//div[@id='option-label-color-93-item-58']").first(),
    quantityInput: () => cy.get('#qty').first(),
    addToCartButton: () => cy.contains('button', 'Add to Cart').first(),
    cartIcon: () => cy.get('.showcart').first(),
    cartDropdown: () => cy.get('.ui-dialog.mage-dropdown-dialog').first(),
    proceedToCheckoutButton: () => cy.get("#top-cart-btn-checkout").first(),
    checkoutPageTitle: () => cy.contains('h1', 'Checkout').first(),
    nextButton: () => cy.contains('button', 'Next').first(),
    placeOrderButton: () => cy.xpath("//button[@title='Place Order']"),
    orderSuccessMessage: () => cy.contains('span', 'Thank you for your purchase!'),
    orderNumber: () => cy.get('.order-number').first()
  };

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
    this.elements.cartIcon().should('be.visible').click();
    this.elements.cartDropdown().should('be.visible').and('have.css', 'display', 'block');
    this.elements.proceedToCheckoutButton().should('be.visible').click({ force: true });
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