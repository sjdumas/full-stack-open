import { useEffect } from "react";
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
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import BlogListItem from "./components/BlogListItem";
import ErrorBoundary from "./components/ErrorBoundary";
import { PageNotFound } from "./components/PageNotFound";
import { useUser, useUserActions } from "./stores/userStore";
import { useNotificationActions } from "./stores/notificationStore";
import { useBlogs, useBlogActions } from "./stores/blogStore";

const App = () => {
	const user = useUser();
	const { initializeUser, logout } = useUserActions();
	const { showNotification } = useNotificationActions();
	const blogs = useBlogs();
	const { initializeBlogs, createBlog, likeBlog, deleteBlog } = useBlogActions();
	const navigate = useNavigate();

	useEffect(() => {
		initializeBlogs();
	}, [initializeBlogs]);

	useEffect(() => {
		initializeUser();
	}, [initializeUser]);

	const handleCreate = async (blogObject) => {
		try {
			const newBlog = await createBlog(blogObject, user);
			showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`);
		} catch (exception) {
			console.log(exception);
			showNotification("creating blog failed", "error");
		}
	};

	const handleLike = async (blog) => {
		try {
			await likeBlog(blog);
		} catch (exception) {
			console.log(exception);
			showNotification("updating blog failed", "error");
		}
	};

	const handleDelete = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			try {
				await deleteBlog(blog);
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
						{user ? (
							<Button color="inherit" onClick={handleLogout} sx={navButtonStyle}>
								Logout
							</Button>
						) : (
							<Button color="inherit" component={Link} to="/login" sx={navButtonStyle}>
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
							element={user ? <Navigate replace to="/" /> : <LoginForm />}
						/>
						<Route
							path="/blogs/new"
							element={
								user ? (
									<BlogForm createBlog={handleCreate} />
								) : (
									<Navigate replace to="/login" />
								)
							}
						/>
						<Route
							path="/blogs/:id"
							element={<Blog blog={matchedBlog} handleLike={handleLike} handleDelete={handleDelete} user={user} />}
						/>
						<Route
							path="/"
							element={
								<div>
									{user && <p>{user.name} logged in</p>}
									{[...blogs]
										.sort((a, b) => b.likes - a.likes)
										.map((blog) => (
											<BlogListItem key={blog.id} blog={blog} />
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
