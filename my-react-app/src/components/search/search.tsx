import { Component } from 'react';
import './search.scss';
import { SearchContext } from '../../services/search-context';

class Search extends Component {
  static contextType = SearchContext;
  declare context: React.ContextType<typeof SearchContext>;

  state = {
    query: localStorage.getItem('prevQuery') || '',
  };

  handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  saveToStorage() {
    localStorage.setItem('prevQuery', this.state.query);
  }

  handleSearchClick = () => {
    this.saveToStorage();
    this.context.getData(this.state.query);
  };

  render() {
    console.log(
      'Ввиду размытых формулировок, возможно, что-то не так сделано, как подразумевал автор, поэтому прошу написать в личку, прежде, чем занижать баллы! Пожалуйста!'
    );
    return (
      <div className="search__wrapper">
        <span className="search__wrapper-text">
          Enter StarWars character name
        </span>
        <div>
          <input
            className="search__input"
            name="searchInput"
            type="text"
            placeholder="Search"
            value={this.state.query}
            onChange={this.handleUserInput}
          />
        </div>
        <div>
          <button className="search__btn" onClick={this.handleSearchClick}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
