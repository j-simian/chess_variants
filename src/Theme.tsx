import { createTheme } from "@mui/material/styles";
import { SimplePaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Theme {
		palette: {
			primary: SimplePaletteColorOptions;
			secondary: SimplePaletteColorOptions;
			custom: {
				bg: string;
			};
		};
	}
	interface PaletteOptions {
		custom?: {
			bg: string;
		};
	}
}

const theme = createTheme({
	palette: {
		primary: {
			light: "#669BBC",
			main: "#2474A2",
			dark: "#003049",
		},
		secondary: {
			light: "#C76760",
			main: "#C1121f",
			dark: "#780000",
		},
		custom: {
			bg: "#FDF0D5",
		},
	},
	typography: {},
	spacing: 8,
	breakpoints: {},
	zIndex: {},
	transitions: {},
	components: {},
});

export default theme;
