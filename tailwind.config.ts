import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"button-primary-background": "#7F56D9",
				"button-primary-border": "#7F56D9",
				"button-primary-background-hover": "#6941C6",
				"button-primary-background-outline": "#9E77ED",
				"button-secondary-border": "#D0D5DD",
				"button-secondary-color-border": "#D6BBFB",
				"button-secondary-fg": "#344054",
				"button-secondary-color-fg": "#6941C6",
				"background-site": "#F5F5F5",
				"background-primary": "#FFFFFF",
				"background-secondary": "#F9FAFB",
				"border-primary": "#D0D5DD",
				"border-secondary": "#EAECF0",
				"text-teritary": "#475467",
				"shadow-xs": "#101828",
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
		},
		container: {
			screens: {
				sm: "600px",
				md: "728px",
				lg: "984px",
				xl: "1208px",
			},
		},
	},
	plugins: [],
} satisfies Config;
