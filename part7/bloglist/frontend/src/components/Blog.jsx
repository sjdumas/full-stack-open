import { Card, CardContent, Typography, Button, Stack } from "@mui/material";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
	if (!blog) {
		return null;
	}

	const showDeleteButton =
		user && blog.user && user.username === blog.user.username;

	return (
		<Card className="blog" style={{ marginTop: 10, maxWidth: 500 }}>
			<CardContent>
				<Typography variant="h5" component="h2">
					{blog.title}
				</Typography>
				<Typography color="text.secondary" gutterBottom>
					By {blog.author}
				</Typography>

				<Typography variant="body2" style={{ marginTop: 10 }}>
					{blog.url}
				</Typography>

				<Stack
					direction="row"
					spacing={2}
					alignItems="center"
					style={{ marginTop: 15 }}
				>
					<Typography>likes {blog.likes}</Typography>
					{user && (
						<Button
							variant="outlined"
							size="small"
							onClick={() => handleLike(blog)}
						>
							like
						</Button>
					)}
				</Stack>

				<Typography color="text.secondary" style={{ marginTop: 10 }}>
					added by {blog.user ? blog.user.name : "unknown"}
				</Typography>

				{showDeleteButton && (
					<Button
						variant="contained"
						color="error"
						size="small"
						style={{ marginTop: 15 }}
						onClick={() => handleDelete(blog)}
					>
						remove
					</Button>
				)}
			</CardContent>
		</Card>
	);
};

export default Blog;
