import { useQuery } from "@apollo/client/react";
import { ME } from "../graphql/queries";

const useMyReviews = () => {
	const { data, loading, error, refetch } = useQuery(ME, {
		fetchPolicy: "cache-and-network",
		variables: { includeReviews: true },
	});

	const reviews = data?.me?.reviews
		? data.me.reviews.edges.map((edge) => edge.node)
		: undefined;

	return { reviews, loading, error, refetch };
};

export default useMyReviews;
