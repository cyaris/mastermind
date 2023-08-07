<script>
  import * as d3 from "d3"
  import Pluralize from "pluralize"

  import { tooltip } from "svelte-lib/functions"
  import { Text } from "svelte-lib/components"

  export let level = 1

  let colors = d3.schemeSet1

  let levels = [
    { codeLength: 4, colorsLength: 6, maxTurns: 8 },
    { codeLength: 4, colorsLength: 8, maxTurns: 9 },
    { codeLength: 5, colorsLength: 6, maxTurns: 9 },
    { codeLength: 5, colorsLength: 8, maxTurns: 10 },
  ]

  let rectWidth = 45
  let rectHeight = 35
  let padding = 3
  let outerCircleRadius = 100
  let circleSepDegrees
  let svgWidth
  let svgHeight

  let svgWidth2
  let svgHeight2

  let settings
  let codeColors
  let colorCode
  $: {
    settings = levels[level - 1]

    svgWidth = (rectWidth + padding) * (settings.codeLength + 2) + 1
    svgHeight = (rectHeight + padding) * settings.maxTurns + 1

    codeColors = colors.slice(0, settings.colorsLength)

    svgWidth2 = svgWidth
    svgHeight2 = svgWidth * (2 / 3)

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
      <svg width={svgWidth} height={svgHeight}>
        <g transform="translate({1}, {1})">
          {#each Array.from({ length: settings.codeLength + 2 }) as d, i}
            {#each Array.from({ length: settings.maxTurns }) as dd, ii}
              <rect
                class="non-reactive"
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
              {#if i >= settings.codeLength}
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
              bodyText={i < settings.codeLength ? String(i + 1) : i == settings.codeLength ? "W" : "B"}
            />
          {/each}
        </g>
      </svg>
      <div class="mt-8">
        <span>Choose a color:</span>
        <svg class="flex" width={svgWidth2} height={svgHeight2}>
          <g transform="translate({outerCircleRadius * 1.5 + 1}, {outerCircleRadius + 1})">
            {#each codeColors.sort() as codeColor, i}
              <g
                transform="translate({(svgWidth2 / 2 - outerCircleRadius) *
                  Math.cos((circleSepDegrees * i * Math.PI) / 180)}, {(svgWidth2 / 2 - outerCircleRadius) *
                  Math.sin((circleSepDegrees * i * Math.PI) / 180)})"
              >
                <circle
                  class="cursor-pointer hover:stroke-3"
                  r={(svgWidth2 / circleSepDegrees) * 2.5}
                  fill={codeColor}
                  stroke="black"
                  on:click={() => {
                    colorClicks = [...colorClicks, codeColor]

                    if (String(colorClicks.slice(-settings.codeLength - 1)) == String(colorCode)) {
                      console.log("you win")
                      gameOver = true
                      win = true
                    } else if (settings.codeLength * settings.maxTurns == colorClicks.length) {
                      console.log("you lose")
                      gameOver = true
                    }
                  }}
                />
              </g>
            {/each}
          </g>
        </svg>
      </div>
      {#if gameOver}
        <div class="mt-8">
          <div class="flex flex-col items-start mb-8">
            <span class="font-bold">YOU {win ? "WIN" : "LOSE"}!</span>
            <span>Here's the code:</span>
          </div>
          <svg class="flex" width={svgWidth} height={svgHeight}>
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
