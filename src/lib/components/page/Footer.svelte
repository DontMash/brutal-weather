<script lang="ts">
	import FavoriteFilledIcon from '$lib/components/icons/FavoriteFilledIcon.svelte';
</script>

<footer class="group flex items-center justify-center space-x-[0.25ch] p-4 text-xs" id="footer">
	<span> Created with </span>
	<figure class="w-4">
		<FavoriteFilledIcon />
	</figure>
	<span> by </span>
	<a
		class="hover:bold-shadow focus-visible:bold-shadow relative inline-block rounded-lg bg-neutral-800 p-1.5 text-slate-100 underline transition after:absolute after:left-0 after:top-0 after:hidden after:h-[calc(100%_+_0.25rem)] after:w-[calc(100%_+_0.25rem)] after:rounded-[inherit] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-sky-400 hover:fill-neutral-800 hover:text-neutral-800 hover:after:block focus:outline-none focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:bg-sky-400 focus-visible:text-neutral-800"
		href="https://soren.codes"
		target="_blank"
		rel="noreferrer"
	>
		@DontMash
	</a>
</footer>
