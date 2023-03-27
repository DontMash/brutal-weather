<script lang="ts">
  import WeatherForecast from './lib/WeatherForecast.svelte';
  import Footer from './lib/Footer.svelte';
</script>

<main class="flex min-h-screen items-center justify-center">
  <section>
    <h1 class="sr-only">Weather Forecast</h1>

    <WeatherForecast />
  </section>
</main>
<Footer />
