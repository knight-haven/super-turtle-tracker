/* eslint-disable */

module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    "react-native/react-native": true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
    "plugin:react-native/all",
    "universe/native",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["react", "react-native", "@typescript-eslint", "typescript-sort-keys", "sort-keys-fix"],
  rules: {
    "sort-keys-fix/sort-keys-fix": "warn",
    "typescript-sort-keys/interface": "error",
    "typescript-sort-keys/string-enum": "error",

    // JSX can be in either jsx or tsx files
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],

    // Turn off rules related to Prettier. These are auto fixed.
    "max-len": "off",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/indent": "off",
    "arrow-parens": "off",
    "@typescript-eslint/semi": "off",
    "react/jsx-closing-bracket-location": "off",
    "@typescript-eslint/indent": "off", // Conflicts with Prettier settings
    // Make comma-dangle error bc it needs to be in version control
    // or else it is confusing. See: https://eslint.org/docs/rules/comma-dangle
    "comma-dangle": ["error", "always-multiline"],

    // Don't prefer default exports
    "import/no-default-export": "error",
    "import/prefer-default-export": "off",
    "import/order": "off",

    // Don't require extensions for the follow files
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-unresolved": "off",

    // Rules related to function definitions
    "func-style": ["error", "expression"],
    "implicit-arrow-linebreak": "off",

    // Alphabetize
    "sort-vars": "error",
    "typescript-sort-keys/interface": "error",
    "typescript-sort-keys/string-enum": "error",
    "react/jsx-sort-props": "error",
    "sort-keys-fix/sort-keys-fix": "error",

    // More typescript specific rules
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/type-annotation-spacing": "error",

    // React
    "react/jsx-props-no-spreading": "off",

    // Make debugger a warning instead of an error
    "no-debugger": "warn",

    // Don't require radix parameter
    radix: "off",

    // Allow nested ternary (often it's cleaner)
    "no-nested-ternary": "off",

    // Enforce the same syntax for all arrow functions
    "arrow-body-style": ["error", "always"],

    "react-native/no-color-literals": "off",
  },
};
