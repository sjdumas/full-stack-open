import { create } from "zustand";
import anecdoteService from "./services/anecdotes";
import useNotificationStore from "./notificationStore";

const useAnecdoteStore = create((set, get) => ({
	anecdotes: [],
	filter: "",
	actions: {
		vote: async (id) => {
			const anecdotes = get().anecdotes;
			const anecdoteToVote = anecdotes.find((a) => a.id === id);
			const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 };

			const returnedAnecdote = await anecdoteService.update(updatedAnecdote);

			set((state) => ({
				anecdotes: state.anecdotes.map((anecdote) =>
					anecdote.id === id ? returnedAnecdote : anecdote
				),
			}));

			useNotificationStore.getState().actions.showNotification(`you voted '${returnedAnecdote.content}'`);
		},
		add: async (content) => {
			const newAnecdote = await anecdoteService.createNew(content);
			set((state) => ({
				anecdotes: state.anecdotes.concat(newAnecdote),
			}));

			useNotificationStore.getState().actions.showNotification(`you created '${newAnecdote.content}'`);
		},
		remove: async (id) => {
			await anecdoteService.remove(id);
			set((state) => ({
				anecdotes: state.anecdotes.filter((anecdote) => anecdote.id !== id),
			}));

			useNotificationStore.getState().actions.showNotification(`you deleted an anecdote`);
		},
		setFilter: (value) => set(() => ({ filter: value })),
		initialize: async () => {
			const anecdotes = await anecdoteService.getAll();
			set(() => ({ anecdotes }));
		},
	},
}));

export const useAnecdotes = () => {
	const anecdotes = useAnecdoteStore((state) => state.anecdotes);
	const filter = useAnecdoteStore((state) => state.filter);

	return anecdotes.filter((anecdote) =>
		anecdote.content.toLowerCase().includes(filter.toLowerCase())
	);
};

export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions);
