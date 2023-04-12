<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Color } from './button.types';

  export let color: Color = 'primary';

  const dispatch = createEventDispatcher();

  const colorVariations: Record<Color, string> = {
    primary: 'hover:bg-sky-400 focus-visible:bg-sky-400',
    secondary: 'hover:bg-amber-400 focus-visible:bg-amber-400',
  };
</script>

<button
  class={`${colorVariations[color]} hover:bold-shadow focus-visible:bold-shadow h-10 w-10 rounded-lg bg-neutral-800 fill-slate-100 p-1 transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:fill-neutral-800 focus:outline-none focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:fill-neutral-800`}
  on:click={() => dispatch('click')}
>
  <slot>Button</slot>
</button>
