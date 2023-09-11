import Router from "./lib/components/Router.svelte"

import "svelte-lib/styles/root.css"
import "svelte-lib/styles/app.css"

let div = document.createElement("div")
div.classList.add("mastermind")

let script = document.currentScript
script.parentNode.insertBefore(div, script)

new Router({
  target: div,
})
