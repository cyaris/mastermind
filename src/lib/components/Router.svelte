<script>
  import { createShellPaths } from "svelte-lib/functions/routing"
  import { Route, Router } from "svelte-routing"

  import Home from "../../routes/+page.svelte"
  import Development from "../../routes/development/+page.svelte"
  import Instructions from "../../routes/instructions/+page.svelte"
  import Play from "../../routes/play/+page.svelte"
  import Level1 from "../../routes/play/level_1/+page.svelte"
  import Level2 from "../../routes/play/level_2/+page.svelte"
  import Level3 from "../../routes/play/level_3/+page.svelte"
  import Level4 from "../../routes/play/level_4/+page.svelte"

  let shellPaths = createShellPaths("/mastermind")

  let routes = [
    { paths: shellPaths(), component: Home },
    { paths: shellPaths("/development"), component: Development },
    { paths: shellPaths("/instructions"), component: Instructions },
    { paths: shellPaths("/play"), component: Play },
    { paths: shellPaths("/play/level_1"), component: Level1 },
    { paths: shellPaths("/play/level_2"), component: Level2 },
    { paths: shellPaths("/play/level_3"), component: Level3 },
    { paths: shellPaths("/play/level_4"), component: Level4 }
  ]
</script>

<main>
  <Router>
    {#each routes as { paths, component }}
      {#each paths as path}
        <Route {path} {component} />
      {/each}
    {/each}
  </Router>
</main>
