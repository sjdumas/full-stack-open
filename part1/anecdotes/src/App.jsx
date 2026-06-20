import { useState } from "react";

const Feedback = ({ feedbackTitle }) => <h1>{feedbackTitle}</h1>;
const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const StatisticsLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};

const Statistics = ({
	statsTitle,
	good,
	neutral,
	bad,
	total,
	avgScore,
	percentPositive,
}) => {
	if (total === 0) {
		return (
			<div>
				<h1>{statsTitle}</h1>
				<p>No feedback given</p>
			</div>
		);
	};

	return (
		<div>
			<h1>{statsTitle}</h1>
			<table>
				<tbody>
					<StatisticsLine
						text="good"
						value={good}
					/>
					<StatisticsLine
						text="neutral"
						value={neutral}
					/>
					<StatisticsLine
						text="bad"
						value={bad}
					/>
					<StatisticsLine
						text="all"
						value={total}
					/>
					<StatisticsLine
						text="average"
						value={avgScore}
					/>
					<StatisticsLine
						text="positive"
						value={percentPositive + " %"}
					/>
				</tbody>
			</table>
		</div>
	);
};

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.'
	];

	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

	const total = good + neutral + bad;
	const avgScore = total === 0 ? 0 : (good - bad) / total;
	const percentPositive = total === 0 ? 0 : (good / total) * 100;

	const mostVotesIndex = votes.indexOf(Math.max(...votes));
	const mostVotes = Math.max(...votes);

	const goodFeedbackHandler = () => setGood(good + 1);
	const neutralFeedbackHandler = () => setNeutral(neutral + 1);
	const badFeedbackHandler = () => setBad(bad + 1);

	const anecdotesHandler = () => {
		const randomIndex = Math.floor(Math.random() * anecdotes.length);

		setSelected(randomIndex);
	};

	const voteHandler = () => {
		const newVotes = [...votes]; // Make a copy of votes

		newVotes[selected] += 1; // Increment vote for selected anecdote
		setVotes(newVotes);
	};

	return (
		<div>
			<div>
				<Feedback feedbackTitle="Give Feedback" />
				<Button
					text="Good"
					onClick={goodFeedbackHandler}
				/>
				<Button
					text="Neutral"
					onClick={neutralFeedbackHandler}
				/>
				<Button
					text="Bad"
					onClick={badFeedbackHandler}
				/>
			</div>
			<div>
				<Statistics
					statsTitle="Statistics"
					good={good}
					neutral={neutral}
					bad={bad}
					total={total}
					avgScore={avgScore}
					percentPositive={percentPositive}
				/>
			</div>
			<div>
				<h1>Anecdote of the Day</h1>
				<p>{anecdotes[selected]}</p>
				<p>has {votes[selected]} votes</p>
				<Button
					text="Vote"
					onClick={voteHandler}
				/>
				<Button
					text="Next anecdote"
					onClick={anecdotesHandler}
				/>
			</div>
			<div>
				<h1>Anecdote with Most Votes</h1>
				{/* If no votes exist, display a message; otherwise, display the top anecdote */}
				{mostVotes === 0 ? (
					<p>No votes yet. Vote on some anecdotes!</p>
				) : (
					<div>
						<p>{anecdotes[mostVotesIndex]}</p>
						<p>has {mostVotes} votes</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
