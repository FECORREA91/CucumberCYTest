class ProductPage {
  elements = {
    menCategoryLink: () => cy.get('a').contains('Men'),
    productItem: () => cy.get('.product-item').first(),
    addToCartButton: () => cy.get('#product-addtocart-button'),
    cartCounter: () => cy.get('.counter-number'),
    proceedToCheckoutButton: () => cy.get('button[data-role="proceed-to-checkout"]'),
    checkoutPageTitle: () => cy.get('.page-title').contains('Checkout'),
    orderSummary: () => cy.get('.opc-block-summary')
  };

  navigateToMenCategory() {
    this.elements.menCategoryLink().click();
    return this;
  }

  selectFirstProduct() {
    this.elements.productItem().click();
    return this;
  }

  addToCart() {
    this.elements.addToCartButton().click();
    return this;
  }

  proceedToCheckout() {
    this.elements.proceedToCheckoutButton().click();
    return this;
  }
}

export default new ProductPage();