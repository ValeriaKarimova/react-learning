export interface ResponseData<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
}

export interface ButtonProps {
  onClick: () => void;
}

export interface StringProp {
  value: string;
}

export interface State {
  request: string;
  data: Array<Dictionary<string | string[]>>;
  error: null;
}

export interface SearchState {
  results: Array<Dictionary<string | string[]>>;
  isLoading: false;
}

export interface Dictionary<T> {
  [Key: string]: T;
}

export interface SearchContextData {
  results: Array<Dictionary<string | string[]>>;
  isLoading: boolean;
  pages: number;
  error: boolean;
  getData: (url?: string) => void;
  loadPage: (num: number) => void;
  changeContext: (value: string) => void;
  changePagination: (num: number) => void;
}

export interface MyContextData {
  searchContext: SearchContextData;
  setValue: React.Dispatch<React.SetStateAction<SearchContextData>>;
}
