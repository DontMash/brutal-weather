<script lang="ts">
  import type { Location } from './geocoding.types';

  export let location: Partial<Location>;
</script>

<span class="font-medium leading-none">
  <slot />{location.name}
</span>
<small class="text-[0.75em] leading-none">
  {#if location.admin1}
    {location.admin1}
  {/if}
  {#if location.admin3}
    - {location.admin3}
  {/if}
</small>
