module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
    "jest/globals": true, // whitelist the env variables provided by Jest
    "react-native/react-native": true // whitelist all browser-like globals
  },
  parser: "@typescript-eslint/parser", // custom eslint parser that allows eslint to lint ts code
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "react-native", "react-hooks", "@typescript-eslint", "jest", "prettier"],
  extends: [
    "airbnb",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/recommended",
    "@react-native-community",
    /* use prettier as the main code formatter so anything pretty should always be last */
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "prettier/react"
  ],
  rules: {
    /* React */
    "react/jsx-filename-extension": [1, { extensions: [".jsx", ".tsx"] }],
    /* React Hooks */
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    /* React Native */
    "react-native/no-unused-styles": 2, // detect unused stylesheet rules
    "react-native/split-platform-components": 0, // enforce platform specific filenames
    "react-native/no-inline-styles": 2, // detect inline styles with literal values
    "react-native/no-color-literals": 2, // detect stylesheet colors using literals
    "react-native/no-raw-text": 0, // detech raw text outside of <Text>,
    /* TypeScript */
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/prefer-interface": "off",
    /* Imports */
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      }
    ],
    /* Other */
    "func-names": "off",
    "no-shadow": "off",
    "global-require": "off",
    "no-console": "off"
  },
  root: true
};
