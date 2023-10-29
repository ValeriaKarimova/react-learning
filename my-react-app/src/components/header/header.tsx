import { Component } from 'react';
import Search from '../search/search';
import './header.scss';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <Search></Search>
      </header>
    );
  }
}

export default Header;
