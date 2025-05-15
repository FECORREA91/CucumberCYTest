const { defineConfig } = require("cypress");
const cypressSplit = require('cypress-split');
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").default;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

// Configuraciones mejoradas de dispositivos móviles
const mobileDevices = {
  // iOS
  iphone13: {
    name: 'iPhone 13',
    viewportWidth: 390,
    viewportHeight: 844,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    isMobile: true,
    deviceScaleFactor: 3,
    os: 'iOS'
  },
  // Android
  galaxyS21: {
    name: 'Samsung Galaxy S21',
    viewportWidth: 360,
    viewportHeight: 800,
    userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
    isMobile: true,
    deviceScaleFactor: 3,
    os: 'Android'
  },
  // Desktop
  desktop: {
    name: 'Desktop Chrome',
    viewportWidth: 1280,
    viewportHeight: 720,
    isMobile: false,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  }
};

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    video: false,
    experimentalRunAllSpecs: true, // Permite ejecutar todos los specs
    
    // Configuración de reporter (Mochawesome)
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome',
      charts: true,
      reportPageTitle: 'Test Report - Magento',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveJson: false,
      quiet: true
    },
    
    env: {
      mobileDevices: JSON.stringify(mobileDevices),
      defaultDevice: 'desktop',
      deviceProfile: 'desktop'
    },

    setupNodeEvents(on, config) {
      // 1. Configurar paralelismo
      cypressSplit(on, config);
      
      // 2. Configurar Mochawesome
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // 3. Configurar preprocesador de Cucumber
      addCucumberPreprocessorPlugin(on, config, {
        omitAfterRunHandler: true,
        omitBeforeRunHandler: true
      });
      
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));

      // 4. Configuración dinámica para dispositivos
      const deviceName = config.env.deviceProfile || config.env.defaultDevice;
      const devices = JSON.parse(config.env.mobileDevices);
      const device = devices[deviceName] || devices.desktop;

      // Aplicar configuración del dispositivo seleccionado
      config.viewportWidth = device.viewportWidth;
      config.viewportHeight = device.viewportHeight;
      config.userAgent = device.userAgent;
      config.isMobile = device.isMobile;
      
      // 5. Comando para cambiar dispositivo durante la ejecución
      on('task', {
        setMobileDevice: (deviceName) => {
          const targetDevice = devices[deviceName];
          if (targetDevice) {
            config.viewportWidth = targetDevice.viewportWidth;
            config.viewportHeight = targetDevice.viewportHeight;
            config.userAgent = targetDevice.userAgent;
            config.isMobile = targetDevice.isMobile;
            return `Dispositivo configurado: ${targetDevice.name}`;
          }
          throw new Error(`Dispositivo no soportado: ${deviceName}`);
        },
        // Task para obtener dispositivo actual
        getCurrentDevice: () => {
          return {
            name: deviceName,
            ...device
          };
        }
      });

      return config;
    }
  }
});