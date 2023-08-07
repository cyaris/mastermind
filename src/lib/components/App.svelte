<script>
  import * as d3 from "d3"
  import Pluralize from "pluralize"

  import { tooltip } from "svelte-lib/functions"
  import { Text } from "svelte-lib/components"

  export let level = 1

  let colors = d3.schemeSet1

  let levels = [
    { codeLength: 4, colorsLength: 6, maxTurns: 8, buttonSpacer: 3 },
    { codeLength: 4, colorsLength: 8, maxTurns: 9, buttonSpacer: 2 },
    { codeLength: 5, colorsLength: 6, maxTurns: 9, buttonSpacer: 3 },
    { codeLength: 5, colorsLength: 8, maxTurns: 10, buttonSpacer: 2 },
  ]

  let rectWidth = 45
  let rectHeight = 35
  let padding = 2

  let settings
  let svgWidth
  let svgHeight

  let outerRadius = 100
  let svgWidth2 = outerRadius * 3
  let svgHeight2 = svgWidth2
  let circleSepDegrees
  let codeColors
  let colorCode
  $: {
    settings = levels[level - 1]

    svgWidth = (rectWidth + padding) * (settings.codeLength + 2) + 1
    svgHeight = (rectHeight + padding) * settings.maxTurns + 1

    codeColors = colors.slice(0, settings.colorsLength)

    circleSepDegrees = 360 / settings.colorsLength

    if (!colorCode) {
      colorCode = Array.from({ length: settings.codeLength }).map(
        () => codeColors[Math.floor(Math.random() * codeColors.length)]
      )
      console.log(colorCode)
    }
  }

  let colorClicks = []

  let gameOver = false
  let win = false
</script>

{#if settings}
  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col items-center">
      <div class="flex flex-col items-center mb-8">
        <span>{settings.maxTurns} tries to crack the {settings.codeLength} color code.</span>
        <span>{settings.colorsLength} possible colors.</span>
      </div>
      <svg class="overflow-visible" width={svgWidth} height={svgHeight}>
        <g transform="translate({1}, {1})">
          {#each Array.from({ length: settings.codeLength + 2 }) as d, i}
            {#each Array.from({ length: settings.maxTurns }) as dd, ii}
              <rect
                class="stroke-black {i >= settings.codeLength ? 'cursor-help hover:stroke-4' : ''}"
                x={i * (rectWidth + padding)}
                y={ii * (rectHeight + padding)}
                rx={3}
                ry={3}
                width={rectWidth}
                height={rectHeight}
                fill={i >= settings.codeLength
                  ? "rgb(211,211,211)"
                  : colorClicks[ii * settings.codeLength + i]
                  ? colorClicks[ii * settings.codeLength + i]
                  : "transparent"}
                title={i < settings.codeLength
                  ? ""
                  : ii < Math.floor(colorClicks.length / settings.codeLength) && i == settings.codeLength
                  ? "WHITE score."
                  : ii < Math.floor(colorClicks.length / settings.codeLength) && i == settings.codeLength + 1
                  ? "BLACK score."
                  : "This round hasn't<br />been played yet."}
                use:tooltip
              />
              {#if i == 0}
                <Text
                  classes="non-reactive text-end text-sm font-medium"
                  wrapBody={false}
                  width={rectWidth + padding}
                  height={rectHeight}
                  x={-(rectWidth + padding) - 2.5}
                  y={(ii + 0.25) * (rectHeight + padding)}
                  bodyText={String(ii + 1)}
                />
              {/if}
            {/each}
            <Text
              classes="non-reactive text-center text-sm font-medium"
              wrapBody={false}
              width={rectWidth + padding}
              height={rectHeight}
              x={i * (rectWidth + padding)}
              y={-20}
              bodyText={i < settings.codeLength ? String(i + 1) : i == settings.codeLength ? "W" : "B"}
            />
          {/each}
        </g>
      </svg>
      <svg
        class="flex overflow-visible"
        width={svgWidth2}
        height={svgHeight2}
        viewBox="{-svgWidth2 / 8} {0} {svgWidth2} {svgHeight2}"
      >
        <g transform="translate({outerRadius + 1}, {outerRadius + 1})">
          {#each codeColors.sort() as codeColor, i}
            <g
              transform="translate({(svgWidth2 / 2 - outerRadius) *
                Math.cos((circleSepDegrees * i * Math.PI) / 180)}, {(svgWidth2 / 2 - outerRadius) *
                Math.sin((circleSepDegrees * i * Math.PI) / 180)})"
            >
              <circle
                class="cursor-pointer hover:stroke-3"
                r={(svgWidth2 * settings.buttonSpacer) / circleSepDegrees}
                fill={codeColor}
                stroke="black"
                on:click={() => {
                  colorClicks = [...colorClicks, codeColor]

                  if (String(colorClicks.slice(-settings.codeLength - 1)) == String(colorCode)) {
                    win = true
                  } else if (settings.codeLength * settings.maxTurns == colorClicks.length) {
                    gameOver = true
                  }
                }}
              />
            </g>
          {/each}
          <Text
            classes="non-reactive text-base font-bold"
            bodyClasses="cursive"
            overflowBody={false}
            x={-22}
            y={-22.5}
            width={50}
            height={50}
            bodyText="Choose a Color"
          />
        </g></svg
      >
      {#if win || gameOver}
        <div class="flex flex-col items-start -mt-20">
          <span class="font-black animate-bounce">YOU {win ? "WIN" : "LOSE"}!</span>
          <span>Here's the code:</span>
          <svg class="flex" width={svgWidth} height={svgHeight / settings.maxTurns}>
            <g transform="translate({1}, {1})">
              {#each colorCode as color, i}
                <rect
                  class="non-reactive"
                  x={i * (rectWidth + padding)}
                  y={0}
                  rx={3}
                  ry={3}
                  width={rectWidth}
                  height={rectHeight}
                  fill={color}
                  stroke="black"
                />
              {/each}
            </g>
          </svg>
        </div>
      {/if}
    </div>
  </div>
{/if}
