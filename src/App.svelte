<script lang="ts">
  import Toaster from './lib/toast/Toaster.svelte';
  import Weather from './lib/weather/Weather.svelte';
  import Footer from './lib/page/Footer.svelte';
</script>

<main class="flex min-h-screen flex-col items-center justify-center">
  <div class="fixed top-12 left-1/2 -translate-x-1/2">
    <Toaster />
  </div>

  <section class="relative">
    <h1 class="sr-only">Weather Forecast</h1>
    <Weather />
  </section>
</main>
<Footer />
