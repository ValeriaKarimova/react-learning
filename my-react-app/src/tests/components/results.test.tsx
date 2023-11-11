import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Results from '../../components/results/results';

describe('Cards Count Test', () => {
  it('should render the component and count the number of elements', () => {
    const { container } = render(<Results url="" />);
    const numberOfElements = container.querySelectorAll('li').length;
    expect(numberOfElements).toBe(10);
  });
});
