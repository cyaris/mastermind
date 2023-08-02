import Text from "visor/src/lib/components/Text.svelte"

let div = document.createElement("div")
let script = document.currentScript
script.parentNode.insertBefore(div, script)

const text = new Text({
  target: div,
  props: {
    classes: "text-right fill-red-200",
    overflowBody: false,
    wrapBody: false,
    width: 100,
    height: 100,
    bodyPadding: { top: 10, right: 0, bottom: 0, left: 0 },
    bodyText: "hi there, is this thing on?",
  },
})
