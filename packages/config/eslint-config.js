module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ["prettier", "tailwindcss"],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays Prettier errors as ESLint errors
    "plugin:tailwindcss/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: "../tsconfig.json", // Adjust the path if necessary
      },
    },
  },
  rules: {
    "prettier/prettier": "error",
    // Customize additional rules as needed
  },
}
