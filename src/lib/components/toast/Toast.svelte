<script lang="ts">
	import type { Snippet } from 'svelte';

	import { ToastType } from '$lib/components/toast/toast.service';

	interface Props {
		type?: ToastType;
		children?: Snippet;
	}

	let { type = ToastType.Info, children }: Props = $props();

	const typeVariations: Record<ToastType, string> = {
		[ToastType.Info]: 'bg-sky-400',
		[ToastType.Warning]: 'bg-amber-400',
		[ToastType.Error]: 'bg-red-300'
	};
</script>

<span
	class={`${typeVariations[type]} cross-shadow inline-block select-none rounded-2xl border-2 border-neutral-800 px-3 py-2 text-center`}
>
	{@render children?.()}
</span>
