<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Logo from '$lib/components/Logo.svelte';
</script>

<Meta title="Components/Logo" component={Logo} />

<Template>
	<Logo />
</Template>

<Story name="Default">
	<Logo />
</Story>

<Story name="Sized">
	<figure class="w-48">
		<Logo />
	</figure>
</Story>
