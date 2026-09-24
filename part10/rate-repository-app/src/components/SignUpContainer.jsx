import { View, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: "white",
	},
	button: {
		backgroundColor: theme.colors.primary,
		borderRadius: 5,
		paddingVertical: 10,
		alignItems: "center",
	},
	buttonText: {
		color: "white",
	},
});

const initialValues = {
	username: "",
	password: "",
	passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.min(5, "Username must be at least 5 characters")
		.max(30, "Username must be at most 30 characters")
		.required("Username is required"),
	password: yup
		.string()
		.min(5, "Password must be at least 5 characters")
		.max(50, "Password must be at most 50 characters")
		.required("Password is required"),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match")
		.required("Password confirmation is required"),
});

const SignUpContainer = ({ onSubmit }) => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{({ handleSubmit }) => (
				<View style={styles.container}>
					<FormikTextInput name="username" placeholder="Username" />
					<FormikTextInput
						name="password"
						placeholder="Password"
						secureTextEntry
					/>
					<FormikTextInput
						name="passwordConfirmation"
						placeholder="Password confirmation"
						secureTextEntry
					/>
					<Pressable style={styles.button} onPress={handleSubmit}>
						<Text style={styles.buttonText} fontWeight="bold">
							Sign up
						</Text>
					</Pressable>
				</View>
			)}
		</Formik>
	);
};

export default SignUpContainer;
