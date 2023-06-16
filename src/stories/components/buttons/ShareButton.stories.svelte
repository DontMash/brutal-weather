<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import ShareButton from '$lib/components/ShareButton.svelte';
</script>

<Meta title="Components/Buttons/ShareButton" component={ShareButton} />

<Template>
	<ShareButton />
</Template>

<Story name="Default">
	<ShareButton />
</Story>
