<script lang="ts">
  import Button from '../Button.svelte';

  import type { Location } from './geocoding.types';
  import toastService from '../toast/toast.service';
  import ShareIcon from '../icons/ShareIcon.svelte';

  export let location: Partial<Location>;
  let loading: boolean;

  const onShare = () => {
    if (!location.id) return;

    loading = true;

    const params = new URLSearchParams({
      id: location.id.toString(),
      name: location.name,
    });
    const url = new URL(window.location.origin);
    url.search = params.toString();

    navigator.clipboard.writeText(url.href).then(() =>
      setTimeout(() => {
        loading = false;

        toastService.add('Link copied', 3000);
      }, 1000)
    );
  };
</script>

<div
  class="data-[loading=true]:pointer-events-none data-[loading=true]:animate-spin"
  data-loading={loading}
>
  <Button color={'secondary'} on:click={onShare}>
    <ShareIcon />
  </Button>
</div>
