import { View, TextInput, StyleSheet } from "react-native";
import { useField } from "formik";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: "#dfe2e5",
		borderRadius: 5,
		padding: 10,
		color: theme.colors.textPrimary,
	},
	inputError: {
		borderColor: theme.colors.error,
	},
	errorText: {
		color: theme.colors.error,
		marginTop: 5,
	},
	fieldContainer: {
		marginBottom: 15,
	},
});

const FormikTextInput = ({ name, ...props }) => {
	const [field, meta, helpers] = useField(name);
	const showError = meta.touched && meta.error;

	return (
		<View style={styles.fieldContainer}>
			<TextInput
				style={[styles.input, showError && styles.inputError]}
				value={field.value}
				onChangeText={(text) => helpers.setValue(text)}
				onBlur={() => helpers.setTouched(true)}
				{...props}
			/>
			{showError && <Text style={styles.errorText}>{meta.error}</Text>}
		</View>
	);
};

export default FormikTextInput;
