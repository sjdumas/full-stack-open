import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id, first) => {
	const { data, loading, error, refetch, fetchMore } = useQuery(GET_REPOSITORY, {
		variables: { id, first },
		fetchPolicy: "cache-and-network",
	});

const handleFetchMore = () => {
	const canFetchMore =
		!loading && data?.repository?.reviews?.pageInfo?.hasNextPage;

	if (!canFetchMore) {
		return;
	}

	fetchMore({
		variables: {
			id,
			first,
			after: data.repository.reviews.pageInfo.endCursor,
		},
	});
};

	return {
		repository: data?.repository,
		loading,
		error,
		refetch,
		fetchMore: handleFetchMore,
	};
};

export default useRepository;
