<script lang="ts">
  import type { ComponentType } from 'svelte';
  import ClearWeatherIcon from '../icons/weather/ClearWeatherIcon.svelte';
  import CloudyWeatherIcon from '../icons/weather/CloudyWeatherIcon.svelte';
  import OvercastWeatherIcon from '../icons/weather/OvercastWeatherIcon.svelte';
  import FoggyWeatherIcon from '../icons/weather/FoggyWeatherIcon.svelte';
  import DrizzleWeatherIcon from '../icons/weather/DrizzleWeatherIcon.svelte';
  import FreezingDrizzleWeatherIcon from '../icons/weather/FreezingDrizzleWeatherIcon.svelte';
  import RainWeatherIcon from '../icons/weather/RainWeatherIcon.svelte';
  import FreezingRainWeatherIcon from '../icons/weather/FreezingRainWeatherIcon.svelte';
  import SnowFallWeatherIcon from '../icons/weather/SnowFallWeatherIcon.svelte';
  import SnowGrainsWeatherIcon from '../icons/weather/SnowGrainsWeatherIcon.svelte';
  import RainShowerWeatherIcon from '../icons/weather/RainShowerWeatherIcon.svelte';
  import SnowShowerWeatherIcon from '../icons/weather/SnowShowerWeatherIcon.svelte';
  import ThunderstormWeatherIcon from '../icons/weather/ThunderstormWeatherIcon.svelte';
  import ThunderstormHailWeatherIcon from '../icons/weather/ThunderstormHailWeatherIcon.svelte';

  import { getWeatherStatus, WeatherStatus, type WeatherCode } from './forecast';

  export let code: WeatherCode;

  $: status = getWeatherStatus(code);

  const weatherVariants: Record<WeatherStatus, ComponentType> = {
    [WeatherStatus.Clear]: ClearWeatherIcon,
    [WeatherStatus.Cloudy]: CloudyWeatherIcon,
    [WeatherStatus.Overcast]: OvercastWeatherIcon,
    [WeatherStatus.Foggy]: FoggyWeatherIcon,
    [WeatherStatus.Drizzle]: DrizzleWeatherIcon,
    [WeatherStatus.FreezingDrizzle]: FreezingDrizzleWeatherIcon,
    [WeatherStatus.Rain]: RainWeatherIcon,
    [WeatherStatus.FreezingRain]: FreezingRainWeatherIcon,
    [WeatherStatus.SnowFall]: SnowFallWeatherIcon,
    [WeatherStatus.SnowGrains]: SnowGrainsWeatherIcon,
    [WeatherStatus.RainShower]: RainShowerWeatherIcon,
    [WeatherStatus.SnowShower]: SnowShowerWeatherIcon,
    [WeatherStatus.Thunderstorm]: ThunderstormWeatherIcon,
    [WeatherStatus.ThunderstormHail]: ThunderstormHailWeatherIcon,
  };
</script>

<figure>
  <svelte:component this={weatherVariants[status]} />
</figure>
