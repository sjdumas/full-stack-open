import { View, Text, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: "white",
	},
	topRow: {
		flexDirection: "row",
		marginBottom: 10,
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
		fontWeight: "bold",
		fontSize: 16,
		marginBottom: 5,
	},
	description: {
		color: "grey",
		marginBottom: 5,
	},
	language: {
		alignSelf: "flex-start",
		backgroundColor: "#0366d6",
		color: "#ffffff",
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 5,
		overflow: "hidden",
	},
	statusRow: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	statItem: {
		alignItems: "center",
	},
	statCount: {
		fontWeight: "bold",
	},
});

const formatCount = (count) => {
	if (count >= 1000) {
		return `${(count / 1000).toFixed(1)}k`;
	}
	return count.toString();
};

const RepositoryItem = ({ repository }) => {
	return (
		<View style={styles.container}>
			<View style={styles.topRow}>
				<Image
					style={styles.avatar}
					source={{ uri: repository.ownerAvatarUrl }}
				/>
				<View style={styles.infoContainer}>
					<Text style={styles.fullName}>{repository.fullName}</Text>
					<Text style={styles.description}>{repository.description}</Text>
					<Text style={styles.language}>{repository.language}</Text>
				</View>
			</View>
			<View style={styles.statsRow}>
				<View style={styles.statItem}>
					<Text style={styles.statCount}>
						{formatCount(repository.stargazersCount)}
					</Text>
					<Text>Stars</Text>
				</View>
				<View style={styles.statItem}>
					<Text style={styles.statCount}>
						{formatCount(repository.forksCount)}
					</Text>
					<Text>Forks</Text>
				</View>
				<View style={styles.statItem}>
					<Text style={styles.statCount}>{repository.reviewCount}</Text>
					<Text>Reviews</Text>
				</View>
				<View style={styles.statItem}>
					<Text style={styles.statCount}>{repository.ratingAverage}</Text>
					<Text>Rating</Text>
				</View>
			</View>
		</View>
	);
};

export default RepositoryItem;
