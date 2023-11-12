import './header.scss';
import Search from '../search/search';
import ErrorButton from '../error-button/error-button';

export default function Header() {
  return (
    <header className="header">
      <Search />
      <ErrorButton />
    </header>
  );
}
