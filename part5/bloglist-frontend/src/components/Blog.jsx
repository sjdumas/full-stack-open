import { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
	const [detailsVisible, setDetailsVisible] = useState(false);

	const toggleDetails = () => {
		setDetailsVisible(!detailsVisible);
	};

	const blogStyle = {
		//paddingTop: 10,
		//paddingLeft: 10,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	const showDeleteButton = user && blog.user && user.username === blog.user.username;

	return (
		<div style={blogStyle} className="blog">
			{blog.title} {blog.author}
			<button onClick={toggleDetails}>
				{detailsVisible ? "hide" : "view"}
			</button>
			{detailsVisible && (
				<div className="blogDetails">
					<div>{blog.url}</div>
					<div>
						likes {blog.likes}
						<button onClick={() => handleLike(blog)}>like</button>
					</div>
					<div>{blog.user ? blog.user.name : "unknown"}</div>
					{showDeleteButton && (
						<button onClick={() => handleDelete(blog)}>remove</button>
					)}
				</div>
			)}
		</div>
	);
};

export default Blog;
