# Repository Guidance

## Shared Svelte Conventions

- Follow the shared Svelte and JavaScript topics in `../svelte-lib/agents/`, which `CLAUDE.md` imports:
  - `shared-code.md`
  - `javascript.md`
  - `svelte-components.md`
  - `packages-and-config.md`
  - `embedded-bundles.md`
  - `jekyll-hosting.md`
  - `web-pages.md`
- Read `../svelte-lib/agents/charts.md` too before changing Canvas or D3 code.

## Shared Conventions

- Inherit README and Markdown style, link verification, GitHub Actions, reusable workflow, release policy, dispatch,
  pull-request review and merge authorization, workflow failure, commit, and release-management rules from the
  shared topics in `../shared-automation/agents/`, which `CLAUDE.md` imports:
  - `documentation.md`
  - `git-and-pull-requests.md`
  - `workflows.md`

## Routing And Hosting

- Use `/mastermind` as the simulated GitHub Pages route base for local/app rendering.

## Rollup Delivery

- Project-specific Rollup inputs include the S3 prefix, bundle file list, and a local dependency ref for `fireworks`.
