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
        <Route path="people" element={<Results url="people" />}>
          <Route path=":id" element={<Details />} />
        </Route>
        <Route path="planets" element={<Results url="planets" />}>
          <Route path=":id" element={<Details />} />
        </Route>
        <Route path="films" element={<Results url="films" />}>
          <Route path=":id" element={<Details />} />
        </Route>
        <Route path="species" element={<Results url="species" />}>
          <Route path=":id" element={<Details />} />
        </Route>
        <Route path="vehicles" element={<Results url="vehicles" />}>
          <Route path=":id" element={<Details />} />
        </Route>
        <Route path="starships" element={<Results url="starships" />}>
          <Route path=":id" element={<Details />} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
  </>
);
