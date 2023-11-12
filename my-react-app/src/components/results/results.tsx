import { useContext, useEffect, useState } from 'react';
import './results.scss';
import { SearchContext } from '../../services/search-context';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { Dictionary } from '../../models/response.model';
import Header from '../header/header';
import Loader from '../loader/loader';

interface ResultsProps {
  url: string;
}

export default function Results({ url }: ResultsProps) {
  const options = [{ value: 10 }, { value: 20 }, { value: 30 }];
  const navigate = useNavigate();

  const searchContext = useContext(SearchContext)?.searchContext;
  const [selected, setSelected] = useState(options[0].value);
  const { id } = useParams();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const target = event.target as HTMLSelectElement;
    setSelected(+target.value);
    searchContext?.changePagination(+target.value);
    navigate({ search: `?page=${+target.value}` });
  }

  useEffect(() => {
    if (searchContext) {
      searchContext.changeContext(url);
      setSelected(options[0].value);
    }
  }, [url]);

  if (!searchContext) {
    return null;
  }

  const elements = [];
  const pages = searchContext.pages;
  const isLoading = searchContext.isLoading;

  for (let i = 1; i <= pages; i++) {
    elements.push(
      <span onClick={() => searchContext.loadPage(i)} key={i} role="pagenumber">
        {i}
      </span>
    );
  }

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const detailsItem = searchContext?.results?.find(
    (item) => id === item.name || item.title
  );

  return (
    <div>
      <Header />
      <div className="results">
        <ul className="results__list">
          {searchContext.results &&
            searchContext.results.map(
              (item: Dictionary<string | string[]>, index: number) => (
                <li key={index}>
                  <NavLink to={`${item.name || item.title}`} key={index}>
                    <h5>{item.name ? item.name : item.title}</h5>
                  </NavLink>
                </li>
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

        <Outlet context={{ itemUrl: detailsItem?.url, domainUrl: `/${url}` }} />
      </div>
    </div>
  );
}
