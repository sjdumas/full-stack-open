import { TextField, Button } from "@mui/material";

const LoginForm = ({
	handleLogin,
	username,
	password,
	setUsername,
	setPassword,
}) => {
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
				<Button type="submit" variant="contained" color="primary" style={{ marginTop: "10px" }}>
					Login
				</Button>
			</form>
		</div>
	);
};

export default LoginForm;
