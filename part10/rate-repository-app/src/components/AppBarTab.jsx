import { Pressable, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
	tab: {
		paddingVertical: 10,
	},
	text: {
		color: "#ffffff",
		fontWeight: "bold",
		fontSize: 16,
	},
});

const AppBarTab = ({ text }) => {
	return (
		<Pressable style={styles.tab}>
			<Text style={styles.text}>{text}</Text>
		</Pressable>
	);
};

export default AppBarTab;
