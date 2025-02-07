module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
  },
  "extends": [],
  "plugins": [],
  "ignorePatterns": ["*.svg"],
  "rules": {
    "no-trailing-spaces": [1],
    "camelcase": [2, {"properties": "always"}],
    "semi": [2, "never"],
    "quotes": [2, "double"],
    "comma-dangle": [1, "always-multiline"],
    "quote-props": [1, "always"],
    "eqeqeq": [1, "always"],
  },
}
