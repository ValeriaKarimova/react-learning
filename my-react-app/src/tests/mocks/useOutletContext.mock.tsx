import { createContext } from 'react';

export const useOutletContext = jest.fn(() => ({
  itemUrl: '/mocked-item-url',
  domainUrl: '/mocked-domain-url',
}));

export const OutletContext = createContext({
  itemUrl: '/mocked-item-url',
  domainUrl: '/mocked-domain-url',
});
