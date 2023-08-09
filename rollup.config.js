import commonjs from "@rollup/plugin-commonjs"
import image from "@rollup/plugin-image"
import resolve from "@rollup/plugin-node-resolve"
import url from "@rollup/plugin-url"
import postcss from "rollup-plugin-postcss"
import svelte from "rollup-plugin-svelte"
import svg from "rollup-plugin-svg"
import tailwindcss from "tailwindcss"

import tailwindConfig from "./tailwind.config.cjs"
import addScopedClass from "./add-scoped-class-plugin.cjs"

const plugins = [
  svelte({
    emitCss: true,
  }),
  postcss({
    plugins: [addScopedClass(), tailwindcss(tailwindConfig)],
    extract: true,
    minimize: true,
    config: {
      path: "./postcss.config.cjs",
    },
    extensions: [".css"],
    // inject: {
    //   insertAt: "top",
    // },
    sourceMap: false,
  }),
  resolve({
    browser: true,
    dedupe: ["svelte"],
    exportConditions: ["svelte"],
    extensions: [".svelte"],
  }),
  commonjs(),
  url({
    include: ["**/*.gif"],
    limit: 0, // set to 0 to embed all .gif files as base64 data URLs
    emitFiles: false,
  }),
  svg(),
  image(),
]

const routes = [
  {input: "src/lib/components/App.svelte", output: 'dist/ssr.js'},
  {input: "src/main.js", output: 'dist/bundle.js'},
  // "./src/lib/components/App.svelte",
  // "./src/routes/+page.svelte",
  // "./src/routes/development/+page.svelte",
  // "./src/routes/instructions/+page.svelte",
  // "./src/routes/play/+page.svelte",
  // "./src/routes/play/level_1/+page.svelte",
  // "./src/routes/play/level_2/+page.svelte",
  // "./src/routes/play/level_3/+page.svelte",
  // "./src/routes/play/level_4/+page.svelte",
]

// `
// import App from "${v}"
//
// import "../node_modules/svelte-lib/src/lib/static/styles/root.css"
// import "../node_modules/svelte-lib/src/lib/static/styles/app.css"
//
// let div = document.createElement("div")
// div.classList.add("mastermind")
//
// let script = document.currentScript
// script.parentNode.insertBefore(div, script)
//
// new App({
//   target: div,
// })`

const config = routes.map(v => {
  return {
    input: v.input,
    output: {
      format: "iife",
      file: v.output,
    },
    plugins: plugins,
  }
})

console.log(config)
export default config
