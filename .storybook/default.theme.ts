import { create } from 'storybook/theming/create';

export default create({
	base: 'light',

	// Branding
	brandTitle: 'Brutal Weather',
	brandUrl: 'https://brutal-weather.soren.codes',
	brandImage: './favicon.svg',
	brandTarget: '_self',

	// Colors
	colorPrimary: '#fcd34d',
	colorSecondary: '#7dd3fc',

	// UI
	appBg: '#f1f5f9',
	appContentBg: '#f1f5f9',
	appBorderColor: '#262626',
	appBorderRadius: 4,

	// Text colors
	textColor: '#262626',
	textInverseColor: '#f1f5f9',

	barBg: '#f1f5f9',
	barSelectedColor: '#262626',
	barTextColor: '#262626'
});
