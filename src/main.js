import "svelte-lib/styles/app.css"
import "svelte-lib/styles/root.css"

import { mountEmbeddedRoot } from "svelte-lib/functions"

import Router from "./lib/components/Router.svelte"

const div = mountEmbeddedRoot({ classes: ["mastermind"] })

new Router({ target: div })
