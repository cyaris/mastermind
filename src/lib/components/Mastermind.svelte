<script>
  import { Text } from "svelte-lib/components"

  export let classes
  export let overflowBody
  export let wrapBody
  export let width
  export let height
  export let bodyPadding
  export let bodyText
</script>

<div>
  <svg class="w-full inline-block" {width} {height}>
    <Text {classes} {overflowBody} {wrapBody} {width} {height} {bodyPadding} {bodyText} />
  </svg>
</div>
