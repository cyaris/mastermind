<script>
  import { FireworkShow } from "fireworks/components"
  import { App } from "../../../lib/components"

  let win = false
</script>

<App on:win={() => (win = true)} />
{#if win}
  <div class="fixed top-0 left-0">
    <FireworkShow />
  </div>
{/if}
