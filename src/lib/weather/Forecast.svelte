<script lang="ts">
  import LocationTitle from './LocationTitle.svelte';
  import WindIndicator from './WindIndicator.svelte';

  import type { Forecast } from './forecast.types';
  import type { Location } from './geocoding.types';

  export let forecast: Forecast;
  export let location: Partial<Location>;
    
  $: dateString = new Date(forecast.current_weather.time).toLocaleString().slice(0, -3);
</script>

<div class="flex h-full flex-col items-center divide-y-2 divide-neutral-800">
  <div class="flex grow flex-col items-center justify-center px-2 text-center space-y-2">
    <strong class="text-8xl leading-none">
      {forecast.current_weather.temperature}°
    </strong>
    <time class="leading-none" datetime={dateString}>{dateString}</time>
    <slot />
  </div>
  <div class="grid w-full grid-cols-3 divide-x-2 divide-neutral-800">
    <div class="col-span-2 flex flex-col justify-center bg-sky-300 px-2 py-1">
      <h2 class="flex flex-col text-2xl space-y-1">
        <LocationTitle {location}>@</LocationTitle>
      </h2>
    </div>
    <div class="flex items-center justify-center bg-amber-300 fill-neutral-800 px-2 py-1">
      <WindIndicator
        winddirection={forecast.current_weather.winddirection}
        windspeed={forecast.current_weather.windspeed}
      />
    </div>
  </div>
</div>
