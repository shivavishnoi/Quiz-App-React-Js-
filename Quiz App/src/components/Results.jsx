import { Link } from 'react-router-dom';

export default function Results(props) {
  const totalScore = props.results.reduce((acc, cv) => {
    if (cv.correctAnswer == cv.chosenAnswer) {
      acc++;
    }
    return acc;
  }, 0);
  return (
    <section className="results">
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Correct Answer</th>
            <th>Your Answer</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {props.results.map((row, i) => (
            <tr key={i}>
              <td>{row.question}</td>
              <td>{row.correctAnswer}</td>
              <td>{row.chosenAnswer}</td>
              <td>
                {row.correctAnswer == row.chosenAnswer ? (
                  <span>&#x2713;</span>
                ) : (
                  <span>&#xd7;</span>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td>Total Score</td>
            <td>{totalScore}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <Link to="/" className="random-quiz">
        <button>Back to Home</button>
      </Link>
    </section>
  );
}
