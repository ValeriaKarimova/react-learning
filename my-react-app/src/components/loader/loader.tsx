import { Component } from 'react';
import './loader.scss';
import { SearchContext } from '../../services/search-context';

class Loader extends Component {
  static contextType = SearchContext;
  render() {
    return <div className="loader"></div>;
  }
}

export default Loader;
