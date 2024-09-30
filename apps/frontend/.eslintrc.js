module.exports = {
  extends: ["next/core-web-vitals", "next/typescript"],
  overrides: [
    {
      files: ["*.tsx", "*.ts"],
      rules: {
        // Override or add frontend-specific rules here
      },
    },
  ],
}
