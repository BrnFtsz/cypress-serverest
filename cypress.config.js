const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://serverest.dev",
    setupNodeEvents(on, config) {
    },
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 4000,
    responseTimeout: 100000,
    chromeWebSecurity: false,
    retries: {
      runMode: 2, 
      openMode: 2,
    }, 
  },
});
