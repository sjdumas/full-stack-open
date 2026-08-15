import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, Navigate, useNavigate, useMatch } from "react-router-dom";
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

	return (
		<div>
			<nav>
				<Link to="/">Blogs</Link>
				{user && <Link to="/blogs/new">New Blog</Link>}
				{user
					? <button onClick={handleLogout}>Logout</button>
					: <Link to="/login">Login</Link>
				}
			</nav>

			<h2>Blogs</h2>
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
	);
};

export default App;
