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
      // Allow any type in utility libraries
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
