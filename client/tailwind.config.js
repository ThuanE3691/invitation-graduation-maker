/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			backgroundColor: {
				primary: "#FFF6EC",
			},
			fontFamily: {
				header: ["Dancing Script", "cursive"],
				alex: ["Alex Brush", "cursive"],
				baloo: ["Baloo 2", "sans-serif"],
				"ballo-bhaijaan": ["Baloo Bhaijaan 2", "sans-serif"],
				alike: ["Alike", "serif"],
				garamond: ["Cormorant Garamond", "serif"],
				montserrat: ["Montserrat", "sans-serif"],
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			screens: {
				mobile: {
					max: "600px",
				},
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
