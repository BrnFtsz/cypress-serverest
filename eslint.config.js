// eslint.config.js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import cypress from "eslint-plugin-cypress";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["cypress/e2e/**/*.js", "cypress/support/**/*.js"],
    plugins: {
      cypress: cypress
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        // Cypress globals
        cy: "readonly",
        Cypress: "readonly",
        expect: "readonly",
        assert: "readonly",
        describe: "readonly",
        context: "readonly",
        it: "readonly",
        specify: "readonly",
        before: "readonly",
        after: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly"
      }
    },
    rules: {
      // Cypress recommended rules
      "cypress/no-assigning-return-values": "error",
      "cypress/no-unnecessary-waiting": "error",
      "cypress/assertion-before-screenshot": "warn",
      "cypress/no-force": "warn",
      "cypress/no-async-tests": "error",
      "cypress/no-pause": "error"
    }
  },
  {
    // Global rules for all files
    rules: {
      "no-console": "off"
    }
  }
]);