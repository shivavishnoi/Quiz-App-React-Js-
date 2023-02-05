import Quiz from './components/Quiz';
import { useEffect, useState } from 'react';
import { ProgressBar } from 'react-loader-spinner';
function App() {
  const [tags, setTags] = useState(null);
  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((data) => {
        setTags(data);
      });
  }, []);
  return (
    <div className="App container">
      {tags ? (
        <Quiz tags={tags} />
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
    </div>
  );
}

export default App;
