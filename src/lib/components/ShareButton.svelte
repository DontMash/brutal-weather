<script lang="ts">
	import AsyncButton from '$lib/components/AsyncButton.svelte';
	import ShareIcon from '$lib/components/icons/ShareIcon.svelte';

	import { ToastType, add } from '$lib/components/toast/toast.service';

	const TOAST_DURATION: number = 3000;

	let isLoading: boolean;
	let button: AsyncButton;

	const onShare = () => {
		isLoading = true;
		const ANIMATION_DURATION = button.getAnimationDuration();

		navigator.clipboard
			.writeText(window.location.href)
			.then(() =>
				setTimeout(() => {
					add('Link copied', TOAST_DURATION);
				}, ANIMATION_DURATION)
			)
			.catch((error) => {
				setTimeout(() => {
					add('Cannot copy link!', TOAST_DURATION, ToastType.Error);
				}, ANIMATION_DURATION);
			})
			.finally(() => {
				setTimeout(() => (isLoading = false), ANIMATION_DURATION);
			});
	};
</script>

<AsyncButton name={'Share'} loading={isLoading} bind:this={button} on:click={onShare}>
	<ShareIcon />
</AsyncButton>
