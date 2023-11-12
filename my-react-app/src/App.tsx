import './App.css';
import MainBlock from './components/main-block/main-block';
import ErrorBoundary from './services/error-boundary';
import { SearchResultsProvider } from './services/search-context';

export default function App() {
  return (
    <>
      <ErrorBoundary>
        <SearchResultsProvider>
          <MainBlock></MainBlock>
        </SearchResultsProvider>
      </ErrorBoundary>
    </>
  );
}
