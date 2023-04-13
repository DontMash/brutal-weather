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
  <div class="flex grow flex-col items-center justify-center space-y-2 px-2 text-center">
    <strong class="text-8xl leading-none">
      {forecast.current_weather.temperature}°
    </strong>
    <time class="leading-none" datetime={dateString}>{dateString}</time>
  </div>
  <div class="grid w-full grid-cols-5 divide-x-2 divide-neutral-800">
    <div
      class="col-span-3 flex flex-col justify-center bg-sky-300 p-2 text-neutral-800"
    >
      <h2 class="flex flex-col space-y-1 text-2xl">
        <LocationTitle {location}>@</LocationTitle>
        <slot />
      </h2>
    </div>
    <div
      class="col-span-2 flex flex-col items-center justify-center bg-amber-300 fill-neutral-800 p-2"
    >
      <WindIndicator
        winddirection={forecast.current_weather.winddirection}
        windspeed={forecast.current_weather.windspeed}
      />
      <span class="text-sm leading-none">
        Elev. / {forecast.elevation} m
      </span>
    </div>
  </div>
</div>
