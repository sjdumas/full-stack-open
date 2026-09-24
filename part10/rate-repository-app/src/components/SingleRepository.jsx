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
	const { repository, loading } = useRepository(id);

	if (loading) {
		return <ActivityIndicator size="large" />;
	}

	if (!repository) {
		return null;
	}

	const reviewNodes = repository.reviews
		? repository.reviews.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={reviewNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <ReviewItem review={item} />}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={() => (
				<RepositoryItem repository={repository} showGithubButton />
			)}
		/>
	);
};

export default SingleRepository;
