<script>
  import { Fireworks } from "fireworks/components"
  import { App } from "../../../lib/components"

  let win = false
</script>

<App level={2} on:win={() => (win = true)} />
{#if win}
  <div class="fixed top-0 left-0">
    <Fireworks />
  </div>
{/if}
