import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories }) => {
	const repositoryNodes = repositories?.edges
		? repositories.edges.map((edge) => edge.node)
		: repositories ?? [];

	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <RepositoryItem repository={item} />}
			keyExtractor={(item) => item.id}
		/>
	);
};

export default RepositoryListContainer;
