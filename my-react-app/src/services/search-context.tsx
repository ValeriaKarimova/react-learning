import React, { createContext, useState, ReactNode } from 'react';
import {
  Dictionary,
  MyContextData,
  ResponseData,
  SearchContextData,
} from '../models/response.model';
import { useNavigate } from 'react-router-dom';

interface ChildrenProp {
  children: ReactNode;
}

const SearchContext = createContext<MyContextData | undefined>(undefined);

function SearchResultsProvider({ children }: ChildrenProp) {
  const navigate = useNavigate();
  const [searchContext, setValue] = useState<SearchContextData>({
    pages: 0,
    query: '',
    results: [],
    error: false,
    isLoading: false,
    getData: getData,
    loadPage: loadPage,
    changeContext: changeContext,
    setSearchQuery: setSearchQuery,
    changePagination: changePagination,
  });

  let pageNumber: number = 1;
  const URL = 'https://swapi.dev/api/';
  let searchTerm: string = '';
  let category = '';
  let perPage = 10;
  let responseResults: Dictionary<string | string[]>[] = [];

  function changePagination(num: number) {
    pageNumber = 1;
    responseResults = [];
    perPage = num;
    loadPage(1, false);
  }

  function setSearchQuery(value: string) {
    setValue((prevState) => ({
      ...prevState,
      query: value,
    }));

    console.log(searchContext);
  }

  function loadPage(num: number, isPagination: boolean = true) {
    responseResults = [];
    if (isPagination) {
      const param = `?page=${num}`;
      navigate({ search: param });
    } else {
      pageNumber = 1;
    }

    const initPage =
      perPage / 10 > 1 && num !== 1 ? perPage / 10 + num - 1 : num;
    const len = initPage + perPage / 10 - 1;
    for (let i = initPage; i <= len; i++) {
      getData(searchTerm, i);
    }
  }

  function changeContext(value: string) {
    if (category !== value) {
      setSearchQuery('');
      category = value;
      responseResults = [];
      perPage = 10;
      getData();
    }
  }

  function joinUrl(): string {
    let url = URL;
    if (category) url += category;
    if (searchTerm) url += '?search=' + searchTerm;
    if (pageNumber > 1)
      url += searchTerm ? '&page=' + pageNumber : '?page=' + pageNumber;
    return url;
  }

  function getData(term?: string, page?: number) {
    setValue((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    if (term !== searchTerm) {
      responseResults = [];
      pageNumber = 1;
      navigate({ search: '' });
    }

    searchTerm = term ? term : '';
    pageNumber = page ? page : 1;
    const url = joinUrl();

    fetch(url)
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
        } else {
          responseResults = responseResults.concat(data.results);
          setValue((prevState) => ({
            ...prevState,
            isLoading: false,
            results: responseResults,
            pages: Math.ceil(data.count / perPage),
          }));
        }
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
