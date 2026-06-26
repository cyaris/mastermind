<script>
  import { Button } from "svelte-lib/components"

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
      <div>
        <h4>Level 1</h4>
        <ul>
          <li>4 color code</li>
          <li>6 possible colors</li>
          <li>8 guesses</li>
        </ul>
        <h4>Level 2</h4>
        <ul>
          <li>4 color code</li>
          <li>8 possible colors</li>
          <li>8 guesses</li>
        </ul>
        <h4>Level 3</h4>
        <ul>
          <li>5 color code</li>
          <li>6 possible colors</li>
          <li>9 guesses</li>
        </ul>
        <h4>Level 4</h4>
        <ul>
          <li>5 color code</li>
          <li>8 possible colors</li>
          <li>9 guesses</li>
        </ul>
      </div>
    {/if}
  </div>
</div>
