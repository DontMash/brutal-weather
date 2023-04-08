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
  import type { Forecast } from './weather/forecast.types';
  import { getForecast } from './weather/forecast.service';
  import { getLocations } from './weather/geocoding.service';
  import ShareIcon from './icons/ShareIcon.svelte';

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
    const search = event.detail.value.trim();
    const request = getLocations(search);
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
  const onShare = (event: Event) => {
    const element = event.currentTarget as HTMLElement;
    element.dataset.loading = true.toString();

    const params = new URLSearchParams({
      id: currentLocation.id.toString(),
      name: currentLocation.name,
    });
    const url = new URL(window.location.origin);
    url.search = params.toString();

    navigator.clipboard.writeText(url.href).then(() =>
      setTimeout(() => {
        element.dataset.loading = false.toString();
      }, 1000)
    );
  };

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    const id = +params.get('id');
    const name = params.get('name');
    if (id && name) {
      const location = (await getLocations(name)).find((location) => location.id === id);
      if (!location) return errorStore.update(() => 'Unknown location request');

      onSearchSelect(location);
    } else {
      getGeolocation();
    }
  });
</script>

<figure
  class="bold-shadow relative flex h-96 w-[21rem] flex-col overflow-hidden rounded-xl border-2 border-neutral-800 bg-slate-100"
>
  <InputHeader on:change={onSearch} on:geolocation={() => getGeolocation()} />

  <div class="grow overflow-y-auto overflow-x-hidden">
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
        <ForecastComponent {forecast} location={currentLocation}>
          {#if currentLocation.id}
            <button
              class="hover:bold-shadow focus-visible:bold-shadow h-10 w-10 rounded-md bg-neutral-800 fill-slate-100 p-1 transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-amber-400 hover:fill-neutral-800 focus:outline-none focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:bg-amber-400 focus-visible:fill-neutral-800 data-[loading=true]:pointer-events-none data-[loading=true]:animate-spin"
              on:click={onShare}
            >
              <ShareIcon />
            </button>
          {/if}
        </ForecastComponent>
      {:catch error}
        <Error reason={error} />
      {/await}
    {/if}
  </div>
</figure>
