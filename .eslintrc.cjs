const config = {
  extends: ["react-app", "react-app/jest", "prettier"],
  rules: {
    "no-console": ["warn"],
    "prettier/prettier": "warn",
    "react/jsx-no-target-blank": "off",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
}

module.exports = {
  ...config,
}
