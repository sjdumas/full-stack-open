import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import loginService from "../services/login";
import { useUserActions } from "../stores/userStore";
import { useNotificationActions } from "../stores/notificationStore";

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useUserActions();
	const { showNotification } = useNotificationActions();
	const navigate = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({ username, password });
			login(user);
			setUsername("");
			setPassword("");
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
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					<TextField
						label="password"
						type="password"
						value={password}
						onChange={({ target }) => setPassword(target.value)}
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
