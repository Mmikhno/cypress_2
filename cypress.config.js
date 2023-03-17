const { defineConfig } = require("cypress");

module.exports = defineConfig({
  //projectId: "tt1532",
  //projectId: "6grht6",
  projectId: "bi1r3j",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 5000,
    pageLoadTimeout: 30000,
  },
});
