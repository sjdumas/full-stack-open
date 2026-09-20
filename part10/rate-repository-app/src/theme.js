import { Platform } from "react-native";

const theme = {
	colors: {
		appBarBackground: "#24292e",
		primary: "#0366d6",
		textPrimary: "#24292e",
		textSecondary: "#586069",
		background: "#e1e4e8",
		error: "#d73a4a",
	},
	fontWeights: {
		normal: "400",
		bold: "700",
	},
	fonts: {
		main: Platform.select({
			android: "Roboto",
			ios: "Arial",
			default: "System",
		}),
	}
};

export default theme;
