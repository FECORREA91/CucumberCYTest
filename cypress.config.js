const path = require('path'); 
const fs = require('fs');
const { defineConfig } = require("cypress");
const cypressSplit = require('cypress-split');
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").default;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

// Configuraciones de dispositivos móviles
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

// VERIFICACIÓN DE PATHS ANTES DE LA CONFIGURACIÓN
const featuresPaths = [
  path.join(__dirname, "cypress/e2e/features/web"),
  path.join(__dirname, "cypress/e2e/features/mobile")
];

featuresPaths.forEach(featurePath => {
  if (!fs.existsSync(featurePath)) {
    throw new Error(`Directory not found: ${featurePath}`);
  }
});

module.exports = defineConfig({
  e2e: {
    // Configuración simplificada de specPattern
    specPattern: "cypress/e2e/features/**/*.feature",
    
    // Configuración del reporter
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: path.join(__dirname, "cypress/reports/mochawesome"),
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
      deviceProfile: 'desktop',
      testType: 'web'
    },

    setupNodeEvents(on, config) {
      // Configuración de plugins
      cypressSplit(on, config);
      require('cypress-mochawesome-reporter/plugin')(on);
      addCucumberPreprocessorPlugin(on, config);
      
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));

      // Configuración dinámica mejorada
      const deviceName = config.env.deviceProfile || config.env.defaultDevice;
      const devices = JSON.parse(config.env.mobileDevices);
      const device = devices[deviceName] || devices.desktop;

      // Aplica configuración basada en el tipo de prueba
      if (config.env.testType === 'mobile') {
        config.viewportWidth = device.viewportWidth;
        config.viewportHeight = device.viewportHeight;
        config.userAgent = device.userAgent;
        config.isMobile = device.isMobile;
        config.chromeWebSecurity = false; // Importante para mobile
      } else {
        config.viewportWidth = devices.desktop.viewportWidth;
        config.viewportHeight = devices.desktop.viewportHeight;
        config.userAgent = devices.desktop.userAgent;
        config.isMobile = false;
      }

      // Tasks para cambiar entre modos
      on('task', {
        setMobileDevice: (deviceName) => {
          const targetDevice = devices[deviceName];
          if (targetDevice) {
            config.env.testType = 'mobile';
            config.env.deviceProfile = deviceName;
            return `Modo móvil configurado: ${targetDevice.name}`;
          }
          throw new Error(`Dispositivo no soportado: ${deviceName}`);
        },
        setWebMode: () => {
          config.env.testType = 'web';
          return 'Modo web configurado';
        },
        getCurrentConfig: () => {
          return {
            viewportWidth: config.viewportWidth,
            viewportHeight: config.viewportHeight,
            userAgent: config.userAgent,
            isMobile: config.isMobile
          };
        },
        // Nuevo task para verificar paths durante la ejecución
        verifyMobilePaths: () => {
          const mobilePath = path.join(__dirname, "cypress/e2e/features/mobile");
          return fs.existsSync(mobilePath);
        }
      });

      return config;
    }
  }
});