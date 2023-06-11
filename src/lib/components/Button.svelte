<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Color } from './button';

  export let name: string;
  export let color: Color = 'primary';

  const dispatch = createEventDispatcher();

  const colorVariations: Record<Color, string> = {
    primary: 'hover:bg-amber-400 focus-visible:bg-amber-400',
    secondary: 'hover:bg-sky-400 focus-visible:bg-sky-400',
  };
</script>

<button
  class={`${colorVariations[color]} hover:bold-shadow focus-visible:bold-shadow relative h-10 w-10 rounded-lg bg-neutral-800 fill-slate-100 p-1 transition after:absolute after:top-0 after:left-0 after:hidden after:h-[calc(100%_+_0.25rem)] after:w-[calc(100%_+_0.25rem)] after:rounded-[inherit] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:fill-neutral-800 hover:after:block focus:outline-none focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:fill-neutral-800`}
  aria-label={name}
  on:click={() => dispatch('click')}
>
  <slot>Button</slot>
</button>
