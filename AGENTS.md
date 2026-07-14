# Repository Guidance

## Shared Svelte Conventions

- Use `../svelte-lib/AGENTS.md` as the source of truth for shared Svelte formatting, config, lint, dependency, D3, Vite, Rollup, CSS import, and scoped embedded styling conventions.
- Keep local guidance focused on `mastermind`-specific routes and integration details.

## Documentation

- For README links that intentionally open a new tab, use an HTML anchor with `target="_blank"` and `rel="noopener noreferrer"`.

## Routed Pages

- Use `svelte-routing` in `src/lib/components/Router.svelte` to simulate the GitHub Pages paths under `/mastermind` for local/app rendering.
- Keep `src/routes/+page.svelte` as the app navigation hub. Page-specific content belongs in the matching route component under `src/routes`.
