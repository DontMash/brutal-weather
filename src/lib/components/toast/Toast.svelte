<script lang="ts">
	import { ToastType } from '$lib/components/toast/toast.service';

	export let type: ToastType = ToastType.Info;

	const typeVariations: Record<ToastType, string> = {
		[ToastType.Info]: 'bg-sky-400',
		[ToastType.Warning]: 'bg-amber-400',
		[ToastType.Error]: 'bg-red-300'
	};
</script>

<span
	class={`${typeVariations[type]} cross-shadow inline-block select-none rounded-2xl border-2 border-neutral-800 px-3 py-2 text-center`}
>
	<slot>Placeholder</slot>
</span>
