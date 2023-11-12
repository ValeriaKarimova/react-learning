import { MyContextData } from '../../models/response.model';
import { SearchContext } from '../../services/search-context';
import { cardsData } from './cardsMock';

export const SearchContextProviderMock: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value: MyContextData = {
    searchContext: {
      isLoading: false,
      results: cardsData,
      pages: 2,
      changePagination: () => {},
      changeContext: () => {},
      loadPage: () => {},
      error: false,
      query: '',
      getData: () => {},
      setSearchQuery: () => {},
    },
    setValue: () => {},
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
