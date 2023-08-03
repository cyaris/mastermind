<script>
  import { Mastermind } from "$lib/components"
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Mastermind
  classes="text-right fill-red-200"
  overflowBody={false}
  wrapBody={false}
  height={100}
  width={100}
  bodyPadding={{ top: 10, right: 0, bottom: 0, left: 0 }}
  bodyText="hi there, is this thing on?"
/>
