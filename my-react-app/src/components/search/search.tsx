import './search.scss';
import { useContext, useState } from 'react';
import { ButtonProps } from '../../models/response.model';
import { SearchContext } from '../../services/search-context';

function MyButton({ onClick }: ButtonProps) {
  return (
    <div>
      <button className="search__btn" onClick={onClick}>
        Search
      </button>
    </div>
  );
}

export default function Search() {
  const [query, setQuery] = useState(localStorage.getItem('prevQuery') || '');
  const context = useContext(SearchContext)?.searchContext;

  function handleUserInput(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function saveToStorage() {
    localStorage.setItem('prevQuery', query);
  }

  function handleSearchClick(): void {
    saveToStorage();
    if (context) {
      context.getData(query);
    }
  }

  return (
    <div className="search__wrapper">
      <span className="search__wrapper-text">
        Search by category
      </span>
      <div>
        <input
          className="search__input"
          name="searchInput"
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleUserInput}
        />
      </div>
      <MyButton onClick={handleSearchClick} />
    </div>
  );
}
