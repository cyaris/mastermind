import svelte from "rollup-plugin-svelte"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
// import ignore from "rollup-plugin-ignore"
import url from "@rollup/plugin-url"

export default {
  input: "mastermind.js", // Update this to your main Svelte component file
  output: {
    format: "iife", // Output format for using the component in non-Svelte environments
    file: "mastermind_bundle.js", // Replace with your desired output file path
  },
  plugins: [
    svelte({ emitCss: false }),
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs(),
    // ignore(["**/*.gif"]),
    url({
      // Use the url plugin to handle .gif files
      include: ["**/*.gif"], // Process .gif files
      limit: 0, // Set to 0 to embed all .gif files as base64 data URLs
      emitFiles: true, // Ensure files are emitted by Rollup
    }),
  ],
}
