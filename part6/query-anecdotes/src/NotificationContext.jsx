import { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
	const [notification, setNotification] = useState(null);

	return (
		<NotificationContext.Provider value={{ notification, setNotification }}>
			{props.children}
		</NotificationContext.Provider>
	);
};

export const useNotificationValue = () => {
	const { notification } = useContext(NotificationContext);
	return notification;
};

export const useNotify = () => {
	const { setNotification } = useContext(NotificationContext);

	return (message) => {
		setNotification(message);
		setTimeout(() => {
			setNotification(null);
		}, 5000);
	};
};

export default NotificationContext;
