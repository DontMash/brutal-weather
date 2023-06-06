<script lang="ts">
	import Footer from '$lib/components/page/Footer.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Toaster from '$lib/components/toast/Toaster.svelte';

	import { page } from '$app/stores';
	import '../app.css';
</script>

<svelte:head>
	<title>Brutal Weather</title>
</svelte:head>

<div class="fixed left-1/2 top-12 z-10 -translate-x-1/2">
	<Toaster />
</div>

<div class="flex min-h-screen flex-col items-center justify-center px-4">
	{#if $page.url.pathname === '/'}
		<figure class="w-48">
			<Logo />
		</figure>
		<h1 class="text-3xl mb-10">Brutal Weather</h1>
	{/if}

	<div class="bold-shadow max-w-5xl overflow-hidden rounded-xl border-2 border-neutral-800">
		<header class="border-b-2 border-neutral-800">
			<Navigation />
		</header>

		<main class="flex max-h-[24.5rem] w-full flex-col overflow-y-auto overflow-x-hidden">
			<slot />
		</main>
	</div>
</div>

<Footer />
