import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [messageType, setMessageType] = useState("success");

	const blogFormRef = useRef();

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		);
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const notify = (message, type = "success") => {
		setErrorMessage(message);
		setMessageType(type);
		setTimeout(() => {
			setErrorMessage(null);
		}, 5000);
	};

	const createBlog = async (blogObject) => {
		try {
			const newBlog = await blogService.create(blogObject);

			const blogWithUser = {
				...newBlog,
				user: { username: user.username, name: user.name, id: user.id },
			};

			blogFormRef.current.toggleVisibility();
			setBlogs(blogs.concat(blogWithUser));
			notify(`a new blog ${newBlog.title} by ${newBlog.author} added`);
		} catch (exception) {
			console.log(exception);
			notify("creating blog failed", "error");
		}
	};

	const handleLike = async (blog) => {
		try {
			const updatedBlog = await blogService.update(blog.id, {
				...blog,
				likes: blog.likes + 1,
				user: blog.user ? blog.user.id : null,
			});

			setBlogs(blogs.map(b => b.id === blog.id ? { ...updatedBlog, user: blog.user } : b));
		} catch (exception) {
			console.log(exception);
			notify("updating blog failed", "error");
		}
	};

	const handleDelete = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			try {
				await blogService.remove(blog.id);
				setBlogs(blogs.filter(b => b.id !== blog.id));
				notify(`blog ${blog.title} removed`);
			} catch (exception) {
				console.log(exception);
				notify("removing blog failed", "error");
			}
		}
	};

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({ username, password });

			window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));

			blogService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
		} catch (exception) {
			console.log(exception);
			notify("wrong username or password", "error");
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedBloglistUser");
		setUser(null);
	};

	if (user === null) {
		return (
			<div>
				<h2>Log In to Application</h2>
				<Notification message={errorMessage} type={messageType} />
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
	}

	return (
		<div>
			<h2>Blogs</h2>
			<Notification message={errorMessage} type={messageType} />
			<p>
				{user.name} logged in
				<button onClick={handleLogout}>Logout</button>
			</p>
			<Togglable buttonLabel="New Blog" ref={blogFormRef}>
				<BlogForm createBlog={createBlog} />
			</Togglable>
			{[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
				<Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user} />
			)}
		</div>
	);
};

export default App;
