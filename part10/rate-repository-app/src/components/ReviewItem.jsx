import { View, StyleSheet } from "react-native";
import { format } from "date-fns";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		padding: 15,
		backgroundColor: "white",
	},
	ratingContainer: {
		width: 50,
		height: 50,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: theme.colors.primary,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 15,
	},
	ratingText: {
		color: theme.colors.primary,
	},
	infoContainer: {
		flex: 1,
		justifyContent: "center",
	},
	username: {
		marginBottom: 5,
	},
	date: {
		color: theme.colors.textSecondary,
		marginBottom: 5,
	},
});

const ReviewItem = ({ review }) => {
	return (
		<View style={styles.container} testID="reviewItem">
			<View style={styles.ratingContainer}>
				<Text style={styles.ratingText} fontWeight="bold">
					{review.rating}
				</Text>
			</View>
			<View style={styles.infoContainer}>
				<Text fontWeight="bold" style={styles.username}>
					{review.user.username}
				</Text>
				<Text style={styles.date}>
					{format(new Date(review.createdAt), "dd MMM yyyy")}
				</Text>
				<Text>{review.text}</Text>
			</View>
		</View>
	);
};

export default ReviewItem;
