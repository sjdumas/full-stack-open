import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote, updateAnecdote } from "../requests";

export const useAnecdotes = () => {
	const queryClient = useQueryClient();

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
