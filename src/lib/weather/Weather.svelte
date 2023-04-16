<script lang="ts">
  import InputHeader from '../InputHeader.svelte';
  import ErrorComponent from '../page/Error.svelte';
  import SearchState from './SearchState.svelte';
  import FavoritesState from './FavoritesState.svelte';
  import ResultState from './ResultState.svelte';

  import { onMount, type ComponentType } from 'svelte';
  import { writable } from 'svelte/store';
  import { getGeolocation, updateQuery } from '../utils';
  import { State } from './weather.app';
  import type { Location } from './geocoding';
  import type { Forecast } from './forecast';
  import { getForecast } from './forecast.service';
  import { getLocations } from './geocoding.service';
  import LoadingState from './LoadingState.svelte';

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

    stateStore.update(() => State.Loading);
    request
      .then(() => stateStore.update(() => State.Search))
      .catch((error) => errorStore.update(() => error));
  });
  forecastStore.subscribe((request) => {
    if (!request) return;

    stateStore.update(() => State.Loading);
    request
      .then(() => stateStore.update(() => State.Result))
      .catch((error) => errorStore.update(() => error));
  });

  const onLocationSearch = (value: string) => {
    const search = value.trim();
    currentSearch = search;
    locationsStore.update(() => getLocations(search, 100));
  };
  const onLocationSelect = (location: Location) => {
    currentLocation = location;
    forecastStore.update(() => getForecast(location.latitude, location.longitude));
  };
  const onDefaultLocation = () => {
    const request = new Promise<Forecast>((resolve, reject) => {
      getGeolocation()
        .then((position) => {
          currentLocation = {
            name: 'Your location',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          const params = new URLSearchParams({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
          updateQuery(params, false);

          resolve(getForecast(position.coords.latitude, position.coords.longitude));
        })
        .catch(reject);
    });

    forecastStore.update(() => request);
  };
  const onGeolocation = (latitude: number, longitude: number) => {
    currentLocation = {
      name: 'Your location',
      latitude,
      longitude,
    };
    forecastStore.update(() => getForecast(latitude, longitude));
  };
  const onFavorites = () => {
    stateStore.update(() => State.Favorites);
  };

  const getQueryLocation = (id: number, name: string) =>
    new Promise<void>(async (resolve, reject) => {
      const location = (await getLocations(name, 100)).find((location) => location.id === id);
      if (!location) return reject(new Error('Unknown location request'));

      resolve(onLocationSelect(location));
    });
  const updateQueryGeolocation = () => {
    stateStore.update(() => State.Loading);

    getGeolocation()
      .then((position) => {
        const params = new URLSearchParams({
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        });
        updateQuery(params);
      })
      .catch((error) => errorStore.update(() => error));
  };

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const isLocationRequest = !!params.get('id') && !!params.get('name');
    const isSearchRequest = !!params.get('search');
    const isGeolocationRequest = !!params.get('latitude') && !!params.get('longitude');
    const isFavoritesRequest = !!params.get('favorites');

    if (isLocationRequest) {
      const id = +params.get('id');
      const name = params.get('name');
      getQueryLocation(id, name).catch((error: Error) => {
        errorStore.update(() => error);
      });
    } else if (isSearchRequest) {
      const search = params.get('search');
      onLocationSearch(search);
    } else if (isGeolocationRequest) {
      const latitude = +params.get('latitude');
      const longitude = +params.get('longitude');
      onGeolocation(latitude, longitude);
    } else if (isFavoritesRequest) {
      onFavorites();
    } else {
      onDefaultLocation();
    }
  });
</script>

<figure
  class="relative flex h-[26rem] w-full flex-col overflow-hidden rounded-xl bold-shadow border-2 border-neutral-800 bg-slate-100"
>
  <InputHeader
    value={currentSearch}
    on:geolocation={() => updateQueryGeolocation()}
  />

  <div class="grow overflow-y-auto overflow-x-hidden">
    {#if $stateStore === State.Loading}
      <LoadingState />
    {/if}
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
