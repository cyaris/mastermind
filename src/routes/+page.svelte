<script>
  import { Button } from "svelte-lib/components"
</script>

<div class="mb-8 flex flex-col items-center">
  <Button classes="w-48" href="/mastermind/play" label="Play Game" />
  <div class="mt-2 grid grid-cols-1 gap-x-1 gap-y-2 sm:grid-cols-2">
    <Button classes="w-48" href="/mastermind/development" label="Development" />
    <Button classes="w-48" href="/mastermind/instructions" label="Instructions" />
  </div>
</div>
