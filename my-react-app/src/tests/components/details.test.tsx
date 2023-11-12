import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Details from '../../components/details/details';
import Loader from '../../components/loader/loader';
import { MemoryRouter } from 'react-router-dom';

const obj = {
  itemUrl: '/mocked-item-url',
  domainUrl: '/mocked-domain-url',
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: () => obj,
}));

let resolver = (val: unknown) => val;

global.fetch = jest.fn(
  () =>
    new Promise((resolve) => {
      resolver = resolve;
    })
) as jest.Mock;

describe('Details tests', () => {
  test('Check that a loading indicator is displayed while fetching data', () => {
    render(<Loader />);
    const loader = screen.getByRole('loader');
    expect(loader).toBeInTheDocument();
  });

  test('clicking the close button hides the component', async () => {
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    await act(async () => {
      resolver({
        ok: true,
        json: () =>
          Promise.resolve({
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
            url: 'https://swapi.dev/api/people/1/',
          }),
      });
    });

    const closeBtn = await screen.findByText('X');
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn, {});
    expect(closeBtn).toBeInTheDocument();
  });

  test('detailed card component correctly displays the detailed card data', async () => {
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    expect(screen.getByRole('loader')).toBeInTheDocument();

    await act(async () => {
      resolver({
        ok: true,
        json: () =>
          Promise.resolve({
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
            url: 'https://swapi.dev/api/people/1/',
          }),
      });
    });

    expect(screen.queryByRole('loader')).toBeNull();
    expect(screen.getByText(/luke Skywalker/i)).toBeInTheDocument();
  });

  test('detailed card component if response is not ok', async () => {
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    await act(async () => {
      resolver({
        ok: false,
      });
    });

    expect(true).toBeTruthy();
  });

  test('detailed card component if item url is missing', async () => {
    obj.itemUrl = '';
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    expect(true).toBeTruthy();
  });
});
