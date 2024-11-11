// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "expo",
    "plugin:jsdoc/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
  ],
  plugins: ["jsdoc"],
  rules: {
    "jsdoc/require-property-description": "off",
    "jsdoc/require-param-description": "off",
    "jsdoc/require-returns-description": "off",
    "jsdoc/tag-lines": "off",
    "react/prop-types": "off",
  },
};
