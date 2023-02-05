import { useEffect, useState } from 'react';
import Header from './Header';
import TagCards from './TagCards';
import { Route, Switch } from 'react-router-dom';
import Questions from './Questions';
import Results from './Results';

export default function Quiz(props) {
  const [selectedTag, setSelectedTag] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [selectedCard, setSelectedCard] = useState('');
  const [results, setResults] = useState([]);

  const updateTag = (tag) => {
    setSelectedTag(tag);
  };
  const updateDifficulty = (e) => {
    setDifficulty(e.target.value);
  };
  const updateSelectedCard = (id) => {
    setSelectedCard(id);
  };
  const updateSelectedOption = (e, i, q) => {
    // console.log(e.target.innerText, i);
    const newResults = [...results];
    newResults[i] = {
      question: q.question,
      correctAnswer: q.correct_answer,
      chosenAnswer: e.target.innerText,
    };
    setResults(newResults);
    console.log(results);
  };
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          <section className="top-tags">
            {[
              ...new Set(
                props.tags.trivia_categories.map(
                  (tag) => tag.name.split(':')[0]
                )
              ),
            ].map((tag, i) => (
              <span
                key={i}
                className={selectedTag == tag ? 'tag active-tag' : 'tag'}
                onClick={() => updateTag(tag)}
              >
                {tag}
              </span>
            ))}
          </section>
          <section className="user-choice padding-2">
            <div className="flex wrap">
              <form className="user-difficulty">
                <label htmlFor="level">Difficulty </label>
                <select
                  name="level"
                  id="level"
                  defaultValue={difficulty}
                  onChange={updateDifficulty}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </form>
              <h5>Selected Category - {selectedTag}</h5>
              {selectedTag ? (
                <>
                  <span
                    className="remove-selected"
                    onClick={() => updateTag('')}
                  >
                    &#10754;
                  </span>
                </>
              ) : (
                ''
              )}
            </div>
          </section>
          <TagCards
            selectedTag={selectedTag}
            allTags={props.tags}
            difficulty={difficulty}
            updateSelectedCard={updateSelectedCard}
          />
        </Route>
        <Route path="/random-quiz">
          <Questions
            selectedCard=""
            difficulty=""
            updateSelectedOption={updateSelectedOption}
          />
        </Route>
        <Route path="/quiz">
          <Questions
            selectedCard={selectedCard}
            difficulty={difficulty}
            updateSelectedOption={updateSelectedOption}
          />
        </Route>
        <Route path="/show_results">
          <Results results={results} />
        </Route>
      </Switch>
    </>
  );
}
