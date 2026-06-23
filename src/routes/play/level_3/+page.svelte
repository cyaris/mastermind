<script>
  import { FireworkShow } from "fireworks/components"
  import { App } from "../../../lib/components"

  let win = false
</script>

<App level={3} on:win={() => (win = true)} />
{#if win}
  <div class="non-reactive fixed left-0 top-0">
    <FireworkShow />
  </div>
{/if}
