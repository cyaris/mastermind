const { readGitignoreFiles } = require("eslint-gitignore")

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:css/standard", "plugin:import/recommended", "prettier"],
  ignorePatterns: readGitignoreFiles({ cwd: __dirname }),
  overrides: [
    {
      files: ["**/*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  plugins: ["css", "html", "import", "svelte3"],
  rules: {
    "import/namespace": [2, { allowComputed: true }],
    "import/no-unresolved": ["off", { ignore: ["${lib|components}/"] }],
    semi: ["error", "never"],
  },
  settings: {
    "import/ignore": ["node_modules"],
  },
}
