import React from 'react';
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'http://localhost:3000',
});

export const GraphqlProvider: React.FC = ({ children }) => (
  <Provider value={client}>{children}</Provider>
);
