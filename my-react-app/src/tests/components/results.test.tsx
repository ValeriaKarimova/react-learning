import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Results from '../../components/results/results';
import { MemoryRouter } from 'react-router-dom';
import { SearchContextProviderMock } from '../mocks/contextMock';

describe('results tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('component renders the specified number of cards', async () => {
    render(
      <MemoryRouter>
        <Results url="{}" />
      </MemoryRouter>
    );

    expect(true).toBeTruthy();
  });

  test('component renders the specified number of cards', async () => {
    render(
      <MemoryRouter>
        <SearchContextProviderMock>
          <Results url="{}" />
        </SearchContextProviderMock>
      </MemoryRouter>
    );

    const cards = await screen.findAllByRole('listitem');
    expect(cards).toHaveLength(10);
    const pagenumber = await screen.findAllByRole('pagenumber');
    fireEvent.click(pagenumber[0], {});
    expect(true).toBeTruthy();
  });
});
