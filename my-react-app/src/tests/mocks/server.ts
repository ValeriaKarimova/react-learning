import { setupServer } from 'msw/node';
import { handlers } from './cardsMock';

export const server = setupServer(...handlers);
