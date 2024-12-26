module.exports = {
    root: true,
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
    parserOptions: {
      ecmaVersion: 2020, // Allows for modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
      ecmaFeatures: {
        jsx: true, // Enables JSX parsing
      },
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
      'eslint:recommended', // Uses the recommended rules from ESLint
      'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint
      'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors
      'next/core-web-vitals', // Uses Next.js recommended rules
    ],
    env: {
      browser: true, // Enables browser global variables
      node: true, // Enables Node.js global variables
      es6: true, // Enables ES6 features
    },
    rules: {
      'prettier/prettier': ['error', { 
        singleQuote: true, 
        semi: true, 
        printWidth: 100, // Sets maximum line length to 100
        tabWidth: 2,
        trailingComma: 'es5',
        endOfLine: 'auto',
      }],
      'max-len': ['error', { code: 100, ignoreUrls: true }], // Limits line length to 100
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Disallows unused variables, allows unused vars starting with _
      'no-console': 'warn', // Warns on console statements
      'indent': ['error', 2], // Enforces 2-space indentation
      'quotes': ['error', 'single', { avoidEscape: true }], // Enforces single quotes
      'semi': ['error', 'always'], // Enforces semicolons
    },
    overrides: [
      {
        files: ['client/**/*.{ts,tsx}'],
        env: {
          browser: true,
          node: false,
        },
        rules: {
          // Client-specific rules can be added here
        },
      },
      {
        files: ['server/**/*.{ts,js}', 'scripts/**/*.{ts,js}'],
        env: {
          node: true,
          browser: false,
        },
        rules: {
          // Server and scripts-specific rules can be added here
        },
      },
    ],
    settings: {
      react: {
        version: 'detect', // Automatically detects the React version
      },
    },
  };
  