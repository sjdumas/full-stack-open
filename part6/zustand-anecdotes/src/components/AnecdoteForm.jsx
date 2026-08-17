import { useAnecdoteActions } from "../store";

const getId = () => (100000 * Math.random()).toFixed(0);

const AnecdoteForm = () => {
	const { add } = useAnecdoteActions();

	const addAnecdote = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		add({
			content,
			id: getId(),
			votes: 0,
		});
		event.target.reset();
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input name="anecdote" />
				</div>
				<button>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
