import { useState, useEffect } from "react";
import {
	Routes,
	Route,
	Link,
	Navigate,
	useNavigate,
	useMatch,
} from "react-router-dom";
import { Container, AppBar, Toolbar, Button, Typography } from "@mui/material";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import BlogListItem from "./components/BlogListItem";
import ErrorBoundary from "./components/ErrorBoundary";
import { PageNotFound } from "./components/PageNotFound";
import { useUser, useUserActions } from "./stores/userStore";
import { useNotificationActions } from "./stores/notificationStore";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const user = useUser();
	const { initializeUser, logout } = useUserActions();
	const { showNotification } = useNotificationActions();
	const navigate = useNavigate();

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		initializeUser();
	}, [initializeUser]);

	const createBlog = async (blogObject) => {
		try {
			const newBlog = await blogService.create(blogObject);

			const blogWithUser = {
				...newBlog,
				user: { username: user.username, name: user.name, id: user.id },
			};

			setBlogs(blogs.concat(blogWithUser));
			showNotification(
				`a new blog ${newBlog.title} by ${newBlog.author} added`
			);
		} catch (exception) {
			console.log(exception);
			showNotification("creating blog failed", "error");
		}
	};

	const handleLike = async (blog) => {
		try {
			const updatedBlog = await blogService.update(blog.id, {
				...blog,
				likes: blog.likes + 1,
				user: blog.user ? blog.user.id : null,
			});

			setBlogs(
				blogs.map((b) =>
					b.id === blog.id ? { ...updatedBlog, user: blog.user } : b
				)
			);
		} catch (exception) {
			console.log(exception);
			showNotification("updating blog failed", "error");
		}
	};

	const handleDelete = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			try {
				await blogService.remove(blog.id);
				setBlogs(blogs.filter((b) => b.id !== blog.id));
				showNotification(`blog ${blog.title} removed`);
				navigate("/");
			} catch (exception) {
				console.log(exception);
				showNotification("removing blog failed", "error");
			}
		}
	};

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const match = useMatch("/blogs/:id");
	const matchedBlog = match
		? blogs.find((blog) => blog.id === match.params.id)
		: null;

	const navButtonStyle = {
		"&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
	};

	return (
		<Container>
			<div>
				<AppBar position="static" style={{ marginBottom: "20px" }}>
					<Toolbar>
						<Typography
							variant="h6"
							component="div"
							style={{ flexGrow: 1 }}
						>
							Blog App
						</Typography>

						<Button
							color="inherit"
							component={Link}
							to="/"
							sx={navButtonStyle}
						>
							Blogs
						</Button>
						{user && (
							<Button
								color="inherit"
								component={Link}
								to="/blogs/new"
								sx={navButtonStyle}
							>
								New Blog
							</Button>
						)}
						{user ? (
							<Button
								color="inherit"
								onClick={handleLogout}
								sx={navButtonStyle}
							>
								Logout
							</Button>
						) : (
							<Button
								color="inherit"
								component={Link}
								to="/login"
								sx={navButtonStyle}
							>
								Login
							</Button>
						)}
					</Toolbar>
				</AppBar>

				<Notification />

				<ErrorBoundary>
					<Routes>
						<Route
							path="/login"
							element={
								user ? (
									<Navigate replace to="/" />
								) : (
									<LoginForm />
								)
							}
						/>
						<Route
							path="/blogs/new"
							element={
								user ? (
									<BlogForm createBlog={createBlog} />
								) : (
									<Navigate replace to="/login" />
								)
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
									{[...blogs]
										.sort((a, b) => b.likes - a.likes)
										.map((blog) => (
											<BlogListItem
												key={blog.id}
												blog={blog}
												handleLike={handleLike}
												handleDelete={handleDelete}
												user={user}
											/>
										))}
								</div>
							}
						/>
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</ErrorBoundary>
			</div>
		</Container>
	);
};

export default App;
