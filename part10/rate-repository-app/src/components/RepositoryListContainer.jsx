import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	pickerContainer: {
		padding: 10,
		backgroundColor: "white",
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ principle, onPrincipleChange }) => (
	<View style={styles.pickerContainer}>
		<Picker selectedValue={principle} onValueChange={onPrincipleChange}>
			<Picker.Item label="Select an item..." value="" enabled={false} />
			<Picker.Item label="Latest repositories" value="latest" />
			<Picker.Item label="Highest rated repositories" value="highest" />
			<Picker.Item label="Lowest rated repositories" value="lowest" />
		</Picker>
	</View>
);

const RepositoryListContainer = ({ repositories, principle, onPrincipleChange }) => {
	const navigate = useNavigate();

	const repositoryNodes = repositories?.edges
		? repositories.edges.map((edge) => edge.node)
		: repositories ?? [];

	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => (
				<Pressable onPress={() => navigate(`/repository/${item.id}`)}>
					<RepositoryItem repository={item} />
				</Pressable>
			)}
			keyExtractor={(item) => item.id}
			ListHeaderComponent={() => (
				<RepositoryListHeader
					principle={principle}
					onPrincipleChange={onPrincipleChange}
				/>
			)}
		/>
	);
};

export default RepositoryListContainer;
