import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
	const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: "cache-and-network",
		variables,
	});

	const repositories = data?.repositories
		? data.repositories.edges.map((edge) => edge.node)
		: undefined;

	return { repositories, loading, refetch };
};

export default useRepositories;
