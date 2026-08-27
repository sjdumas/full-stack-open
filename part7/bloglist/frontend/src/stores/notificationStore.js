import { create } from "zustand";

let timeoutId = null;

export const useNotificationStore = create((set) => ({
	message: null,
	type: "success",
	actions: {
		showNotification: (message, type = "success", seconds = 5) => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			set(() => ({ message, type }));
			timeoutId = setTimeout(() => {
				set(() => ({ message: null }));
				timeoutId = null;
			}, seconds * 1000);
		},
		clearNotification: () => set(() => ({ message: null })),
	},
}));

export const useNotificationMessage = () =>
	useNotificationStore((state) => state.message);
export const useNotificationType = () =>
	useNotificationStore((state) => state.type);
export const useNotificationActions = () =>
	useNotificationStore((state) => state.actions);
