const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").default;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const cucumber = require('multiple-cucumber-html-reporter');
const path = require('path'); 
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://magento.softwaretestingboard.com",
    specPattern: "cypress/e2e/features/web/*.feature",
    supportFile: "cypress/support/e2e.js",
    chromeWebSecurity: false,
    pageLoadTimeout: 120000, // 120 segundos (2 minutos)
    defaultCommandTimeout: 10000, // 10 segundos para comandos
    requestTimeout: 15000, // 15 segundos para requests
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      addCucumberPreprocessorPlugin(on, config);
      
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      
      // Configuración del reporter de Cucumber
       on('after:run', async (results) => {
        // Crear directorios si no existen
        const jsonDir = path.join(__dirname, 'cypress', 'reports', 'cucumber-json');
        const reportDir = path.join(__dirname, 'cypress', 'reports', 'cucumber-html');
        
        if (!fs.existsSync(jsonDir)) {
          fs.mkdirSync(jsonDir, { recursive: true });
        }
        
        if (!fs.existsSync(reportDir)) {
          fs.mkdirSync(reportDir, { recursive: true });
        }

        // Esperar a que los archivos JSON se generen
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Generar reporte con manejo de errores
        try {
          cucumber.generate({
            jsonDir: jsonDir,
            reportPath: reportDir,
            openReportInBrowser: true,
            metadata: {
              browser: {
                name: 'chrome',
                version: 'latest'
              },
              device: 'Desktop',
              platform: {
                name: 'Windows',
                version: '10'
              }
            }
          });
          console.log('Reporte generado correctamente en:', reportDir);
        } catch (error) {
          console.error('Error generando reporte:', error);
        }
      });
      
      return config;
    }
  }
});