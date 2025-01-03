// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "expo",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
  ],
  rules: {
    "no-console": ["error", { allow: ["error"] }],
    "react/prop-types": "off",
    // TODO: REANABLE AFTER REFACTORING
    "react-hooks/rules-of-hooks": "off",
    // TODO: REANABLE AFTER REFACTORING
    "react-hooks/exhaustive-deps": "off",
  },
  plugins: ["react", "react-native"],
};
