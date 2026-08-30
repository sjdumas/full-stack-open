import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Stack, Typography } from "@mui/material";
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
		<Paper style={{ padding: 24, maxWidth: 500, marginTop: 20 }}>
			<Typography variant="h5" gutterBottom>
				Log In to Application
			</Typography>
			<form onSubmit={handleLogin}>
				<Stack spacing={2}>
					<TextField label="username" fullWidth {...usernameProps} />
					<TextField label="password" fullWidth {...passwordProps} />
					<Button type="submit" variant="contained" color="primary">
						Login
					</Button>
				</Stack>
			</form>
		</Paper>
	);
};

export default LoginForm;
