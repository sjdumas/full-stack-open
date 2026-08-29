import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import loginService from "../services/login";
import { useUserActions } from "../stores/userStore";
import { useNotificationActions } from "../stores/notificationStore";
import { useField } from "../hooks";

const LoginForm = () => {
	const username = useField("text");
	const password = useField("password");
	const { login } = useUserActions();
	const { showNotification } = useNotificationActions();
	const navigate = useNavigate();

	const { reset: resetUsername, ...usernameProps } = username;
	const { reset: resetPassword, ...passwordProps } = password;

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username: username.value,
				password: password.value,
			});
			login(user);
			resetUsername();
			resetPassword();
			navigate("/");
		} catch (exception) {
			showNotification("wrong username or password", "error");
		}
	};

	return (
		<div>
			<h2>Log In to Application</h2>
			<form onSubmit={handleLogin}>
				<div>
					<TextField
						label="username"
						{...usernameProps}
					/>
				</div>
				<div>
					<TextField
						label="password"
						{...passwordProps}
					/>
				</div>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					style={{ marginTop: "10px" }}
				>
					Login
				</Button>
			</form>
		</div>
	);
};

export default LoginForm;
