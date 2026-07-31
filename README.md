# mastermind

Svelte implementation of the classic Mastermind code-breaking game. The app includes instructions, four playable levels, score feedback for each guess, a replay flow, and a fireworks celebration after a win.

View the live tool at <a href="https://charlieyaris.com/mastermind/" target="_blank" rel="noopener noreferrer">charlieyaris.com/mastermind</a>.

I first learned how to code while reading the book Learn Python the Hard Way. For the section on object oriented programming, I took on the challenge of translating Mastermind into a command line game. I later re-coded it in D3.js, and then as a Svelte app. The final version is what you see here today.

## How the game works

The computer chooses a secret color code. Each turn, the player builds a guess from the color wheel. After each complete guess, the board shows:

- `W`: correct color in the wrong position
- `B`: correct color in the right position

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

## GitHub Actions Workflows

These local wrappers inherit their reusable implementations from `cyaris/shared-automation`. Shared workflow behavior,
inputs, and secrets are documented in the
[shared-automation workflow reference](https://github.com/cyaris/shared-automation#workflows).

### `.github/workflows/auto-create-dev-pr.yml`

The `Auto-create dev pull request` workflow runs on pushes to `dev` and calls the
[shared auto-create-dev-pr workflow](https://github.com/cyaris/shared-automation#githubworkflowsauto-create-dev-pryml).

### `.github/workflows/ci.yml`

The `CI` workflow runs on pushes, pull requests, and manual dispatch. It calls the
[shared CI workflow](https://github.com/cyaris/shared-automation#githubworkflowsciyml). Manual dispatch exposes
`svelte-lib-ref` and `fireworks-ref`; automatic runs use `SVELTE_LIB_REF` and `FIREWORKS_REF` repository variables when
present.

### `.github/workflows/rollup-upload.yml`

The `Rollup upload` workflow calls the
[shared rollup-upload workflow](https://github.com/cyaris/shared-automation#githubworkflowsrollup-uploadyml) to build
the rollup bundle and upload it to `s3://cyaris.github.io/mastermind/`. Manual dispatch exposes `svelte-lib-ref` and
`fireworks-ref`; automatic runs use `SVELTE_LIB_REF` and `FIREWORKS_REF` when set. Production uploads require pinned
40-character dependency commit SHAs.

### `.github/workflows/auto-release.yml`

The `Auto release` workflow runs from manual dispatch only and calls the
[shared auto-release workflow](https://github.com/cyaris/shared-automation#githubworkflowsauto-releaseyml). This
repository contributes `.github/release-policy.yml` overrides.

### `.github/workflows/release-please.yml`

The `Release Please` workflow runs on pushes to `master` and manual dispatches by `cyaris`, using
`release-please-config.json` and `.release-please-manifest.json` for future releases. Historical reconciliation is
complete through `2504eb35e885174bb12fde5ac3cf3ceb82ea595d`; `auto-release.yml` remains available for manual historical
repair, while Release Please manages later commits.

## Credits

Two existing D3.js projects really helped me in seeing this project through.

- <a href="https://www.d3-graph-gallery.com/graph/heatmap_style.html" target="_blank" rel="noopener noreferrer">Customizing Heatmap in D3.js</a>
- <a href="http://jsfiddle.net/ksWDN//" target="_blank" rel="noopener noreferrer">Drawing Circles on the Circumference of Another Circle</a>
