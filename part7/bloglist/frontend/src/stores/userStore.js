import { create } from "zustand";
import blogService from "../services/blogs";
import persistentUser from "../services/persistentUser";

export const useUserStore = create((set) => ({
	user: null,
	actions: {
		setUser: (user) => set(() => ({ user })),
		login: (user) => {
			persistentUser.saveUser(user);
			blogService.setToken(user.token);
			set(() => ({ user }));
		},
		logout: () => {
			persistentUser.removeUser();
			blogService.setToken(null);
			set(() => ({ user: null }));
		},
		initializeUser: () => {
			const user = persistentUser.getUser();

			if (user) {
				blogService.setToken(user.token);
				set(() => ({ user }));
			}
		},
	},
}));

export const useUser = () => useUserStore((state) => state.user);
export const useUserActions = () => useUserStore((state) => state.actions);
