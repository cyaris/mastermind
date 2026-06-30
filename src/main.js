import "svelte-lib/styles/app.css"
import "svelte-lib/styles/root.css"

import Router from "./lib/components/Router.svelte"

let div = document.createElement("div")
div.classList.add("mastermind")

let script = document.currentScript
script.parentNode.insertBefore(div, script)

new Router({ target: div })
