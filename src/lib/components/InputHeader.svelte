<script lang="ts">
  import CloseIcon from './icons/CloseIcon.svelte';
  import SearchIcon from './icons/SearchIcon.svelte';
  import FavoriteIcon from './icons/FavoriteIcon.svelte';
  import LocationIcon from './icons/LocationIcon.svelte';

  import { createEventDispatcher } from 'svelte';
  import { updateQuery } from './utils';

  const CITY_INPUT_NAME = 'city';
  const dispatch = createEventDispatcher();

  export let value: string = '';
  let cityInputNameField: HTMLInputElement;

  const updateQuerySearch = (search: string) => {
    const params = new URLSearchParams();
    params.set('search', search);
    updateQuery(params);
  };

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const city = formData.get(CITY_INPUT_NAME).toString();

    cityInputNameField.blur();

    updateQuerySearch(city);
  };
  const onClear = () => {
    cityInputNameField.value = '';
    cityInputNameField.focus();
  };
  const updateQueryFavorites = () => {
    const params = new URLSearchParams({
      favorites: '100',
    });
    updateQuery(params);
  };
</script>

<header class="flex h-16 w-full items-center border-b-2 border-neutral-800">
  <form class="flex w-full divide-x-2 divide-neutral-800" on:submit={onSubmit}>
    <label class="group relative grow" for={CITY_INPUT_NAME}>
      <span class="sr-only block text-xs">City</span>
      <input
        class="peer block h-full w-full bg-slate-100 py-1 pl-2 pr-8 text-2xl transition-all placeholder:select-none placeholder:text-neutral-800 placeholder:transition hover:bg-slate-200 hover:delay-300 hover:placeholder:text-slate-400 hover:placeholder:delay-300 focus:w-[calc(min(theme(width.screen),_theme(maxWidth.5xl))_-_4.25rem)] focus:bg-slate-200 focus:outline-none group-hover:w-[calc(min(theme(width.screen)_-_theme(padding.8),_theme(maxWidth.5xl))_-_4.25rem)]"
        name={CITY_INPUT_NAME}
        type="text"
        placeholder="City..."
        autocorrect="true"
        required
        minlength="2"
        bind:this={cityInputNameField}
        bind:value
      />
      <button
        class="absolute top-1/2 right-0 block w-8 -translate-y-1/2 transition hover:fill-slate-400 focus:fill-slate-400 focus:outline-none peer-placeholder-shown:hidden"
        type="button"
        aria-label="Clear search input"
        on:click={() => onClear()}
      >
        <CloseIcon />
      </button>
    </label>

    <button
      class="block h-full w-16 flex-shrink-0 bg-amber-300 fill-neutral-800 p-3 transition-colors hover:bg-amber-400 focus:outline-none focus-visible:bg-amber-400 active:bg-amber-500"
      type="submit"
      aria-label="Search for locations"
    >
      <SearchIcon />
    </button>

    <button
      class="block h-full w-16 flex-shrink-0 bg-sky-300 fill-neutral-800 p-3 transition-colors hover:bg-sky-400 focus:outline-none focus-visible:bg-sky-400 active:bg-sky-500"
      type="button"
      aria-label="Get weather forecast for your location"
      on:click={() => updateQueryFavorites()}
    >
      <FavoriteIcon />
    </button>

    <button
      class="block h-full w-16 flex-shrink-0 bg-neutral-800 fill-slate-100 p-3 transition-colors hover:bg-neutral-700 focus:outline-none focus-visible:bg-neutral-700 active:bg-neutral-600"
      type="button"
      aria-label="Get weather forecast for your location"
      on:click={() => dispatch('geolocation')}
    >
      <LocationIcon />
    </button>
  </form>
</header>
