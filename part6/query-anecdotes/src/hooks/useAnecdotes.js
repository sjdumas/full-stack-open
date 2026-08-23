import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote, updateAnecdote } from "../requests";
import { useNotify } from "../NotificationContext";

export const useAnecdotes = () => {
	const queryClient = useQueryClient();
	const notify = useNotify();

	const result = useQuery({
		queryKey: ["anecdotes"],
		queryFn: getAnecdotes,
		retry: 1,
	});

	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(["anecdotes"]);
			queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
			notify(`you created '${newAnecdote.content}'`);
		},
		onError: () => {
			notify("too short anecdote, must have length 5 or more");
		},
	});

	const voteMutation = useMutation({
		mutationFn: updateAnecdote,
		onSuccess: (updatedAnecdote) => {
			const anecdotes = queryClient.getQueryData(["anecdotes"]);
			queryClient.setQueryData(
				["anecdotes"],
				anecdotes.map((anecdote) =>
					anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
				)
			);
			notify(`you voted '${updatedAnecdote.content}'`);
		},
	});

	return {
		anecdotes: result.data,
		isLoading: result.isLoading,
		isError: result.isError,
		addAnecdote: (content) => newAnecdoteMutation.mutate(content),
		vote: (anecdote) => voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
	};
};
