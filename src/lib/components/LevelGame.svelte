<script>
  import { FireworkShow } from "fireworks/components"

  import App from "./App.svelte"

  export let level = 1

  let win = false
</script>

<App {level} on:win={() => (win = true)} />
{#if win}
  <div class="non-reactive fixed left-0 top-0">
    <FireworkShow />
  </div>
{/if}
