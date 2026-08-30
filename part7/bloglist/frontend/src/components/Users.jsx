import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
} from "@mui/material";
import usersService from "../services/users";

const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		usersService.getAll().then((data) => setUsers(data));
	}, []);

	return (
		<div>
			<Typography variant="h5" style={{ marginBottom: 15 }}>
				Users
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
							<TableCell style={{ fontWeight: "bold" }}>Username</TableCell>
							<TableCell style={{ fontWeight: "bold" }}>Blogs Created</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) => (
							<TableRow key={user.id}>
								<TableCell>
									<Link to={`/users/${user.id}`}>{user.name}</Link>
								</TableCell>
								<TableCell>{user.username}</TableCell>
								<TableCell>{user.blogs.length}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Users;
