<script lang="ts">
	export let title = 'Error';
	export let message: string;
</script>

<div class="flex h-16 items-center justify-center space-x-2 p-4 text-red-400">
	<h1 class="text-4xl font-bold uppercase">{title}</h1>
	<i>{message}</i>
</div>
