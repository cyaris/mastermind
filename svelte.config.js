import adapter from "@sveltejs/adapter-auto"
import sveltePreprocess from "svelte-preprocess"
import { mdsvex } from "mdsvex"
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
  },
}

export default config
