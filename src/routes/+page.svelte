<script>
  import { Button } from "svelte-lib/components"
</script>

<div class="flex flex-col items-center mt-2 mb-8">
  <Button classes="w-48" href="play" label="Play Game" />
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-1 gap-y-2 mt-2">
    <Button classes="w-48" href="development" label="Development" />
    <Button classes="w-48" href="instructions" label="Instructions" />
  </div>
</div>
