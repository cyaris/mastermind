<script>
  import { tooltip } from "svelte-lib/functions"

  export let level = 1

  let colors = ["yellow", "blue", "red", "green", "orange", "purple", "brown", "pink"]
  let levels = [
    { codeLength: 4, maxTurns: 8 },
    { codeLength: 4, maxTurns: 9 },
    { codeLength: 5, maxTurns: 9 },
    { codeLength: 5, maxTurns: 10 },
  ]

  let rectWidth = 45
  let rectHeight = 35
  let padding = 3

  let levelSettings
  let board
  let svgWidth
  let svgHeight
  $: {
    levelSettings = levels[level - 1]

    svgWidth = (rectWidth + padding) * (levelSettings.codeLength + 2) + 1
    svgHeight = (rectHeight + padding) * levelSettings.maxTurns + 1
  }
</script>

{#if levelSettings}
  <div class="flex justify-center w-full h-full">
    <svg class="inline-block" width={svgWidth} height={svgHeight}>
      <g transform="translate({1}, {1})">
        {#each Array.from({ length: levelSettings.maxTurns }) as d, i}
          {#each Array.from({ length: levelSettings.codeLength + 2 }) as dd, ii}
            <rect
              class="non-reactive"
              x={ii * (rectWidth + padding)}
              y={i * (rectHeight + padding)}
              rx={3}
              ry={3}
              width={rectWidth}
              height={rectHeight}
              fill={ii >= levelSettings.codeLength ? "rgb(211,211,211)" : "transparent"}
              stroke="black"
            />
            <foreignObject
              x={ii * (rectWidth + padding) - padding * 0.5}
              y={i * (rectHeight + padding) - padding * 0.5}
              width={rectWidth + padding}
              height={rectHeight + padding}
              title="hi"
              use:tooltip
            />
          {/each}
        {/each}
      </g>
    </svg>
  </div>
{/if}
