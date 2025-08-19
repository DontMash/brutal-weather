<script lang="ts">
	import AsyncButton from '$lib/components/AsyncButton.svelte';
	import ShareIcon from '$lib/components/icons/ShareIcon.svelte';

	import { ToastType, add } from '$lib/components/toast/toast.service';

	const TOAST_DURATION = 3000;

	let isLoading: boolean = $state(false);
	let button: AsyncButton | undefined = $state();

	const onclick = () => {
		if (!button) {
			return add('Error: No button provided!', TOAST_DURATION, ToastType.Error);
		}

		isLoading = true;
		const ANIMATION_DURATION = button.getAnimationDuration();

		navigator.clipboard
			.writeText(window.location.href)
			.then(() =>
				setTimeout(() => {
					add('Link copied', TOAST_DURATION);
				}, ANIMATION_DURATION)
			)
			.catch(() => {
				setTimeout(() => {
					add('Cannot copy link!', TOAST_DURATION, ToastType.Error);
				}, ANIMATION_DURATION);
			})
			.finally(() => {
				setTimeout(() => (isLoading = false), ANIMATION_DURATION);
			});
	};
</script>

<AsyncButton label="Share" size="square" loading={isLoading} bind:this={button} {onclick}>
	<ShareIcon />
</AsyncButton>
