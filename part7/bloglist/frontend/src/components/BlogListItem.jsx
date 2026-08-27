import { Link } from "react-router-dom";

const BlogListItem = ({ blog }) => {
	const blogStyle = {
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
		padding: 5,
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
