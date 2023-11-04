import './App.css';
import Header from './components/header/header';
import MainBlock from './components/main-block/main-block';
import ErrorBoundary from './services/error-boundary';
import { SearchResultsProvider } from './services/search-context';

export default function App() {
  return (
    <ErrorBoundary>
      <SearchResultsProvider>
        <Header />
        <MainBlock></MainBlock>
      </SearchResultsProvider>
    </ErrorBoundary>
  );
}
