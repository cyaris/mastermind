<script>
  import "svelte-lib/styles/root.css"
  import "svelte-lib/styles/app.css"

  import { onMount } from "svelte"
  import { preventFocusZoom } from "svelte-lib/functions/dom"

  // svelte-lib's inputs keep 14px text, so iOS would otherwise zoom into a focused field. The embedded bundle gets the
  // same fix from mountEmbeddedRoot.
  onMount(preventFocusZoom)
</script>

<slot />
