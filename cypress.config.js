const path = require('path');
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").default;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

const mobileDevices = {
  iphone13: {
    name: 'iPhone 13',
    viewportWidth: 390,
    viewportHeight: 844,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    isMobile: true,
    deviceScaleFactor: 3,
    os: 'iOS'
  },
  galaxyS21: {
    name: 'Samsung Galaxy S21',
    viewportWidth: 360,
    viewportHeight: 800,
    userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
    isMobile: true,
    deviceScaleFactor: 3,
    os: 'Android'
  },
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
    specPattern: "cypress/e2e/features/**/*.feature",
    experimentalRunAllSpecs: true,
    video: true,
    screenshotsFolder: 'allure-results/screenshots',
    videosFolder: 'allure-results/videos',
    
    env: {
      mobileDevices: JSON.stringify(mobileDevices),
      defaultDevice: 'desktop',
      deviceProfile: 'desktop',
      testType: 'web',
      allure: true,
      allureReuseAfterSpec: true,
      allureAddVideoOnPass: true,
      allureAttachRequests: true
    },

    setupNodeEvents(on, config) {
      addCucumberPreprocessorPlugin(on, config);
      
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));

      const deviceName = config.env.deviceProfile || config.env.defaultDevice;
      const devices = JSON.parse(config.env.mobileDevices);
      const device = devices[deviceName] || devices.desktop;

      if (config.env.testType === 'mobile') {
        config.viewportWidth = device.viewportWidth;
        config.viewportHeight = device.viewportHeight;
        config.userAgent = device.userAgent;
        config.isMobile = device.isMobile;
        config.chromeWebSecurity = false;
      }

      on('task', {
        setMobileDevice: (deviceName) => {
          const targetDevice = devices[deviceName];
          if (targetDevice) {
            config.env.testType = 'mobile';
            config.env.deviceProfile = deviceName;
            return `Dispositivo móvil configurado: ${targetDevice.name}`;
          }
          throw new Error(`Dispositivo no soportado: ${deviceName}`);
        },
        setWebMode: () => {
          config.env.testType = 'web';
          return 'Modo web configurado';
        }
      });

      allureWriter(on, config);
      return config;
    }
  }
});