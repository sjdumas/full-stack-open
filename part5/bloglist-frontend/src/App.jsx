import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, Navigate, useNavigate, useMatch } from "react-router-dom";
import { Container, AppBar, Toolbar, Button, Typography } from "@mui/material";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import BlogListItem from "./components/BlogListItem";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [messageType, setMessageType] = useState("success");

	const blogFormRef = useRef();
	const navigate = useNavigate();

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
				navigate("/");
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
			navigate("/");
		} catch (exception) {
			console.log(exception);
			notify("wrong username or password", "error");
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedBloglistUser");
		setUser(null);
		navigate("/");
	};

	const match = useMatch("/blogs/:id");
	const matchedBlog = match
		? blogs.find(blog => blog.id === match.params.id)
		: null;

	const navButtonStyle = { "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" } };

	return (
		<Container>
			<div>
				<AppBar position="static" style={{ marginBottom: "20px" }}>
					<Toolbar>
						<Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
							Blog App
						</Typography>

						<Button color="inherit" component={Link} to="/" sx={navButtonStyle}>
							Blogs
						</Button>
						{user && (
							<Button color="inherit" component={Link} to="/blogs/new" sx={navButtonStyle}>
								New Blog
							</Button>
						)}
						{user
							? <Button color="inherit" onClick={handleLogout} sx={navButtonStyle}>Logout</Button>
							: <Button color="inherit" component={Link} to="/login" sx={navButtonStyle}>Login</Button>
						}
					</Toolbar>
				</AppBar>

				<Notification message={errorMessage} type={messageType} />

				<Routes>
					<Route
						path="/login"
						element={
							user
								? <Navigate replace to="/" />
								: (
									<LoginForm
										handleLogin={handleLogin}
										username={username}
										password={password}
										setUsername={setUsername}
										setPassword={setPassword}
									/>
								)
						}
					/>
					<Route
						path="/blogs/new"
						element={
							user
								? <BlogForm createBlog={createBlog} />
								: <Navigate replace to="/login" />
						}
					/>
					<Route
						path="/blogs/:id"
						element={
							<Blog
								blog={matchedBlog}
								handleLike={handleLike}
								handleDelete={handleDelete}
								user={user}
							/>
						}
					/>
					<Route
						path="/"
						element={
							<div>
								{user && <p>{user.name} logged in</p>}
								{[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
									<BlogListItem key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user} />
								)}
							</div>
						}
					/>
				</Routes>
			</div>
		</Container>
	);
};

export default App;
