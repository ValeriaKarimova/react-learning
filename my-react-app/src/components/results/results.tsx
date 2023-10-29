import { Component } from 'react';
import './results.scss';
import { SearchContext } from '../../services/search-context';
import { Dictionary } from '../../models/response.model';
import Loader from '../loader/loader';

class Results extends Component {
  static contextType = SearchContext;

  declare context: React.ContextType<typeof SearchContext>;
  render() {
    const elements = [];
    for (let i = 1; i <= this.context.pages; i++) {
      elements.push(
        <span onClick={() => this.context.loadPage(i)} key={i}>
          {i}
        </span>
      );
    }

    return (
      <main className="main">
        {this.context.isLoading ? (
          <Loader></Loader>
        ) : (
          <div>
            <ul>
              {this.context.results.map(
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
            {this.context.pages <= 1 ? (
              ''
            ) : (
              <div className="paginator">Pages: {elements}</div>
            )}
          </div>
        )}
      </main>
    );
  }
}

export default Results;
