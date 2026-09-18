import { Text as NativeText, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
	text: {
		color: theme.colors.textPrimary,
	},
	colorTextSecondary: {
		color: theme.colors.textSecondary,
	},
	fontWeightBold: {
		fontWeight: theme.fontWeights?.bold || "bold",
	},
});

const Text = ({ color, fontWeight, style, ...props }) => {
	const textStyle = [
		styles.text,
		color === "textSecondary" && styles.colorTextSecondary,
		fontWeight === "bold" && styles.fontWeightBold,
		style,
	];

	return <NativeText style={textStyle} {...props} />;
};

export default Text;
