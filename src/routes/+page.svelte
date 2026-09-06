<script>
  import LinkButton from "svelte-lib/components/LinkButton"
</script>

<div class="mb-8 flex min-h-[22vh] flex-col items-center justify-center">
  <LinkButton classes="w-48" href="/mastermind/play" label="Play Game" />
  <div class="mt-2 grid grid-cols-1 gap-x-1 gap-y-2 sm:grid-cols-2">
    <LinkButton classes="w-48" href="/mastermind/development" label="Development" />
    <LinkButton classes="w-48" href="/mastermind/instructions" label="Instructions" />
  </div>
</div>
