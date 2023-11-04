import './App.css';
import Header from './components/header/header';
import Results from './components/results/results';
import ErrorBoundary from './services/error-boundary';
import ErrorButton from './components/error-button/error-button';
import { SearchResultsProvider } from './services/search-context';

export default function App() {
  return (
    <ErrorBoundary>
      <SearchResultsProvider>
        <Header />
        <ErrorButton />
        <Results></Results>
      </SearchResultsProvider>
    </ErrorBoundary>
  );
}
