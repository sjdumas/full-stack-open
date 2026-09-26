import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	pickerContainer: {
		padding: 10,
		backgroundColor: "white",
	},
	searchInput: {
		borderWidth: 1,
		borderColor: theme.colors.textSecondary,
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({
	principle,
	onPrincipleChange,
	searchKeyword,
	onSearchKeywordChange,
}) => (
	<View style={styles.pickerContainer}>
		<TextInput
			style={styles.searchInput}
			placeholder="Search repositories"
			value={searchKeyword}
			onChangeText={onSearchKeywordChange}
		/>
		<Picker selectedValue={principle} onValueChange={onPrincipleChange}>
			<Picker.Item label="Select an item..." value="" enabled={false} />
			<Picker.Item label="Latest repositories" value="latest" />
			<Picker.Item label="Highest rated repositories" value="highest" />
			<Picker.Item label="Lowest rated repositories" value="lowest" />
		</Picker>
	</View>
);

const RepositoryListContainer = ({
	repositories,
	principle,
	onPrincipleChange,
	searchKeyword,
	onSearchKeywordChange,
}) => {
	const navigate = useNavigate();

	const repositoryNodes = repositories ?? [];

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
					searchKeyword={searchKeyword}
					onSearchKeywordChange={onSearchKeywordChange}
				/>
			)}
		/>
	);
};

export default RepositoryListContainer;
