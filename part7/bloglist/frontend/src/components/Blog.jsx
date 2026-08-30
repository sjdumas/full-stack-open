import { Card, CardContent, Typography, Button, Stack, TextField } from "@mui/material";
import { useField } from "../hooks";

const Blog = ({ blog, handleLike, handleDelete, handleComment, user }) => {
	const comment = useField("text");

	if (!blog) {
		return null;
	}

	const showDeleteButton =
		user && blog.user && user.username === blog.user.username;

	const { reset: resetComment, ...commentProps } = comment;

	const addComment = (event) => {
		event.preventDefault();
		handleComment(blog.id, comment.value);
		resetComment();
	};

	return (
		<Card className="blog" style={{ marginTop: 10 }}>
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

				<Typography variant="h6" style={{ marginTop: 20 }}>
					comments
				</Typography>

				<form onSubmit={addComment}>
					<Stack direction="row" spacing={1} alignItems="center" style={{ marginBottom: 10 }}>
						<TextField {...commentProps} label="comment" size="small" fullWidth />
						<Button type="submit" variant="outlined" size="small" style={{ flexShrink: 0 }}>
							add comment
						</Button>
					</Stack>
				</form>

				<ul>
					{blog.comments.map((comment, index) => (
						<li key={index}>{comment}</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
};

export default Blog;
