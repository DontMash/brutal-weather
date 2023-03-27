<script lang="ts">
  import SearchIcon from './icons/SearchIcon.svelte';
  import LocationIcon from './icons/LocationIcon.svelte';

  import { createEventDispatcher } from 'svelte';

  const CITY_INPUT_NAME = 'city';
  const dispatch = createEventDispatcher();

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const city = formData.get(CITY_INPUT_NAME);

    dispatch('change', { value: city.toString() });
  };
</script>

<header class="flex h-16 items-center border-b-2 border-neutral-800 pl-2">
  <form
    class="flex h-full w-full items-center space-x-2 divide-x-2 divide-neutral-800"
    on:submit={onSubmit}
  >
    <label class="relative grow" for={CITY_INPUT_NAME}>
      <span class="sr-only block text-xs">City</span>
      <input
        class="block w-full rounded-lg bg-slate-200 px-2 py-1 transition-colors placeholder:text-slate-400 hover:bg-slate-300 hover:placeholder:text-slate-100 focus:outline focus:outline-2 focus:outline-neutral-800 focus:hover:bg-slate-200 focus:hover:placeholder:text-slate-400"
        name={CITY_INPUT_NAME}
        type="text"
        placeholder="City..."
        autocorrect="true"
        required
      />
    </label>
    <button
      class="block h-full w-16 bg-amber-300 fill-neutral-800 p-3 transition-colors hover:bg-amber-400 focus:outline-none focus-visible:bg-amber-400 active:bg-amber-500"
      type="submit"
      aria-label="Search for locations"
    >
      <SearchIcon />
    </button>
    <button
      class="!ml-0 block h-full w-16 bg-sky-300 fill-neutral-800 p-3 transition-colors hover:bg-sky-400 focus:outline-none focus-visible:bg-sky-400 active:bg-sky-500"
      type="button"
      aria-label="Get weather forecast for your location"
      on:click={() => dispatch('geolocation')}
    >
      <LocationIcon />
    </button>
  </form>
</header>
