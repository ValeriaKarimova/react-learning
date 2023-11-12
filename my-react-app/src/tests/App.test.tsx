import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App tests', () => {
  test('Renders the main page', () => {
    render(<App />);
    const test = screen.getByText(/case/i);
    expect(test).toBeInTheDocument();
  });
});
