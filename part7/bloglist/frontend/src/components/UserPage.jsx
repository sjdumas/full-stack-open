import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import usersService from "../services/users";

const UserPage = () => {
	const [users, setUsers] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		usersService.getAll().then((data) => setUsers(data));
	}, []);

	const user = users.find((u) => u.id === id);

	if (!user) {
		return null;
	}

	return (
		<div>
			<Typography variant="h5">{user.name}</Typography>
			<Typography variant="h6" style={{ marginTop: 15 }}>
				added blogs
			</Typography>
			<List dense sx={{ listStyleType: "disc", pl: 4 }}>
				{user.blogs.map((blog) => (
					<ListItem key={blog.id} sx={{ display: "list-item", pl: 0 }}>
						<ListItemText primary={blog.title} />
					</ListItem>
				))}
			</List>
		</div>
	);
};

export default UserPage;
