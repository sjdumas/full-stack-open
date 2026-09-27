import { useParams } from "react-router-native";
import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
	const { id } = useParams();
	const { repository, loading, fetchMore } = useRepository(id, 4);

	if (loading && !repository) {
		return <ActivityIndicator size="large" />;
	}

	if (!repository) {
		return null;
	}

	const reviewNodes = repository.reviews
		? repository.reviews.edges.map((edge) => edge.node)
		: [];

	const onEndReach = () => {
		fetchMore();
	};

	return (
		<FlatList
			data={reviewNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <ReviewItem review={item} />}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={() => (
				<RepositoryItem repository={repository} showGithubButton />
			)}
			onEndReached={onEndReach}
			onEndReachedThreshold={0.5}
		/>
	);
};

export default SingleRepository;
