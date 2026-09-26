import { View, Pressable, StyleSheet, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import ReviewItem from "./ReviewItem";
import Text from "./Text";
import theme from "../theme";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
	},
	buttonRow: {
		flexDirection: "row",
		paddingHorizontal: 15,
		paddingBottom: 15,
	},
	button: {
		flex: 1,
		borderRadius: 5,
		paddingVertical: 10,
		alignItems: "center",
		marginRight: 10,
	},
	viewButton: {
		backgroundColor: theme.colors.primary,
	},
	deleteButton: {
		backgroundColor: theme.colors.error,
		marginRight: 0,
	},
	buttonText: {
		color: "white",
	},
});

const MyReviewItem = ({ review, onDeleted }) => {
	const navigate = useNavigate();
	const [deleteReview] = useDeleteReview();

	const handleView = () => {
		navigate(`/repository/${review.repository.id}`);
	};

	const handleDelete = () => {
		Alert.alert(
			"Delete review",
			"Are you sure you want to delete this review?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: async () => {
						try {
							await deleteReview(review.id);
							onDeleted();
						} catch (e) {
							console.log(e);
						}
					},
				},
			]
		);
	};

	return (
		<View style={styles.container}>
			<ReviewItem review={review} showRepositoryName />
			<View style={styles.buttonRow}>
				<Pressable style={[styles.button, styles.viewButton]} onPress={handleView}>
					<Text style={styles.buttonText} fontWeight="bold">
						View repository
					</Text>
				</Pressable>
				<Pressable style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
					<Text style={styles.buttonText} fontWeight="bold">
						Delete review
					</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default MyReviewItem;
