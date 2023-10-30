import React, { Component, createContext } from 'react';
import { Dictionary, ResponseData } from '../models/response.model';

interface SearchContextData {
  results: Array<Dictionary<string | string[]>>;
  isLoading: boolean;
  pages: number;
  getData: (url: string) => void;
  loadPage: (num: number) => void;
}

interface myProps {
  children: React.ReactNode;
}

const SearchContext = createContext<SearchContextData>({
  results: [],
  isLoading: false,
  pages: 1,
  getData: () => {},
  loadPage: () => {},
});

class SearchResultsProvider extends Component {
  readonly URL = 'https://swapi.dev/api/people?search=';
  searchTerm: string = '';
  pageNumber: number = 1;
  declare props: myProps;
  state = {
    results: [],
    isLoading: false,
    pages: 0,
    error: false,
  };

  constructor(props: myProps) {
    super(props);
  }

  loadPage(num: number) {
    // this.pageNumber = num;
    this.getData(this.searchTerm, num);
  }

  getData(searchTerm: string, page?: number) {
    this.setState({ isLoading: true });
    this.searchTerm = searchTerm;
    this.pageNumber = page ? page : 1;
    const url = this.URL + searchTerm + '&page=' + this.pageNumber;

    fetch(`${url}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: ResponseData<Dictionary<string | string[]>>) => {
        if (data.count === 0) {
          this.setState({ error: true });
        }
        const state = {
          results: data.results,
          isLoading: false,
          pages: Math.ceil(data.count / 10),
        };

        this.setState(state);
      })
      .catch(() => {
        console.log('Error!');
      });
  }

  render() {
    if (this.state.error) {
      throw new Error('No data found');
    }

    return (
      <SearchContext.Provider
        value={{
          results: this.state.results,
          isLoading: this.state.isLoading,
          pages: this.state.pages,
          getData: (url) => this.getData(url),
          loadPage: (num) => this.loadPage(num),
        }}
      >
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export { SearchResultsProvider, SearchContext };
