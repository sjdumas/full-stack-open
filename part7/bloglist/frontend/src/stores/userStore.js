import { create } from "zustand";
import blogService from "../services/blogs";

export const useUserStore = create((set) => ({
	user: null,
	actions: {
		setUser: (user) => set(() => ({ user })),
		login: (user) => {
			window.localStorage.setItem(
				"loggedBloglistUser",
				JSON.stringify(user)
			);
			blogService.setToken(user.token);
			set(() => ({ user }));
		},
		logout: () => {
			window.localStorage.removeItem("loggedBloglistUser");
			blogService.setToken(null);
			set(() => ({ user: null }));
		},
		initializeUser: () => {
			const loggedUserJSON =
				window.localStorage.getItem("loggedBloglistUser");

			if (loggedUserJSON) {
				const user = JSON.parse(loggedUserJSON);
				blogService.setToken(user.token);
				set(() => ({ user }));
			}
		},
	},
}));

export const useUser = () => useUserStore((state) => state.user);
export const useUserActions = () => useUserStore((state) => state.actions);
