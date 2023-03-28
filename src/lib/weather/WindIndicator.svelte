<script lang="ts">
  import { onMount } from 'svelte';
  import ArrowUpAltIcon from '../icons/ArrowUpAltIcon.svelte';

  export let windspeed: number;
  export let winddirection: number;

  type WinddirectionTitle = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

  $: winddirection_title = getTitle(winddirection);
  let winddirection_icon_element: HTMLElement;

  const getTitle = (direction: number): WinddirectionTitle => {
    if (direction >= 337.5 && direction < 22.5) return 'N';
    if (direction >= 22.5 && direction < 67.5) return 'NE';
    if (direction >= 67.5 && direction < 112.5) return 'E';
    if (direction >= 112.5 && direction < 157.5) return 'SE';
    if (direction >= 157.5 && direction < 202.5) return 'S';
    if (direction >= 202.5 && direction < 247.5) return 'SW';
    if (direction >= 247.5 && direction < 292.5) return 'W';
    if (direction >= 292.5 && direction < 337.5) return 'NW';
  };

  onMount(() => {
    winddirection_icon_element.style.setProperty(
      '--direction',
      `${winddirection.toString()}deg`
    );
  });
</script>

<figure class="flex flex-col items-center">
  <div class="direction-rotate h-16 w-16" bind:this={winddirection_icon_element}>
    <ArrowUpAltIcon />
  </div>
  <small>
    {winddirection_title} - {windspeed} km/h
  </small>
</figure>

<style lang="postcss">
  .direction-rotate {
    transform: rotateZ(var(--direction, 0deg));
  }
</style>
