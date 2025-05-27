Cypress.Commands.add('forceViewport', (deviceName = Cypress.env('deviceProfile')) => {
  const devices = JSON.parse(Cypress.env('mobileDevices'));
  const device = devices[deviceName] || devices.desktop;

  // Forzar viewport y user agent
  cy.viewport(device.viewportWidth, device.viewportHeight);
  Cypress.config('userAgent', device.userAgent);
  Cypress.config('isMobile', device.isMobile);
  
  // Esperar a que se apliquen los cambios
  cy.wait(Cypress.env('viewportSwitchDelay') || 500);
  
  // Debug en la consola
  Cypress.log({
    name: 'forceViewport',
    message: `Viewport forçado: ${device.viewportWidth}x${device.viewportHeight}`,
    consoleProps: () => device
  });
});