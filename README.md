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

### `.github/workflows/ci.yml`

The `CI` workflow runs on pushes, pull requests, and manual dispatch. It calls the shared
`cyaris/svelte-lib/.github/workflows/node-package-ci.yml` workflow to install dependencies and run the package's default
format, lint, Svelte check, and build commands.

The workflow can be dispatched from the GitHub Actions UI with **Actions > CI > Run workflow**. Manual dispatch exposes
`svelte-lib-ref` and `fireworks-ref` inputs for choosing the sibling `svelte-lib` and `fireworks` refs checked out for
local `file:` dependencies. Automatic push and pull-request runs use `SVELTE_LIB_REF` and `FIREWORKS_REF` repository
variables when present, falling back to `dev` and `cy_dev`.

### `.github/workflows/rollup-upload.yml`

The `Rollup upload` GitHub Actions workflow builds the rollup bundle and uploads it to
`s3://cyaris.github.io/mastermind/`.

The workflow runs automatically on pushes to `main` or `master`, including merges into those branches, and can be
dispatched from the GitHub Actions UI with **Actions > Rollup upload > Run workflow**. Manual dispatch uploads staged
`test_bundle.*` files by default. Set `production` during manual dispatch to upload live `bundle.*` files instead; set
`dry-run` to print S3 operations without writing objects. Automatic push runs always use production upload names and
disable `dry-run`.

Set the repository variable `SVELTE_LIB_REF` to control which `svelte-lib` branch, tag, or SHA the automatic production
workflow checks out for both the local file dependency and the shared rollup upload action. Set `FIREWORKS_REF` to
control the same behavior for the local `fireworks` dependency. Manual dispatch exposes both values as inputs.

The workflow checks out the private `svelte-lib` repository and runs `.github/actions/rollup-upload` from that checkout.
Provide `CHECKOUT_TOKEN` with read access to `svelte-lib` and any private local dependency repositories. AWS
authentication uses `AWS_ROLLUP_UPLOAD_ROLE_ARN` when present, otherwise it expects AWS access-key secrets.

### `.github/workflows/auto-release.yml`

The `Auto release` workflow runs after a pull request is closed and delegates to the shared
`cyaris/svelte-lib/.github/workflows/auto-release.yml` workflow only when that pull request was merged. It evaluates the
merge commit against the repository release policy, asks the configured OpenAI model whether the merge warrants a
release, publishes a GitHub release when warranted, and comments the outcome on the pull request.

The workflow can also be dispatched from the GitHub Actions UI with **Actions > Auto release > Run workflow**. Manual
dispatch accepts optional `release-sha`, `pr-number`, and `svelte-lib-ref` inputs; when `release-sha` is blank, it
evaluates the workflow SHA. Release runs require `OPENAI_API_KEY`; `RELEASE_TOKEN` and `CHECKOUT_TOKEN` can be provided
when the default token cannot create releases or read private repositories.

## Credits

Two existing D3.js projects really helped me in seeing this project through.

- <a href="https://www.d3-graph-gallery.com/graph/heatmap_style.html" target="_blank" rel="noopener noreferrer">Customizing Heatmap in D3.js</a>
- <a href="http://jsfiddle.net/ksWDN//" target="_blank" rel="noopener noreferrer">Drawing Circles on the Circumference of Another Circle</a>
