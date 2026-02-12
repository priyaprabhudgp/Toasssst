// Import core ESLint recommended configuration
import js from '@eslint/js'

// Import predefined global variables (e.g., browser globals like window, document)
import globals from 'globals'

// Plugin to enforce React Hooks rules (Rules of Hooks + exhaustive deps)
import reactHooks from 'eslint-plugin-react-hooks'

// Plugin to support React Fast Refresh (used in Vite for hot reloading)
import reactRefresh from 'eslint-plugin-react-refresh'

// Import ESLint flat config helpers
import { defineConfig, globalIgnores } from 'eslint/config'

// Export ESLint configuration using the new flat config format
export default defineConfig([
  
  // Ignore the "dist" folder (compiled/build output)
  globalIgnores(['dist']),

  {
    // Apply this configuration to all .js and .jsx files
    files: ['**/*.{js,jsx}'],

    // Extend recommended rule sets
    extends: [
      js.configs.recommended,                // Base ESLint recommended rules
      reactHooks.configs.flat.recommended,   // Recommended React Hooks rules
      reactRefresh.configs.vite,             // Rules optimized for Vite + React Refresh
    ],

    languageOptions: {
      // Support ECMAScript 2020 syntax
      ecmaVersion: 2020,

      // Use browser global variables (window, document, etc.)
      globals: globals.browser,

      parserOptions: {
        ecmaVersion: 'latest',               // Allow latest ECMAScript features
        ecmaFeatures: { jsx: true },         // Enable JSX parsing
        sourceType: 'module',                // Enable ES modules (import/export)
      },
    },

    rules: {
      // Throw error for unused variables
      // Ignore variables that start with capital letters or underscore
      // (commonly used for constants or intentionally unused values)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
