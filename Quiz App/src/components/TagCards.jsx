import { Link } from 'react-router-dom';
export default function TagCards(props) {
  return (
    <>
      <section className="random-quiz ">
        {props.selectedTag == '' ? (
          <Link to="/random-quiz">
            <button>Take a Random Quiz</button>
          </Link>
        ) : (
          ''
        )}
      </section>
      <section className="tags-cards flex wrap justify-center">
        {props.allTags.trivia_categories
          .filter((tag) => tag.name.includes(props.selectedTag))
          .map((tag, i) => (
            <div className="single-tag-card flex-18" key={i}>
              <span>{tag.name}</span>
              <br />
              <Link to="/quiz">
                <button onClick={() => props.updateSelectedCard(tag.id)}>
                  Take this Quiz
                </button>
              </Link>
            </div>
          ))}
      </section>
    </>
  );
}
