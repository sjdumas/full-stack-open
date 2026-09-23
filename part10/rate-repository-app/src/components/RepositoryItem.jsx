import { View, Pressable, Linking, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: "white",
	},
	topRow: {
		flexDirection: "row",
		marginBottom: 15,
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 5,
		marginRight: 15,
	},
	infoContainer: {
		flexShrink: 1,
	},
	fullName: {
		marginBottom: 5,
	},
	description: {
		marginBottom: 5,
	},
	language: {
		alignSelf: "flex-start",
		backgroundColor: theme.colors.primary,
		color: "white",
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 5,
		overflow: "hidden",
	},
	statsRow: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	statItem: {
		alignItems: "center",
	},
	githubButton: {
		marginTop: 15,
		backgroundColor: theme.colors.primary,
		borderRadius: 5,
		paddingVertical: 10,
		alignItems: "center",
	},
	githubButtonText: {
		color: "white",
	},
});

const GithubButton = ({ url }) => (
	<Pressable style={styles.githubButton} onPress={() => Linking.openURL(url)}>
		<Text style={styles.githubButtonText} fontWeight="bold">
			Open in GitHub
		</Text>
	</Pressable>
);

const formatCount = (count) => {
	if (count >= 1000) {
		return `${(count / 1000).toFixed(1)}k`;
	}
	return count.toString();
};

const RepositoryItemHeader = ({ repository }) => (
	<View style={styles.topRow}>
		<Image style={styles.avatar} source={{ uri: repository.ownerAvatarUrl }} />
		<View style={styles.infoContainer}>
			<Text style={styles.fullName} fontWeight="bold">
				{repository.fullName}
			</Text>
			<Text style={styles.description} color="textSecondary">
				{repository.description}
			</Text>
			<Text style={styles.language}>{repository.language}</Text>
		</View>
	</View>
);

const CountStat = ({ label, count }) => (
	<View style={styles.statItem}>
		<Text fontWeight="bold">{formatCount(count)}</Text>
		<Text color="textSecondary">{label}</Text>
	</View>
);

const RepositoryItemStats = ({ repository }) => (
	<View style={styles.statsRow}>
		<CountStat label="Stars" count={repository.stargazersCount} />
		<CountStat label="Forks" count={repository.forksCount} />
		<CountStat label="Reviews" count={repository.reviewCount} />
		<CountStat label="Rating" count={repository.ratingAverage} />
	</View>
);

const RepositoryItem = ({ repository, showGithubButton = false }) => {
	return (
		<View style={styles.container} testID="repositoryItem">
			<RepositoryItemHeader repository={repository} />
			<RepositoryItemStats repository={repository} />
			{showGithubButton && <GithubButton url={repository.url} />}
		</View>
	);
};

export default RepositoryItem;
