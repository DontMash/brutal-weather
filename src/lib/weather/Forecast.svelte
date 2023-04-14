<script lang="ts">
  import LocationTitle from './LocationTitle.svelte';
  import WeatherStatus from './WeatherStatus.svelte';
  import WindIndicator from './WindIndicator.svelte';

  import type { Forecast } from './forecast';
  import type { Location } from './geocoding';

  export let forecast: Forecast;
  export let location: Partial<Location>;

  $: dateString = new Date(forecast.current_weather.time).toLocaleString().slice(0, -3);
</script>

<div class="flex h-full flex-col items-center divide-y-2 divide-neutral-800">
  <div class="flex grow flex-col items-center justify-center space-y-2 p-2 text-center">
    <strong class="text-8xl leading-none">
      {forecast.current_weather.temperature}°
    </strong>
    <time class="text-lg leading-none" datetime={dateString}>{dateString}</time>
  </div>
  <div class="grid w-full grid-cols-2 divide-x-2 divide-neutral-800">
    <div class="flex flex-col items-center justify-center bg-neutral-800 p-2">
      <WeatherStatus code={forecast.current_weather.weathercode} />
    </div>
    <div
      class="flex flex-col items-center justify-center bg-amber-300 fill-neutral-800 p-2"
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
  <div class="flex w-full divide-x-2 divide-neutral-800 bg-sky-300 text-neutral-800">
    <div class="flex grow items-center p-2">
      <h2 class="flex flex-col space-y-1 text-2xl">
        <LocationTitle {location}>@</LocationTitle>
      </h2>
    </div>
    <div class="flex items-center p-2">
      <slot />
    </div>
  </div>
</div>
