<script lang="ts">
  import AsyncButton from './AsyncButton.svelte';
  import ShareIcon from './icons/ShareIcon.svelte';

  import toastService, { ToastType } from './toast/toast.service';

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
          toastService.add('Link copied', TOAST_DURATION);
        }, ANIMATION_DURATION)
      )
      .catch((error) => {
        setTimeout(() => {
          toastService.add('Cannot copy link!', TOAST_DURATION, ToastType.Error);
        }, ANIMATION_DURATION);
      })
      .finally(() => {
        setTimeout(() => (isLoading = false), ANIMATION_DURATION);
      });
  };
</script>

<AsyncButton color={'secondary'} loading={isLoading} bind:this={button} on:click={onShare}>
  <ShareIcon />
</AsyncButton>
