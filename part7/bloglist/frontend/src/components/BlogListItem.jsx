import { Link } from "react-router-dom";

const BlogListItem = ({ blog }) => {
	const blogStyle = {
		border: "solid",
		borderWidth: 1,
		marginBottom: 10,
		padding: 5,
		borderColor: "#d4d4d4"
	};

	return (
		<div style={blogStyle} className="blog">
			<Link to={`/blogs/${blog.id}`}>
				{blog.title} {blog.author}
			</Link>
		</div>
	);
};

export default BlogListItem;
