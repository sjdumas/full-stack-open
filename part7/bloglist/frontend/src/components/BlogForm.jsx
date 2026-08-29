import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
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
		<div>
			<h2>Create New</h2>
			<form onSubmit={addBlog}>
				<div>
					<TextField
						label="title"
						{...titleProps}
					/>
				</div>
				<div>
					<TextField
						label="author"
						{...authorProps}
					/>
				</div>
				<div>
					<TextField
						label="url"
						{...urlProps}
					/>
				</div>
				<Button type="submit" variant="contained" color="primary">
					Create
				</Button>
			</form>
		</div>
	);
};

export default BlogForm;
