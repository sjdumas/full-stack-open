import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";
import useCreateUser from "../hooks/useCreateUser";
import SignUpContainer from "./SignUpContainer";

const SignUp = () => {
	const [createUser] = useCreateUser();
	const [signIn] = useSignIn();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { username, password } = values;

		try {
			await createUser({ username, password });
			await signIn({ username, password });
			navigate("/");
		} catch (e) {
			console.log(e);
		}
	};

	return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
