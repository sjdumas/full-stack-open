import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import usersService from "../services/users";

const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		usersService.getAll().then((data) => setUsers(data));
	}, []);

	const cellStyle = {
		textAlign: "left",
		padding: "6px 12px",
	};

	return (
		<div>
			<h2>Users</h2>
			<table style={{ borderCollapse: "collapse" }}>
				<thead>
					<tr>
						<th style={cellStyle}>username</th>
						<th style={cellStyle}>name</th>
						<th style={cellStyle}>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td style={cellStyle}>{user.username}</td>
							<td style={cellStyle}>
								<Link to={`/users/${user.id}`}>{user.name}</Link>
							</td>
							<td style={cellStyle}>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Users;
