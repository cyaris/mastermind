<script>
  import { tooltip } from "svelte-lib/functions"
  import { Text } from "svelte-lib/components"

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
    <div class="flex flex-col items-center">
      <span>{levelSettings.maxTurns + " tries to crack the " + levelSettings.codeLength + " color code."}</span>
      <span>? possible colors.</span>
      <svg class="inline-block" width={svgWidth} height={svgHeight}>
        <g transform="translate({1}, {1})">
          {#each Array.from({ length: levelSettings.codeLength + 2 }) as d, i}
            {#each Array.from({ length: levelSettings.maxTurns }) as dd, ii}
              <rect
                class="non-reactive"
                x={i * (rectWidth + padding)}
                y={ii * (rectHeight + padding)}
                rx={3}
                ry={3}
                width={rectWidth}
                height={rectHeight}
                fill={i >= levelSettings.codeLength
                  ? "rgb(211,211,211)"
                  : colors[Math.floor(Math.random() * colors.length)]}
                stroke="black"
              />
              {#if i == 0}
                <Text
                  classes="non-reactive text-center text-sm"
                  overflowBody={true}
                  wrapBody={false}
                  width={rectWidth + padding}
                  height={rectHeight}
                  y={(ii + 1) * rectHeight}
                  bodyPadding={{ top: 0, right: 0, bottom: 0, left: 0 }}
                  bodyText={String(ii + 1)}
                />
              {/if}
              {#if i >= levelSettings.codeLength}
                <foreignObject
                  class="cursor-help"
                  x={i * (rectWidth + padding) - padding / 2}
                  y={ii * (rectHeight + padding) - padding / 2}
                  width={rectWidth + padding}
                  height={rectHeight + padding}
                  title="This round hasn't<br />been played yet."
                  use:tooltip
                />
              {/if}
            {/each}
            <Text
              classes="non-reactive text-center text-sm"
              overflowBody={true}
              wrapBody={false}
              width={rectWidth + padding}
              height={rectHeight}
              x={i * (rectWidth + padding)}
              bodyPadding={{ top: 0, right: 0, bottom: 0, left: 0 }}
              bodyText={i < levelSettings.codeLength ? String(i + 1) : i == levelSettings.codeLength ? "W" : "B"}
            />
          {/each}
        </g>
      </svg>
    </div>
  </div>
{/if}
