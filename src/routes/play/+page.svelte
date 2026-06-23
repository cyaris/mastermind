<script>
  import { marked } from "marked"

  import { Button } from "svelte-lib/components"

  let content = `

  #### Level 1
  - 4 color code
  - 6 possible colors
  - 8 guesses

  #### Level 2
  - 4 color code
  - 8 possible colors
  - 8 guesses

  #### Level 3
  - 5 color code
  - 6 possible colors
  - 9 guesses

  #### Level 4
  - 5 color code
  - 8 possible colors
  - 9 guesses`

  let markdown = marked(content)

  let showLevelsOverview = false
</script>

<div class="flex flex-col items-center">
  <div class="my-2 flex flex-col items-center">
    <div class="flex-row">
      <Button classes="w-40" href="../play/level_1" label="Level 1" />
      <Button classes="w-40" href="../play/level_2" label="Level 2" />
    </div>
    <div class="mt-2 flex-row">
      <Button classes="w-40" href="../play/level_3" label="Level 3" />
      <Button classes="w-40" href="../play/level_4" label="Level 4" />
    </div>
  </div>
  <div class="mb-8 mt-2 flex-col">
    <a href="#"
      ><span class="cursor-pointer text-2xl font-bold" on:click={() => (showLevelsOverview = !showLevelsOverview)}
        >Breakdown by Level</span
      ></a
    >
    {#if showLevelsOverview}
      {@html markdown}
    {/if}
  </div>
</div>
