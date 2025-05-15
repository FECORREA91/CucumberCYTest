// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
// Report Cypress
import 'cypress-mochawesome-reporter/register';
// Import commands.js using ES2015 syntax:
import './commands'
require('cypress-xpath');
// Extensión alternativa segura
if (typeof cy.xpath === 'undefined') {
  const xpath = require('cypress-xpath');
  Cypress.Commands.add('xpath', { prevSubject: ['optional', 'element', 'document'] }, xpath);
}

//  Global error handling
Cypress.on('uncaught:exception', (err) => {
  const ignoredErrors = [
    'ga is not defined',       // Google Analytics
    'replaceAll',              // undefined
    'postMessage',             // windows
    'Cannot read properties',  // undefined/null
    'AddFotoramaVideoEvents',  // Nuevo: Error de Fotorama
    '$ is not defined',        // jQuery no cargado
    'jQuery is not defined'    // jQuery no cargado
  ];
  if (ignoredErrors.some(error => err.message.includes(error))) {
    console.log('Error ignorado:', err.message); // Opcional: para debug
    return false;
  }
  return true;
});

// Device
before(() => {
  const deviceName = Cypress.env('deviceProfile');
  if (deviceName) {
    cy.log(`Ejecutando pruebas en dispositivo: ${deviceName}`);
  }
});