<script>
  import { marked } from "marked"

  let content = `
      ### Level 1

      - 4 color code
      - 6 possible colors
      - 8 guesses

      ### Level 2

      - 4 color code
      - 8 possible colors
      - 8 guesses

      ### Level 3

      - 5 color code
      - 6 possible colors
      - 9 guesses

      ### Level 3

      - 5 color code
      - 6 possible colors
      - 9 guesses

      ### Level 4

      - 5 color code
      - 8 possible colors
      - 10 guesses`

  let markdown = marked(content)
</script>

<div>
  <a href="../play/level_1">Level 1</a>
  <a href="../play/level_2">Level 2</a>
</div>
<div>
  <a href="../play/level_3">Level 3</a>
  <a href="../play/level_4">Level 4</a>
</div>
<div class="flex flex-col items-center pt-5">
  <h2>Levels Overview</h2>
  {@html markdown}
</div>
