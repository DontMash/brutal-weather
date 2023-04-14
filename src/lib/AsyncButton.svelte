<script lang="ts">
  import Button from './Button.svelte';

  import { createEventDispatcher } from 'svelte';
  import type { Color } from './button';

  const ANIMATION_DURATION: number = 300;
  const dispatch = createEventDispatcher();

  export let color: Color = 'primary';
  export let loading: boolean = false;

  export const getAnimationDuration = (): number => ANIMATION_DURATION;
</script>

<div
  class="flex data-[loading=true]:pointer-events-none data-[loading=true]:animate-spin-fast"
  data-loading={loading}
>
  <Button {color} on:click={() => dispatch('click')}>
    <slot>Button</slot>
  </Button>
</div>
