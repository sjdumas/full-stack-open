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
	multiline: {
		height: 100,
		textAlignVertical: "top",
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
	ownerName: "",
	repositoryName: "",
	rating: "",
	text: "",
};

const validationSchema = yup.object().shape({
	ownerName: yup.string().required("Repository owner's username is required"),
	repositoryName: yup.string().required("Repository name is required"),
	rating: yup
		.number()
		.typeError("Rating must be a number")
		.min(0, "Rating must be between 0 and 100")
		.max(100, "Rating must be between 0 and 100")
		.required("Rating is required"),
	text: yup.string(),
});

const ReviewForm = ({ onSubmit }) => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{({ handleSubmit }) => (
				<View style={styles.container}>
					<FormikTextInput
						name="ownerName"
						placeholder="Repository owner's username"
					/>
					<FormikTextInput
						name="repositoryName"
						placeholder="Repository name"
					/>
					<FormikTextInput
						name="rating"
						placeholder="Rating between 0 and 100"
						keyboardType="numeric"
					/>
					<FormikTextInput
						name="text"
						placeholder="Review"
						style={styles.multiline}
						multiline
					/>
					<Pressable style={styles.button} onPress={handleSubmit}>
						<Text style={styles.buttonText} fontWeight="bold">
							Create a review
						</Text>
					</Pressable>
				</View>
			)}
		</Formik>
	);
};

export default ReviewForm;
