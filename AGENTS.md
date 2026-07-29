# Repository Guidance

## Shared Svelte Conventions

- Use `../svelte-lib/AGENTS.md` as the source of truth for shared Svelte formatting, config, lint, dependency, D3, Vite, Rollup, CSS import, and scoped embedded styling conventions.

## Documentation

- Keep README link behavior intentional and consistent. Use standard Markdown links by default, and use HTML anchors with `target="_blank"` and `rel="noopener noreferrer"` only when links should explicitly open in a new tab.
- Keep README and AGENTS guidance focused on current behavior, active requirements, and durable project decisions. Remove
  migration-era notes, deprecated-option explanations, old fallback paths, and historical caveats once they no longer
  affect how someone uses, maintains, deploys, or releases the project. When a state change makes a requirement obsolete,
  update the affected docs and configuration in that same change.
- Prefer bullets and subbullets over inline listed-out prose in README and Markdown documentation when they make
  concrete technical lists easier to scan, especially files, paths, options, flags, configuration values, table names,
  column names, commands, and metrics. Keep short phrase lists in prose when bullets would make the text feel
  fragmented, and keep tables when they make dense reference data easier to compare.
- Do not use bullets solely to separate README command examples or other code-block sections. Introduce each code block
  with a short prose sentence instead.
- Do not place separate bullet groups directly next to each other when they document different concepts, because
  Markdown can render them as one list. Use prose, a table, or an explicit subsection label to separate the concepts.
- Keep each README bullet list focused on one kind of item. If a bullet stands out as metadata, a context note, an
  example, an identifier, or a behavior note rather than a peer of the surrounding bullets, move it into
  prose, a table, a new subsection, or a clearly labeled subbullet group.
- When README bullet items are sentence fragments, omit trailing periods. Keep periods for bullets that are complete
  sentences or contain multiple sentences.
- Avoid starting README bullets with ambiguous pronouns such as `it`, `this`, or `these` unless the noun is explicit in
  the same bullet. Repeat the noun when that makes the bullet clearer.
- Avoid vague README verbs such as `use`, `provide`, `support`, or `available` when the relationship can be named more
  directly. Prefer concrete wording that identifies the field, flag, table, file path, setting, destination, or UI
  behavior.
- When documenting multiple README tables, files, or generated outputs, describe each item separately when a shared
  description would become vague or hide meaningful differences.
- Use prose instead of a bullet list when a section would contain only one bullet. Prefer prose over subbullets when a
  nested list would have only two items, unless the pair needs extra visual separation to avoid ambiguity.
- When an example supports an existing README bullet, make the example a subbullet under that point even when there is
  only one example. Use `Example:` for one example and `Examples:` for multiple examples.
- Let table-of-contents nesting reflect the document structure even when a section has only two children.
- Keep documentation style guidance in AGENTS.md instead of the README.
- Keep future maintainer instructions in AGENTS.md instead of the README. The README should describe project behavior,
  commands, outputs, and user-facing effects rather than telling future editors what they should do.
- In Markdown files, always format the literal as `null`.

## GitHub Actions

- Use `../shared-automation/AGENTS.md` as the source of truth for shared GitHub Actions, reusable workflow wrapper,
  release-policy, dispatch, and automation documentation conventions.
- Workflows must fail clearly when a requested feature requires credentials, secrets, repository variables, external
  permissions, or paid services that are not configured. Apply this to dry-run modes too unless the feature is
  explicitly documented as credential-optional.
- Project-specific rollup upload inputs include the S3 prefix, bundle file list, `SVELTE_LIB_REF`, and `FIREWORKS_REF`
  selections for automatic push-triggered rollup uploads. Production uploads require pinned 40-character dependency
  commit SHAs.
- Project release naming and milestone overrides belong in `.github/release-policy.yml`.

## Local Dependencies

- Keep `linklocal` and local `file:` dependencies in `package.json`; sibling workspace packages such as `svelte-lib` and `fireworks` should use `file:../...` paths.

## Routing And Hosting

- Use `/mastermind` as the simulated GitHub Pages route base for local/app rendering.

## Release Management

- While working in this repository, evaluate whether the accumulated changes represent a meaningful release milestone.
- A release may be appropriate when the work includes a substantial user-facing feature, a major redesign or workflow change, a meaningful new integration, an important architecture change, a backward-incompatible change, a stable initial public version, a significant performance, reliability, security, accessibility, or compatibility improvement, or a coherent group of changes that materially changes how the project is used.
- Do not recommend a release for routine maintenance, formatting, minor refactoring, isolated dependency updates, or small bug fixes unless their combined impact is significant.
- When the current work appears to justify a release, state that a release may be warranted, explain the milestone in plain language, suggest a release title, suggest a tag consistent with this repository's existing convention, summarize release-note content, identify breaking changes or migration concerns, and recommend full release, prerelease, or draft status.
- Prefer app-style tags such as `v3`, `v3.1`, and `v3.2` with release titles in the form `vX.Y - Plain-English Milestone`; do not rename historical tags solely for cosmetic consistency.
- Treat work on PR or development branches as a release candidate. The final tag should normally point to the merge commit on `main` or `master`, unless the user explicitly approves releasing from another branch.
- Do not create, rename, move, or delete tags or publish a GitHub release unless the user explicitly requests it.
