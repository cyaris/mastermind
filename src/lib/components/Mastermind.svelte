<script>
  import { Text } from "svelte-lib/components"
</script>

<div>
  <svg class="w-full inline-block" width={100} height={100}>
    <Text
      classes="text-right fill-red-200"
      overflowBody={false}
      wrapBody={false}
      width={100}
      height={100}
      bodyPadding={{ top: 10, right: 0, bottom: 0, left: 0 }}
      bodyText="hi there, is this thing on?"
    />
  </svg>
</div>
