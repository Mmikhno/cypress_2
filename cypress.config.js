const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "tt1532",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 5000,
    pageLoadTimeout: 30000,
  },
});
