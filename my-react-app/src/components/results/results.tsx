import { useContext, useEffect, useState } from 'react';
import './results.scss';
import { SearchContext } from '../../services/search-context';
import { NavLink, Outlet } from 'react-router-dom';
import { Dictionary } from '../../models/response.model';
import Header from '../header/header';
import Loader from '../loader/loader';

interface ResultsProps {
  url: string;
}

export default function Results({ url }: ResultsProps) {
  const searchContext = useContext(SearchContext)?.searchContext;
  const [detailsUrl, setDetailsUrl] = useState('');

  function openDetails(item: string) {
    setDetailsUrl(item);
  }

  useEffect(() => {
    if (searchContext) {
      searchContext.changeContext(url);
    }
  }, [url]);

  if (searchContext) {
    const elements = [];
    for (let i = 1; i <= searchContext.pages; i++) {
      elements.push(
        <span onClick={() => searchContext.loadPage(i)} key={i}>
          {i}
        </span>
      );
    }

    return (
      <div>
        {searchContext.isLoading ? (
          <Loader />
        ) : (
        <><Header />
        <div className="results">
              <ul>
                {searchContext.results.map(
                  (item: Dictionary<string | string[]>, index: number) => (
                    <NavLink to={item.name} key={index}>
                      <li onClick={() => openDetails(item.url)}>
                        <h5>{item.name}</h5>
                      </li>
                    </NavLink>
                  )
                )}
              </ul>
              {searchContext.pages <= 1 ? (
                ''
              ) : (
                <div className="paginator">Pages: {elements}</div>
              )}
            <Outlet context={{ detailsUrl }} />
            </div></>
        )}
      </div>
    );
  }
}
