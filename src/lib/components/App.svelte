<script>
  import Pluralize from "pluralize"
  import { createEventDispatcher } from "svelte"
  import { LinkButton, Text } from "svelte-lib/components"
  import { tooltip } from "svelte-lib/functions"

  const dispatch = createEventDispatcher()

  export let level = 1

  const levels = [
    { codeLength: 4, colorsLength: 6, maxTurns: 8, buttonSpacer: 3 },
    { codeLength: 4, colorsLength: 8, maxTurns: 8, buttonSpacer: 2 },
    { codeLength: 5, colorsLength: 6, maxTurns: 9, buttonSpacer: 3 },
    { codeLength: 5, colorsLength: 8, maxTurns: 9, buttonSpacer: 2 }
  ]
  const colorOrder = [1, 5, 3, 7, 2, 6, 4, 8]

  let turn = 1
  let settings
  let rectWidth
  let rectHeight
  const padding = 2.5
  let svgWidth
  let svgHeight

  const outerRadius = 100
  const svgWidth2 = outerRadius * 3
  const svgHeight2 = svgWidth2 * (2 / 3)

  let circleSepDegrees
  let codeColors
  let colorCode
  $: {
    settings = levels[level - 1]

    rectWidth = 275 / (settings.codeLength + 2)
    rectHeight = 270 / settings.maxTurns

    svgWidth = (rectWidth + padding) * (settings.codeLength + 2) + 1
    svgHeight = (rectHeight + padding) * settings.maxTurns + 1

    codeColors = colorOrder.slice(0, settings.colorsLength)

    circleSepDegrees = 360 / settings.colorsLength

    if (!colorCode) {
      colorCode = Array.from(
        { length: settings.codeLength },
        () => codeColors[Math.floor(Math.random() * codeColors.length)]
      )
    }
  }

  let colorClicks = []

  let gameOver = false
  let win = false
  let scores = []

  function getScore(colorGuess) {
    let wScore = 0
    let bScore = 0
    const colorGuessCopy = [...colorGuess]
    const colorCodeCopy = [...colorCode]
    colorCode.forEach((d, i) => {
      if (d === colorGuess[i]) {
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

    return [wScore, bScore]
  }

  function getScoreTitle(column, row, colorClicks, scores, turn) {
    if (column < settings.codeLength) {
      return ""
    }

    if (row === turn - 1 && colorClicks.length % settings.codeLength !== 0) {
      return "This round is in progress."
    }

    if (row < turn - 1) {
      const score = scores[row][column - settings.codeLength]

      return `${score} ${Pluralize("color", score)} in the ${column === settings.codeLength ? "wrong" : "right"} place.`
    }

    return "This round hasn't\nbeen played yet."
  }

  function chooseColor(codeColor) {
    colorClicks = [...colorClicks, codeColor]

    if (colorClicks.length % settings.codeLength === 0) {
      scores = [...scores, getScore(colorClicks.slice(-settings.codeLength))]
      turn += 1
    }

    if (turn > 1 && scores[turn - 2][1] === settings.codeLength) {
      win = true
      dispatch("win", { value: true })
    } else if (settings.codeLength * settings.maxTurns === colorClicks.length) {
      gameOver = true
    }
  }

  function getCellFill(column, row, colorClicks) {
    if (column >= settings.codeLength) {
      return "var(--ui-border-subtle)"
    }

    let color = colorClicks[row * settings.codeLength + column]

    return color ? `var(--mastermind-color-${color})` : "transparent"
  }

  function getPlayAgainHref() {
    const currentHref = window.location.href.replace(/\/+$/, "")

    return currentHref.substring(0, currentHref.lastIndexOf("/") + 1)
  }

  const pieces = { 0: "", 1: ".", 2: ":", 3: ":.", 4: "::", 5: "★" }

  $: columns = settings ? Array.from({ length: settings.codeLength + 2 }, (_, i) => i) : []
  $: rows = settings ? Array.from({ length: settings.maxTurns }, (_, i) => i) : []
</script>

{#if settings}
  <div class="mastermind-game flex h-full w-full justify-center">
    <div class="flex flex-col items-center">
      <div class="mb-12 flex flex-col items-center">
        <span>{settings.maxTurns} tries to crack the {settings.codeLength} color code.</span>
        <span>{settings.colorsLength} possible colors.</span>
      </div>
      <svg class="overflow-visible" width={svgWidth} height={svgHeight}>
        <g transform="translate({1}, {1})">
          {#each columns as i (i)}
            {#each rows as ii (ii)}
              <rect
                class="stroke-ui-text {i > 0 && ii === turn - 1 && colorClicks.length % settings.codeLength === i
                  ? 'stroke-2.5'
                  : i >= settings.codeLength
                    ? 'cursor-help hover:stroke-2.5'
                    : ''}"
                x={i * (rectWidth + padding)}
                y={ii * (rectHeight + padding)}
                rx={3}
                ry={3}
                width={rectWidth}
                height={rectHeight}
                fill={getCellFill(i, ii, colorClicks)}
                title={getScoreTitle(i, ii, colorClicks, scores, turn)}
                use:tooltip
              />
              {#if i === 0}
                <Text
                  classes="non-reactive text-end text-sm font-medium"
                  wrapBody={false}
                  width={rectWidth + padding}
                  height={rectHeight}
                  x={-(rectWidth + padding) - 2.5}
                  y={(ii + 0.25) * (rectHeight + padding) - 3}
                  bodyText={String(ii + 1)}
                />
              {:else if i >= settings.codeLength && ii < turn - 1}
                {@const scorePiece = scores[ii][i - settings.codeLength]}
                <Text
                  classes="non-reactive text-center"
                  bodyClasses="flex flex-col {scorePiece === 5 ? 'text-xl' : 'text-3xl'} justify-center"
                  overflowBody={false}
                  wrapBody={false}
                  width={rectWidth}
                  height={rectHeight}
                  x={i * (rectWidth + padding) + (scorePiece <= 2 ? 5 : 0)}
                  y={ii * (rectHeight + padding) - padding + (scorePiece === 5 ? 3 : -1)}
                  bodyText={pieces[scorePiece]}
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
              bodyText={i < settings.codeLength ? String(i + 1) : i === settings.codeLength ? "W" : "B"}
            />
          {/each}
        </g>
      </svg>
      {#if !(win || gameOver)}
        <svg
          class="flex touch-manipulation overflow-visible"
          width={svgWidth2}
          height={svgHeight2}
          viewBox="{-svgWidth2 * (5 / 32)} {svgHeight2 / 16} {svgWidth2 -
            padding * (settings.codeLength - 3)} {svgHeight2}"
        >
          <g transform="translate({outerRadius + 1}, {outerRadius + 1})">
            {#each codeColors as codeColor, i (codeColor)}
              <g
                transform="translate({(svgWidth2 / 2 - outerRadius) *
                  Math.cos((circleSepDegrees * i * Math.PI) / 180)}, {(svgWidth2 / 2 - outerRadius) *
                  Math.sin((circleSepDegrees * i * Math.PI) / 180)})"
              >
                <circle
                  class="cursor-pointer hover:stroke-3"
                  r={(svgWidth2 * settings.buttonSpacer) / circleSepDegrees}
                  fill="var(--mastermind-color-{codeColor})"
                  stroke="var(--ui-text)"
                  on:click={() => chooseColor(codeColor)}
                />
              </g>
            {/each}
            <Text
              classes="non-reactive text-base font-bold"
              bodyClasses="cursive"
              overflowBody={false}
              x={-22}
              y={-23.5}
              width={50}
              height={50}
              bodyText="Choose a Color"
            />
          </g></svg
        >
      {:else}
        <div class="non-reactive my-8 flex flex-col items-start">
          <span class="animation-bounce text-2xl font-extrabold">You {win ? "win" : "lose"}!</span>
          <span>Here's the code:</span>
          <svg class="mt-2 flex" width={svgWidth} height={svgHeight / settings.maxTurns}>
            <g transform="translate({1}, {1})">
              {#each colorCode as color, i (i)}
                <rect
                  x={i * (rectWidth + padding)}
                  y={0}
                  rx={3}
                  ry={3}
                  width={rectWidth}
                  height={rectHeight}
                  fill="var(--mastermind-color-{color})"
                  stroke="var(--ui-text)"
                />
              {/each}
            </g>
          </svg>
        </div>
        <div class="mb-8">
          <LinkButton classes="w-44" href={getPlayAgainHref()} label="Play Again" />
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

    .mastermind-game {
      --mastermind-color-1: oklch(from var(--data-palette-reference) 65% 0.14 h);
      --mastermind-color-2: oklch(from var(--mastermind-color-1) l c calc(h + 45));
      --mastermind-color-3: oklch(from var(--mastermind-color-1) l c calc(h + 90));
      --mastermind-color-4: oklch(from var(--mastermind-color-1) l c calc(h + 135));
      --mastermind-color-5: oklch(from var(--mastermind-color-1) l c calc(h + 180));
      --mastermind-color-6: oklch(from var(--mastermind-color-1) l c calc(h + 225));
      --mastermind-color-7: oklch(from var(--mastermind-color-1) l c calc(h + 270));
      --mastermind-color-8: oklch(from var(--mastermind-color-1) l c calc(h + 315));
    }
  </style>
</svelte:head>
