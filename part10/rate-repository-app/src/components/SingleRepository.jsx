import { useParams } from "react-router-native";
import { View, ActivityIndicator } from "react-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";

const SingleRepository = () => {
	const { id } = useParams();
	const { repository, loading } = useRepository(id);

	if (loading) {
		return <ActivityIndicator size="large" />;
	}

	if (!repository) {
		return null;
	}

	return (
		<View>
			<RepositoryItem repository={repository} showGithubButton />
		</View>
	);
};

export default SingleRepository;
