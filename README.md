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
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Initialize the Project:**

   ```bash
   npm init -y
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
├── 📁 cypress
│   ├── 📁 e2e
│   │   └── 📁 features
│   │       └── sample.feature
│   └── 📁 support
│       └── commands.js
├── 📁 page_objects
│   └── samplePage.js
├── 📁 step_definitions
│   └── sampleSteps.js
├── cypress.config.js
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
   npm run report:mocha
   ```

## 📊 Test Reports

* Integrated with **Mochawesome** for rich, interactive HTML reports.

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
