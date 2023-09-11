import { sveltekit } from "@sveltejs/kit/vite"

/** @type {import('vite').UserConfig} */
export const config = {
  debug: true,
  plugins: [sveltekit()],
  build: {
    sourcemap: true,
  },
  server: {
    port: 3000,
  },
}

export default config
