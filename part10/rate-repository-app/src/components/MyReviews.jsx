import { FlatList, View, StyleSheet } from "react-native";
import useMyReviews from "../hooks/useMyReviews";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
	const { reviews } = useMyReviews();

	return (
		<FlatList
			data={reviews ?? []}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <ReviewItem review={item} showRepositoryName />}
			keyExtractor={({ id }) => id}
		/>
	);
};

export default MyReviews;
