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

<header class="flex h-16 items-center border-b-2 border-neutral-800">
  <form
    class="flex h-full w-full items-center divide-x-2 divide-neutral-800"
    on:submit={onSubmit}
  >
    <label class="relative h-full grow" for={CITY_INPUT_NAME}>
      <span class="sr-only block text-xs">City</span>
      <input
        class="block h-full w-full bg-slate-100 px-2 py-1 text-2xl transition-colors placeholder:text-neutral-800 hover:bg-slate-200 hover:placeholder:text-slate-400 focus:bg-slate-200 focus:outline-none"
        name={CITY_INPUT_NAME}
        type="text"
        placeholder="City..."
        autocorrect="true"
        required
      />
    </label>
    <button
      class="block h-full w-16 flex-shrink-0 bg-amber-300 fill-neutral-800 p-3 transition-colors hover:bg-amber-400 focus:outline-none focus-visible:bg-amber-400 active:bg-amber-500"
      type="submit"
      aria-label="Search for locations"
    >
      <SearchIcon />
    </button>
    <button
      class="!ml-0 block h-full w-16 flex-shrink-0 bg-sky-300 fill-neutral-800 p-3 transition-colors hover:bg-sky-400 focus:outline-none focus-visible:bg-sky-400 active:bg-sky-500"
      type="button"
      aria-label="Get weather forecast for your location"
      on:click={() => dispatch('geolocation')}
    >
      <LocationIcon />
    </button>
  </form>
</header>
