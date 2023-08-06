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

export default {
  input: "src/main.js", // Update this to your main Svelte component file
  output: {
    format: "iife", // Output format for using the component in non-Svelte environments
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
      // Use the url plugin to handle .gif files
      include: ["**/*.gif"],
      limit: 0, // Set to 0 to embed all .gif files as base64 data URLs
      emitFiles: false,
    }),
    svg(),
    image(),
  ],
}
