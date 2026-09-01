import "svelte-lib/styles/app.css"
import "svelte-lib/styles/root.css"

import { mountEmbeddedRoot } from "svelte-lib/functions"

import Router from "./lib/components/Router.svelte"

new Router({ target: mountEmbeddedRoot({ classes: ["mastermind"], dataset: { svelteLibTooltipRoot: "true" } }) })
