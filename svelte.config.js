import adapter from "@sveltejs/adapter-auto"
import { mdsvex } from "mdsvex"
import sveltePreprocess from "svelte-preprocess"

import mdsvexConfig from "./mdsvex.config.js"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...mdsvexConfig.extensions],
  preprocess: [
    sveltePreprocess({
      postcss: true,
    }),
    mdsvex(mdsvexConfig),
  ],
  kit: {
    adapter: adapter(),
    files: { assets: "src/lib/static" },
  },
}

export default config
