# Repository Guidance

## Shared Svelte Conventions

- Use `../svelte-lib/AGENTS.md` as the source of truth for shared Svelte formatting, config, lint, dependency, D3, Vite, Rollup, CSS import, and scoped embedded styling conventions.

## Shared Conventions

- Inherit README and Markdown style, GitHub Actions, reusable workflow, pull-request review, workflow failure, commit,
  and release-management rules from `../shared-automation/AGENTS.md`.
- Project-specific Rollup inputs include the S3 prefix, bundle file list, and the `fireworks` local dependency
  spec. The shared Rollup workflow uses the latest `svelte-lib` and `fireworks` `main` commits by default and resolves
  those branches to exact commit SHAs during each run.

## Routing And Hosting

- Use `/mastermind` as the simulated GitHub Pages route base for local/app rendering.
