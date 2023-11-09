import './main-block.scss';
import { Outlet } from 'react-router';

export default function MainBlock() {
  return (
    <main className="main-block">
      <Outlet />
    </main>
  );
}
