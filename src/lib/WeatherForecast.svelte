<script lang="ts">
  import InputHeader from './InputHeader.svelte';
  import LocationSearchResults from './weather/LocationSearchResults.svelte';
  import ForecastComponent from './weather/Forecast.svelte';
  import Error from './Error.svelte';
  import Loading from './Loading.svelte';

  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { State } from './app.types';
  import type { Location } from './weather/geocoding.types';
  import type { Forecast } from './/weather/forecast.types';
  import { getForecast } from './weather/forecast.service';
  import { getLocations } from './weather/geocoding.service';

  const stateStore = writable<State>(State.Search);
  const errorStore = writable<string>();
  errorStore.subscribe((reason) => {
    if (!reason) return;

    stateStore.update(() => State.Error);
  });
  const locationsStore = writable<Promise<Array<Location>>>();
  locationsStore.subscribe((request) => {
    if (!request) return;

    stateStore.update(() => State.Search);
    request.catch((reason) => errorStore.update(() => reason));
  });
  const forecastStore = writable<Promise<Forecast>>();
  forecastStore.subscribe((request) => {
    if (!request) return;

    stateStore.update(() => State.Result);
    request.catch((reason) => errorStore.update(() => reason));
  });
  let currentLocation: Partial<Location> = { name: 'Your location' };

  const onSearch = (event: CustomEvent) => {
    const request = getLocations(event.detail.value);
    locationsStore.update(() => request);
  };
  const onSearchSelect = (location: Location) => {
    currentLocation = location;
    forecastStore.update(() => getForecast(location.latitude, location.longitude));
  };
  const getGeolocation = () => {
    const request = new Promise<Forecast>((resolve, reject) => {
      if (!navigator.geolocation)
        return reject('Your browser does not support geolocation');

      const success = (position: GeolocationPosition) => {
        currentLocation = {
          name: 'Your location',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        resolve(getForecast(position.coords.latitude, position.coords.longitude));
      };
      const error = () => reject('Unable to get your location (blocked)');

      navigator.geolocation.getCurrentPosition(success, error);
    });

    forecastStore.update(() => request);
  };

  onMount(() => {
    getGeolocation();
  });
</script>

<figure
  class="bold-shadow relative flex h-96 w-[21rem] flex-col overflow-hidden rounded-xl border-2 border-neutral-800 bg-slate-100"
>
  <InputHeader on:change={onSearch} on:geolocation={() => getGeolocation()} />

  <div class="h-full overflow-x-hidden overflow-y-scroll">
    {#if $stateStore === State.Error}
      <Error reason={$errorStore} />
    {/if}

    {#if $stateStore === State.Search}
      {#await $locationsStore}
        <div class="flex h-full items-center justify-center">
          <Loading />
        </div>
      {:then locations}
        {#if locations}
          <LocationSearchResults
            {locations}
            on:value={(event) => onSearchSelect(event.detail.value)}
          />
        {/if}
      {:catch error}
        <Error reason={error} />
      {/await}
    {/if}

    {#if $stateStore === State.Result}
      {#await $forecastStore}
        <div class="flex h-full items-center justify-center">
          <Loading />
        </div>
      {:then forecast}
        <ForecastComponent {forecast} location={currentLocation} />
      {:catch error}
        <Error reason={error} />
      {/await}
    {/if}
  </div>
</figure>
