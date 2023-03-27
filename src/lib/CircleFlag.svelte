<script lang="ts">
  export let country: string;
  export let country_code: string;
</script>

<img
  class="w-8"
  src={`https://hatscripts.github.io/circle-flags/flags/${country_code.toLowerCase()}.svg`}
  width="48"
  height="48"
  alt={country}
/>
