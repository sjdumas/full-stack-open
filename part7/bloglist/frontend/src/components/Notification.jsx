import { Alert } from "@mui/material";
import {
	useNotificationMessage,
	useNotificationType,
} from "../stores/notificationStore";

const Notification = () => {
	const message = useNotificationMessage();
	const type = useNotificationType();

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
