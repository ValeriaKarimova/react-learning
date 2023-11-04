import { useContext, useEffect } from 'react';
import './results.scss';
import { SearchContext } from '../../services/search-context';
import { Dictionary } from '../../models/response.model';

function Loader() {
  return <div className="loader"></div>;
}

interface ResultsProps {
  url: string;
}

export default function Results({ url }: ResultsProps) {
  const searchContext = useContext(SearchContext)?.searchContext;
  console.log(url);

  useEffect(() => {
    if (searchContext) searchContext.getData(url);
  }, [url]);

  if (searchContext) {
    // searchContext.getData(url);
    const elements = [];
    for (let i = 1; i <= searchContext.pages; i++) {
      elements.push(
        <span onClick={() => searchContext.loadPage(i)} key={i}>
          {i}
        </span>
      );
    }

    return (
      <div className="results-wrapper">
        {searchContext.isLoading ? (
          <Loader />
        ) : (
          <div>
            <ul>
              {searchContext.results.map(
                (item: Dictionary<string | string[]>, index: number) => (
                  <li key={index}>
                    <h5>{item.name}</h5>
                    <p>
                      Gender: {item.gender}; Height: {item.height}; Weight:{' '}
                      {item.mass}; Hair: {item.hair_color}; Skin color:{' '}
                      {item.skin_color}; Eye color: {item.eye_color}; Birth
                      year: {item.birth_year};
                    </p>
                  </li>
                )
              )}
            </ul>
            {searchContext.pages <= 1 ? (
              ''
            ) : (
              <div className="paginator">Pages: {elements}</div>
            )}
          </div>
        )}
      </div>
    );
  }
}
