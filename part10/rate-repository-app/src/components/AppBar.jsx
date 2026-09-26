import { View, ScrollView, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useQuery, useApolloClient } from "@apollo/client/react";
import { useNavigate } from "react-router-native";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import AuthStorage from "../utils/authStorage";
import { ME } from "../graphql/queries";

const authStorage = new AuthStorage();

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.appBarBackground,
	},
	scrollView: {
		flexDirection: "row",
		paddingHorizontal: 15,
		paddingBottom: 10,
	},
});

const AppBar = () => {
	const { data } = useQuery(ME, { fetchPolicy: "cache-and-network" });
	const apolloClient = useApolloClient();
	const navigate = useNavigate();

	const signOut = async () => {
		await authStorage.removeAccessToken();
		await apolloClient.resetStore();
		navigate("/");
	};

	const isSignedIn = Boolean(data?.me);

	return (
		<View style={styles.container}>
			<ScrollView horizontal style={styles.scrollView}>
				<AppBarTab text="Repositories" to="/" />
				{isSignedIn && (
					<>
						<AppBarTab text="Create a review" to="/review" />
						<AppBarTab text="My reviews" to="/myreviews" />
					</>
				)}
				{isSignedIn ? (
					<AppBarTab text="Sign out" onPress={signOut} />
				) : (
					<>
						<AppBarTab text="Sign in" to="/signin" />
						<AppBarTab text="Sign up" to="/signup" />
					</>
				)}
			</ScrollView>
		</View>
	);
};

export default AppBar;
