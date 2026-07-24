# mastermind

Svelte implementation of the classic Mastermind code-breaking game. The app includes instructions, four playable levels, score feedback for each guess, a replay flow, and a fireworks celebration after a win.

View the live tool at <a href="https://charlieyaris.com/mastermind/" target="_blank" rel="noopener noreferrer">charlieyaris.com/mastermind</a>.

I first learned how to code while reading the book Learn Python the Hard Way. For the section on object oriented programming, I took on the challenge of translating Mastermind into a command line game. I later re-coded it in D3.js, and then as a Svelte app. The final version is what you see here today.

## How the game works

The computer chooses a secret color code. Each turn, the player builds a guess from the color wheel. After each complete guess, the board shows:

- `W`: correct color in the wrong position.
- `B`: correct color in the right position.

Win by matching the full code before the turn limit is reached.

## Levels

The four levels vary code length, number of available colors, and maximum turns:

| Level | Code length | Colors | Turns |
| --- | ---: | ---: | ---: |
| 1 | 4 | 6 | 8 |
| 2 | 4 | 8 | 8 |
| 3 | 5 | 6 | 9 |
| 4 | 5 | 8 | 9 |

## Project layout

```text
src/lib/components/      Main app and router components
src/routes/              Svelte routes for instructions, development, and play
src/routes/play/level_*  Level-specific pages
src/main.js              App entry point
```

## Development

Install dependencies from this directory:

```sh
npm install
```

Start the local Vite dev server:

```sh
npm run dev
```

Build and preview:

```sh
npm run build
npm run preview
```

Run validation:

```sh
npm run check
npm run lint
npm run format:check
```

## Local dependencies

This app uses local workspace packages:

```json
"fireworks": "file:../fireworks",
"svelte-lib": "file:../svelte-lib"
```

Rebuild those packages after changing them so Mastermind can consume the latest generated output.

## Embedded Bundle Deployment

The `Rollup upload` GitHub Actions workflow builds the rollup bundle and uploads it to
`s3://cyaris.github.io/mastermind/`.

Manual dispatch uploads staged `test_bundle.*` files by default. Set `production` during manual dispatch to upload live
`bundle.*` files instead. Pushes to `main` or `master`, including merges into those branches, always run with production
upload names and `dry-run` disabled.

Set the repository variable `SVELTE_LIB_REF` to control which `svelte-lib` branch, tag, or SHA the automatic production
workflow checks out. Set `FIREWORKS_REF` to control the same behavior for the local `fireworks` dependency. Manual
dispatch exposes both values as inputs.

The workflow calls the reusable workflow in the private `svelte-lib` repository, which means the caller repository must
also be private. Enable access from `svelte-lib`
Settings, Actions, General, Access, and provide `CHECKOUT_TOKEN` with read access to `svelte-lib` and any private local
dependency repositories. AWS authentication uses `AWS_ROLLUP_UPLOAD_ROLE_ARN` when present, otherwise it expects AWS
access-key secrets.

## Credits

Two existing D3.js projects really helped me in seeing this project through.

- <a href="https://www.d3-graph-gallery.com/graph/heatmap_style.html" target="_blank" rel="noopener noreferrer">Customizing Heatmap in D3.js</a>
- <a href="http://jsfiddle.net/ksWDN//" target="_blank" rel="noopener noreferrer">Drawing Circles on the Circumference of Another Circle</a>
