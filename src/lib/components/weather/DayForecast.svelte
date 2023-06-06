<script lang="ts">
  import WeatherStatus from './WeatherStatus.svelte';
  
  import type { Forecast } from '$lib/weather/forecast';

  export let forecast: Forecast;
</script>

<ul class="flex w-full bg-neutral-800 overflow-x-auto text-slate-100">
    {#each forecast.hourly.time as time, index}
      {@const hourly = forecast.hourly}
      {@const dateString = new Date(time).toLocaleTimeString().slice(0, -3)}
      <li class="flex flex-col">
        <div class="flex flex-col items-center justify-center p-2">
          <WeatherStatus
            code={hourly.weathercode[index]}
            daytime={hourly.is_day[index]}
          />
        </div>
        {hourly.temperature_2m[index]}
        {hourly.apparent_temperature[index]}
        <time class="text-lg leading-none" datetime={dateString}>{dateString}</time>
      </li>
    {/each}
  </ul>
