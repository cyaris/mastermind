import Mastermind from "./src/lib/components/Mastermind.svelte"

let div = document.createElement("div")
let script = document.currentScript
script.parentNode.insertBefore(div, script)

const mastermind = new Mastermind({
  target: div,
})
