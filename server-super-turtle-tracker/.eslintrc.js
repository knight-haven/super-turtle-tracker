/* eslint-disable */

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ["@typescript-eslint", "typescript-sort-keys", "sort-keys-fix"],
  rules: {
    // Don't require extensions for the following files
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
    "import/order": "off",
    radix: "off",
  },
};
