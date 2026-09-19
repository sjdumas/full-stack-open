import { View, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";

const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: "white",
	},
	button: {
		backgroundColor: theme.colors.primary,
		borderRadius: 5,
		padding: 12,
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
});

const initialValues = {
	username: "",
	password: "",
};

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={styles.container}>
			<FormikTextInput name="username" placeholder="Username" />
			<FormikTextInput
				name="password"
				placeholder="Password"
				secureTextEntry
			/>
			<Pressable style={styles.button} onPress={onSubmit}>
				<Text style={styles.buttonText}>Sign in</Text>
			</Pressable>
		</View>
	);
};

const SignIn = () => {
	const onSubmit = (values) => {
		console.log(values);
	};

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

export default SignIn;
