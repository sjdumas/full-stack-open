/*
    TODO: Start here
    1.8: unicafe step 3
    Refactor your application so that displaying the statistics is extracted into its own Statistics component. The state of the application should remain in the App root component.
    https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps
*/

import { useState } from "react";

const Feedback = ({ feedbackTitle }) => <h1>{feedbackTitle}</h1>;
const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ 
    statsTitle, 
    good, 
    neutral, 
    bad,
    total,
    avgScore,
    percentPositive,
}) =>  {
    if (total === 0) {
        return (
            <div>
                <h1>{statsTitle}</h1>
                <p>No feedback provided yet</p>
            </div>
        );
    };

    return (
        <div>
            <h1>{statsTitle}</h1>
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
            <p>All: {total}</p>
            <p>Average: {avgScore}</p>
            <p>Positive: {percentPositive} %</p>
        </div>
    );
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const goodFeedbackHandler = () => setGood(good + 1);
    const neutralFeedbackHandler = () => setNeutral(neutral + 1);
    const badFeedbackHandler = () => setBad(bad + 1);

    const total = good + neutral + bad;
    const avgScore = total === 0 ? 0 : (good - bad) / total;
    const percentPositive = total === 0 ? 0 : (good / total) * 100;

    return (
        <div>
            <Feedback feedbackTitle="Give Feedback" />
            <Button text="Good" onClick={goodFeedbackHandler} />
            <Button text="Neutral" onClick={neutralFeedbackHandler} />
            <Button text="Bad" onClick={badFeedbackHandler} />
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
    );
};

export default App;
