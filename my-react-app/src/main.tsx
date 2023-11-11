import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Results from './components/results/results';
import Categories from './components/categories/categories';
import Details from './components/details/details';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Categories />}>
        {['people', 'planets', 'films', 'species', 'vehicles', 'starships'].map(
          (key) => (
            <Route key={key} path={key} element={<Results url={key} />}>
              <Route path=":id" element={<Details />} />
            </Route>
          )
        )}
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
  </>
);
