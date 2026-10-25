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
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const avgScore = total === 0 ? 0 : (good - bad) / total;
  const percentPositive = total === 0 ? 0 : (good / total) * 100;

  const goodFeedbackHandler = () => setGood(good + 1);
  const neutralFeedbackHandler = () => setNeutral(neutral + 1);
  const badFeedbackHandler = () => setBad(bad + 1);

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
    </div>
  );
};

export default App;
