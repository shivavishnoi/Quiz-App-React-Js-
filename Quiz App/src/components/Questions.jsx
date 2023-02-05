import { useEffect, useState } from 'react';
import { ProgressBar } from 'react-loader-spinner';
import { Line } from 'rc-progress';
import { Link } from 'react-router-dom';

export default function Questions(props) {
  const [questions, setQuestions] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);

  const increaseQuestionIndex = () => {
    setQuestionIndex(questionIndex + 1);
  };
  const decreaseQuestionIndex = () => {
    setQuestionIndex(questionIndex - 1);
  };

  let url =
    props.selectedCard === ''
      ? 'https://opentdb.com/api.php?amount=10&type=multiple'
      : `https://opentdb.com/api.php?amount=10&category=${props.selectedCard}&difficulty=${props.difficulty}&type=multiple`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        data.results.forEach((elm) => {
          elm.options = [...elm.incorrect_answers];
          elm.options[elm.options.length] = elm.correct_answer;
          elm.options.sort(() => Math.random() - 0.5);
        });
        setQuestions(data);
      });
  }, []);
  return (
    <section className="questions">
      <Line percent={(questionIndex + 1) * 10} strokeColor="green" />
      {questions ? (
        <>
          <h2 className="padding-3">{`Q${questionIndex + 1}) ${
            questions.results[questionIndex].question
          }`}</h2>
          <div className="options">
            <ol type="A">
              {questions.results[questionIndex].options.map((option, i) => (
                <li
                  onClick={(e) =>
                    props.updateSelectedOption(
                      e,
                      questionIndex,
                      questions.results[questionIndex]
                    )
                  }
                  key={i}
                >
                  {option}
                </li>
              ))}
            </ol>
          </div>
          <div className="que-buttons">
            <div className="flex justify-between">
              {questionIndex !== 0 ? (
                <button onClick={decreaseQuestionIndex}>Previous</button>
              ) : (
                ''
              )}
              {questionIndex !== 9 ? (
                <button onClick={increaseQuestionIndex}>Next</button>
              ) : (
                ''
              )}
            </div>
            {questionIndex == 9 ? (
              <Link to="/show_results">
                <button>Show Results</button>
              </Link>
            ) : (
              ''
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center padding-1">
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        </div>
      )}
    </section>
  );
}

//  <div>{`A) ${questions.results[questionIndex].options[0]}`}</div>
//             <div>{`B) ${questions.results[questionIndex].options[1]}`}</div>
//             <div>{`C) ${questions.results[questionIndex].options[2]}`}</div>
//             <div>{`D) ${questions.results[questionIndex].options[3]}`}</div>
