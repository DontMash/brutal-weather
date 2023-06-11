<script>
	import Error from '$lib/components/page/Error.svelte';

	import { page } from '$app/stores';
</script>

{#if $page.error}
	<Error message={$page.error.message} />
{/if}
