# Repository Guidance

## Routing And Hosting

- Use `/mastermind` as the simulated GitHub Pages route base for local/app rendering.

## Rollup Delivery

- Project-specific Rollup inputs include the S3 prefix, bundle file list, and a local dependency ref for `fireworks`.

# Inherited Rules

Copied from `../shared-automation/AGENTS.md` and `../svelte-lib/AGENTS.md` by `sync-agents.js`. Edit them there, then run
`node ../shared-automation/.github/scripts/sync-agents.js` from this repository's root.

Before changing Canvas or D3 code, read the `charts` topic in `../svelte-lib/AGENTS.md`.

<!-- inherit: shared-automation/code-style -->
## Code Style

These rules apply to tracked, nonignored source files in every language. Skip generated, vendored, build-output, and
ignored files, such as `.svelte-kit/` or `dist/`, unless a task explicitly requires refreshing them. The Python And SQL
topic and `svelte-lib`'s JavaScript topic add to them.

- Follow the installed formatter, import sorter, and linter rather than hand-formatting against their output. After
  changing code in a repository that defines formatting or lint validation, run every applicable validation and
  address its findings.
- Write comments only when they materially clarify necessary context. Fix typos in comments that you write or edit
  nearby.
- Inline local variables referenced only once and functions with only one caller unless a separate name is materially
  useful for clarity, behavior, or correctness. Separation of concerns alone does not justify a single-use helper when
  its caller remains clear and manageable after inlining. Retain a single-use variable or function only for a concrete
  reason, such as substantial complexity, meaningful semantic abstraction, independent testing value, genuinely
  expected reuse, avoiding duplicated evaluation or side effects, or measured performance. Do not mechanically inline
  code when that would make a function excessively large or materially harder to understand. Staying within the
  formatter's line length is not such a reason: let the formatter wrap inlined code.
- Prefer an existing module- or component-scope variable over passing the same invariant value through internal helper
  parameters. Keep parameters for values that genuinely vary by call, define a reusable public utility's input
  contract, or make a dependency explicit for isolation or testing. Do not introduce mutable application-wide state
  merely to shorten a function signature.
- Group consecutive statements by purpose with one blank line between groups. Keep statements together when they are
  the same kind or directly sequentially related. A standalone comment counts as the separator, so do not also add a
  blank line immediately before it. Do not make cleanup changes that only alter blank lines or line breaks; apply this
  grouping when the surrounding code is being changed substantively or the formatter requires it.
- When order has no semantic, dependency, source-order, or configuration-defined meaning, arrange lists, object or
  dictionary keys, named definitions, and other code collections alphabetically. Compare code case-sensitively with
  uppercase before lowercase, and let the formatter, import sorter, linter, or another installed ordering tool take
  precedence.
- Keep imports at the top of a module. Defer an import into a function only to break a circular dependency or when the
  module must run without a genuinely optional dependency. Let the installed formatter, import sorter, or linter
  determine import ordering. When none owns it, sort imports alphabetically and group package imports above project
  imports with one blank line between them, preserving CSS import order because it can affect the cascade.
- Declare every installed dependency in the owning package's or project's dependency file rather than relying on the
  local environment or a transitive dependency.
- Format user-facing or human-readable logged numeric quantities with thousands separators, through `.toLocaleString()`
  in JavaScript or a `,` format specifier such as `f"{count:,d}"` in Python. Do not apply numeric formatting to
  identifiers, to other values whose digits are not quantities, or to structured log fields a parser or metrics
  pipeline consumes, because the separators make them locale-dependent strings.
- Treat a valid `0` as data and keep `null` distinct from zero. Use finite-value checks rather than truthiness for
  numeric values, and coalesce a missing value to `0` only when coverage or derivation proves it is zero, so a display
  can show it as unknown.
<!-- /inherit: shared-automation/code-style -->

<!-- inherit: shared-automation/documentation -->
## Documentation

- Fix typos in documentation that you write and in existing nearby text that you edit.
- When the order of prose list items is not significant, arrange them alphabetically using case-insensitive comparison, with the uppercase item first when two items differ only by case. Preserve semantic, procedural, severity, and other meaningful orders.
- Keep GitHub Actions workflow sections as the final top-level section in caller README files.
- Keep README and AGENTS guidance focused on current behavior, active requirements, and durable project decisions. Remove
  migration-era notes, deprecated-option explanations, old fallback paths, and historical caveats once they no longer
  affect how someone uses, maintains, deploys, or releases the project. When a state change makes a requirement obsolete,
  update the affected docs and configuration in that same change. This removes content that has stopped being true, never
  an accurate statement of how the project works today: a fact stays documented while it holds, including when a tracked
  issue proposes replacing the behavior, and including when the same fact is stated in another section. Consolidate a
  genuine repetition by choosing which section owns it and keeping that one, rather than deleting both.
- Do not add repository-owned `CHANGELOG.md` files. Keep durable current behavior in README/AGENTS documentation and
  publish milestone history through GitHub release notes.
- Keep README link behavior intentional and consistent. Use standard Markdown links by default, and use HTML anchors
  with `target="_blank"` and `rel="noopener noreferrer"` only when links should explicitly open in a new tab.
- In README files and user-facing technical Markdown documentation, use bullets, subbullets, or a compact table whenever a
  sentence or paragraph enumerates three or more peer technical items, including files, paths, commands, flags, fields,
  tables, outputs, steps, requirements, metrics, dependencies, or triggers. Do not leave a concrete inventory as
  comma-separated prose merely because each item is short. Keep one item or a genuinely inseparable two-item phrase in
  prose. When aligning a README with these rules, audit existing touched sections for dense inline inventories instead
  of applying the rule only to new text.
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
- Prefer active wording when it identifies the actor or operation more clearly, especially for ownership, workflow
  actions, requirements, generated outputs, and failure behavior. Keep passive or state-oriented wording when the actor
  is unknown, irrelevant, or less important than the resulting state; do not perform mechanical voice rewrites.
- When documenting multiple README tables, files, or generated outputs, describe each item separately when a shared
  description would become vague or hide meaningful differences.
- Do not restate a section's subject in the text directly beneath its heading. A heading that already names a file, such
  as `.github/workflows/rollup.yml` or `contact.html`, makes that restatement redundant, so the text below it opens with
  the verb: "Calls the shared rollup workflow with these local details:", not "The `Rollup` workflow calls the shared
  rollup workflow with these local details:". This applies to prose and bullets alike.
- Use prose instead of a bullet list when a section would contain only one bullet, unless the section heading already
  names the subject; prose would then have to restate that subject, so keep the single bullet and let it open with the
  verb. Prefer prose over subbullets when a nested list would have only two items, unless the pair needs extra visual
  separation to avoid ambiguity.
- When an example supports an existing README bullet, make the example a subbullet under that point even when there is
  only one example. Use `Example:` for one example and `Examples:` for multiple examples.
- Let table-of-contents nesting reflect the document structure even when a section has only two children.
- Keep documentation style guidance and future maintainer instructions in AGENTS.md instead of the README. The README should describe project behavior,
  commands, outputs, and user-facing effects rather than telling future editors what they should do. This covers durable
  standing conventions only, such as a step that must be repeated whenever a given file changes. Do not move an open work
  item into AGENTS.md: a `TODO`, a known gap, a planned migration, or an undecided design choice is tracked where the
  project already tracks work, such as a GitHub issue or the README note that already records it, because AGENTS.md
  states how the repository is maintained rather than what is still outstanding.
- In Markdown files, always format the literal as `null`.
- Before completing a change that adds or changes a user-followable link, verify the real target rather than relying
  on the URL's appearance. Check an internal destination in every route implementation that serves it. For an
  external destination, make a live request that follows redirects and confirm the final page is the intended one, not
  merely a non-404 response. Add focused regression coverage for the stable route or URL. If automation is blocked by
  login, bot protection, or another access restriction, perform and report the required manual check instead of
  claiming the link was verified.
- Keep private action and dependency access requirements documented in `README.md`.
- Keep every Markdown pipe table compact in source. This is required formatting, not a preference: separate columns
  with exactly one space on either side of each pipe, as in `Prop | Behavior` and `--- | ---:`, with no leading or
  trailing pipe. Never pad cells or lengthen separator dashes to align columns. Preserve only required alignment
  markers such as `---:`, `:---`, and `:---:`. When editing a document for any reason, preserve compact tables and
  restore compact formatting in every table touched by the change. Prettier pads every pipe table it formats, so never
  run Prettier, or any other formatter that rewrites tables, on a Markdown file. Keep Markdown out of a repository's
  `format` scripts and list it in `.prettierignore` so a direct `prettier --write` on a document is a no-op.
- Downstream README files should link to this repository's workflow descriptions instead of repeating shared behavior.
  For each local wrapper, document only the applicable local trigger and branch behavior, working directory, skipped
  commands, destination or S3 prefix, bundle files and naming, dependency refs, policy overrides, and required local
  variables or secrets. Then link to the shared workflow description for common behavior, inputs, and secrets.
- When a change affects product behavior, routes, architecture, APIs or data sources, data models, live or background
  behavior, or a meaningful edge case, update the Markdown document that owns that subject in the same change. Prefer an
  existing owner over a new document, and make no documentation-only change for a trivial implementation detail.
- Label documented functionality as implemented, partially implemented, or planned when its status could be
  ambiguous, and update the label when implementation changes, so planned behavior never reads as current.
- When a change makes a meaningful architectural decision, record the problem, the approved approach and its
  rationale, the alternatives considered, tradeoffs, and important edge cases in the document that owns that area. For
  a later replacement, document what changed and why rather than rewriting the earlier record.
<!-- /inherit: shared-automation/documentation -->

<!-- inherit: shared-automation/git-and-pull-requests -->
## Git And Pull Requests

### Agent And Skill Execution

- Execute a skill's instructions in the active primary agent session, using that session's model and compute. Treat a skill as portable instruction text: its location under Claude, Codex, or another agent does not authorize launching that vendor's CLI, subprocess, remote session, or separate agent runtime. Naming a skill from another agent ecosystem requests the skill's workflow, not that ecosystem's compute. Use separate agent compute only when the user explicitly asks to run that separate agent or model rather than merely naming its skill.

### Commit Integrity

- Assume another session may be editing the same working tree at the same time. A commit must hold exactly the
  changes its session made, and never another session's.
- Stage by path, never with `git add -A`, `git add .`, or `git commit -a`. Before staging a file, read its
  `git diff HEAD -- <path>`, which shows staged hunks as well as unstaged ones: if any hunk is not yours, stage only
  your hunks, or leave the file and tell the user. Before committing, read the full `git diff --cached` on its own,
  hunk by hunk: another session may have staged files you never touched, or hunks in a file you also changed, and a
  plain `git commit` takes all of them. `git diff --cached --stat` summarizes it but lists only files, so it cannot
  show a foreign hunk in your own file. If the staged diff holds anything that is not yours, commit through the
  temporary index described below instead. Never chain staging, this check, and the commit in one command.
- Never stash, reset, restore, or check out a file you did not change, because doing so moves another session's
  uncommitted work.
- Make, commit, and push a change from the working tree the user runs, never from a separate worktree or clone of
  it. A commit pushed from elsewhere leaves the user's checkout behind its own branch, so a running dev server never
  shows the change, and where another session has uncommitted edits to the same files, the next pull cannot apply
  without stashing or merging that work. A scratch worktree may build or test a candidate tree but never commits to
  a branch the user's checkout tracks. When the shared index holds anything another session staged, commit through
  a temporary index built from `HEAD` plus only your hunks, then add the same hunks to the shared index, so neither
  the working tree nor the other session's staging moves.
- Right after committing, compare the full `git show HEAD` with the hunks you meant to commit, and confirm that
  `HEAD`'s parent is the commit you started from, as a separate step before any push, never chained to the commit. If
  your change is missing, landed in another session's commit, or shares your commit with work you did not make, stop
  and tell the user before pushing. Never rewrite a pushed commit to fix this.
- Write clear, specific commit subjects that describe the actual change. Prefer plain language over release-tool syntax,
  and do not exaggerate routine maintenance as user-facing work.
- Never commit, print, or log a secret, or put one in a fixture, URL, client response, analytics event, or pull
  request. Treat public keys, such as a CAPTCHA site key, as configuration, and keep secrets server-side and out of
  browser-readable roles. A provider's official test credentials may appear in local-development fixtures, never in
  production configuration.

### Pull Requests

- Never merge a pull request unless the user explicitly instructs you to merge that specific pull request or an
  unambiguous identified set of pull requests. Requests to fix, finish, deploy, publish, investigate, make checks green,
  or continue do not authorize a merge; neither do green checks, review completion, mergeability, or prior authorization
  for a different pull request. When a pull request is ready without explicit merge authorization, leave it open and
  report its readiness. The instruction must say **merge** and name the pull request by number or URL. A reply such as
  "go for it," "proceed," or "ship it" does not authorize a merge, even right after the assistant proposes merging a
  specific pull request, and permission to commit or push is not permission to merge. Ask for that instruction when a
  deployment needs a merge.
- Before merging any pull request, explicitly inspect CodeRabbit comments and reviews and assess every still-applicable
  finding; do not merge solely because checks are green.
- When a pull request depends on configuration or approval that cannot be committed to the repository, put a prominent
  caution in the pull-request description before its merge or deployment instructions. This includes repository,
  organization, or environment variables and secrets; API credentials and tokens; cloud projects, billing, identities,
  permissions, services, and resources; OAuth applications, origins, and callback URLs; DNS and provider-dashboard
  settings; third-party approval; paid-plan requirements; production migrations; and other manual external state.
- Make the caution an actionable inventory. Name every required item exactly, identify where it must be configured,
  distinguish public configuration from secrets, state prerequisites and required ordering, explain how to verify the
  resulting contract without revealing secret values, and state what remains unavailable or fails while an item is
  missing. Never put a credential, token, private key, or other secret value in the pull request.
- Separate completed external setup from pending work and include verification evidence for completed items. Keep an
  activation-dependent pull request explicitly blocked while required external setup or verification remains pending,
  and update the caution as each item is completed so later maintainers do not repeat a destructive step or assume that
  committed workflow or migration files changed the external system.

### Release Management

- Use the default policy in `.github/release-policy.yml` unless a caller has a durable project-specific override in its
  own `.github/release-policy.yml`, which never reintroduces shared release implementation logic. Keep version and
  title formats in policy files rather than duplicating them in `AGENTS.md`.
- Evaluate whether accumulated changes form a meaningful release milestone. Substantial user-facing features,
  architecture changes, important reliability, security, accessibility, performance, or compatibility improvements,
  and coherent groups of material changes may warrant a release. Routine maintenance, formatting, minor refactors,
  isolated dependency updates, and small fixes normally do not.
- When a release may be warranted, explain the milestone, suggest a policy-consistent title and tag, summarize release
  notes and migration concerns, and recommend full release, prerelease, or draft status.
- Treat work on PR or development branches as a release candidate. The final tag should normally point to the merge
  commit on `main` or `master` unless the user explicitly approves another branch.
- Do not create, rename, move, or delete tags or publish a GitHub release unless the user explicitly requests it.
- Treat upstream automation, shared workflow reference, dependency-pin, Renovate, and release-policy maintenance as
  non-release work unless it changes repository user behavior or a published package/runtime API.
<!-- /inherit: shared-automation/git-and-pull-requests -->

<!-- inherit: shared-automation/workflows -->
## Workflows

### Workflow Ownership And Caller Expectations

- Keep shared AWS CDK deployment, CI, rollup, auto-create-dev-PR, and auto-release implementation changes in this repository. Caller repositories should keep thin local wrapper workflows that define triggers, permissions, inputs, secrets, and repository-specific values before calling the reusable workflow here.
- Keep reusable workflow defaults general. Caller-specific commands, local dependency refs, bundle file lists, metadata refresh files, branch selections, S3 prefixes, and release naming or milestone overrides belong in caller workflow inputs or caller release-policy files.
- First-party upstream refs should track the latest production branch by default. Reusable workflow and composite-action
  callers must use `cyaris/shared-automation` refs on `main`, including when a new downstream caller temporarily fails
  because its required shared feature exists only on `dev`. Rollup local dependency specs should name production refs
  such as `main`
  unless a repository documents an intentional override; the shared Rollup workflow substitutes `dev` for those
  production refs when the caller runs on `dev`, then resolves every selected ref to an exact commit SHA before checkout
  and upload. Dependencies needed by both CI and upload should be listed in `local-dependency-repositories`. Rollup
  checks out `svelte-lib` from the separate `svelte-lib-repository` and `svelte-lib-ref` inputs instead of that list,
  applying the same `dev` substitution and SHA pinning.
- Do not hardcode commit SHAs or substitute a feature branch in first-party `cyaris/*` reusable workflow,
  composite-action, or source dependency references to expose an upstream feature before it reaches the referenced
  production branch. Keep caller configuration on the appropriate `main` or `master` production-branch contract; exact
  SHAs resolved internally by a workflow for a single reproducible run are not hardcoded caller references. Third-party
  GitHub Actions remain SHA-pinned under the security rule below.
- When a downstream change needs an upstream feature that is not yet available on its configured production branch,
  tell the user before publication that the downstream workflow, build, or runtime will fail until upstream lands. Keep
  the downstream reference on the production branch and publish it when requested; do not conceal the dependency by
  pinning the unpublished commit or changing the caller to an upstream feature branch.
- Keep release boundary decisions in the shared auto-release workflow and release-policy files. Caller repositories should
  not add separate release automation unless the user explicitly asks for a repository-specific exception.
- Do not move a repository-specific workflow implementation into this repository unless another repository will share the same behavior.
- Manual `workflow_dispatch` paths must remain restricted to the `cyaris` GitHub actor by default. Trusted Rollup
  dispatches from the repository's upstream-watch workflow may also allow `github-actions[bot]`, gated on Rollup
  verifying via the GitHub API that the supplied `source-run-id` references an authorized `upstream-watch.yml` run in
  the same repository that was active when GitHub created the Rollup run. This is time-bounded authorization of a
  legitimate run ID, not verified provenance: `source-run-id` is caller-supplied input, so it does not cryptographically
  prove which workflow actually issued the dispatch. Do not extend that automation exception to other actors or
  workflows, and do not grant `actions: write` to additional workflows in this repository, without first closing that
  gap (for example, with a `workflow_run` trigger).

### Workflow Behavior

- Do not disable a shared CI standard-script flag (`run-format`, `run-lint`, `run-check`, `run-build`) unless the caller
  defines no such npm script, and document that reason where the wrapper is described. A caller that defines the script
  runs it; skipping one silently removes coverage every other caller has.
- Auto-create-dev-pr callers should pass `CHECKOUT_TOKEN` so the shared workflow can write the `DEV_PR_OPEN`
  repository variable, and should pass a repository `RELEASE_TOKEN` secret, when present, for trusted user or
  agent-authored dev pull requests. Callers must also trigger on production-branch pushes and keep the shared
  `DEV_PR_OPEN` job-level skip so `dev` pushes do not start a runner while a dev pull request is open.
- Workflows must fail clearly when a requested feature requires credentials, secrets, repository variables, external
  permissions, or paid services that are not configured. Apply this to dry-run modes too: a dry run may avoid external
  writes, but it should still prove that required credentials exist unless the feature is explicitly documented as
  credential-optional.
- Do not hide required workflow failures with `continue-on-error: true`, `|| true`, warning-only error handlers,
  harmless default outputs, or skipped jobs. Intentional no-op paths are fine when the work is genuinely unnecessary,
  such as no release action being needed or no dev pull request being possible, but missing configuration and failed
  required operations should end in a failed step or job with enough context to debug the cause.
- Keep scheduled workflows simple. Prefer one schedule away from the top of the hour over multiple UTC schedules plus a
  local-time gate, unless the repository truly needs exact local-time behavior. If a schedule is only approximate, let
  the job run and document the chosen UTC time instead of creating helper jobs that make expected runs appear skipped.
- Prefer AWS OIDC for deployment workflows. Reusable workflows and caller jobs that pass `aws-role-to-assume` must grant
  `id-token: write`; static AWS access-key secrets may remain only as a compatibility fallback until callers have
  repository-specific OIDC roles configured.
- For rollup upload callers, `dev` pushes should not run Rollup. Pushes from `main` or `master` should run production
  uploads with unprefixed bundle names. Manual or trusted upstream-watch dispatches from `dev` should run staged uploads
  with `dev_bundle.*` names.
- When a Rollup caller needs a temporary deployment-readiness gate, pass the shared `deployment-enabled` input. Keep the
  caller job active so shared CI still runs, and apply the gate only to the shared upload job.
- Do not trigger GitHub Actions workflows from pull-request events. `auto-create-dev-pr` is the only workflow that runs
  automatically on `dev` pushes; run pre-merge CI, build, Pages, and workflow-validation checks on `dev` through manual
  dispatch, and retain production-branch push checks after merge.

### Dependency Automation

- Keep shared Renovate defaults in `default.json`. Participating repositories should keep local `renovate.json` files as
  thin wrappers that extend `github>cyaris/shared-automation`, then add repository-specific overrides only when the
  shared preset cannot describe a durable local need.

### Workflow Validation And Security

- Add workflow-validation callers to dependent repositories when they own meaningful local workflow logic, such as
  deployment jobs, rollup input-resolution shell, local permissions decisions, secret wiring, dispatch inputs,
  concurrency behavior, or nontrivial Pages workflows. A thin reusable-workflow caller still owns meaningful local
  logic when it declares any of those behaviors. Avoid adding validation wrappers solely for repositories whose local
  workflows are completely declarative calls without security-sensitive or behavioral configuration.
- Treat `actionlint` failures as workflow contract or syntax issues to fix before rollout.
- Treat `zizmor` findings as security-review prompts. Fix true positives, document accepted risks, and avoid broad
  suppressions.
- Keep third-party GitHub Actions hash-pinned when `zizmor` requires it.
- Extract non-trivial inline Node.js logic out of `run:` heredocs into standalone files under `.github/scripts/`,
  covered by `node --test`, rather than leaving security-relevant or otherwise complex logic untested inside a workflow
  step. Wire the reusable CI workflow's `run-test` input to run those tests before rollout.
<!-- /inherit: shared-automation/workflows -->

<!-- inherit: svelte-lib/shared-code -->
## Shared Code

- Treat `svelte-lib` as the place for generic reusable Svelte components, functions, and patterns extracted from project work. Place code according to the abstraction itself, not its current consumer count: a general primitive may belong here with one consumer, while application- or visualization-specific behavior belongs downstream even when several callers happen to use it. Prefer composing shared primitives in the consuming repository over moving domain semantics into the library.
- Keep `svelte-lib` free of anything proprietary to a consuming product, so the library could be licensed or published on its own terms without exposing a product: no domain logic, product or provider names, data, branding, artwork, or credentials, and no mechanism its owner treats as proprietary. Accept only conventional, generic code, write its comments, tests, examples, README, and commit messages without product or provider names, and leave anything whose generality is in doubt in the consumer until the owner decides.
- When a requested change touches something rendered or computed by shared code, whether a library primitive or a consuming repository's own shared component, helper, data-boundary function, or one entry of a data-driven list, change the shared code so every consumer picks it up. Do not copy the shared markup or logic into a one-off for the place that was mentioned; if the request genuinely applies to one consumer only, add a prop, option, or data field to the shared code rather than a fork. Prefer a generic prop over project-specific hard-coding.
- Consolidate shared code as soon as it is written, in the same change, rather than leaving a second copy for a later cleanup. When new code would repeat something that already exists in the repository, or two places would now hold the same thing, extract it and make both use it: a constant table, request helper, name or identity normalizer, or matching routine that two data-boundary modules need belongs in one module both import, with each external provider owning one module rather than spreading its constants and helpers across the callers; repeated markup, such as a page header, an icon badge, a primary button, or a selectable card's class pair, becomes one component or one class helper; and a list of near-identical elements, such as FAQ entries, navigation links, or option cards, is rendered from a data array through one `{#each}` block instead of hand-copied blocks. Give the shared piece props or data fields for the ways its consumers differ instead of keeping a diverging copy for one of them.
- When a repository inherits these conventions, copy each topic that applies to it into the `AGENTS.md` nearest the code it governs through inherit markers, and list only the conventions that genuinely differ. Do not restate or paraphrase a rule a topic file already owns: a downstream copy drifts from the original wording over time and obscures which file is authoritative, so the rule ends up enforced in two places that disagree.
- Make a change that belongs in `svelte-lib` there, never as a workaround in a consumer. Commit and push it to
  `svelte-lib`'s `dev` first, with its tests and README, rebuild its `dist`, then change the consumer to use it, since a
  consumer's `dev` CI builds against `svelte-lib`'s `dev` and its `main` against `svelte-lib`'s `main`. Leave merging
  `svelte-lib` to `main` to the owner, and say when a consumer change needs that merge before it can reach production.
<!-- /inherit: svelte-lib/shared-code -->

<!-- inherit: svelte-lib/javascript -->
## JavaScript

These rules add to the Code Style topic.

- Prefer functional array methods (`.map`, `.filter`, `.reduce`, `.forEach`, and similar) over manual `for`/`while` loops for traversals and transformations, consistent with the codebase's existing functional style. Use an imperative loop only when it is clearly simpler or an early exit/performance need makes it a better fit, and prefer `for...of` over an indexed `for` loop that uses the index only to access the current element. In performance-sensitive rendering and animation paths, prioritize measured performance over stylistic modernization.
- Let the shared Prettier config, with `trailingComma: "none"` and `objectWrap: "collapse"`, decide wrapping, and limit condensing only by its `printWidth`. Remove trailing commas that only force simple objects, calls, arrays, commands, or Svelte markup attributes multiline, and collapse simple object literals, return values, parenthesized expressions, and arrow callback bodies that fit, such as `return { x, y, width: bounds.width, height: bounds.height }`.
- Prefer concise conditional expressions for simple side-effect-free value selection or normalization in returns and variable definitions, such as `return value === "true" ? true : value === "false" ? false : value` or `let label = active ? "Active" : "Inactive"`. Keep guard returns and `if` blocks when they represent distinct cases, validation, error handling, repeated work avoidance, or multi-step logic.
- Group variable declarations within a scope by conceptual role, such as styling and geometry, control state, or application state, and keep each role contiguous. Keep a standalone declaration group near the code that owns or first uses it when that improves locality, rather than hoisting it merely to collect variables. Do not split a cohesive conceptual group merely because its members are first referenced at different points. Within a role, keep `const` and `let` declarations in separate blocks with a single blank line between them rather than interleaving declaration kinds. Preserve dependency, initialization, reactivity, binding, and source-order requirements when they require a different placement.
- Use the real boolean literals `true`/`false` for actual boolean values in code. Only write the quoted strings `"true"`/`"false"` when the value is inherently string-typed by its target or source: an HTML/ARIA attribute value (e.g. `aria-hidden="true"`, since ARIA's boolean-like attributes are spec'd as string enums, not boolean HTML attributes), a DOM `dataset` entry (`HTMLElement.dataset` is a `DOMStringMap` that coerces any assigned value to a string regardless), or a comparison/normalization against external input that may literally arrive as the string `"true"`/`"false"` (config values, serialized attributes, `localStorage`, URL params), matching the parsing pattern above.
- Keep reusable utilities in `src/lib/functions/` split by durable concern rather than in a broad helper bucket. Prefer focused modules such as `textFormatting.js`, `date.js`, `dom.js`, `color.js`, and `geometry.js`.
<!-- /inherit: svelte-lib/javascript -->

<!-- inherit: svelte-lib/svelte-components -->
## Svelte Components

### Component Structure

- Key an `{#each}` block only when the list can change during the component's life — items added, removed, or reordered — where Svelte needs the key to preserve the right node and its state. Leave a list that is built once and never mutated unkeyed: the key is inert, and writing one implies the list is dynamic when it is not. The shared ESLint config turns `svelte/require-each-key` off for exactly this case.
- Key by a value that identifies the item, not by its position. `(i)` on an index, or a key whose value is the item's own index, reproduces the index matching Svelte already does unkeyed, so it reads as identity-preserving reconciliation while providing none.
- Keep text a person reads as words or figures at `12px` (`text-xs`) or larger, including secondary lines, captions,
  table figures, help text, and a list's own content. Size a list's heading at least as large as the entries beneath
  it so the heading leads, and set content rather than a caption at the body size. A short label that stands alone in
  a pill, badge, or tile beside larger text, such as a status pill, a count badge, or a navigation label, may use
  `11px` (`text-[0.6875rem]`). Go smaller only for a mark that repeats information available as text, such as a sort
  arrow or a projection triangle with an accessible label, and never for words or figures.
- For any component that exposes a `wrapperClasses` prop, prefer Tailwind utilities through that existing
  API, including descendant arbitrary variants, over adding styling-only component props or internal style
  state. Add a new prop only when it controls behavior or when the styling cannot be reliably expressed
  through `wrapperClasses`.
- Do not pass fixed/default markup values through helper functions when they can be declared directly in markup.
- When multiple sibling variables represent the same concept across a repeated or keyed UI surface, prefer one dictionary keyed by that surface over parallel standalone variables. For example, use `selectNoItemsMessage.timeframe`, `selectNoItemsMessage.nodeDescriptor`, and `selectNoItemsMessage.linkDescriptor` instead of separate `noTimeframeItemsMessage`, `noNodeSizeItemsMessage`, and `noLinkDashItemsMessage` constants. Keep variables separate when the values do not share a durable key set or grouping them would obscure behavior.
- Keep one control's state in simple variables whose names identify the control concept, such as `selectItems`,
  `selectValue`, or `sliderValue`. When several related controls share a durable key set, group each kind of state in an
  object keyed by control name, such as `selectItems.timeframe`, `selectValue.timeframe`, or
  `sliderValue.movingAverageWindow`. Preserve the value type each component expects: selected item objects for `Select`
  and primitives for `Slider`.
- Pass Svelte props as expressions without quotes whenever the value type allows it, such as `radius={1}` instead of `radius="1"`.
- Inline trivial lifecycle callbacks and event handlers when they only assign simple state, including callbacks repeated across a lifecycle registration and Svelte markup. Apply the general single-use guidance to nontrivial handlers: retain a named handler only when its complexity or another concrete reason makes the separation materially useful.
- Declare numbered variables, tokens, and similarly named definitions in ascending numeric order so related values are easy to scan. Do not reorder them around an artificial dependency when each definition can derive directly from the same shared reference; depart from numeric order only when a genuine dependency requires it.
- Write `on:event` handlers as explicit function references or arrow functions, such as `on:click={() => toggleParent(d)}`, rather than a bare call expression like `on:click={toggleParent(d)}`. Svelte 4 only defers a bare call expression to click-time when it can prove every referenced variable is reactive; when it can't, the call runs once at mount instead of on each event, with no compiler warning. An explicit arrow wrapper behaves the same either way and stays correct through refactors that change a variable's reactivity classification.
- Keep the shared focus treatment consistent for native buttons and links and elements with `role="button"` or `role="link"`: pointer or click activation must not leave a visible focus indicator, while keyboard Tab focus must show the shared `ui-focus` outline. Use the global `:focus-visible` treatment instead of adding component-specific focus rings. A clicked control keeps focus, and any later key press, even a screenshot shortcut, makes the browser show the ring on it, so each app calls `releasePointerFocus` from `functions/dom.js` once at its root to blur pointer-generated activation, and the shared stylesheet clears the mobile tap highlight.
- Give enabled links, buttons, and elements with `role="button"` or `role="link"` a pointer cursor whenever their
  component does not already provide one, and keep disabled controls visually distinct with a non-pointer disabled
  cursor.
- Make any element with both a minimum height and padding `box-border`, so the minimum is its whole height rather than
  its content's. A button is already border-box.
- When an anchor opens a new browsing context with `target="_blank"`, pair it with `rel="noopener noreferrer"` so the opened page cannot retain access to the originating window and referrer behavior stays explicit.
- Do not mutate exported Svelte props to control internal component lifecycle. Use local component state, such as mount or one-shot launch flags, for internal gating.
- In Svelte components, order helpers, functions, classes, and derived values before their first practical use where Svelte reactivity allows it. This enforces `no-use-before-define` behavior for `.svelte` files through this convention rather than ESLint, since ESLint's rule produces false positives for component-scope variables in `.svelte` files. During AGENTS alignment, inspect `.svelte` files for call-before-declaration cases and move declarations upward when that does not change behavior.
- Place a component's `export let` prop declarations immediately after its imports, before other component-scope variables, helpers, or logic.
- A store passed to `Select` as `loadItemsStore` must use the same options-object request contract as `createAPIStore`:
  `request({ query, urlParams, body, method })`. Publish the request body as `params` with each result so `Select` can
  reject stale searches, and publish the current page in `data`; `Select` owns accumulation and deduplicates later pages
  by `itemIdentifier`. A boolean `hasMore` is optional but preferred when the source knows whether another page exists.
- Keep a component's own logic inside its `.svelte` file. Do not add a sibling module named after the component, such as
  `carousel.js` beside `Carousel.svelte` or `horizontalBarChart.js` beside `HorizontalBarChart.svelte`, to hold helpers
  that only that component uses. Unit-testability is not a reason to create one: a sidecar covers only the fragment that
  was pulled out, leaves the component behavior it came from untested, and splits one component's logic across two files
  that then drift. Reusable logic belongs in `src/lib/functions/` under a durable concern module per the JavaScript topic, and
  everything else stays in the component, inlined at its call site per the Code Style topic.
- Honor the viewer's reduced-motion preference through `prefersReducedMotion` from `functions/dom.js` in every
  JavaScript-driven transition and animation.

### Styling

- Prefer the fewest DOM elements and CSS styling rules/classes that clearly express the layout and behavior, including Tailwind utilities, component style blocks, inline styles, and global selectors. Avoid adding wrapper `div`s, responsive variants, utility classes, selectors, or declarations unless they solve a concrete structure, spacing, sizing, state, or breakpoint need; remove them when the same result is already provided by an existing parent, child, component prop, inherited style, or browser default. This applies to markup a change leaves behind as much as to markup it adds: when removing or moving an element leaves its wrapper holding a single child, or makes a layout utility on it, such as `justify-between`, `flex-1`, or `items-end`, do nothing, collapse the wrapper into its child or parent and drop the dead utilities in the same change, and position a lone absolutely placed control by its own classes rather than through a wrapper.
- Treat Tailwind utilities as the first choice for static layout, spacing, sizing, typography, and wrapping behavior,
  over component `<style>` blocks, CSS sections, or inline styles. If a Tailwind fix fails, adjust the utility choice
  or markup structure first, including responsive grid placement and arbitrary values such as `basis-[max-content]`.
  Use a component `<style>` block only when Tailwind cannot express the selector, state, or value clearly, do not create
  custom classes solely as styling hooks for static CSS, and reserve Tailwind `!` modifiers for real external or
  host-page CSS override needs.
- Render a genuinely repeated or dynamic list of near-identical elements from a data array through one `{#each}` block,
  per the Shared Code topic, but keep a small fixed set explicit when a loop would need per-item conditionals or styling that
  make it harder to read.

### Mobile Layout

- Do not hide interactive apps behind a desktop-only message unless the experience genuinely cannot be made usable. Prefer a full-width mobile shell with compact spacing, stacked controls, and preserved desktop behavior at the existing desktop breakpoint.
- On mobile, prefer stacking controls, fitting summaries/tables within the viewport, and shortening overly tall chart canvases. Keep horizontal scrolling only inside the chart surface when it is part of the core visualization workflow, such as a long time-series axis; avoid page-level horizontal scrolling.
- Keep responsive Svelte app geometry stable across browser-only zoom changes while still responding to real window
  resizes. Use shared `observeZoomStableViewport` for resize lifecycle management, or `createZoomStableViewport` when
  the caller already owns that lifecycle, if a resize can otherwise feed zoomed viewport dimensions back into an app's
  layout or Canvas coordinate system; continue updating the current device pixel ratio so Canvas rendering remains
  sharp.

### Color Tokens

- Use opaque colors derived from the semantic parent surface for visible UI text, borders, disabled states, hover states,
  and selection states so their appearance does not change when an ancestor background changes. Prefer live
  `color-mix()` values based on tokens such as `--ui-surface`, or runtime contrast calculation when readability requires
  choosing a foreground from the computed background. Reserve alpha colors and Tailwind opacity utilities for intentional
  compositing, including visibility, fades, shadows, and visualization layers that are meant to reveal content underneath.
- When a hard-coded hexadecimal color is the same value as a global CSS custom property from
  `src/lib/static/styles/root.css`, use the custom property instead of duplicating the literal. In direct component
  styling, keep a concrete fallback when scoped embedded apps need it, such as `var(--ui-text, #33413f)`.
- Use `ui-text` for normal UI and chart text:
  - This includes Select values, searchable input text, ordinary option text, and tooltip text; reserve `ui-control`
    for control chrome and icons rather than body copy.
  - Axis labels and titles
  - Forecast or reference labels
  - Legend labels and empty-state symbols
- Use the shared semantic `ui-*` and `chart-*` Tailwind classes and CSS custom properties for colors owned by
  `svelte-lib`, and the `brand`, `link`, `success`, `ui-focus`, and `ui-selection` roles for shared accents and
  interaction states. Do not recreate numbered palettes, such as the removed `theme-*` palette, `themegray-*` aliases,
  or generic gray/slate/neutral substitutions for shared roles. Retain a built-in utility only when the color is
  genuinely local to the consuming application.
- Preserve specialized text roles for muted, disabled, inverse, and control text. Preserve data-encoding colors for chart marks and legend swatches.
- Host-specific palette integration belongs in the consuming repository at the embedded app root. Map the host's palette variables to the shared semantic tokens there, using CSS variable references rather than resolved color values so runtime palette changes continue to update already rolled-up bundles.
<!-- /inherit: svelte-lib/svelte-components -->

<!-- inherit: svelte-lib/packages-and-config -->
## Packages And Config

### Shared Consumer Config

- Keep reusable build behavior in shared config exports. The shared Vite helper owns importing `@sveltejs/kit/vite`, keeps linked local `svelte-lib` development working, and preserves app-level server overrides; consuming apps should call exported helpers such as `createViteConfig()` and `createRollupConfig({ scopeClass })` instead of carrying project-local copies of shared setup. A plain Vite single-page app with no SvelteKit routes calls `createViteConfig({ kit: false })` rather than forking the config to drop the SvelteKit plugin. Keep every local shared-config file, including build, lint, format, and styling config, a thin wrapper around the package export. Add an app-local override only for a durable app-specific need, and fix a shared config issue in `svelte-lib` rather than replacing the thin re-export.
- Keep a consumer's `tailwindConfigPath` on a CommonJS file. `createRollupConfig` loads it with `require()`, so an ESM
  config either throws on a runtime that cannot require it, or arrives as a namespace object whose configuration sits
  under `default`. Merging that namespace keeps the shared baseline intact and silently ignores every consumer
  customization instead of failing, so the bundle builds and only the consumer's own tokens go missing.

### Package Imports

- Import shared components, charts, icons, functions, and stores from the narrowest public `svelte-lib` package subpath that owns them. Do not import from aggregate barrels such as `svelte-lib/components`, `svelte-lib/components/charts`, `svelte-lib/components/charts/cards`, `svelte-lib/components/icons`, or `svelte-lib/functions`; the shared ESLint config enforces these consumer-facing boundaries because loading one shared primitive must not evaluate unrelated primitives or optional heavy dependencies. Apply the same rule to imports between modules inside `svelte-lib`, while retaining aggregate exports only as a compatibility surface for external consumers that have not migrated yet.
- Consuming app Rollup entry files should import shared CSS and other package assets through package exports, not through `node_modules/svelte-lib/src/...` source paths. Exports must point only to files included in the published or packed output.
- Consuming Rollup-bundled code should avoid SvelteKit-only aliases such as `$lib` unless the shared Rollup config explicitly supports them. Prefer relative imports for package/library code and embedded bundle entries.

### Dependency Ownership

- Keep package dependencies owned by the package that imports them: `svelte-lib` should list only packages it imports directly or needs for exported shared config/build/lint/format/package/check tooling, while app-only runtime dependencies belong in the consuming app's `package.json`.
- When a package uses D3 functionality, depend on and import its specific `d3-*` subpackages rather than the umbrella `d3` package.
- Every consuming repository needs its own `.npmrc` containing exactly `engine-strict=true` and `install-links=true`. npm reads `.npmrc` only from the project directory, the user home directory, and the global config, so this cannot be inherited from `svelte-lib` and has to be duplicated per repo. `install-links=true` is the load-bearing setting: it makes npm materialize the `file:` dependency as a real package so `svelte-lib`'s dependencies and their `.bin` entries land in the consumer's tree. Under `install-links=false` npm symlinks instead, nothing is hoisted, and the consumer is forced to redeclare shared build, lint, format, and check tooling it should be inheriting.
- Consuming repositories must not declare a `devDependencies` block for tooling `svelte-lib` already provides. With `install-links=true` that tooling is inherited, and redeclaring it duplicates version pins across every consumer and lets them drift from the library. A consumer that appears to need its own tooling has an `.npmrc` or lockfile problem to fix, not a dependency to add.
- Do not add `resolution-mode` to an `.npmrc`. It is a pnpm setting; npm reports it as an unknown project config and warns that it will stop working in the next major version.
- Keep link-local tooling and relative `file:` dependency specs aligned with the sibling checkouts. After `svelte-lib`'s
  dependency metadata changes, reinstall or refresh the linked dependency and the consumer's lockfile before
  validating it.
<!-- /inherit: svelte-lib/packages-and-config -->

<!-- inherit: svelte-lib/embedded-bundles -->
## Embedded Bundles

- Consuming embedded apps should keep Rollup entrypoints small and explicit: create the scoped app wrapper, mount the app component, and document app-specific entrypoint names or wrapper classes locally only when they are not obvious from the code.
- `mountEmbeddedRoot` adds the shared `svelte-lib-app` class alongside each consumer-specific class. Host palette mappings that apply to every embedded app should target that shared root instead of enumerating consumers.
- Components rendered inside Rollup-scoped embedded apps must not depend on resolving theme variables from `document.body` or global `:root` for direct visual styling. The shared Rollup config can scope `:root` variables onto the app wrapper, so prefer CSS custom properties directly in DOM/CSS values with concrete fallbacks, such as `var(--ui-surface-alt, #f2f2f2)`. When a JavaScript rendering API requires a resolved color, pass the mounted component or app root to `getCSSCustomProperty` instead of reading from `document.body`.
- Tooltip portal behavior should support scoped embedded apps via `[data-svelte-lib-tooltip-root]`; keep the default tooltip root inside the closest app container so scoped styles continue to apply, and avoid solving scoped Tailwind portal issues with broad global CSS.
- Tooltip and overlay positioning must work inside embedded pages with scroll. Prefer document coordinates such as `pageX`/`pageY` with scroll-aware clamping and stable inline positioning over viewport-only `clientX`/`clientY` plus `position: fixed`.
- Run the package's `rollup` script when a change must reach the hosted bundle, and check the bundle outputs its
  `AGENTS.md` documents.
<!-- /inherit: svelte-lib/embedded-bundles -->

<!-- inherit: svelte-lib/jekyll-hosting -->
## Jekyll Hosting

- Mirror the GitHub Pages paths an embedded app is hosted under with source-app routing. Keep route components under
  `src/routes`, and use `src/routes/+page.svelte` as the app navigation hub unless the app has a durable reason for a
  different structure. Derive each route's path variants from one helper rather than repeating the project slug in
  every `Route` declaration: the extensionless route, the Jekyll `.html` shell page, and, for the project home route,
  the directory and index forms. For example, derive `/my_project/tool` and `/my_project/tool.html`, and `/my_project`,
  `/my_project/`, and `/my_project/index.html`.
- Make a shell page's bundle prefix configurable through a shared include or site variable rather than hard-coding
  staging and production paths in each page, since the shared Rollup workflow names live and staged `dev_bundle.*`
  uploads by branch. Leave a public production config's prefix blank unless staged bundles are intentionally under
  review on the live shell route.
- Keep Jekyll shell pages lightweight: front matter, page-specific host layout/full-width options, the compiled bundle
  CSS link, and the compiled bundle script tag. Change behavior, routes, and app-scoped styles in the source Svelte
  app, then rebuild and upload its bundle. Never patch a generated bundle or duplicate route content in Jekyll.
- A bundle's scoped Tailwind CSS applies only below its app wrapper. Style the Jekyll page around it with page, inline,
  or global site CSS.
- Do not use manually configured S3 asset version variables in Jekyll shell pages. Query-string cache busters are fine
  when a shared include derives them automatically from Jekyll build metadata such as `site.time`, or at runtime when
  a development config enables a strategy such as `s3_bundle_cache_bust_strategy: runtime`. Keep automatic cache busting scoped to
  mutable bundle assets by default, provide a config switch between runtime and build-time strategies, and make upload tooling set
  `Cache-Control: no-cache, max-age=0, must-revalidate` so direct S3 visits still revalidate same-name uploads.
- When a Rollup app renders differently inside a Jekyll host, compare computed styles and element geometry at the same viewport to identify the winning host declarations. Keep intrinsic component layout and spacing in the source app; compensate only for host-introduced cascade differences with narrowly page-scoped Jekyll CSS, preserving explicitly accepted host effects such as borders or alternating row colors. When existing Tailwind classes or other source-app CSS declarations serve only to counter Jekyll rendering differences, identify them during related work, move that compensation to the narrowly scoped Jekyll CSS, and remove the obsolete source styling after verifying both render paths. Verify the standalone and hosted geometry after the override rather than copying broad reset rules into either repository.
- Project home content embedded above Jekyll project pagination should reserve bottom space in the source app, matching the existing `mb-8` route or root wrapper convention rather than relying on host-page pager margins.
<!-- /inherit: svelte-lib/jekyll-hosting -->

<!-- inherit: svelte-lib/web-pages -->
## Web Pages

### Search Metadata

- Keep public search metadata truthful and consistent with visible content, including page titles, descriptions,
  canonical URLs, social previews, web app manifests, and structured data. Give every indexable page a distinct title,
  a description of what it shows, and its own indexing decision. Keep account, contact, error, settings,
  navigation-hub, and duplicate-variant pages out of search unless their purpose changes.
- Never add hidden, transparent, off-screen, zero-size, or `sr-only` copy for search engines. `sr-only` text remains for
  accessibility labels and equivalents. Search copy must be visible to an ordinary visitor in the same state, though
  state-based personalization is allowed. An embedded app's search copy belongs in its source repository, not its host
  page.

### User-Facing Copy

- Translate failures at every user-facing boundary into concise language that says what failed, what the viewer can do
  next, and any genuinely useful alternative. Never display raw exception messages, stack traces, selector names,
  database or infrastructure details, provider payloads, or unexplained HTTP status codes. Preserve diagnostic detail
  only in credential-safe developer logs, and add regression coverage when a new external failure can reach the UI.
- Never put build, deployment, configuration, or rollout state in visible copy, such as "unavailable in this build",
  "not configured", "coming soon", or a feature flag's name. When a build lacks an optional integration, hide its
  controls and give the guidance a viewer could act on without it, as though the feature did not exist. Gate pre-launch
  states in code, never with visible placeholder text.
<!-- /inherit: svelte-lib/web-pages -->
