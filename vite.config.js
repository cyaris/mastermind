import { sveltekit } from "@sveltejs/kit/vite"
import { createViteConfig } from "../svelte-lib/src/lib/vite.config.js"

/** @type {import('vite').UserConfig} */
export const config = createViteConfig({ sveltekit })

export default config
