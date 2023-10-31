import { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import Results from './components/results/results';
import { SearchResultsProvider } from './services/search-context';
import ErrorBoundary from './services/error-boundary';
import ErrorButton from './components/error-button/error-button';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <SearchResultsProvider>
          <Header></Header>
          <ErrorButton></ErrorButton>
          <Results></Results>
        </SearchResultsProvider>
      </ErrorBoundary>
    );
  }
}

export default App;
