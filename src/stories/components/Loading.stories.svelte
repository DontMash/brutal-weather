<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Loading from '$lib/components/Loading.svelte';
</script>

<Meta title="Components/Loading" component={Loading} />

<Template>
	<Loading />
</Template>

<Story name="Default">
	<Loading />
</Story>
