<script lang="ts">
	import Footer from '$lib/components/page/Footer.svelte';
	import Loading from '$lib/components/page/Loading.svelte';
	import Navigation from '$lib/components/page/Navigation.svelte';
	import Toaster from '$lib/components/toast/Toaster.svelte';
	import Logo from '$lib/components/Logo.svelte';

	import { page, navigating } from '$app/stores';
	import '../app.css';

	$: isHome = $page.url.pathname === '/';
</script>

<svelte:head>
	<title>Brutal Weather</title>
</svelte:head>

<div class="fixed left-1/2 top-12 z-10 -translate-x-1/2">
	<Toaster />
</div>

<div class="flex min-h-screen flex-col items-center justify-center px-4">
	{#if isHome}
		<figure class="w-48">
			<Logo />
		</figure>
		<h1 class="mb-10 text-3xl">Brutal Weather</h1>
	{/if}

	<div class="cross-shadow rounded-xl bg-slate-100">
		<div class="max-w-5xl overflow-hidden rounded-[inherit] border-2 border-neutral-800">
			<header
				class="data-[index=true]:border-0 border-b-2 border-neutral-800"
				data-index={isHome && !$navigating}
			>
				<Navigation />
			</header>

			<main class="flex max-h-[24.5rem] w-full flex-col overflow-y-auto overflow-x-hidden">
				{#if $navigating}
					<div class="mx-auto p-4">
						<Loading color="dark" />
					</div>
				{:else}
					<slot />
				{/if}
			</main>
		</div>
	</div>
</div>

<Footer />
