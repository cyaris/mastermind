# Repository Guidance

## Shared Svelte Conventions

- Use `../svelte-lib/AGENTS.md` as the source of truth for shared Svelte formatting, config, lint, dependency, D3, Vite, Rollup, CSS import, and scoped embedded styling conventions.

## Documentation

- For README links that intentionally open a new tab, use an HTML anchor with `target="_blank"` and `rel="noopener noreferrer"`.

## Local Dependencies

- Keep `linklocal` and local `file:` dependencies in `package.json`; sibling workspace packages such as `svelte-lib` and `fireworks` should use `file:../...` paths.

## Routed Pages

- Use `/mastermind` as the simulated GitHub Pages route base for local/app rendering.
