# Repository Guidance

## Shared Svelte Conventions

- Use `../svelte-lib/AGENTS.md` as the source of truth for shared Svelte formatting, config, lint, dependency, D3, Vite, Rollup, CSS import, and scoped embedded styling conventions.

## Shared Conventions

- Inherit README and Markdown style, GitHub Actions, reusable workflow wrapper, release policy, dispatch, pull-request
  review, workflow failure, commit, and release-management rules from `../shared-automation/AGENTS.md`.

## Routing And Hosting

- Use `/mastermind` as the simulated GitHub Pages route base for local/app rendering.

## Rollup Delivery

- Project-specific Rollup inputs include the S3 prefix, bundle file list, and a local dependency ref for `fireworks`.
