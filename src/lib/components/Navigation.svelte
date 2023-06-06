<script lang="ts">
	import CloseIcon from './icons/CloseIcon.svelte';
	import SearchIcon from './icons/SearchIcon.svelte';
	import FavoriteIcon from './icons/FavoriteIcon.svelte';
	import LocationIcon from './icons/LocationIcon.svelte';

	import { getGeolocation } from '$lib/utils';
	import toastService, { ToastType } from '$lib/components/toast/toast.service';

	const CITY_INPUT_NAME = 'name';

	export let value: string = '';
	let cityInputNameField: HTMLInputElement;
	let isGeolocationLoading = false;

	const onClear = () => {
		cityInputNameField.value = '';
		cityInputNameField.focus();
	};
	const onGeolocation = () => {
		isGeolocationLoading = true;
		getGeolocation()
			.then((geolocation) => {
				const params = new URLSearchParams({
					latitude: geolocation.coords.latitude.toString(),
					longitude: geolocation.coords.longitude.toString()
				});
				console.log(params);
				// goto(`forecast?${params.toString()}`, { invalidateAll: true });
				window.location.href = `forecast?${params.toString()}`;
			})
			.catch((reason) => toastService.add(reason, 1000, ToastType.Error))
			.finally(() => (isGeolocationLoading = false));
	};
</script>

<nav>
	<form class="flex w-full divide-x-2 divide-neutral-800" method="GET" action="search">
		<label class="group relative grow" for={CITY_INPUT_NAME}>
			<span class="sr-only block text-xs">City</span>
			<input
				class="peer block h-full w-full bg-slate-100 py-1 pl-2 pr-8 text-2xl transition-all placeholder:select-none placeholder:text-neutral-800 placeholder:transition hover:bg-slate-200 hover:placeholder:text-slate-400 focus:bg-slate-200 focus:outline-none"
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
				class="absolute right-0 top-1/2 block w-8 -translate-y-1/2 transition hover:fill-slate-400 focus:fill-slate-400 focus:outline-none peer-placeholder-shown:hidden"
				type="button"
				aria-label="Clear search input"
				on:click={() => onClear()}
			>
				<CloseIcon />
			</button>
		</label>

		<button
			class="block w-16 flex-shrink-0 bg-amber-300 fill-neutral-800 p-3 transition-colors hover:bg-amber-400 focus:outline-none focus-visible:bg-amber-400 active:bg-amber-500"
			type="submit"
			aria-label="Search for locations"
		>
			<SearchIcon />
		</button>

		<a
			class="block w-16 flex-shrink-0 bg-sky-300 fill-neutral-800 p-3 transition-colors hover:bg-sky-400 focus:outline-none focus-visible:bg-sky-400 active:bg-sky-500"
			href="favorites"
			aria-label="Look at your favorite locations"
		>
			<FavoriteIcon />
		</a>

		<button
			class="block w-16 flex-shrink-0 bg-neutral-800 fill-slate-100 p-3 transition-colors hover:bg-neutral-700 focus:outline-none focus-visible:bg-neutral-700 active:bg-neutral-600"
			type="button"
			aria-label="Get weather forecast for your location"
			on:click={() => onGeolocation()}
		>
			{#if !isGeolocationLoading}
				<figure>
					<LocationIcon />
				</figure>
			{:else}
				<figure
					class="inline-block animate-spin after:inline-block after:h-6 after:w-6 after:rounded-full after:border-2 after:border-transparent after:border-t-slate-100"
				/>
			{/if}
		</button>
	</form>
</nav>
