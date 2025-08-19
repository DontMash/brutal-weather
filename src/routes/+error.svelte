<script>
	import Error from '$lib/components/page/Error.svelte';

	import { page } from '$app/state';
</script>

{#if page.error}
	<Error message={page.error.message} />
{/if}
