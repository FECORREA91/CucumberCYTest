const reporter = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

const jsonDir = path.join(process.cwd(), 'cypress/reports/cucumber-json');
const reportPath = path.join(process.cwd(), 'cypress/reports/cucumber-html');

// Crear directorios si no existen
if (!fs.existsSync(jsonDir)) {
  fs.mkdirSync(jsonDir, { recursive: true });
}
if (!fs.existsSync(reportPath)) {
  fs.mkdirSync(reportPath, { recursive: true });
}

reporter.generate({
  jsonDir: jsonDir,
  reportPath: reportPath,
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
  },
  customData: {
    title: 'Run info',
    data: [
      {label: 'Project', value: 'Magento eCommerce'},
      {label: 'Execution Start Time', value: new Date().toLocaleString()}
    ]
  },
  pageTitle: 'Test Report - Magento',
  reportName: 'Test Automation Report',
  displayDuration: true,
  durationInMS: true,
  openReportInBrowser: true,
  customMetadata: true,
  displayDuration: true,
  durationInMS: true,
  hideMetadata: false,
  pageTitle: "Magento Test Report",
  reportName: "Automation Test Results",
  theme: "foundation" // o "foundation", "simple"
});