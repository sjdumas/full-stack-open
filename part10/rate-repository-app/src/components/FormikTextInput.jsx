import { TextInput, StyleSheet } from "react-native";
import { useField } from "formik";
import theme from "../theme";

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: "#dfe2e5",
		borderRadius: 5,
		padding: 10,
		marginBottom: 15,
		color: theme.colors.textPrimary,
	},
});

const FormikTextInput = ({ name, ...props }) => {
	const [field, ,helpers] = useField(name);

	return (
		<TextInput
			style={styles.input}
			value={field.value}
			onChangeText={(text) => helpers.setValue(text)}
			onBlur={() => helpers.setTouched(true)}
			{...props}
		/>
	);
};

export default FormikTextInput;
