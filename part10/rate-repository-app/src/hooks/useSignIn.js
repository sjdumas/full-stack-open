import { useMutation, useApolloClient } from "@apollo/client/react";
import { AUTHENTICATE } from "../graphql/mutations";
import AuthStorage from "../utils/authStorage";

const authStorage = new AuthStorage();

const useSignIn = () => {
	const [mutate, result] = useMutation(AUTHENTICATE);
	const apolloClient = useApolloClient();

	const signIn = async ({ username, password }) => {
		const response = await mutate({
			variables: {
				credentials: { username, password },
			},
		});

		const { data } = response;

		await authStorage.setAccessToken(data.authenticate.accessToken);
		await apolloClient.resetStore();

		return response;
	};

	return [signIn, result];
};

export default useSignIn;
