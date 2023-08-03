import svelte from "rollup-plugin-svelte"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
// import ignore from "rollup-plugin-ignore"
import url from "@rollup/plugin-url"
import svg from "rollup-plugin-svg"
import image from "rollup-plugin-image"

export default {
  input: "ssr.js", // Update this to your main Svelte component file
  output: {
    format: "iife", // Output format for using the component in non-Svelte environments
    file: "dist/ssr.js", // Replace with your desired output file path
  },
  plugins: [
    svelte({
      emitCss: false,
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
