<script>
  import { Router, Route } from "svelte-routing"
  import Home from "./Home.svelte"
  import App from "./App.svelte"

  const subpage = window.location.pathname.split("/")[1] || ""

  console.log(subpage)
</script>

<main>
  <Router base={subpage}>
    <Route path="/" component={Home} />
    <Route path="/play" component={App} />
  </Router>
</main>
