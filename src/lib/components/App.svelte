<script>
  import * as d3 from "d3"
  import Pluralize from "pluralize"

  import { tooltip } from "svelte-lib/functions"
  import { Button, Text } from "svelte-lib/components"

  export let level = 1

  let colors = d3.schemeSet1

  let levels = [
    { codeLength: 4, colorsLength: 6, maxTurns: 8, buttonSpacer: 3 },
    { codeLength: 4, colorsLength: 8, maxTurns: 8, buttonSpacer: 2 },
    { codeLength: 5, colorsLength: 6, maxTurns: 9, buttonSpacer: 3 },
    { codeLength: 5, colorsLength: 8, maxTurns: 9, buttonSpacer: 2 },
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

  function getScore(colorGuess) {
    let wScore = 0
    let bScore = 0
    let colorGuessCopy = [...colorGuess]
    let colorCodeCopy = [...colorCode]
    colorCode.forEach((d, i) => {
      if (d == colorGuess[i]) {
        colorGuessCopy.splice(i - bScore, 1)
        colorCodeCopy.splice(i - bScore, 1)
        bScore += 1
      }
    })

    colorGuessCopy.forEach(d => {
      if (colorCodeCopy.includes(d)) {
        colorCodeCopy.splice(colorCodeCopy.indexOf(d), 1)
        wScore += 1
      }
    })

    return { w: wScore, b: bScore }
  }

  let scores = []

  let pieces = { 0: "", 1: ".", 2: ":", 3: ":.", 4: "::", 5: "★" }
</script>

{#if settings}
  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col items-center">
      <div class="flex flex-col items-center mb-10">
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
                  ? String(scores[ii].w) + " " + Pluralize("color", scores[ii].w) + " in the wrong place."
                  : ii < Math.floor(colorClicks.length / settings.codeLength) && i == settings.codeLength + 1
                  ? String(scores[ii].b) + " " + Pluralize("color", scores[ii].b) + " in the right place."
                  : "This round hasn't<br />been played yet."}
                use:tooltip
              />
              {#if !i}
                <Text
                  classes="non-reactive text-end text-sm font-medium"
                  wrapBody={false}
                  width={rectWidth + padding}
                  height={rectHeight}
                  x={-(rectWidth + padding) - 2.5}
                  y={(ii + 0.25) * (rectHeight + padding) - 2}
                  bodyText={String(ii + 1)}
                />
              {:else if i >= settings.codeLength && ii < Math.floor(colorClicks.length / settings.codeLength)}
                <Text
                  classes="non-reactive text-center"
                  bodyClasses="flex flex-col text-3xl justify-center"
                  overflowBody={false}
                  wrapBody={false}
                  width={rectWidth}
                  height={rectHeight}
                  x={i * (rectWidth + padding) +
                    ((i == settings.codeLength && scores[ii].w <= 2) ||
                    (i == settings.codeLength + 1 && scores[ii].b <= 2)
                      ? 5
                      : 0)}
                  y={ii * (rectHeight + padding) - padding - 1}
                  bodyText={i == settings.codeLength ? pieces[scores[ii].w] : pieces[scores[ii].b]}
                />
              {/if}
            {/each}
            <Text
              classes="non-reactive text-center text-sm font-medium"
              wrapBody={false}
              width={rectWidth + padding}
              height={rectHeight}
              x={i * (rectWidth + padding)}
              y={-22.5}
              bodyText={i < settings.codeLength ? String(i + 1) : i == settings.codeLength ? "W" : "B"}
            />
          {/each}
        </g>
      </svg>
      {#if !(win || gameOver)}
        <svg
          class="flex overflow-visible"
          width={svgWidth2}
          height={svgHeight2}
          viewBox="{-svgWidth2 * (5 / 32)} {0} {svgWidth2} {svgHeight2}"
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

                    if (colorClicks.length % settings.codeLength == 0) {
                      scores = [...scores, getScore(colorClicks.slice(-settings.codeLength))]
                    }
                    if (String(colorClicks.slice(-settings.codeLength)) == String(colorCode)) {
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
      {:else}
        <div class="non-reactive flex flex-col items-start my-8">
          <span class="font-extrabold text-2xl animation-bounce">You {win ? "win" : "lose"}!</span>
          <span>Here's the code:</span>
          <svg class="flex mt-2" width={svgWidth} height={svgHeight / settings.maxTurns}>
            <g transform="translate({1}, {1})">
              {#each colorCode as color, i}
                <rect
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
        <div class="mb-8">
          <Button href="/play/level_{level}" label="Play Again" />
        </div>
      {/if}
    </div>
  </div>
{/if}
<svelte:head>
  <style>
    @keyframes bounce {
      0% {
        transform: translateY(-25%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      }
      50% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
      100% {
        transform: translateY(-25%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      }
    }

    .animation-bounce {
      animation: bounce 1s infinite;
    }
  </style>
</svelte:head>
