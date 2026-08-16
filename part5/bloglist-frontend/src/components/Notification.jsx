import { Alert } from "@mui/material";

const Notification = ({ message, type }) => {
	if (message === null) {
		return null;
	}

	return (
		<Alert
			style={{ marginBottom: "10px" }}
			severity={type === "error" ? "error" : "success"}
		>
			{message}
		</Alert>
	);
};

export default Notification;
