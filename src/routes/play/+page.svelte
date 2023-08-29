<script>
  import { marked } from "marked"

  import { Button } from "svelte-lib/components"

  let content = `

  ### Level 1

  - 4 color code
  - 6 possible colors
  - 8 guesses

  ### Level 2

  - 4 color code
  - 8 possible colors
  - 8 guesses

  ### Level 3

  - 5 color code
  - 6 possible colors
  - 9 guesses

  ### Level 4

  - 5 color code
  - 8 possible colors
  - 10 guesses`

  let markdown = marked(content)

  let showLevelsOverview = false
</script>

<div class="flex flex-col items-center">
  <div class="flex flex-col items-center my-2">
    <div class="flex-row">
      <Button href="../play/level_1" label="Level 1" />
      <Button href="../play/level_2" label="Level 2" />
    </div>
    <div class="flex-row mt-2">
      <Button href="../play/level_3" label="Level 3" />
      <Button href="../play/level_4" label="Level 4" />
    </div>
  </div>
  <div class="flex-col mb-8">
    <a href="#"
      ><h2 class="cursor-pointer" on:click={() => (showLevelsOverview = !showLevelsOverview)}>Breakdown by Level</h2></a
    >
    {#if showLevelsOverview}
      {@html markdown}
    {/if}
  </div>
</div>
