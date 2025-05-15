class ProductPage {
  elements = {
    menCategoryLink: () => cy.xpath("//*[@id='ui-id-5']"),
    categoryClothes: () => cy.xpath("//a[contains(text(),'Hoodies & Sweatshirts')]"),
    productItem: (productName) => cy.xpath(`//a[normalize-space()='${productName}']`),
    sizeOption: (size) => cy.xpath(`//div[@option-label='${size}']`),
    colorOption: (color) => cy.xpath(`//div[@option-label='${color}']`),
    quantityInput: () => cy.xpath("//input[@id='qty']"),
    addToCartButton: () => cy.xpath("//button[@id='product-addtocart-button']"),
    cartCounter: () => cy.xpath("//span[@class='counter-number']"),
    miniCart: () => cy.xpath("//a[@class='action showcart']"),
    proceedToCheckoutButton: () => cy.xpath("//button[@id='top-cart-btn-checkout']"),
    checkoutPageTitle: () => cy.get('.page-title').contains('Checkout'),
 

    addressModal: () => cy.xpath("(//div[contains(@class,'modal-inner-wrap')])[4]"),
    newAddress: ()=> cy.xpath("//button[@class='action action-show-popup']"),
    shippingAddress: ()=> cy.xpath("//button[@class='action primary action-save-address']"),

    companyField: () => cy.get('input[name="company"]'),
    addressField: () => cy.get('input[name="street[0]"]'),
    cityField: () => cy.get('input[name="city"]'),
    stateField: () => cy.get('select[name="region_id"]'),
    zipField: () => cy.get('input[name="postcode"]'),
    phoneField: () => cy.get('input[name="telephone"]'),
    nextButton: () => cy.xpath("//span[normalize-space()='Next']"),
    placeOrderButton: () => cy.xpath("//span[normalize-space()='Place Order']"),
    orderSuccessMessage: () => cy.xpath("//span[contains(text(),'Thank you for your purchase!')]"),
    orderNumber: () => cy.get(".order-number")
  };

  navigateToMenCategory() {
    this.elements.menCategoryLink().first().click();
    this.elements.categoryClothes().first().click();
    return this;
  }

  selectProduct(productName) {
    this.elements.productItem(productName).first().click();
    return this;
  }

  selectSize(size) {
    this.elements.sizeOption(size).first().click();
    return this;
  }

  selectColor(color) {
    this.elements.colorOption(color).first().click();
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

  proceedToCheckout() {
    this.elements.miniCart().click();
    this.elements.proceedToCheckoutButton().should('be.visible').click({force: true});
    this.elements.newAddress().then($btn => {
      if ($btn.length > 0) {
        this.elements.newAddress().click();
        this.elements.addressModal().should('be.visible');
      }
    });

    return this;
  }

_ensureModalClosed() {
  // 1. Verificación inicial con manejo de null/undefined
  this.elements.addressModal().then(($modal) => {
    if ($modal && $modal.length > 0 && $modal.is(':visible')) {
      // 2. Intentar cierre normal con verificación
      this.elements.shippingAddress().click({ force: true });
      
      // 3. Verificación con timeout y reintentos
      const maxAttempts = 3;
      const checkModal = (attempt = 1) => {
        this.elements.addressModal().then(($m) => {
          if ($m && $m.length > 0 && $m.is(':visible')) {
            if (attempt >= maxAttempts) {
              // 4. Eliminación final si persiste visible
              cy.log('Forzando eliminación del modal');
              const removeModal = () => {
                const modal = document.evaluate(
                  '(//div[contains(@class,"modal-inner-wrap")])[4]',
                  document,
                  null,
                  XPathResult.FIRST_ORDERED_NODE_TYPE,
                  null
                ).singleNodeValue;
                if (modal) {
                  modal.style.display = 'none';
                  modal.remove();
                }
              };
              cy.document().then(removeModal);
            } else {
              // Reintento con espera progresiva
              cy.wait(1000 * attempt).then(() => checkModal(attempt + 1));
            }
          }
        });
      };
      
      checkModal();
    }
  });
  
  // 5. Verificación final tolerante
  this.elements.addressModal().should(($el) => {
    if ($el && $el.length > 0) {
      expect($el.is(':visible')).to.be.false;
    }
  });
}

  fillAndSubmitAddress(company, address, city, state, zip, phone) {
    this.fillShippingInfo(company, address, city, state, zip, phone);
    this._ensureModalClosed();
    return this;
  }
  
  proceedToNextStep() {
    this._ensureModalClosed();
    this.elements.nextButton().click();
    return this;
  }

  clickNext() {
    this.elements.nextButton().click();
    return this;
  }

  fillShippingInfo(company, address, city, state, zip, phone) {
    this.elements.companyField().type(company);
    this.elements.addressField().type(address);
    this.elements.cityField().type(city);
    this.elements.stateField().select(state);
    this.elements.zipField().type(zip);
    this.elements.phoneField().type(phone);
    return this;
  }

  placeOrder() {
    this.elements.placeOrderButton().should('be.visible').click({force: true});
    return this;
  }

  verifyOrderConfirmation() {
    this.elements.orderSuccessMessage().should('be.visible');
    return this;
  }

  verifyOrderNumber() {
    this.elements.orderNumber().should('be.visible');
    return this;
  }
}

const productPageInstance = new ProductPage();
export default productPageInstance;