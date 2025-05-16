class MobileProductPage {
  elements = {
    // Selectores originales conservados
    mobileMenuButton: () => cy.get('button[data-action="toggle-nav"]'),
    mobileMenuCategory: () => cy.get('#ui-id-5'), // Men category
    jacketsProduct: () => cy.get('#ui-id-19'), // Jackets subcategory
    productItem1: () => cy.get('#maincontent > div.columns > div.column.main > div.products.wrapper.grid.products-grid > ol > li:nth-child(2) > div > div > strong > a'),
    sizeOption: () => cy.get('#option-label-size-143-item-170'), // Size M
    colorOption: () => cy.get('#option-label-color-93-item-58'), // Color Red
    quantityInput: () => cy.get('#qty'),
    addToCartButton: () => cy.get('#product-addtocart-button'),
    cartIcon: () => cy.get('body > div.page-wrapper > header > div.header.content > div.minicart-wrapper > a'),
    proceedToCheckoutButton: () => cy.get('#top-cart-btn-checkout'),
    placeOrderButton: () => cy.get('#checkout-payment-method-load > div > div > div.payment-method._active > div.payment-method-content > div.actions-toolbar > div > button'),
    orderSuccessMessage: () => cy.contains('span', 'Thank you for your purchase!')
  };

  // Flujo optimizado
  quickPurchase() {
    this.elements.mobileMenuButton().click();
    this.elements.mobileMenuCategory().click();
    this.elements.jacketsProduct().click();
    this.elements.productItem1().click();
    this.elements.sizeOption().click();
    this.elements.colorOption().click();
    this.elements.quantityInput().clear().type('1');
    this.elements.addToCartButton().click();
    this.elements.cartIcon().click();
    this.elements.proceedToCheckoutButton().click();
    
    // Asume dirección existente y método de pago configurado
    cy.get('button[type="submit"]').then(($btn) => {
      if ($btn.text().includes('Place Order')) {
        $btn.click();
      } else {
        cy.get('button[title="Place Order"]').click();
      }
    });
    
    return this;
  }

  verifyOrderSuccess() {
    this.elements.orderSuccessMessage().should('be.visible');
    return this;
  }
}

export default new MobileProductPage();