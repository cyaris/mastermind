<script>
  import LinkButton from "svelte-lib/components/LinkButton"

  let showLevelsOverview = false
</script>

<div class="flex flex-col items-center">
  <div class="my-2 flex flex-col items-center">
    <div class="flex-row">
      <LinkButton classes="w-40" href="/mastermind/play/level_1" label="Level 1" />
      <LinkButton classes="w-40" href="/mastermind/play/level_2" label="Level 2" />
    </div>
    <div class="mt-2 flex-row">
      <LinkButton classes="w-40" href="/mastermind/play/level_3" label="Level 3" />
      <LinkButton classes="w-40" href="/mastermind/play/level_4" label="Level 4" />
    </div>
  </div>
  <div class="mb-8 mt-2 flex-col">
    <button
      class="cursor-pointer border-0 bg-transparent p-0 text-2xl font-bold text-link hover:text-link-hover"
      type="button"
      aria-controls="level-breakdown"
      aria-expanded={showLevelsOverview}
      on:click={() => (showLevelsOverview = !showLevelsOverview)}>Breakdown by Level</button
    >
    {#if showLevelsOverview}
      <div id="level-breakdown">
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
