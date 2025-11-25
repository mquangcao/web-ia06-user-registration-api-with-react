/* eslint-env node */
const nest_eslint = require('@app/eslint-config/nest');

module.exports = [
  ...nest_eslint,

  // Project-specific rule overrides
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: null, // Disable type-aware linting for library
      },
    },
    rules: {
      // Add your custom rules here
    },
  },
];
