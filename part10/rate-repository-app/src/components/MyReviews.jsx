import { FlatList, View, StyleSheet } from "react-native";
import useMyReviews from "../hooks/useMyReviews";
import MyReviewItem from "./MyReviewItem";

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
	const { reviews, refetch } = useMyReviews();

	return (
		<FlatList
			data={reviews ?? []}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => (
				<MyReviewItem review={item} onDeleted={refetch} />
			)}
			keyExtractor={({ id }) => id}
		/>
	);
};

export default MyReviews;
