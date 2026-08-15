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
					Username
					<input
						type="text"
						value={username}
						name="Username"
						aria-label="username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					Password
					<input
						type="password"
						value={password}
						name="Password"
						aria-label="password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit" className="login-button">Login</button>
			</form>
		</div>
	);
};

export default LoginForm;
