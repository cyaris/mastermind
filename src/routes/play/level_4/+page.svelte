<script>
  import { FireworkShow } from "fireworks/components"
  import { App } from "../../../lib/components"

  let win = false
</script>

<App level={4} on:win={() => (win = true)} />
{#if win}
  <div class="non-reactive fixed top-0 left-0">
    <FireworkShow />
  </div>
{/if}
