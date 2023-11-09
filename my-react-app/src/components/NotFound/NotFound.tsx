import { Link } from 'react-router-dom';
import './NotFound.scss';

export default function NotFound() {
  return (
    <div className="page-404">
      <h2>Ooops! Something went wrong: Page was not found!</h2>

      <p>
        Return to <Link to="/">the main page</Link>
      </p>
    </div>
  );
}
