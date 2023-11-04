import React, { createContext, useState } from 'react';
import {
  Dictionary,
  MyContextData,
  ResponseData,
  SearchContextData,
} from '../models/response.model';

const SearchContext = createContext<MyContextData | undefined>(undefined);

function SearchResultsProvider({ children }) {
  const [searchContext, setValue] = useState<SearchContextData>({
    results: [],
    isLoading: false,
    pages: 0,
    error: false,
    getData: getData,
    loadPage: loadPage,
  });

  let pageNumber: number = 1;
  const URL = 'https://swapi.dev/api/people?search=';
  let searchTerm: string = '';

  function loadPage(num: number) {
    getData(searchTerm, num);
  }

  function getData(str: string, page?: number) {
    setValue((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    searchTerm = str;
    pageNumber = page ? page : 1;
    const url = URL + searchTerm + '&page=' + pageNumber;

    fetch(`${url}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: ResponseData<Dictionary<string | string[]>>) => {
        if (data.count === 0) {
          setValue((prevState) => ({
            ...prevState,
            error: true,
          }));
        }

        setValue((prevState) => ({
          ...prevState,
          isLoading: false,
          results: data.results,
          pages: Math.ceil(data.count / 10),
        }));
      })
      .catch(() => {
        console.log('Error!');
      });
  }

  if (searchContext.error) {
    throw new Error('No data found');
  }

  return (
    <SearchContext.Provider value={{ searchContext, setValue }}>
      {children}
    </SearchContext.Provider>
  );
}
export { SearchContext, SearchResultsProvider };
