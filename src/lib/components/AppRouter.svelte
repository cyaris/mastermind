<script>
  import { Router, Route } from "svelte-routing"
  import Home from "./Home.svelte"
  import App from "./App.svelte"

  const currentPageBase = window.location.pathname.split("/")[1] || ""

  console.log(currentPageBase)
</script>

<main>
  <!-- Use the dynamically calculated base -->
  <Router base={currentPageBase}>
    <Route path="/" component={Home} />
    <Route path="/test" component={App} />
  </Router>
</main>
