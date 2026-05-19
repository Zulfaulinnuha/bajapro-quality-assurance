const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    baseUrl: "http://labai.polinema.ac.id:90",

    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",

    chromeWebSecurity: false,
    modifyObstructiveCode: false,
    experimentalModifyObstructiveThirdPartyCode: true,

    defaultCommandTimeout: 60000,
    pageLoadTimeout: 180000,
    requestTimeout: 60000,
    responseTimeout: 60000,

    redirectionLimit: 50,

    env: {
      EMAIL: "zulfanuha016@gmail.com",
      PASSWORD: "Zulfanuha14",
    },

    retries: {
      runMode: 2,
      openMode: 0,
    },
  },

  reporter: "mochawesome",

  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
});