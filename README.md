# Cypress POM Project with Cucumber and JavaScript

This project is a test automation suite built with **Cypress**, **Cucumber**, and **JavaScript**, following the **Page Object Model (POM)** architecture for better code organization and maintenance. The project targets the Magento demo site: [Magento Testing Board](https://magento.softwaretestingboard.com).

## 📋 Why Use These Technologies?

### **Cypress**

* Fast, reliable, and easy to set up.
* Provides real-time reloading and interactive debugging.
* Rich set of built-in commands for browser automation.

### **Cucumber (Gherkin)**

* Enables Behavior-Driven Development (BDD) with human-readable test scenarios.
* Facilitates collaboration between technical and non-technical team members.

### **JavaScript**

* Widely used language with a vast ecosystem.
* Easily integrates with frontend technologies.

### **Page Object Model (POM)**

* Encourages code reusability and maintainability.
* Separates test logic from UI interactions, reducing duplication.

## 🚀 Project Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/FECORREA91/CucumberCYTest.git
   ```

2. **Initialize the Project:**

   ```bash
   npm init
   ```

3. **Install Cypress:**

   ```bash
   npm install cypress --save-dev
   ```

4. **Install Cucumber and Other Dependencies:**

   ```bash
   npm install @bahmutov/cypress-esbuild-preprocessor --save-dev
   npm install cypress-xpath --save-dev
   npm install -g npx
   ```

## 🏗️ Project Structure

```
📂 cypress-project
├── 📁 allure-report
├── 📁 allure-results
├── 📁 cypress
│   ├── 📁 e2e
│   │   └── 📁 features
│   │       ├── 📁 mobile
│   │       │   ├── 01_mobileUserLogin.feature
│   │       │   ├── 02_mobileProductPurchase.feature
│   │       │   └── 03_mobileUserRegistration.feature
│   │       └── 📁 web
│   │           ├── 01_userLogin.feature
│   │           ├── 02_registerNewUser.feature
│   │           └── 03_productPurchase.feature
│   └── 📁 support
│       ├── 📁 pageObjects
│       │   ├── 📁 mobile
│       │   │   ├── mobileLoginPage.js
│       │   │   ├── mobileProductPage.js
│       │   │   └── mobileRegistrationPage.js
│       │   └── 📁 web
│       │       ├── loginPage.js
│       │       ├── productPage.js
│       │       └── registrationPage.js
│       └── 📁 step_definitions
│           ├── 📁 mobile
│           │   ├── mobileCommonSteps.js
│           │   ├── mobileLoginSteps.js
│           │   ├── mobileProductSteps.js
│           │   └── mobileRegistrationSteps.js
│           └── 📁 web
│               ├── commonSteps.js
│               ├── loginSteps.js
│               ├── productSteps.js
│               └── registrationSteps.js
├── cypress.config.js
├── e2e.js
├── .gitignore
├── runner-results
├── info.txt
└── package.json
```

## 📂 Run the Tests

1. **Open Cypress Test Runner:**

   ```bash
   npx cypress open
   ```

2. **Run All Tests (Headless):**

   ```bash
   npm run test:all
   ```

3. **Generate Report:**

   ```bash
   npm install --save-dev @shelex/cypress-allure-plugin
   npm install -g allure-commandline --save-dev
   npm run allure:generate
   npm run allure:open
   ```

## 📊 Test Reports

* Integrated with **Allure** for rich, interactive HTML reports.

## 🔧 Additional Tools and Plugins

* **cypress-xpath**: For XPath selector support.
* **cypress-esbuild-preprocessor**: For efficient JavaScript bundling.

## 📚 Resources

* [Cypress Documentation](https://docs.cypress.io/)
* [Cucumber Gherkin Reference](https://cucumber.io/docs/gherkin/)
* [Magento Demo](https://magento.softwaretestingboard.com)

## 🤝 Contributing

Feel free to contribute to this project by submitting pull requests or opening issues.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
