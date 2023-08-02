module.exports = {
  arrowParens: "avoid",
  printWidth: 120,
  semi: false,
  trailingComma: "es5",
  plugins: ["prettier-plugin-svelte"],
  svelteSortOrder: "options-scripts-markup-styles",
  overrides: [
    {
      files: "*.svg",
      options: {
        parser: "html",
      },
    },
  ],
}
