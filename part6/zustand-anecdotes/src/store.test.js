import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

vi.mock("./services/anecdotes", () => ({
	default: {
		getAll: vi.fn(),
		createNew: vi.fn(),
		update: vi.fn(),
		remove: vi.fn(),
	},
}));

import anecdoteService from "./services/anecdotes";
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from "./store";

beforeEach(() => {
	useAnecdoteStore.setState({ anecdotes: [], filter: "" });
	vi.clearAllMocks();
});

describe("useAnecdoteStore", () => {
	it("initializes anecdotes from the service", async () => {
		const mockAnecdotes = [
			{ id: "1", content: "Test Anecdote 1", votes: 0 },
			{ id: "2", content: "Test Anecdote 2", votes: 0 },
		];
		anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

		const { result } = renderHook(() => useAnecdoteActions());

		await act(async () => {
			await result.current.initialize();
		});

		const { result: anecdotesResult } = renderHook(() => useAnecdotes());
		expect(anecdotesResult.current).toEqual(mockAnecdotes);
	});
});

describe("useAnecdotes", () => {
	it("returns anecdotes sorted by votes, most votes first", () => {
		const mockAnecdotes = [
			{ id: "1", content: "Medium Voted Anecdote", votes: 5 },
			{ id: "2", content: "Most Voted Anecdote", votes: 10 },
			{ id: "3", content: "Least Voted Anecdote", votes: 3 },
		];
		useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: "" });

		const { result } = renderHook(() => useAnecdotes());

		expect(result.current.map((a) => a.id)).toEqual(["2", "1", "3"]);
	});
});

describe("useAnecdotes filtering", () => {
	const anecdotes = [
		{ id: "1", content: "Learning React is fun", votes: 3 },
		{ id: "2", content: "Zustand is simple", votes: 5 },
		{ id: "3", content: "Testing takes practice", votes: 1 },
	];

	beforeEach(() => {
		useAnecdoteStore.setState({ anecdotes, filter: "" });
	});

	it("returns all anecdotes when filter is empty", () => {
		const { result } = renderHook(() => useAnecdotes());
		expect(result.current).toHaveLength(3);
	});

	it("returns only anecdotes matching the filter text", () => {
		useAnecdoteStore.setState({ anecdotes, filter: "react" });

		const { result } = renderHook(() => useAnecdotes());

		expect(result.current).toHaveLength(1);
		expect(result.current[0].id).toBe("1");
	});

	it("filter matching is case-insensitive", () => {
		useAnecdoteStore.setState({ anecdotes, filter: "ZUSTAND" });

		const { result } = renderHook(() => useAnecdotes());

		expect(result.current).toHaveLength(1);
		expect(result.current[0].id).toBe("2");
	});
});

describe("voting", () => {
	it("increases the vote count of the voted anecdote", async () => {
		const anecdote = { id: "1", content: "Vote for me", votes: 3 };
		useAnecdoteStore.setState({ anecdotes: [anecdote], filter: "" });

		anecdoteService.update.mockResolvedValue({ ...anecdote, votes: 4 });

		const { result } = renderHook(() => useAnecdoteActions());

		await act(async () => {
			await result.current.vote("1");
		});

		const { result: anecdotesResult } = renderHook(() => useAnecdotes());
		expect(anecdotesResult.current[0].votes).toBe(4);
	});
});