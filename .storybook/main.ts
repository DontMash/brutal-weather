import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx|svelte)'],
	staticDirs: ['../static'],

	framework: '@storybook/sveltekit',
	addons: [
		'@storybook/addon-svelte-csf'
	]
};
export default config;
