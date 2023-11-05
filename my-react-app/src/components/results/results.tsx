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
  const options = [{ value: 10 }, { value: 20 }, { value: 30 }];

  const searchContext = useContext(SearchContext)?.searchContext;
  const [detailsUrl, setDetailsUrl] = useState('');
  const [selected, setSelected] = useState(options[0].value);

  function openDetails(item: string) {
    setDetailsUrl(item);
  }

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const target = event.target as HTMLSelectElement;
    setSelected(+target.value);
    searchContext?.changePagination(+target.value);
  }

  useEffect(() => {
    if (searchContext) {
      searchContext.changeContext(url);
      setSelected(options[0].value);
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
          <>
            <Header />
            <div className="results">
              <ul className="results__list">
                {searchContext.results &&
                  searchContext.results.map(
                    (item: Dictionary<string | string[]>, index: number) => (
                        <NavLink
                        to={item.name ? item.name as string : item.title as string}
                        key={index}
                      >
                        <li onClick={() => openDetails(item.url as string)}>
                          <h5>{item.name ? item.name : item.title}</h5>
                        </li>
                      </NavLink>
                    )
                  )}
              </ul>
              {searchContext.pages <= 1 ? (
                ''
              ) : (
                <div className="paginator__wrapper">
                  <select value={selected} onChange={handleChange}>
                    {options.map((el, idx) => (
                      <option key={idx} value={el.value}>
                        {el.value}
                      </option>
                    ))}
                  </select>
                  <div className="paginator">Pages: {elements}</div>
                </div>
              )}
              <Outlet context={{ detailsUrl }} />
            </div>
          </>
        )}
      </div>
    );
  }
}
