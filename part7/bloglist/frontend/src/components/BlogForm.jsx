import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Stack, Typography } from "@mui/material";
import { useField } from "../hooks";

const BlogForm = ({ createBlog }) => {
	const title = useField("text");
	const author = useField("text");
	const url = useField("text");
	const navigate = useNavigate();

	const { reset: resetTitle, ...titleProps } = title;
	const { reset: resetAuthor, ...authorProps } = author;
	const { reset: resetUrl, ...urlProps } = url;

	const addBlog = (event) => {
		event.preventDefault();

		createBlog({
			title: title.value,
			author: author.value,
			url: url.value,
		});

		resetTitle();
		resetAuthor();
		resetUrl();
		navigate("/");
	};

	return (
		<Paper style={{ padding: 24, maxWidth: 600, marginTop: 20 }}>
			<Typography variant="h5" gutterBottom>
				Create New
			</Typography>
			<form onSubmit={addBlog}>
				<Stack spacing={2}>
					<TextField label="title" fullWidth {...titleProps} />
					<TextField label="author" fullWidth {...authorProps} />
					<TextField label="url" fullWidth {...urlProps} />
					<Button type="submit" variant="contained" color="primary">
						Create
					</Button>
				</Stack>
			</form>
		</Paper>
	);
};

export default BlogForm;
