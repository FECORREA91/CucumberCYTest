import 'cypress-mochawesome-reporter/register';
import './commands';
require('cypress-xpath');

// Safe XPath extension
if (typeof cy.xpath === 'undefined') {
  const xpath = require('cypress-xpath');
  Cypress.Commands.add('xpath', { prevSubject: ['optional', 'element', 'document'] }, xpath);
}

// Global error handling
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

// Device configuration logging
before(() => {
  const device = Cypress.env('deviceProfile');
  const testType = Cypress.env('testType');
  if (device) {
    cy.log(`Running tests on: ${device} (${testType} mode)`);
    if (testType === 'mobile') {
      cy.viewport(Cypress.config('viewportWidth'), Cypress.config('viewportHeight'));
    }
  }
});