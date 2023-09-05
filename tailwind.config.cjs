const forms = require("@tailwindcss/forms")
const typography = require("@tailwindcss/typography")
const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/svelte-lib/**/*.{html,js,svelte,ts}",
    "./package/**/*.{html,js,svelte,ts}",
    "./public/**/*.{html,js,svelte,ts}",
    "./src/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    extend: {
      colors: {},
      spacing: {
        "5px": "5px",
        "15px": "15px",
        128: "32rem",
        144: "36rem",
      },
      strokeWidth: {
        2.5: "2.5px",
        3: "3px",
        4: "4px",
      },
    },
  },
  plugins: [
    forms,
    typography,
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".no-appearance": {
          "-webkit-appearance": "none" /* Safari */,
          "-khtml-appearance": "none" /* Konqueror HTML */,
          "-moz-appearance": "none" /*  old versions of Firefox */,
          "-ms-appearance": "none" /* Internet Explorer/Edge */,
          "-o-appearance": "none" /* Opera */,
          appearance: "none",
        },
        ".no-highlight": {
          "-webkit-touch-callout": "none" /* iOS Safari */,
          "-webkit-user-select": "none" /* Safari */,
          "-khtml-user-select": "none" /* Konqueror HTML */,
          "-moz-user-select": "none" /* old versions of Firefox */,
          "-ms-user-select": "none" /* Internet Explorer/Edge */,
          "-o-user-select": "none" /* Opera */,
          "user-select": "none",
        },
        ".highlight": {
          "-webkit-touch-callout": "auto" /* iOS Safari */,
          "-webkit-user-select": "auto" /* Safari */,
          "-khtml-user-select": "auto" /* Konqueror HTML */,
          "-moz-user-select": "auto" /* old versions of Firefox */,
          "-ms-user-select": "auto" /* Internet Explorer/Edge */,
          "-o-user-select": "auto" /* Opera */,
          "user-select": "auto",
        },
        ".cursive": {
          "font-family": "cursive",
        },
      })
    }),
  ],
  corePlugins: {
    preflight: false,
  },
}
