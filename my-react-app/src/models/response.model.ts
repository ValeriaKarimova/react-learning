export interface ResponseData<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
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
