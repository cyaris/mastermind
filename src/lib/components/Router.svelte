<script>
  import { Router, Route } from "svelte-routing"

  import App from "./App.svelte"
  import Home from "../../routes/+page.svelte"
  import Development from "../../routes/development/+page.svelte"
  import Instructions from "../../routes/instructions/+page.svelte"
  import Play from "../../routes/play/+page.svelte"
  import Level1 from "../../routes/play/level_1/+page.svelte"
  import Level2 from "../../routes/play/level_2/+page.svelte"
  import Level3 from "../../routes/play/level_3/+page.svelte"
  import Level4 from "../../routes/play/level_4/+page.svelte"

  // import "svelte-lib/styles/root.css"
  // import "svelte-lib/styles/app.css"
</script>

<main>
  <Router base="/">
    <Route path="/mastermind" component={Home} />
    <Route path="/mastermind/development" component={Development} />
    <Route path="/mastermind/instructions" component={Instructions} />
    <Route path="/mastermind/play" component={Play} />
    <Route path="/mastermind/play/level_1" component={Level1} />
    <Route path="/mastermind/play/level_2" component={Level2} />
    <Route path="/mastermind/play/level_3" component={Level3} />
    <Route path="/mastermind/play/level_4" component={Level4} />
  </Router>
</main>
