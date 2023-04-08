<script lang="ts">
  import type { Location } from './geocoding.types';

  export let location: Partial<Location>;
</script>

<span class="leading-none">
  <slot />{location.name}
</span>
<span class="font-light text-[80%] leading-none text-slate-400">
  {#if location.admin1}
    {location.admin1}
  {/if}
  {#if location.admin3}
    - {location.admin3}
  {/if}
</span>
