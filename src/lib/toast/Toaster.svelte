<script lang="ts">
  import { fly } from 'svelte/transition';

  import ToastComponent from './Toast.svelte';
  import toastService, { type Toast } from './toast.service';

  const TOAST_TRANSITION_DURATION = 300;
  let toast: Toast;

  toastService.addEventListener('toast', (event: CustomEvent<Toast>) => {
    toast = event.detail;

    setTimeout(() => (toast = undefined), toast.duration - TOAST_TRANSITION_DURATION);
  });
</script>

<div>
  {#if toast}
    <figure
      transition:fly={{ y: -100, duration: TOAST_TRANSITION_DURATION }}
    >
      <ToastComponent>
        {toast.message}
      </ToastComponent>
    </figure>
  {/if}
</div>
