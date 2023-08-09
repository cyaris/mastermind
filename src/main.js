import App from "./lib/components/App.svelte"

import "svelte-lib/styles/root.css"
import "svelte-lib/styles/app.css"

let div = document.createElement("div")
div.classList.add("mastermind")

let script = document.currentScript
script.parentNode.insertBefore(div, script)

new App({
  target: div,
})
