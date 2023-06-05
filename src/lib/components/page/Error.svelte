<script lang="ts">
    export let error: Error;
</script>

<i class="block text-center text-red-300">{error?.message}</i>
