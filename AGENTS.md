# Repository Guidance

## Shared Svelte Infrastructure

- Inherit shared config from `svelte-lib` where available: `svelte.config.js`, `tailwind.config.cjs`, `postcss.config.cjs`, `.prettierrc.cjs`, `eslint.config.js`, and `rollup.config.js`.
- Keep `eslint.config.js` managed by `svelte-lib`; do not replace the re-export with a project-local ESLint configuration. If lint compatibility breaks, fix the shared config in `svelte-lib`.
- Follow the shared `no-use-before-define` convention for JS/CJS files. The shared config intentionally disables this rule for `.svelte` files until `svelte-lib` has a Svelte-aware solution; do not add project-local overrides for it.
- Keep the lockfile synced to the current local `svelte-lib` package metadata when shared lint dependencies change; the shared ESLint config assumes ESLint 9 from `svelte-lib`.
- Declare packages imported directly by this app in this app's `package.json`; do not rely on `svelte-lib` to provide transitive runtime dependencies for app-owned imports.
- When app code imports D3 directly, import only the specific `d3-*` subpackages used and declare those subpackages in `package.json`; do not add or import the umbrella `d3` package for app-owned code.
- Keep `rollup.config.js` as a thin call to `createRollupConfig({ scopeClass: "mastermind" })`; do not reintroduce project-local Rollup plugin setup or scoped-class PostCSS plugins.
- Keep `linklocal` and the `file:../svelte-lib` dependency in `package.json` so local shared-library development follows the same pattern as the other embedded Svelte apps.
- Keep `vite.config.js` as a thin local wrapper around `createViteConfig()` from the package export `svelte-lib/vite.config.js`. Do not import `sveltekit` locally or reach into `../svelte-lib/src/lib/vite.config.js`; the shared helper owns SvelteKit plugin wiring.

## Code Formatting

- Do not use non-functional trailing commas in multiline syntax. Prefer single-line object, call, command, and Svelte markup attribute definitions when they fit under the repository's effective formatter width.
- Prefer single-line formatting for simple parenthesized expressions and arrow callback bodies when they fit within the repository's formatter rules, such as `onMount(() => (mounted = true))`.
- Do not make cleanup changes that only remove blank lines or linebreaks; preserve existing linebreak structure unless the surrounding code is being changed for a substantive reason or the formatter requires it.
- For repository-wide formatting passes, format non-Python files with Prettier using `trailingComma: "none"` and a wide print width so objects/calls are not wrapped solely for style.

## Documentation

- For README links that intentionally open a new tab, use an HTML anchor with `target="_blank"` and `rel="noopener noreferrer"`.

## Embedded Bundle

- `src/main.js` is the Rollup entry for the Jekyll/S3 bundle. It creates the `.mastermind` wrapper and mounts the app.
- Import shared CSS in Rollup entry files through `svelte-lib` package exports, such as `svelte-lib/styles/app.css` and `svelte-lib/styles/root.css`. Do not import from `../node_modules/svelte-lib/src/...` source paths.
- Avoid `$lib` aliases in code that must be bundled directly by Rollup unless the shared Rollup config explicitly supports that alias. Prefer relative imports for library/internal code that is not SvelteKit-route-only.

## Routed Pages

- Use `svelte-routing` in `src/lib/components/Router.svelte` to simulate the GitHub Pages paths under `/mastermind` for local/app rendering.
- Keep `src/routes/+page.svelte` as the app navigation hub. Page-specific content belongs in the matching route component under `src/routes`, with the Jekyll repo providing shell pages for the rendered bundle.
