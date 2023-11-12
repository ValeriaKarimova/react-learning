import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import Categories from '../../components/categories/categories';
import Loader from '../../components/loader/loader';
import { MemoryRouter } from 'react-router-dom';

describe('categories tests', () => {
  test('loader renders', () => {
    render(<Loader />);
    const loader = screen.getByRole('loader');
    expect(loader).toBeInTheDocument();
  });

  test('categories renders', async () => {
    let resolver = (val: unknown) => val;

    global.fetch = jest.fn(
      () =>
        new Promise((resolve) => {
          resolver = resolve;
        })
    ) as jest.Mock;

    render(
      <MemoryRouter>
        <Categories />
      </MemoryRouter>
    );

    expect(screen.getByRole('loader')).toBeInTheDocument();

    await act(async () => {
      resolver({
        ok: true,
        json: () =>
          Promise.resolve({
            films: 'https://swapi.dev/api/films/',
            people: 'https://swapi.dev/api/people/',
            planets: 'https://swapi.dev/api/planets/',
            species: 'https://swapi.dev/api/species/',
            starships: 'https://swapi.dev/api/starships/',
            vehicles: 'https://swapi.dev/api/vehicles/',
          }),
      });
    });

    expect(screen.queryByRole('loader')).toBeNull();
    expect(screen.getByText(/films/i)).toBeInTheDocument();
  });
});
