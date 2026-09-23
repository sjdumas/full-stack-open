import { Pressable, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const styles = StyleSheet.create({
	tab: {
		paddingVertical: 10,
		marginRight: 15,
	},
	text: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
});

const AppBarTab = ({ text, to, onPress }) => {
	if (to) {
		return (
			<Link to={to} component={Pressable} style={styles.tab}>
				<Text style={styles.text}>{text}</Text>
			</Link>
		);
	}

	return (
		<Pressable style={styles.tab} onPress={onPress}>
			<Text style={styles.text}>{text}</Text>
		</Pressable>
	);
};

export default AppBarTab;
