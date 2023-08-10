import commonjs from "@rollup/plugin-commonjs"
import image from "@rollup/plugin-image"
import resolve from "@rollup/plugin-node-resolve"
import url from "@rollup/plugin-url"
import postcss from "rollup-plugin-postcss"
import progress from "rollup-plugin-progress"
import svelte from "rollup-plugin-svelte"
import svg from "rollup-plugin-svg"
import tailwindcss from "tailwindcss"

import tailwindConfig from "./tailwind.config.cjs"
import addScopedClass from "./add-scoped-class-plugin.cjs"

const config = {
  input: "./src/main.js",
  output: {
    format: "iife",
    file: "dist/bundle.js",
  },
  plugins: [
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
    progress(),
  ],
}

console.log(config)
export default config
