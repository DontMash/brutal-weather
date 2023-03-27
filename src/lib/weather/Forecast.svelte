<script lang="ts">
  import LocationTitle from './LocationTitle.svelte';
  import WindIndicator from './WindIndicator.svelte';

  import type { Forecast } from './forecast.types';
  import type { Location } from './geocoding.types';

  export let forecast: Forecast;
  export let location: Partial<Location>;

  $: dateString = new Date(forecast.current_weather.time).toLocaleDateString();
</script>

<div class="flex h-full flex-col items-center divide-y-2 divide-neutral-800">
  <div class="flex grow items-center justify-center px-2">
    <strong class="text-center text-8xl leading-none">
      {forecast.current_weather.temperature}°
    </strong>
  </div>
  <div class="grid w-full grid-cols-2 divide-x-2 divide-neutral-800">
    <div class="flex flex-col justify-center bg-sky-300 px-2 py-1">
      <time class="leading-none" datetime={dateString}>{dateString}</time>
      <h2 class="text-2xl leading-none">
        @<LocationTitle {location} />
      </h2>
    </div>
    <div class="bg-amber-300 fill-neutral-800 px-2 py-1">
      <WindIndicator
        winddirection={forecast.current_weather.winddirection}
        windspeed={forecast.current_weather.windspeed}
      />
    </div>
  </div>
</div>
