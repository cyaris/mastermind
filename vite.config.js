import { sveltekit } from "@sveltejs/kit/vite"

/** @type {import('vite').UserConfig} */
export const config = {
  debug: true,
  plugins: [sveltekit()],
  build: { sourcemap: true },
  // svelte-lib is a Svelte component library compiled on the fly by vite-plugin-svelte.
  // excluding it from pre-bundling avoids stale optimized-dep caches when the library changes.
  optimizeDeps: { exclude: ["svelte-lib"] },
  server: { port: 3000 },
}

export default config
