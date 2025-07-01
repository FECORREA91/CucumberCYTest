import './commands';
require('cypress-xpath');
import '@shelex/cypress-allure-plugin';

if (typeof cy.xpath === 'undefined') {
  const xpath = require('cypress-xpath');
  Cypress.Commands.add('xpath', { prevSubject: ['optional', 'element', 'document'] }, xpath);
}

// Manejo global de errores
Cypress.on('uncaught:exception', (err) => {
  const ignoredErrors = [
    'ga is not defined',
    'replaceAll',
    'postMessage',
    'Cannot read properties',
    'AddFotoramaVideoEvents',
    '$ is not defined',
    'jQuery is not defined'
  ];
  if (ignoredErrors.some(error => err.message.includes(error))) {
    return false;
  }
  return true;
});

// Configuración de dispositivo
before(() => {
  const device = Cypress.env('deviceProfile');
  const testType = Cypress.env('testType');
  if (device) {
    cy.log(`Ejecutando pruebas en: ${device} (modo ${testType})`);
    if (testType === 'mobile') {
      cy.viewport(Cypress.config('viewportWidth'), Cypress.config('viewportHeight'));
    }
  }

  // Configuración adicional para Allure
  cy.allure()
    .epic('Pruebas de Magento')
    .feature(testType === 'mobile' ? 'Versión Móvil' : 'Versión Escritorio')
    .parameter('Dispositivo', device)
    .parameter('Navegador', Cypress.browser.name);
});


afterEach(function() {
  if (this.currentTest && this.currentTest.state === 'failed') {
    cy.screenshot('failed-screenshot', { capture: 'runner' });
    cy.allure().testAttachment(
      'Screenshot on failure', 
      fs.readFileSync(`${Cypress.config('screenshotsFolder')}/${Cypress.spec.name}/${this.currentTest.title} (failed).png`), 
      'image/png'
    );
  }
});