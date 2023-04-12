<script lang="ts">
  import InputHeader from '../InputHeader.svelte';
  import ErrorComponent from '../page/Error.svelte';
  import SearchState from './SearchState.svelte';
  import FavoritesState from './FavoritesState.svelte';
  import ResultState from './ResultState.svelte';

  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { updateQuery } from '../utils';
  import { State } from './app.types';
  import type { Location } from './geocoding.types';
  import type { Forecast } from './forecast.types';
  import { getForecast } from './forecast.service';
  import { getLocations } from './geocoding.service';

  let currentSearch: string;
  let currentLocation: Partial<Location> = { name: 'Your location' };

  const stateStore = writable<State>(State.Search);
  const errorStore = writable<Error>();
  const locationsStore = writable<Promise<Array<Location>>>();
  const forecastStore = writable<Promise<Forecast>>();

  errorStore.subscribe((error) => {
    if (!error) return;

    stateStore.update(() => State.Error);
  });
  locationsStore.subscribe((request) => {
    if (!request) return;

    stateStore.update(() => State.Search);
    request.catch((error) => errorStore.update(() => error));
  });
  forecastStore.subscribe((request) => {
    if (!request) return;

    stateStore.update(() => State.Result);
    request.catch((error) => errorStore.update(() => error));
  });

  const onLocationSearch = (value: string) => {
    const search = value.trim();
    currentSearch = search;
    locationsStore.update(() => getLocations(search));
  };
  const onLocationSelect = (location: Location) => {
    currentLocation = location;
    forecastStore.update(() => getForecast(location.latitude, location.longitude));
  };
  const onGeolocation = () => {
    const request = new Promise<Forecast>((resolve, reject) => {
      if (!navigator.geolocation)
        return reject('Your browser does not support geolocation');

      const success = (position: GeolocationPosition) => {
        currentLocation = {
          name: 'Your location',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        updateQuery(new URLSearchParams(), false);

        resolve(getForecast(position.coords.latitude, position.coords.longitude));
      };
      const error = () => reject(new Error('Unable to get your location (blocked)'));

      navigator.geolocation.getCurrentPosition(success, error);
    });

    forecastStore.update(() => request);
  };
  const onFavorites = () => {
    stateStore.update(() => State.Favorites);
  };

  const getQueryLocation = (id: number, name: string) =>
    new Promise<void>(async (resolve, reject) => {
      const location = (await getLocations(name)).find((location) => location.id === id);
      if (!location) return reject(new Error('Unknown location request'));

      resolve(onLocationSelect(location));
    });

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const isLocationRequest = !!params.get('id') && !!params.get('name');
    const isSearchRequest = !!params.get('search');

    if (isLocationRequest) {
      const id = +params.get('id');
      const name = params.get('name');
      getQueryLocation(id, name).catch((error: Error) => {
        errorStore.update(() => error);
      });
    } else if (isSearchRequest) {
      const search = params.get('search');
      onLocationSearch(search);
    } else {
      onGeolocation();
    }
  });
</script>

<figure
  class="bold-shadow relative flex h-96 w-[21rem] flex-col overflow-hidden rounded-xl border-2 border-neutral-800 bg-slate-100"
>
  <InputHeader
    value={currentSearch}
    on:favorite={() => onFavorites()}
    on:geolocation={() => onGeolocation()}
  />

  <div class="grow overflow-y-auto overflow-x-hidden">
    {#if $stateStore === State.Error}
      <ErrorComponent error={$errorStore} />
    {/if}

    {#if $stateStore === State.Search}
      <SearchState locationsRequest={$locationsStore} />
    {/if}

    {#if $stateStore === State.Favorites}
      <FavoritesState />
    {/if}

    {#if $stateStore === State.Result}
      <ResultState forecastRequest={$forecastStore} location={currentLocation} />
    {/if}
  </div>
</figure>
