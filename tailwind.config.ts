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
				"button-primary": "#7F56D9",
				"button-border": "#7F56D9",
				"background-site": "#F5F5F5",
				"background-primary": "#F9FAFB",
				"background-secondary": "#EAECF0",
				"text-teritary": "#475467",
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
