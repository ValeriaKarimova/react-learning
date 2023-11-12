import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import MyButton from '../../components/search/search';
import Search from '../../components/search/search';

describe('search component tests', () => {
  test('search-btn renders', async () => {
    render(<MyButton />);
    const searchBtn = await screen.findByRole('button');
    expect(searchBtn).toBeInTheDocument();
  });
  test('search button saves value to the local storage', async () => {
    render(<MyButton />);
    const searchBtn = await screen.findByRole('button');
    const spyLoStoSet = jest.spyOn(localStorage, 'setItem');
    fireEvent.click(searchBtn, {});
    expect(spyLoStoSet).toHaveBeenCalledTimes(1);
  });
  test('search-input renders', async () => {
    render(<Search />);
    const searchInput = await screen.findByPlaceholderText(/search/i);
    expect(searchInput).toBeInTheDocument();
    fireEvent.input(searchInput, {
      target: { value: 'luke' },
    });
    expect(searchInput).toContainHTML('luke');
  });
  test('component retrieves the value from the local storage upon mounting', async () => {
    const spyLoStoGet = jest.spyOn(localStorage, 'getItem');
    render(<Search />);
    expect(spyLoStoGet).toHaveBeenCalledTimes(1);
  });
});
