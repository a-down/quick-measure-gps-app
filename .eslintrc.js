// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "plugin:jsdoc/recommended"],
  plugins: ["jsdoc"],
  rules: {
    "jsdoc/require-property-description": "off",
    "jsdoc/require-param-description": "off",
    "jsdoc/require-returns-description": "off",
    "jsdoc/tag-lines": "off",
  },
};
