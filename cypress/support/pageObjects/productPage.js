class ProductPage {
  elements = {
    menCategoryLink: () => cy.xpath("//*[@id='ui-id-5']"),
    categoryClothes: () => cy.xpath("//a[contains(text(),'Hoodies & Sweatshirts')]"),
    productItem: () => cy.xpath("//a[normalize-space()='Teton Pullover Hoodie']"),
    selectSize: ()=> cy.xpath("//div[@id='option-label-size-143-item-170']"),
    selectColor: () =>cy.xpath("//div[@id='option-label-color-93-item-49']"),
    countItem: ()=> cy.xpath("//input[@id='qty']"),
    addToCartButton: () => cy.xpath("//button[@id='product-addtocart-button']"),
    cartCounter: () => cy.xpath("//span[@class='counter-number']"),
    openCartFirts: ()=> cy.xpath("//a[@class='action showcart']"),
    proceedToCheckoutButton: () => cy.xpath("//button[@id='top-cart-btn-checkout']"),
    checkoutPageTitle: () => cy.get('.page-title').contains('Checkout'),
    orderSummary: () => cy.xpath("//div[@class='opc-block-summary']"),
    companyField:() => cy.xpath("//input[@id='K4ECA7P']"),
    adressField: () => cy.xpath("//input[@id='GBX8OTU']"),
    cityField:() => cy.xpath("//input[@id='NRI9VGJ']"),
    countryField:() => cy.xpath("//select[@id='BOEAMT3']"),
    stateField:() => cy.xpath("//select[@id='SBFAS33']"),
    postalCode:() => cy.xpath("//input[@id='GLIVKVW']"),
    phoneNumberField:() => cy.xpath("//input[@id='WVWMEIR']"),
    nextButton:() => cy.xpath("//span[normalize-space()='Next']"),
  };

  navigateToMenCategory() {
    this.elements.menCategoryLink().click();
    this.elements.categoryClothes().click();
    return this;
  }

  selectFirstProduct() {
    this.elements.productItem().click();
    this.elements.selectSize().click();
    this.elements.selectColor().click();
    this.elements.countItem().clear().type('2');
    return this;
  }

  addToCart() {
    this.elements.addToCartButton().click();
    return this;
  }

  proceedToCheckout() {
  this.elements.openCartFirts().click();
  this.elements.proceedToCheckoutButton().click();
  return this;
  }
}

const productPageInstance = new ProductPage();
export default productPageInstance;