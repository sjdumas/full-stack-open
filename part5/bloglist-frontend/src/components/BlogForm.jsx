import { useState } from "react";

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const addBlog = (event) => {
		event.preventDefault();

		createBlog({
			title,
			author,
			url,
		});

		setTitle("");
		setAuthor("");
		setUrl("");
	};

	return (
		<div>
			<h2>Create New</h2>
			<form onSubmit={addBlog}>
				<div>
					Title
					<input
						value={title}
						aria-label="title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					Author
					<input
						value={author}
						aria-label="author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					URL
					<input
						value={url}
						aria-label="url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

export default BlogForm;
